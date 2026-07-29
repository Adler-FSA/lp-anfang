
(() => {
  function detectDelimiter(line){
    const c={',':(line.match(/,/g)||[]).length,';':(line.match(/;/g)||[]).length,'\t':(line.match(/\t/g)||[]).length};
    return Object.entries(c).sort((a,b)=>b[1]-a[1])[0][0];
  }
  function parseLine(line,delim){
    const out=[]; let cur='',q=false;
    for(let i=0;i<line.length;i++){
      const ch=line[i];
      if(ch==='"'){
        if(q && line[i+1]==='"'){cur+='"';i++;} else q=!q;
      }else if(ch===delim && !q){out.push(cur.trim());cur='';}
      else cur+=ch;
    } out.push(cur.trim()); return out;
  }
  function parse(text){
    text=String(text||'').replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n');
    const lines=text.split('\n').filter(x=>x.trim().length);
    if(!lines.length) return {headers:[],rows:[]};
    const delim=detectDelimiter(lines[0]),headers=parseLine(lines[0],delim);
    const rows=lines.slice(1).map(line=>{
      const vals=parseLine(line,delim),o={}; headers.forEach((h,i)=>o[h]=vals[i]??''); return o;
    });
    return {headers,rows,delimiter:delim};
  }
  function keyMap(row){const m={};Object.keys(row).forEach(k=>m[k.toLowerCase().replace(/[^a-z0-9]/g,'')]=k);return m}
  function val(row,map,names){for(const n of names){const k=map[n.toLowerCase().replace(/[^a-z0-9]/g,'')];if(k && row[k]!==undefined)return String(row[k]).trim()}return''}
  function dateISO(v){
    if(!v)return'';
    const s=String(v).trim();
    const m=s.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/);
    if(m)return `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}Z`;
    const d=new Date(s); return isNaN(d)?s:d.toISOString();
  }
  function kind(headers,name=''){
    const n=headers.map(x=>x.toLowerCase().replace(/[^a-z0-9]/g,''));
    const f=name.toLowerCase();
    if(n.includes('tokenid')||n.includes('tokentype')||/nft|erc721|erc1155/.test(f))return'nft';
    if(n.includes('tokensymbol')||n.includes('tokenname')||n.includes('tokenvalue')||n.includes('token')||/token/.test(f))return'token';
    if(/internal/.test(f)||n.includes('traceid'))return'internal';
    return'normal';
  }
  async function digest(text){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
  function normalizeRows(parsed,file,wallet){
    const k=kind(parsed.headers,file.name),mine=String(wallet.address||'').toLowerCase();
    return parsed.rows.map((row,index)=>{
      const m=keyMap(row);
      const hash=val(row,m,['Transaction Hash','TxHash','Hash']);
      const from=val(row,m,['From','Sender','From Address']).toLowerCase();
      const to=val(row,m,['To','Receiver','To Address']).toLowerCase();
      const token=val(row,m,['Token','Token Symbol','TokenSymbol','Symbol','Asset']) || (k==='normal' ? (wallet.symbol||wallet.chain||'COIN').toUpperCase() : 'TOKEN');
      const amount=val(row,m,['Amount','TokenValue','Token Value','Value','Value_IN(BNB)','Value_OUT(BNB)','Value_IN(ETH)','Value_OUT(ETH)']);
      const method=val(row,m,['Method','FunctionName','Function Name']);
      const status=val(row,m,['Status','TxReceipt Status']);
      const contract=val(row,m,['ContractAddress','Contract Address','Token Contract Address']);
      const tokenId=val(row,m,['TokenID','Token ID']);
      let direction='unbekannt'; if(from===mine)direction='ausgehend';else if(to===mine)direction='eingehend';
      return {
        id:KSA.uid(),walletId:wallet.id,chain:wallet.chain,kind:k,hash,index,
        date:dateISO(val(row,m,['DateTime (UTC)','DateTime','Date Time (UTC)','Timestamp','UnixTimestamp','Unix Timestamp'])),
        from,to,direction,asset:token,amount,method,status,contract,tokenId,raw:row,
        key:`${wallet.chain}:${hash}:${k}:${val(row,m,['LogIndex','Log Index','Index'])||index}`
      };
    }).filter(x=>x.hash);
  }
  function buildEconomic(data,walletId){
    const rows=data.rawMovements.filter(x=>x.walletId===walletId), groups=new Map();
    rows.forEach(r=>{const key=`${r.chain}:${r.hash}`;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(r)});
    let built=0;
    for(const [key,rs] of groups){
      if(data.transactions.some(t=>t.blockchainKey===`economic:${key}`))continue;
      const ins=rs.filter(x=>x.direction==='eingehend'),outs=rs.filter(x=>x.direction==='ausgehend');
      let type='Ungeklärt',asset='–',amount='';
      if(ins.length&&outs.length){type='Tausch / Swap';asset=`${outs.map(x=>x.asset).join('+')} → ${ins.map(x=>x.asset).join('+')}`;amount=`${outs.map(x=>x.amount).join('+')} → ${ins.map(x=>x.amount).join('+')}`}
      else if(ins.length){type=ins.some(x=>x.kind==='nft')?'NFT-Eingang':'Einzahlung';asset=ins.map(x=>x.asset).join('+');amount=ins.map(x=>x.amount).join('+')}
      else if(outs.length){type=outs.some(x=>x.kind==='nft')?'NFT-Ausgang':'Auszahlung';asset=outs.map(x=>x.asset).join('+');amount=outs.map(x=>x.amount).join('+')}
      else if(rs.some(x=>x.method)){type='Contract-Aufruf';asset=(rs[0].chain||'COIN').toUpperCase();amount='0'}
      const suspicious=rs.some(x=>/claim|visit|reward|airdrop|voucher|bonus|http|www/i.test(`${x.asset} ${x.raw?.Token||''}`));
      data.transactions.push({
        id:KSA.uid(),date:rs.find(x=>x.date)?.date||'',type,asset,amount,eur:'',
        walletId,exchangeId:'',source:'Blockchain-CSV',txHash:rs[0].hash,chain:rs[0].chain,
        notes:rs.find(x=>x.method)?.method||'',blockchainKey:`economic:${key}`,
        suspicious,review:type==='Ungeklärt'||suspicious,rawCount:rs.length
      }); built++;
    }
    return built;
  }
  window.KSACSV={parse,digest,kind,normalizeRows,buildEconomic};
})();
