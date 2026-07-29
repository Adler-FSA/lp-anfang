
(() => {
  const KEY = 'kryptoSteuerAkademieV1';
  const LEGACY_KEY = 'kryptoSteuerV2';

  function baseYear(year){
    return {
      year:Number(year),
      profile:{owner:'',fileName:'',status:'Begonnen',notes:''},
      exchanges:[], wallets:[], imports:[], rawMovements:[], transactions:[],
      bank:[], documents:[], reviews:[], settings:{createdAt:new Date().toISOString()}
    };
  }
  function load(){
    try{
      let s=JSON.parse(localStorage.getItem(KEY)||'{}');
      if(!s.years) s={activeYear:new Date().getFullYear()-1,years:{}};
      return s;
    }catch(e){ return {activeYear:new Date().getFullYear()-1,years:{}}; }
  }
  let store=load();
  function activeYear(){ return Number(store.activeYear || new Date().getFullYear()-1); }
  function yearData(year=activeYear()){
    store.years ||= {};
    store.years[year] ||= baseYear(year);
    return store.years[year];
  }
  function save(){ localStorage.setItem(KEY,JSON.stringify(store)); window.dispatchEvent(new CustomEvent('ksa:changed')); }
  function setYear(y){ store.activeYear=Number(y); yearData(y); save(); }
  function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,8); }
  function esc(v=''){return String(v).replace(/[&<>'"]/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[s]));}
  function download(name,text,type='application/json'){
    const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([text],{type})); a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }
  function backup(){
    download(`krypto-steuer-akademie-backup-${activeYear()}.json`,JSON.stringify(store,null,2));
  }
  async function restore(file){
    const text=await file.text(), parsed=JSON.parse(text);
    if(!parsed || !parsed.years) throw Error('Keine gültige Akademie-Sicherung.');
    store=parsed; save(); location.reload();
  }
  function counts(d=yearData()){
    return {exchanges:d.exchanges.length,wallets:d.wallets.length,imports:d.imports.length,raw:d.rawMovements.length,tx:d.transactions.length,bank:d.bank.length,docs:d.documents.length,reviews:d.reviews.filter(x=>!x.done).length};
  }
  window.KSA={KEY,uid,esc,store:()=>store,year:activeYear,data:yearData,save,setYear,backup,restore,download,counts};
})();
