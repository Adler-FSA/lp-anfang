(() => {
  'use strict';
  const STORE_KEY='lb-souveraenes-setup-v5';
  const LEGACY_KEYS=['lb-souveraenes-setup-v4','lb-souveraenes-setup-v3','lb-krypto-setup-v2'];
  const VERSION=5;
  const moduleMatch=location.pathname.match(/modul-(\d+)\.html/i);
  const moduleNo=moduleMatch?Number(moduleMatch[1]):null;
  const MODULE_TITLES={1:'Ausgangslage & Schutzprofil',2:'Zentrales Setup: Konten, Banken & Börsen',3:'Dezentrales Setup: Wallets & Schlüssel',4:'Reservesystem & Zugänglichkeit',5:'Sicherheitskonzept, Backups & Übergabe',6:'Alltag, Routinen & Warnsignale',7:'Feinschliff, Vereinfachung & Jahres-Review'};

  const emptyStore=()=>({version:VERSION,updatedAt:new Date().toISOString(),profile:{},modules:{},archive:[],navigation:{lastModule:null,lastOpenedAt:null}});
  const normalize=data=>{
    const store=data&&typeof data==='object'?data:emptyStore();
    store.version=VERSION; store.profile||={}; store.modules||={}; store.archive||=[]; store.navigation||={lastModule:null,lastOpenedAt:null}; store.updatedAt||=new Date().toISOString();
    return store;
  };
  const readStore=()=>{try{let raw=localStorage.getItem(STORE_KEY);if(!raw)for(const key of LEGACY_KEYS){raw=localStorage.getItem(key);if(raw)break;}const store=normalize(raw?JSON.parse(raw):emptyStore());if(!localStorage.getItem(STORE_KEY))localStorage.setItem(STORE_KEY,JSON.stringify(store));return store;}catch(_){return emptyStore();}};
  const writeStore=store=>{const normalized=normalize(store);normalized.updatedAt=new Date().toISOString();localStorage.setItem(STORE_KEY,JSON.stringify(normalized));return normalized;};
  const cleanText=value=>String(value||'').trim().replace(/\s+/g,' ');
  const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const isPresent=value=>value===true||cleanText(value).length>0;
  const fieldValue=el=>el.type==='checkbox'?el.checked:el.value;
  const setFieldValue=(el,value)=>{if(el.type==='checkbox')el.checked=value===true||value==='true'||value===1;else if(value!==undefined&&value!==null)el.value=value;};
  const labelFor=el=>{const wrap=el.closest('.field,.col,.checklist-item,.input-group,.form-group');const explicit=wrap?.querySelector('label,.label,h4,h3');const prior=el.previousElementSibling;return cleanText(el.dataset.outputLabel||explicit?.textContent||prior?.textContent||el.dataset.storageKey||'Eintrag').slice(0,180);};
  const sectionFor=el=>cleanText(el.dataset.outputSection||el.closest('.section')?.querySelector('h2,h3')?.textContent||`Modul ${moduleNo}`);
  const categoryFor=el=>{
    if(el.dataset.setupCategory)return el.dataset.setupCategory;
    const text=(labelFor(el)+' '+sectionFor(el)+' '+(el.dataset.storageKey||'')).toLowerCase();
    if(/seed|private|passwort|wiederherstell|backup|notfall|2fa|sicher|verlust|übergabe|vollmacht|erbfall/.test(text))return 'security';
    if(/termin|datum|review|prüf|test|routine|monat|quartal|jähr/.test(text))return 'review';
    if(/reflex|gedanke|notiz|was nimmst|gefühl|warum|mini-szenario/.test(text))return 'reflection';
    return 'core';
  };
  const requirementFor=el=>{
    if(el.dataset.setupRequirement)return el.dataset.setupRequirement;
    const category=categoryFor(el); const text=(labelFor(el)+' '+sectionFor(el)).toLowerCase();
    if(category==='security'&&/wiederherstell|backup|notfall|2fa|verlust|übergabe/.test(text))return 'critical';
    if(category==='core')return 'required';
    if(category==='review')return 'recommended';
    return 'optional';
  };
  const outputLevelFor=el=>el.dataset.output||(requirementFor(el)==='optional'?'appendix':'main');
  const normalizeField=f=>({category:f.category||'core',requirement:f.requirement||(f.category==='reflection'?'optional':'required'),output:f.output||(f.category==='reflection'?'appendix':'main'),...f});
  const moduleStats=(store,n)=>{
    const fields=Object.values(store.modules?.[n]?.fields||{}).map(normalizeField).filter(f=>f.output!=='none');
    const essential=fields.filter(f=>f.requirement==='critical'||f.requirement==='required');
    const recommended=fields.filter(f=>f.requirement==='recommended');
    const considered=[...essential,...recommended];
    const filled=fields.filter(f=>isPresent(f.value)).length;
    const essentialFilled=essential.filter(f=>isPresent(f.value)).length;
    const recommendedFilled=recommended.filter(f=>isPresent(f.value)).length;
    const pct=considered.length?Math.round(considered.filter(f=>isPresent(f.value)).length/considered.length*100):(fields.length?Math.round(filled/fields.length*100):0);
    let state='empty',label='Noch nicht begonnen';
    if(filled){state='working';label='In Bearbeitung';}
    if(essential.length&&essentialFilled===essential.length){state='review';label='Prüfen';}
    if((essential.length||recommended.length)&&essentialFilled===essential.length&&recommendedFilled===recommended.length){state='complete';label='Abgeschlossen';}
    return{total:fields.length,filled,pct,essentialTotal:essential.length,essentialFilled,recommendedTotal:recommended.length,recommendedFilled,state,label};
  };

  function fieldMeta(el){return{label:labelFor(el),section:sectionFor(el),type:el.type||el.tagName.toLowerCase(),category:categoryFor(el),requirement:requirementFor(el),output:outputLevelFor(el)};}
  function markNavigation(){if(!moduleNo)return;const store=readStore();store.navigation={lastModule:moduleNo,lastOpenedAt:new Date().toISOString()};const mod=store.modules[moduleNo]||={fields:{}};mod.openedAt||=new Date().toISOString();mod.lastOpenedAt=new Date().toISOString();writeStore(store);}

  function decorateField(el,meta){
    const host=el.closest('.field,.col,.checklist-item,.input-group,.form-group')||el.parentElement;if(!host||host.querySelector(':scope > .setup-field-badge'))return;
    const labels={critical:'Sicherheits-Kernpunkt',required:'Kernpunkt',recommended:'Empfehlung',optional:'Reflexion'};
    const badge=document.createElement('span');badge.className=`setup-field-badge setup-${meta.requirement}`;badge.textContent=labels[meta.requirement];host.insertBefore(badge,host.firstChild);
    if(meta.category==='security'){
      const hint=document.createElement('div');hint.className='setup-safe-hint';hint.textContent='Nur Status und organisatorische Lösung eintragen – niemals geheime Daten oder genaue Aufbewahrungsorte.';host.appendChild(hint);
    }
  }

  function migrateAndBind(){
    if(!moduleNo)return;
    const store=readStore();const mod=store.modules[moduleNo]||={fields:{},updatedAt:null};mod.fields||={};
    const prefix=document.body.dataset.storagePrefix||'';const fields=[...document.querySelectorAll('[data-storage-key]')];let seeded=false;
    fields.forEach(el=>{
      const key=el.dataset.storageKey;const meta=fieldMeta(el);decorateField(el,meta);const shared=mod.fields[key];
      if(shared&&shared.value!==undefined)setFieldValue(el,shared.value);else{let existing;try{existing=localStorage.getItem(prefix+key);}catch(_){}if(existing!==null&&existing!==undefined)setFieldValue(el,el.type==='checkbox'?existing==='true':existing);}
      if(!mod.fields[key]){mod.fields[key]={value:fieldValue(el),...meta,updatedAt:null};seeded=true;}else{mod.fields[key]={...normalizeField(mod.fields[key]),...meta};}
      const save=()=>{const latest=readStore();const target=latest.modules[moduleNo]||={fields:{}};target.fields||={};target.fields[key]={value:fieldValue(el),...meta,updatedAt:new Date().toISOString()};target.updatedAt=new Date().toISOString();latest.navigation={lastModule:moduleNo,lastOpenedAt:new Date().toISOString()};writeStore(latest);updateProgress();};
      el.addEventListener('input',save);el.addEventListener('change',save);
    });
    if(seeded)writeStore(store);updateProgress();
  }

  function updateProgress(){if(!moduleNo)return;const stats=moduleStats(readStore(),moduleNo);localStorage.setItem(`souveraen-progress-${moduleNo}`,String(stats.pct));document.querySelectorAll('.course-progress-fill').forEach(el=>el.style.width=stats.pct+'%');document.querySelectorAll('.course-progress-value').forEach(el=>el.textContent=`${stats.pct} % · ${stats.label} · ${stats.essentialFilled}/${stats.essentialTotal} Kernpunkte`);}

  function createPreviousWork(){
    if(!moduleNo||moduleNo<2||document.querySelector('.setup-previous-work'))return;
    const store=readStore();const rows=[];
    for(let n=1;n<moduleNo;n++){
      const stats=moduleStats(store,n);if(!stats.filled)continue;
      const safe=Object.values(store.modules?.[n]?.fields||{}).map(normalizeField).filter(f=>isPresent(f.value)&&f.output!=='none'&&f.category!=='security'&&f.requirement!=='optional').sort((a,b)=>String(b.updatedAt||'').localeCompare(String(a.updatedAt||''))).slice(0,3);
      rows.push(`<div class="setup-prev-row"><strong>Modul ${n}</strong><span>${stats.label} · ${stats.essentialFilled}/${stats.essentialTotal} Kernpunkte</span>${safe.length?`<div class="setup-prev-values">${safe.map(f=>`<p><b>${escapeHtml(f.label)}:</b> ${escapeHtml(String(f.value).slice(0,140))}</p>`).join('')}</div>`:''}</div>`);
    }
    if(!rows.length)return;const box=document.createElement('section');box.className='setup-previous-work';box.innerHTML=`<span class="setup-kicker">Deine bisherigen Vorarbeiten</span><h2>Darauf baut dieses Modul auf</h2><p>Relevante, nicht geheime Ergebnisse aus früheren Modulen werden hier übernommen. Du musst sie nicht erneut erfassen.</p>${rows.join('')}`;const note=document.querySelector('.setup-security-note');(note||document.querySelector('.hero'))?.insertAdjacentElement('afterend',box);
  }

  function installSynchronizedClear(){
    if(!moduleNo)return;const old=document.getElementById('clear-module-data');if(!old)return;const fresh=old.cloneNode(true);old.replaceWith(fresh);
    fresh.addEventListener('click',()=>{if(!confirm(`Wirklich alle Eintragungen aus Modul ${moduleNo} löschen? Vorher solltest du bei Bedarf eine Sicherung herunterladen.`))return;const store=readStore();delete store.modules[moduleNo];writeStore(store);document.querySelectorAll('[data-storage-key]').forEach(el=>{const prefix=document.body.dataset.storagePrefix||'';try{localStorage.removeItem(prefix+el.dataset.storageKey);}catch(_){}if(el.type==='checkbox')el.checked=false;else el.value='';});localStorage.setItem(`souveraen-progress-${moduleNo}`,'0');alert('Die Eintragungen dieses Moduls wurden aus dem gemeinsamen Setup und aus dem Modulspeicher gelöscht.');location.reload();});
  }

  function download(filename,text,type='application/json'){const blob=new Blob([text],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function exportData(){download(`mein-souveraenes-setup-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(readStore(),null,2));}
  function importData(file){const reader=new FileReader();reader.onload=()=>{try{const parsed=normalize(JSON.parse(reader.result));if(!parsed.modules)throw new Error('Ungültige Datei');download(`sicherung-vor-import-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(readStore(),null,2));writeStore(parsed);alert('Dein souveränes Setup wurde wiederhergestellt. Der vorherige Stand wurde automatisch gesichert.');location.reload();}catch(_){alert('Diese Sicherungsdatei konnte nicht gelesen werden.');}};reader.readAsText(file);}

  function createHub(){
    if(!moduleNo||document.getElementById('setupHub'))return;const style=document.createElement('style');style.textContent=`#setupHub{position:fixed;right:18px;bottom:18px;z-index:10000;font-family:Inter,system-ui,sans-serif}#setupHub .hub-main{border:0;border-radius:999px;padding:14px 18px;background:#132238;color:white;font-weight:900;box-shadow:0 14px 38px rgba(19,34,56,.28);cursor:pointer}#setupHub .hub-panel{display:none;position:absolute;right:0;bottom:58px;width:min(360px,calc(100vw - 30px));background:white;border:1px solid #dfe8ee;border-radius:20px;padding:17px;box-shadow:0 22px 60px rgba(19,34,56,.22)}#setupHub.open .hub-panel{display:block}#setupHub h3{margin:0 0 8px;color:#132238}#setupHub p{margin:0 0 12px;color:#64778b;font-size:13px;line-height:1.5}#setupHub .hub-actions{display:grid;gap:8px}#setupHub a,#setupHub .hub-action{border:0;border-radius:12px;padding:11px 12px;text-align:left;text-decoration:none;background:#f4f8fa;color:#132238;font-weight:800;cursor:pointer;font-size:13px}#setupHub input{display:none}.setup-security-note,.setup-previous-work{max-width:1060px;margin:18px auto;padding:16px 20px;border-radius:16px;line-height:1.55}.setup-security-note{border:1px solid #f0cadc;background:#fff4f9;color:#7b1745;font-weight:700}.setup-previous-work{border:1px solid #cde7e8;background:linear-gradient(135deg,#eefbfb,#fff);color:#233548}.setup-previous-work h2{margin:4px 0 6px;color:#132238}.setup-previous-work>p{margin:0 0 12px;color:#64778b}.setup-kicker{font-size:11px;text-transform:uppercase;letter-spacing:.08em;font-weight:900;color:#00878c}.setup-prev-row{display:grid;grid-template-columns:90px 1fr;gap:4px 12px;padding:12px 0;border-top:1px solid #dfe8ee}.setup-prev-values{grid-column:2}.setup-prev-values p{margin:4px 0;font-size:13px;color:#526579}.setup-field-badge{display:inline-flex;margin:0 0 8px;padding:5px 9px;border-radius:999px;font-size:10px;line-height:1;text-transform:uppercase;letter-spacing:.05em;font-weight:900}.setup-critical{background:#ffe6ef;color:#98113e}.setup-required{background:#e5f8f8;color:#007d82}.setup-recommended{background:#fff3d8;color:#7d5600}.setup-optional{background:#edf1f4;color:#526579}.setup-safe-hint{margin-top:8px;padding:9px 11px;border-radius:10px;background:#fff4f8;color:#7b1745;font-size:12px;line-height:1.45}@media(max-width:700px){.setup-prev-row{grid-template-columns:1fr}.setup-prev-values{grid-column:1}}@media print{#setupHub,.setup-security-note,.setup-previous-work,.setup-field-badge,.setup-safe-hint{display:none!important}}`;document.head.appendChild(style);
    const note=document.createElement('div');note.className='setup-security-note';note.innerHTML='<strong>Wichtige Sicherheitsregel:</strong> Trage niemals Seed-Wörter, private Schlüssel, Passwörter, vollständige Wiederherstellungscodes oder genaue Aufbewahrungsorte ein. Die Browserdaten und heruntergeladenen JSON-Sicherungen sind nicht automatisch verschlüsselt.';document.querySelector('.hero')?.insertAdjacentElement('afterend',note);
    const hub=document.createElement('div');hub.id='setupHub';hub.innerHTML=`<div class="hub-panel"><h3>Mein souveränes Setup</h3><p>${escapeHtml(MODULE_TITLES[moduleNo])}</p><div class="hub-actions"><a href="setup-ausgabe.html">📄 Gesamtausgabe öffnen</a><a href="index.html">▦ Zur Kursübersicht</a><button class="hub-action" id="setupExport">⬇ Setup sichern</button><label class="hub-action" for="setupImport">⬆ Sicherung wiederherstellen</label><input id="setupImport" type="file" accept="application/json,.json"></div></div><button class="hub-main" type="button">Mein Setup</button>`;document.body.appendChild(hub);hub.querySelector('.hub-main').addEventListener('click',()=>hub.classList.toggle('open'));hub.querySelector('#setupExport').addEventListener('click',exportData);hub.querySelector('#setupImport').addEventListener('change',e=>e.target.files[0]&&importData(e.target.files[0]));
  }

  window.LBSetup={read:readStore,write:writeStore,exportData,importData,isPresent,moduleStats,normalizeField,MODULE_TITLES};
  const start=()=>{markNavigation();migrateAndBind();installSynchronizedClear();createHub();createPreviousWork();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();