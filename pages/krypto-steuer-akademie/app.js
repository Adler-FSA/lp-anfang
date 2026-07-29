
(() => {
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const page=document.body.dataset.page||'dashboard';
  function notify(msg){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.style='position:fixed;right:18px;bottom:18px;background:#132238;color:white;padding:12px 16px;border-radius:10px;z-index:99';document.body.appendChild(t)}t.textContent=msg;t.hidden=false;clearTimeout(t._x);t._x=setTimeout(()=>t.hidden=true,2600)}
  function setupShell(){
    const y=$('#year'); if(y){const now=new Date().getFullYear();for(let i=now;i>=2010;i--){const o=document.createElement('option');o.value=i;o.textContent=i;y.appendChild(o)}y.value=KSA.year();y.onchange=()=>{KSA.setYear(y.value);location.reload()}}
    $$('.nav a').forEach(a=>{if(a.dataset.page===page)a.classList.add('active')});
    $('#menuToggle')?.addEventListener('click',()=>$('#sidebar')?.classList.toggle('open'));
    $('#backupBtn')?.addEventListener('click',KSA.backup);
    $('#restoreInput')?.addEventListener('change',async e=>{try{await KSA.restore(e.target.files[0])}catch(err){alert(err.message)}});
  }
  function renderDashboard(){
    const d=KSA.data(),c=KSA.counts(d);
    const vals={exchanges:c.exchanges,wallets:c.wallets,imports:c.imports,tx:c.tx,reviews:c.reviews};
    Object.entries(vals).forEach(([k,v])=>{const el=$(`[data-kpi="${k}"]`);if(el)el.textContent=v});
    const checks=[!!d.profile.owner,c.exchanges>0,c.wallets>0,c.imports>0,c.tx>0,c.docs>0,c.reviews===0];
    const pct=Math.round(checks.filter(Boolean).length/checks.length*100);$('#progressBar').style.width=pct+'%';$('#progressText').textContent=pct+' %';
  }
  function project(){
    const d=KSA.data(),f=$('#projectForm');if(!f)return;
    f.owner.value=d.profile.owner||'';f.fileName.value=d.profile.fileName||'';f.status.value=d.profile.status||'Begonnen';f.notes.value=d.profile.notes||'';
    f.onsubmit=e=>{e.preventDefault();d.profile={owner:f.owner.value.trim(),fileName:f.fileName.value.trim(),status:f.status.value,notes:f.notes.value.trim()};KSA.save();notify('Projektakte gespeichert.')};
  }
  function sources(){
    const d=KSA.data(),exf=$('#exchangeForm'),wf=$('#walletForm');
    function options(){const opts='<option value="">Keine Zuordnung</option>'+d.exchanges.map(x=>`<option value="${x.id}">${KSA.esc(x.name)}</option>`).join('');if(wf)wf.exchangeId.innerHTML=opts}
    function render(){
      options();
      $('#exchangeRows').innerHTML=d.exchanges.map(x=>`<tr><td><b>${KSA.esc(x.name)}</b><br><span class="muted">${KSA.esc(x.type)}</span></td><td>${KSA.esc(x.status)}</td><td>${KSA.esc(x.from||'–')} bis ${KSA.esc(x.to||'offen')}</td><td><button class="ghost" data-del-ex="${x.id}">Löschen</button></td></tr>`).join('')||'<tr><td colspan="4" class="empty">Noch kein Anbieter erfasst.</td></tr>';
      $('#walletRows').innerHTML=d.wallets.map(w=>`<tr><td><b>${KSA.esc(w.name)}</b><br><span class="mono">${KSA.esc(w.address)}</span></td><td>${KSA.esc(w.chain)}</td><td>${KSA.esc(w.ownership)}</td><td><a class="btn secondary" href="wallet-import.html?wallet=${w.id}">Bearbeiten</a> <button class="ghost" data-del-wa="${w.id}">Löschen</button></td></tr>`).join('')||'<tr><td colspan="4" class="empty">Noch keine Wallet erfasst.</td></tr>';
      $$('[data-del-ex]').forEach(b=>b.onclick=()=>{if(confirm('Anbieter löschen?')){d.exchanges=d.exchanges.filter(x=>x.id!==b.dataset.delEx);KSA.save();render()}});
      $$('[data-del-wa]').forEach(b=>b.onclick=()=>{if(confirm('Wallet löschen?')){d.wallets=d.wallets.filter(x=>x.id!==b.dataset.delWa);KSA.save();render()}});
    }
    exf.onsubmit=e=>{e.preventDefault();d.exchanges.push({id:KSA.uid(),name:exf.name.value.trim(),type:exf.type.value,status:exf.status.value,from:exf.from.value,to:exf.to.value,notes:exf.notes.value.trim()});exf.reset();KSA.save();render();notify('Anbieter gespeichert.')};
    wf.onsubmit=e=>{e.preventDefault();const address=wf.address.value.trim();if(!address)return;d.wallets.push({id:KSA.uid(),name:wf.name.value.trim(),address,chain:wf.chain.value,ownership:wf.ownership.value,exchangeId:wf.exchangeId.value,symbol:wf.symbol.value.trim()});wf.reset();KSA.save();render();notify('Wallet gespeichert.')};
    render();
  }
  function walletImport(){
    const d=KSA.data(),select=$('#walletSelect'),params=new URLSearchParams(location.search);
    select.innerHTML='<option value="">Wallet auswählen</option>'+d.wallets.map(w=>`<option value="${w.id}">${KSA.esc(w.name)} · ${KSA.esc(w.chain)}</option>`).join('');
    if(params.get('wallet'))select.value=params.get('wallet');
    function wallet(){return d.wallets.find(w=>w.id===select.value)}
    function stats(){
      const w=wallet();if(!w){$('#walletStats').innerHTML='<div class="empty">Bitte eine Wallet auswählen.</div>';return}
      const raw=d.rawMovements.filter(x=>x.walletId===w.id),k={normal:0,internal:0,token:0,nft:0};raw.forEach(x=>k[x.kind]=(k[x.kind]||0)+1);
      $('#walletStats').innerHTML=`<div class="checkline"><span>Normale Transaktionen</span><b>${k.normal}</b></div><div class="checkline"><span>Interne Transaktionen</span><b>${k.internal}</b></div><div class="checkline"><span>Token-Transfers</span><b>${k.token}</b></div><div class="checkline"><span>NFT-Transfers</span><b>${k.nft}</b></div>`;
      $('#rawRows').innerHTML=raw.slice(-150).reverse().map(r=>`<tr><td>${KSA.esc((r.date||'').slice(0,19))}</td><td>${KSA.esc(r.kind)}</td><td>${KSA.esc(r.direction)}</td><td>${KSA.esc(r.asset)}<br><span class="muted">${KSA.esc(r.amount)}</span></td><td class="mono">${KSA.esc(r.hash)}</td></tr>`).join('')||'<tr><td colspan="5" class="empty">Noch keine Blockchain-Datei eingelesen.</td></tr>';
    }
    select.onchange=stats;stats();
    $('#walletFiles').onchange=async e=>{
      const w=wallet();if(!w)return alert('Bitte zuerst eine Wallet auswählen.');
      const files=[...e.target.files];if(!files.length)return;
      let added=0,dupes=0,failed=[];
      $('#importLog').textContent='Dateien werden geprüft …';
      for(const file of files){
        try{
          const text=await file.text(),hash=await KSACSV.digest(text),p=KSACSV.parse(text);
          const old=d.imports.find(x=>x.hash===hash&&x.walletId===w.id);
          if(old && old.added>0){dupes++;continue}
          if(old && old.added===0)d.imports=d.imports.filter(x=>x!==old);
          const rows=KSACSV.normalizeRows(p,file,w),before=d.rawMovements.length;
          rows.forEach(r=>{if(!d.rawMovements.some(x=>x.key===r.key)){d.rawMovements.push(r);added++}});
          d.imports.push({id:KSA.uid(),walletId:w.id,name:file.name,hash,rows:p.rows.length,headers:p.headers,kind:KSACSV.kind(p.headers,file.name),added:d.rawMovements.length-before,at:new Date().toISOString()});
        }catch(err){failed.push(`${file.name}: ${err.message}`)}
      }
      const built=KSACSV.buildEconomic(d,w.id);KSA.save();stats();
      $('#importLog').innerHTML=`<b>Import abgeschlossen:</b> ${added} neue Bewegungen, ${built} neue wirtschaftliche Vorgänge, ${dupes} bereits vorhandene Dateien.${failed.length?'<br>'+KSA.esc(failed.join(' | ')):''}`;
    };
  }
  function handelsdaten(){
    const d=KSA.data(),sel=$('#csvExchange');sel.innerHTML='<option value="">Anbieter auswählen</option>'+d.exchanges.map(x=>`<option value="${x.id}">${KSA.esc(x.name)}</option>`).join('');
    function render(){$('#importRows').innerHTML=d.imports.filter(x=>x.exchangeId).map(i=>`<tr><td>${KSA.esc(i.name)}</td><td>${KSA.esc(d.exchanges.find(x=>x.id===i.exchangeId)?.name||'–')}</td><td>${KSA.esc(i.kind||'Handelsdatei')}</td><td>${i.rows||0}</td><td>${i.added||0}</td></tr>`).join('')||'<tr><td colspan="5" class="empty">Noch keine Börsen-CSV eingelesen.</td></tr>'}
    $('#exchangeCsv').onchange=async e=>{const file=e.target.files[0],exchangeId=sel.value;if(!exchangeId||!file)return alert('Bitte Anbieter und Datei auswählen.');const text=await file.text(),p=KSACSV.parse(text),hash=await KSACSV.digest(text);if(d.imports.some(x=>x.hash===hash))return alert('Diese Datei wurde bereits eingelesen.');d.imports.push({id:KSA.uid(),exchangeId,name:file.name,hash,rows:p.rows.length,headers:p.headers,kind:'Handelsdatei',added:0,preview:p.rows.slice(0,25),at:new Date().toISOString()});KSA.save();render();notify('Handelsdatei erkannt und gespeichert.')};render();
  }
  function transactions(){
    const d=KSA.data(),f=$('#txForm');
    f.walletId.innerHTML='<option value="">Keine Wallet</option>'+d.wallets.map(w=>`<option value="${w.id}">${KSA.esc(w.name)}</option>`).join('');
    f.exchangeId.innerHTML='<option value="">Kein Anbieter</option>'+d.exchanges.map(x=>`<option value="${x.id}">${KSA.esc(x.name)}</option>`).join('');
    function render(){
      let list=[...d.transactions];const q=($('#txSearch')?.value||'').toLowerCase(),filter=$('#txFilter')?.value||'all';
      if(q)list=list.filter(t=>JSON.stringify(t).toLowerCase().includes(q));
      if(filter==='review')list=list.filter(t=>t.review);if(filter==='scam')list=list.filter(t=>t.suspicious);
      $('#txRows').innerHTML=list.sort((a,b)=>String(b.date).localeCompare(String(a.date))).map(t=>`<tr><td>${KSA.esc((t.date||'').slice(0,19))}</td><td><b>${KSA.esc(t.type)}</b>${t.suspicious?'<span class="tag scam">Scam/Spam prüfen</span>':''}${t.review?'<span class="tag review">offen</span>':''}<br><span class="muted">${KSA.esc(t.notes||'')}</span></td><td>${KSA.esc(t.asset)}<br>${KSA.esc(t.amount)}</td><td>${KSA.esc(t.source||'')}</td><td class="mono">${KSA.esc(t.txHash||'')}</td><td><button class="ghost" data-toggle="${t.id}">${t.review?'Als geprüft markieren':'Zur Prüfung'}</button></td></tr>`).join('')||'<tr><td colspan="6" class="empty">Noch keine Transaktionen vorhanden.</td></tr>';
      $$('[data-toggle]').forEach(b=>b.onclick=()=>{const t=d.transactions.find(x=>x.id===b.dataset.toggle);t.review=!t.review;KSA.save();render()});
    }
    f.onsubmit=e=>{e.preventDefault();d.transactions.push({id:KSA.uid(),date:f.date.value,type:f.type.value,asset:f.asset.value.trim(),amount:f.amount.value.trim(),eur:f.eur.value.trim(),walletId:f.walletId.value,exchangeId:f.exchangeId.value,source:'Manuell',notes:f.notes.value.trim(),review:false,suspicious:false,blockchainKey:''});f.reset();KSA.save();render();notify('Vorgang ergänzt.')};
    $('#txSearch').oninput=render;$('#txFilter').onchange=render;render();
  }
  function evidence(){
    const d=KSA.data(),bf=$('#bankForm'),df=$('#docForm');
    bf.exchangeId.innerHTML='<option value="">Anbieter auswählen</option>'+d.exchanges.map(x=>`<option value="${x.id}">${KSA.esc(x.name)}</option>`).join('');
    function render(){
      $('#bankRows').innerHTML=d.bank.map(x=>`<tr><td>${KSA.esc(x.date)}</td><td>${KSA.esc(x.direction)}</td><td>${KSA.esc(x.amount)} €</td><td>${KSA.esc(d.exchanges.find(e=>e.id===x.exchangeId)?.name||'–')}</td><td>${KSA.esc(x.notes)}</td></tr>`).join('')||'<tr><td colspan="5" class="empty">Noch keine Bankbewegung.</td></tr>';
      $('#docRows').innerHTML=d.documents.map(x=>`<tr><td>${KSA.esc(x.category)}</td><td>${KSA.esc(x.fileName)}</td><td>${KSA.esc(x.link)}</td><td>${KSA.esc(x.notes)}</td></tr>`).join('')||'<tr><td colspan="4" class="empty">Noch kein Nachweis dokumentiert.</td></tr>';
    }
    bf.onsubmit=e=>{e.preventDefault();d.bank.push({id:KSA.uid(),date:bf.date.value,direction:bf.direction.value,amount:bf.amount.value,exchangeId:bf.exchangeId.value,notes:bf.notes.value.trim()});bf.reset();KSA.save();render()};
    df.onsubmit=e=>{e.preventDefault();d.documents.push({id:KSA.uid(),category:df.category.value,fileName:df.file.files[0]?.name||'',link:df.link.value.trim(),notes:df.notes.value.trim()});df.reset();KSA.save();render()};
    render();
  }
  function reviews(){
    const d=KSA.data(),f=$('#reviewForm');
    function auto(){
      const arr=[];
      d.transactions.filter(t=>t.review||t.suspicious).forEach(t=>arr.push({title:`Vorgang prüfen: ${t.type} ${t.asset}`,reason:t.suspicious?'Möglicher Scam-/Spam-Token oder unklare Bezeichnung.':'Automatisch als ungeklärt markiert.',linkId:t.id}));
      d.wallets.forEach(w=>{if(!d.rawMovements.some(x=>x.walletId===w.id))arr.push({title:`Wallet ohne Blockchain-Daten: ${w.name}`,reason:'Für diese Wallet wurde noch keine Explorer-CSV eingelesen.'})});
      d.exchanges.forEach(e=>{if(!d.imports.some(x=>x.exchangeId===e.id))arr.push({title:`Anbieter ohne Handelsdatei: ${e.name}`,reason:'Es wurde noch kein Export dokumentiert.'})});
      arr.forEach(x=>{if(!d.reviews.some(r=>r.title===x.title))d.reviews.push({id:KSA.uid(),...x,done:false})});KSA.save();
    }
    function render(){$('#reviewRows').innerHTML=d.reviews.map(r=>`<tr><td><b>${KSA.esc(r.title)}</b><br><span class="muted">${KSA.esc(r.reason)}</span></td><td><span class="status ${r.done?'ok':'warn'}">${r.done?'erledigt':'offen'}</span></td><td><button class="ghost" data-review="${r.id}">${r.done?'Wieder öffnen':'Erledigt'}</button></td></tr>`).join('')||'<tr><td colspan="3" class="empty">Keine Prüffälle vorhanden.</td></tr>';$$('[data-review]').forEach(b=>b.onclick=()=>{const r=d.reviews.find(x=>x.id===b.dataset.review);r.done=!r.done;KSA.save();render()})}
    $('#autoReview').onclick=()=>{auto();render();notify('Automatische Prüfung aktualisiert.')};f.onsubmit=e=>{e.preventDefault();d.reviews.push({id:KSA.uid(),title:f.title.value.trim(),reason:f.reason.value.trim(),done:false});f.reset();KSA.save();render()};auto();render();
  }
  function handover(){
    const d=KSA.data(),c=KSA.counts(d);
    $('#handoverSummary').innerHTML=`<p><b>Akte:</b> ${KSA.esc(d.profile.fileName||'–')}</p><p><b>Name:</b> ${KSA.esc(d.profile.owner||'–')}</p><p><b>Steuerjahr:</b> ${KSA.year()}</p><p><b>Anbieter:</b> ${c.exchanges}</p><p><b>Wallets:</b> ${c.wallets}</p><p><b>Dateiimporte:</b> ${c.imports}</p><p><b>Blockchain-Bewegungen:</b> ${c.raw}</p><p><b>Wirtschaftliche Vorgänge:</b> ${c.tx}</p><p><b>Bankbewegungen:</b> ${c.bank}</p><p><b>Nachweise:</b> ${c.docs}</p>`;
    const checks=[['Projektakte vollständig',!!d.profile.owner],['Mindestens ein Anbieter',c.exchanges>0],['Wallets erfasst',c.wallets>0],['Datenimporte vorhanden',c.imports>0],['Vorgänge sichtbar',c.tx>0],['Nachweise dokumentiert',c.docs>0],['Keine offenen Prüffälle',c.reviews===0]];
    $('#handoverChecks').innerHTML=checks.map(x=>`<div class="checkline"><span>${x[0]}</span><span class="status ${x[1]?'ok':'warn'}">${x[1]?'vorhanden':'fehlt/offen'}</span></div>`).join('');
    $('#handoverTx').innerHTML=d.transactions.slice(0,500).map(t=>`<tr><td>${KSA.esc((t.date||'').slice(0,10))}</td><td>${KSA.esc(t.type)}</td><td>${KSA.esc(t.asset)}</td><td>${KSA.esc(t.amount)}</td><td>${KSA.esc(t.source)}</td><td>${t.review?'offen':'geprüft'}</td></tr>`).join('');
    $('#printBtn').onclick=()=>print();$('#exportCsv').onclick=()=>{const rows=[['Datum','Vorgang','Asset','Menge','EUR','Quelle','Hash','Prüfstatus'],...d.transactions.map(t=>[t.date,t.type,t.asset,t.amount,t.eur,t.source,t.txHash,t.review?'offen':'geprüft'])];const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;KSA.download(`steuerberater-vorgaenge-${KSA.year()}.csv`,rows.map(r=>r.map(q).join(';')).join('\n'),'text/csv;charset=utf-8')};
  }
  setupShell();
  ({dashboard:renderDashboard,project,sources,'wallet-import':walletImport,imports:handelsdaten,transactions,evidence,reviews,handover}[page]||(()=>{}))();
})();
