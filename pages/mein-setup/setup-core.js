(() => {
  'use strict';
  const STORE_KEY = 'lb-souveraenes-setup-v3';
  const LEGACY_KEYS = ['lb-krypto-setup-v2'];
  const VERSION = 3;
  const moduleMatch = location.pathname.match(/modul-(\d+)\.html/i);
  const moduleNo = moduleMatch ? Number(moduleMatch[1]) : null;

  const emptyStore = () => ({version: VERSION, updatedAt: new Date().toISOString(), profile:{}, modules:{}, archive:[]});
  const normalize = data => {
    const store = data && typeof data === 'object' ? data : emptyStore();
    store.version = VERSION;
    store.profile ||= {};
    store.modules ||= {};
    store.archive ||= [];
    store.updatedAt ||= new Date().toISOString();
    return store;
  };
  const readStore = () => {
    try {
      let raw = localStorage.getItem(STORE_KEY);
      if (!raw) {
        for (const key of LEGACY_KEYS) {
          raw = localStorage.getItem(key);
          if (raw) break;
        }
      }
      const store = normalize(raw ? JSON.parse(raw) : emptyStore());
      if (!localStorage.getItem(STORE_KEY)) localStorage.setItem(STORE_KEY, JSON.stringify(store));
      return store;
    } catch (_) { return emptyStore(); }
  };
  const writeStore = store => {
    const normalized = normalize(store);
    normalized.updatedAt = new Date().toISOString();
    localStorage.setItem(STORE_KEY, JSON.stringify(normalized));
    return normalized;
  };
  const fieldValue = el => el.type === 'checkbox' ? el.checked : el.value;
  const setFieldValue = (el, value) => {
    if (el.type === 'checkbox') el.checked = value === true || value === 'true' || value === 1;
    else if (value !== undefined && value !== null) el.value = value;
  };
  const cleanText = value => String(value || '').trim().replace(/\s+/g, ' ');
  const labelFor = el => {
    const wrap = el.closest('.field,.col,.checklist-item,.input-group,.form-group');
    const explicit = wrap?.querySelector('label,.label,h4,h3');
    const prior = el.previousElementSibling;
    return cleanText(el.dataset.outputLabel || explicit?.textContent || prior?.textContent || el.dataset.storageKey || 'Eintrag').slice(0,180);
  };
  const sectionFor = el => cleanText(el.dataset.outputSection || el.closest('.section')?.querySelector('h2,h3')?.textContent || `Modul ${moduleNo}`);
  const isPresent = value => value === true || cleanText(value).length > 0;

  function migrateAndBind(){
    if (!moduleNo) return;
    const store = readStore();
    const mod = store.modules[moduleNo] ||= {fields:{}, updatedAt:null};
    mod.fields ||= {};
    const prefix = document.body.dataset.storagePrefix || '';
    const fields = [...document.querySelectorAll('[data-storage-key]')];

    fields.forEach(el => {
      const key = el.dataset.storageKey;
      const shared = mod.fields[key];
      if (shared && shared.value !== undefined) {
        setFieldValue(el, shared.value);
      } else {
        let existing;
        try { existing = localStorage.getItem(prefix + key); } catch (_) {}
        if (existing !== null && existing !== undefined) setFieldValue(el, el.type === 'checkbox' ? existing === 'true' : existing);
      }
      const save = () => {
        const latest = readStore();
        const target = latest.modules[moduleNo] ||= {fields:{}};
        target.fields ||= {};
        target.fields[key] = {
          value: fieldValue(el),
          label: labelFor(el),
          section: sectionFor(el),
          type: el.type || el.tagName.toLowerCase(),
          updatedAt: new Date().toISOString()
        };
        target.updatedAt = new Date().toISOString();
        writeStore(latest);
        updateProgress(fields);
      };
      el.addEventListener('input', save);
      el.addEventListener('change', save);
    });
    updateProgress(fields);
  }

  function updateProgress(fields){
    if (!moduleNo) return;
    const relevant = fields.filter(el => !el.disabled && el.type !== 'hidden');
    const complete = relevant.filter(el => isPresent(fieldValue(el))).length;
    const pct = relevant.length ? Math.round(complete / relevant.length * 100) : 0;
    localStorage.setItem(`krypto-modern-progress-${moduleNo}`, String(pct));
    localStorage.setItem(`souveraen-progress-${moduleNo}`, String(pct));
    document.querySelectorAll('.course-progress-fill').forEach(el => el.style.width = pct + '%');
    document.querySelectorAll('.course-progress-value').forEach(el => el.textContent = pct + ' % ausgefüllt');
  }

  function download(filename, text, type='application/json'){
    const blob = new Blob([text], {type});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function exportData(){
    const store = readStore();
    download(`mein-souveraenes-setup-${new Date().toISOString().slice(0,10)}.json`, JSON.stringify(store, null, 2));
  }
  function importData(file){
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = normalize(JSON.parse(reader.result));
        if (!parsed.modules) throw new Error('Ungültige Datei');
        const backup = readStore();
        download(`sicherung-vor-import-${new Date().toISOString().slice(0,10)}.json`, JSON.stringify(backup, null, 2));
        writeStore(parsed);
        alert('Dein souveränes Setup wurde wiederhergestellt. Vorher wurde automatisch eine Sicherung heruntergeladen.');
        location.reload();
      } catch (_) { alert('Diese Sicherungsdatei konnte nicht gelesen werden.'); }
    };
    reader.readAsText(file);
  }

  function createHub(){
    if (!moduleNo || document.getElementById('setupHub')) return;
    const style = document.createElement('style');
    style.textContent = `#setupHub{position:fixed;right:18px;bottom:18px;z-index:10000;font-family:Inter,system-ui,sans-serif}#setupHub .hub-main{border:0;border-radius:999px;padding:14px 18px;background:#132238;color:white;font-weight:900;box-shadow:0 14px 38px rgba(19,34,56,.28);cursor:pointer}#setupHub .hub-panel{display:none;position:absolute;right:0;bottom:58px;width:min(350px,calc(100vw - 30px));background:white;border:1px solid #dfe8ee;border-radius:20px;padding:17px;box-shadow:0 22px 60px rgba(19,34,56,.22)}#setupHub.open .hub-panel{display:block}#setupHub h3{margin:0 0 8px;color:#132238}#setupHub p{margin:0 0 12px;color:#64778b;font-size:13px;line-height:1.5}#setupHub .hub-actions{display:grid;gap:8px}#setupHub a,#setupHub .hub-action{border:0;border-radius:12px;padding:11px 12px;text-align:left;text-decoration:none;background:#f4f8fa;color:#132238;font-weight:800;cursor:pointer;font-size:13px}#setupHub .hub-action:hover,#setupHub a:hover{background:#e5f8f8}#setupHub input{display:none}.setup-security-note{max-width:1060px;margin:18px auto;padding:14px 18px;border:1px solid #f0cadc;border-radius:16px;background:#fff4f9;color:#7b1745;font-weight:700;line-height:1.55}@media print{#setupHub,.setup-security-note{display:none!important}}`;
    document.head.appendChild(style);
    const note = document.createElement('div');
    note.className = 'setup-security-note';
    note.innerHTML = '<strong>Wichtige Sicherheitsregel:</strong> Trage niemals Seed-Wörter, private Schlüssel, Passwörter oder vollständige Wiederherstellungscodes ein. Dokumentiert wird ausschließlich die Organisation deines souveränen Setups.';
    const first = document.querySelector('.hero');
    if (first) first.insertAdjacentElement('afterend', note);
    const hub = document.createElement('div');
    hub.id = 'setupHub';
    hub.innerHTML = `<div class="hub-panel"><h3>Mein souveränes Setup</h3><p>Fiat-Strukturen und dezentrale Möglichkeiten werden in einer gemeinsamen, lokal gespeicherten Gesamtausgabe verbunden.</p><div class="hub-actions"><a href="setup-ausgabe.html">📄 Gesamtausgabe öffnen</a><a href="index.html">▦ Zur Kursübersicht</a><button class="hub-action" id="setupExport">⬇ Setup sichern</button><label class="hub-action" for="setupImport">⬆ Sicherung wiederherstellen</label><input id="setupImport" type="file" accept="application/json,.json"></div></div><button class="hub-main" type="button">Mein Setup</button>`;
    document.body.appendChild(hub);
    hub.querySelector('.hub-main').addEventListener('click', () => hub.classList.toggle('open'));
    hub.querySelector('#setupExport').addEventListener('click', exportData);
    hub.querySelector('#setupImport').addEventListener('change', e => e.target.files[0] && importData(e.target.files[0]));
  }

  window.LBSetup = {read: readStore, write: writeStore, exportData, importData, isPresent};
  const start = () => { migrateAndBind(); createHub(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();