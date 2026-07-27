(() => {
  'use strict';
  const STORE_KEY = 'lb-souveraenes-setup-v4';
  const LEGACY_KEYS = ['lb-souveraenes-setup-v3','lb-krypto-setup-v2'];
  const VERSION = 4;
  const moduleMatch = location.pathname.match(/modul-(\d+)\.html/i);
  const moduleNo = moduleMatch ? Number(moduleMatch[1]) : null;

  const emptyStore = () => ({version:VERSION,updatedAt:new Date().toISOString(),profile:{},modules:{},archive:[],navigation:{lastModule:null,lastOpenedAt:null}});
  const normalize = data => {
    const store = data && typeof data === 'object' ? data : emptyStore();
    store.version = VERSION;
    store.profile ||= {};
    store.modules ||= {};
    store.archive ||= [];
    store.navigation ||= {lastModule:null,lastOpenedAt:null};
    store.updatedAt ||= new Date().toISOString();
    return store;
  };
  const readStore = () => {
    try {
      let raw = localStorage.getItem(STORE_KEY);
      if (!raw) for (const key of LEGACY_KEYS) { raw = localStorage.getItem(key); if (raw) break; }
      const store = normalize(raw ? JSON.parse(raw) : emptyStore());
      if (!localStorage.getItem(STORE_KEY)) localStorage.setItem(STORE_KEY,JSON.stringify(store));
      return store;
    } catch (_) { return emptyStore(); }
  };
  const writeStore = store => {
    const normalized = normalize(store);
    normalized.updatedAt = new Date().toISOString();
    localStorage.setItem(STORE_KEY,JSON.stringify(normalized));
    return normalized;
  };
  const fieldValue = el => el.type === 'checkbox' ? el.checked : el.value;
  const setFieldValue = (el,value) => {
    if (el.type === 'checkbox') el.checked = value === true || value === 'true' || value === 1;
    else if (value !== undefined && value !== null) el.value = value;
  };
  const cleanText = value => String(value || '').trim().replace(/\s+/g,' ');
  const isPresent = value => value === true || cleanText(value).length > 0;
  const labelFor = el => {
    const wrap = el.closest('.field,.col,.checklist-item,.input-group,.form-group');
    const explicit = wrap?.querySelector('label,.label,h4,h3');
    const prior = el.previousElementSibling;
    return cleanText(el.dataset.outputLabel || explicit?.textContent || prior?.textContent || el.dataset.storageKey || 'Eintrag').slice(0,180);
  };
  const sectionFor = el => cleanText(el.dataset.outputSection || el.closest('.section')?.querySelector('h2,h3')?.textContent || `Modul ${moduleNo}`);
  const categoryFor = el => {
    if (el.dataset.setupCategory) return el.dataset.setupCategory;
    const text = (labelFor(el)+' '+sectionFor(el)+' '+(el.dataset.storageKey||'')).toLowerCase();
    if (/seed|private|passwort|wiederherstell|backup|notfall|2fa|sicher|verlust|übergabe/.test(text)) return 'security';
    if (/termin|datum|review|prüf|test/.test(text)) return 'review';
    if (/reflex|gedanke|notiz|was nimmst|gefühl|warum/.test(text)) return 'reflection';
    return 'core';
  };
  const outputLevelFor = el => el.dataset.output || (categoryFor(el)==='reflection' ? 'appendix' : 'main');
  const moduleStats = (store,n) => {
    const fields = Object.values(store.modules?.[n]?.fields || {});
    const relevant = fields.filter(f => f.output !== 'none');
    const core = relevant.filter(f => f.category !== 'reflection');
    const coreFilled = core.filter(f => isPresent(f.value)).length;
    const allFilled = relevant.filter(f => isPresent(f.value)).length;
    const pct = relevant.length ? Math.round(allFilled/relevant.length*100) : 0;
    let state='empty',label='Noch nicht begonnen';
    if (allFilled) { state='working'; label='In Bearbeitung'; }
    if (core.length && coreFilled===core.length) { state='review'; label='Prüfen'; }
    if (relevant.length && allFilled===relevant.length) { state='complete'; label='Abgeschlossen'; }
    return {total:relevant.length,filled:allFilled,pct,coreTotal:core.length,coreFilled,state,label};
  };

  function markNavigation(){
    if (!moduleNo) return;
    const store=readStore();
    store.navigation={lastModule:moduleNo,lastOpenedAt:new Date().toISOString()};
    const mod=store.modules[moduleNo] ||= {fields:{}};
    mod.openedAt ||= new Date().toISOString();
    mod.lastOpenedAt=new Date().toISOString();
    writeStore(store);
  }

  function migrateAndBind(){
    if (!moduleNo) return;
    const store=readStore();
    const mod=store.modules[moduleNo] ||= {fields:{},updatedAt:null};
    mod.fields ||= {};
    const prefix=document.body.dataset.storagePrefix || '';
    const fields=[...document.querySelectorAll('[data-storage-key]')];
    fields.forEach(el => {
      const key=el.dataset.storageKey;
      const shared=mod.fields[key];
      if (shared && shared.value !== undefined) setFieldValue(el,shared.value);
      else {
        let existing;
        try { existing=localStorage.getItem(prefix+key); } catch (_) {}
        if (existing!==null && existing!==undefined) setFieldValue(el,el.type==='checkbox' ? existing==='true' : existing);
      }
      const save=()=>{
        const latest=readStore();
        const target=latest.modules[moduleNo] ||= {fields:{}};
        target.fields ||= {};
        target.fields[key]={value:fieldValue(el),label:labelFor(el),section:sectionFor(el),type:el.type||el.tagName.toLowerCase(),category:categoryFor(el),output:outputLevelFor(el),updatedAt:new Date().toISOString()};
        target.updatedAt=new Date().toISOString();
        latest.navigation={lastModule:moduleNo,lastOpenedAt:new Date().toISOString()};
        writeStore(latest);
        updateProgress();
      };
      el.addEventListener('input',save);
      el.addEventListener('change',save);
    });
    updateProgress();
  }

  function updateProgress(){
    if (!moduleNo) return;
    const stats=moduleStats(readStore(),moduleNo);
    localStorage.setItem(`souveraen-progress-${moduleNo}`,String(stats.pct));
    document.querySelectorAll('.course-progress-fill').forEach(el=>el.style.width=stats.pct+'%');
    document.querySelectorAll('.course-progress-value').forEach(el=>el.textContent=`${stats.pct} % · ${stats.label}`);
  }

  function createPreviousWork(){
    if (!moduleNo || moduleNo<2 || document.querySelector('.setup-previous-work')) return;
    const store=readStore();
    const rows=[];
    for(let n=1;n<moduleNo;n++){
      const stats=moduleStats(store,n);
      if(!stats.filled) continue;
      const mod=store.modules?.[n];
      const recent=Object.values(mod?.fields||{}).filter(f=>isPresent(f.value)&&f.output!=='none').sort((a,b)=>String(b.updatedAt||'').localeCompare(String(a.updatedAt||''))).slice(0,2);
      rows.push(`<div class="setup-prev-row"><strong>Modul ${n}</strong><span>${stats.label} · ${stats.coreFilled} von ${stats.coreTotal||stats.total} Kernpunkten</span>${recent.length?`<small>${recent.map(f=>escapeHtml(f.label)).join(' · ')}</small>`:''}</div>`);
    }
    if(!rows.length) return;
    const box=document.createElement('section');
    box.className='setup-previous-work';
    box.innerHTML=`<div><span class="setup-kicker">Deine bisherigen Vorarbeiten</span><h2>Darauf baut dieses Modul auf</h2><p>Die Angaben aus früheren Modulen bleiben im gemeinsamen Setup erhalten. Du musst sie nicht erneut erfassen.</p>${rows.join('')}</div>`;
    const note=document.querySelector('.setup-security-note');
    (note||document.querySelector('.hero'))?.insertAdjacentElement('afterend',box);
  }
  const escapeHtml = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function download(filename,text,type='application/json'){
    const blob=new Blob([text],{type}); const url=URL.createObjectURL(blob); const a=document.createElement('a');
    a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function exportData(){ download(`mein-souveraenes-setup-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(readStore(),null,2)); }
  function importData(file){
    const reader=new FileReader(); reader.onload=()=>{ try{
      const parsed=normalize(JSON.parse(reader.result)); if(!parsed.modules) throw new Error('Ungültige Datei');
      download(`sicherung-vor-import-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(readStore(),null,2));
      writeStore(parsed); alert('Dein souveränes Setup wurde wiederhergestellt. Der vorherige Stand wurde automatisch gesichert.'); location.reload();
    }catch(_){alert('Diese Sicherungsdatei konnte nicht gelesen werden.');}}; reader.readAsText(file);
  }

  function createHub(){
    if(!moduleNo||document.getElementById('setupHub')) return;
    const style=document.createElement('style');
    style.textContent=`#setupHub{position:fixed;right:18px;bottom:18px;z-index:10000;font-family:Inter,system-ui,sans-serif}#setupHub .hub-main{border:0;border-radius:999px;padding:14px 18px;background:#132238;color:white;font-weight:900;box-shadow:0 14px 38px rgba(19,34,56,.28);cursor:pointer}#setupHub .hub-panel{display:none;position:absolute;right:0;bottom:58px;width:min(350px,calc(100vw - 30px));background:white;border:1px solid #dfe8ee;border-radius:20px;padding:17px;box-shadow:0 22px 60px rgba(19,34,56,.22)}#setupHub.open .hub-panel{display:block}#setupHub h3{margin:0 0 8px;color:#132238}#setupHub p{margin:0 0 12px;color:#64778b;font-size:13px;line-height:1.5}#setupHub .hub-actions{display:grid;gap:8px}#setupHub a,#setupHub .hub-action{border:0;border-radius:12px;padding:11px 12px;text-align:left;text-decoration:none;background:#f4f8fa;color:#132238;font-weight:800;cursor:pointer;font-size:13px}#setupHub .hub-action:hover,#setupHub a:hover{background:#e5f8f8}#setupHub input{display:none}.setup-security-note,.setup-previous-work{max-width:1060px;margin:18px auto;padding:16px 20px;border-radius:16px;line-height:1.55}.setup-security-note{border:1px solid #f0cadc;background:#fff4f9;color:#7b1745;font-weight:700}.setup-previous-work{border:1px solid #cde7e8;background:linear-gradient(135deg,#eefbfb,#fff);color:#233548}.setup-previous-work h2{margin:4px 0 6px;color:#132238}.setup-previous-work p{margin:0 0 12px;color:#64778b}.setup-kicker{font-size:11px;text-transform:uppercase;letter-spacing:.08em;font-weight:900;color:#00878c}.setup-prev-row{display:grid;grid-template-columns:90px 1fr;gap:4px 12px;padding:9px 0;border-top:1px solid #dfe8ee}.setup-prev-row small{grid-column:2;color:#64778b}@media(max-width:700px){.setup-prev-row{grid-template-columns:1fr}.setup-prev-row small{grid-column:1}}@media print{#setupHub,.setup-security-note,.setup-previous-work{display:none!important}}`;
    document.head.appendChild(style);
    const note=document.createElement('div'); note.className='setup-security-note';
    note.innerHTML='<strong>Wichtige Sicherheitsregel:</strong> Trage niemals Seed-Wörter, private Schlüssel, Passwörter, vollständige Wiederherstellungscodes oder genaue Aufbewahrungsorte ein. Gespeichert werden organisatorische Angaben im Browserprofil. Diese Daten sind nicht automatisch verschlüsselt und können beim Löschen der Browserdaten verloren gehen.';
    document.querySelector('.hero')?.insertAdjacentElement('afterend',note);
    const hub=document.createElement('div'); hub.id='setupHub';
    hub.innerHTML=`<div class="hub-panel"><h3>Mein souveränes Setup</h3><p>Fiat-Strukturen und dezentrale Möglichkeiten werden in einer gemeinsamen, lokal gespeicherten Gesamtausgabe verbunden.</p><div class="hub-actions"><a href="setup-ausgabe.html">📄 Gesamtausgabe öffnen</a><a href="index.html">▦ Zur Kursübersicht</a><button class="hub-action" id="setupExport">⬇ Setup sichern</button><label class="hub-action" for="setupImport">⬆ Sicherung wiederherstellen</label><input id="setupImport" type="file" accept="application/json,.json"></div></div><button class="hub-main" type="button">Mein Setup</button>`;
    document.body.appendChild(hub);
    hub.querySelector('.hub-main').addEventListener('click',()=>hub.classList.toggle('open'));
    hub.querySelector('#setupExport').addEventListener('click',exportData);
    hub.querySelector('#setupImport').addEventListener('change',e=>e.target.files[0]&&importData(e.target.files[0]));
  }

  window.LBSetup={read:readStore,write:writeStore,exportData,importData,isPresent,moduleStats};
  const start=()=>{markNavigation();migrateAndBind();createHub();createPreviousWork();};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();