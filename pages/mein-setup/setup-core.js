(() => {
  'use strict';
  const STORE_KEY = 'lb-krypto-setup-v2';
  const VERSION = 2;
  const moduleMatch = location.pathname.match(/modul-(\d+)\.html/i);
  const moduleNo = moduleMatch ? Number(moduleMatch[1]) : null;

  const emptyStore = () => ({version: VERSION, updatedAt: new Date().toISOString(), modules: {}, archive: []});
  const readStore = () => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      const parsed = raw ? JSON.parse(raw) : emptyStore();
      parsed.modules ||= {};
      parsed.archive ||= [];
      return parsed;
    } catch (_) { return emptyStore(); }
  };
  const writeStore = store => {
    store.version = VERSION;
    store.updatedAt = new Date().toISOString();
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fieldValue = el => el.type === 'checkbox' ? el.checked : el.value;
  const setFieldValue = (el, value) => {
    if (el.type === 'checkbox') el.checked = value === true || value === 'true' || value === 1;
    else if (value !== undefined && value !== null) el.value = value;
  };
  const labelFor = el => {
    const section = el.closest('.section');
    const direct = el.closest('.field,.col,.checklist-item')?.querySelector('.label,label,h4,div');
    const prior = el.previousElementSibling;
    return (direct?.textContent || prior?.textContent || section?.querySelector('h2')?.textContent || el.dataset.storageKey || 'Eintrag').trim().replace(/\s+/g,' ').slice(0,180);
  };
  const sectionFor = el => el.closest('.section')?.querySelector('h2')?.textContent?.trim() || `Modul ${moduleNo}`;

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
        if (existing !== null && existing !== undefined) {
          setFieldValue(el, el.type === 'checkbox' ? existing === 'true' : existing);
        }
        mod.fields[key] = {
          value: fieldValue(el),
          label: labelFor(el),
          section: sectionFor(el),
          type: el.type || el.tagName.toLowerCase(),
          updatedAt: new Date().toISOString()
        };
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
    writeStore(store);
    updateProgress(fields);
  }

  function updateProgress(fields){
    if (!moduleNo) return;
    const relevant = fields.filter(el => !el.disabled && el.type !== 'hidden');
    const complete = relevant.filter(el => el.type === 'checkbox' ? el.checked : String(el.value || '').trim().length > 0).length;
    const pct = relevant.length ? Math.round(complete / relevant.length * 100) : 0;
    localStorage.setItem(`krypto-modern-progress-${moduleNo}`, String(pct));
    document.querySelectorAll('.course-progress-fill').forEach(el => el.style.width = pct + '%');
    document.querySelectorAll('.course-progress-value').forEach(el => el.textContent = pct + ' % ausgefüllt');
  }

  function download(filename, text, type='application/json'){
    const blob = new Blob([text], {type});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportData(){
    const store = readStore();
    download(`mein-krypto-setup-${new Date().toISOString().slice(0,10)}.json`, JSON.stringify(store, null, 2));
  }

  function importData(file){
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed || typeof parsed !== 'object' || !parsed.modules) throw new Error('Ungültige Datei');
        localStorage.setItem(STORE_KEY, JSON.stringify(parsed));
        alert('Dein Setup wurde wiederhergestellt. Die Seite wird jetzt neu geladen.');
        location.reload();
      } catch (_) { alert('Diese Sicherungsdatei konnte nicht gelesen werden.'); }
    };
    reader.readAsText(file);
  }

  function createHub(){
    if (!moduleNo || document.getElementById('setupHub')) return;
    const style = document.createElement('style');
    style.textContent = `
      #setupHub{position:fixed;right:18px;bottom:18px;z-index:10000;font-family:Inter,system-ui,sans-serif}
      #setupHub .hub-main{border:0;border-radius:999px;padding:14px 18px;background:#132238;color:white;font-weight:900;box-shadow:0 14px 38px rgba(19,34,56,.28);cursor:pointer}
      #setupHub .hub-panel{display:none;position:absolute;right:0;bottom:58px;width:min(330px,calc(100vw - 30px));background:white;border:1px solid #dfe8ee;border-radius:20px;padding:17px;box-shadow:0 22px 60px rgba(19,34,56,.22)}
      #setupHub.open .hub-panel{display:block} #setupHub h3{margin:0 0 8px;color:#132238} #setupHub p{margin:0 0 12px;color:#64778b;font-size:13px;line-height:1.5}
      #setupHub .hub-actions{display:grid;gap:8px} #setupHub a,#setupHub .hub-action{border:0;border-radius:12px;padding:11px 12px;text-align:left;text-decoration:none;background:#f4f8fa;color:#132238;font-weight:800;cursor:pointer;font-size:13px}
      #setupHub .hub-action:hover,#setupHub a:hover{background:#e5f8f8} #setupHub input{display:none}
      .setup-security-note{max-width:1060px;margin:18px auto;padding:14px 18px;border:1px solid #f0cadc;border-radius:16px;background:#fff4f9;color:#7b1745;font-weight:700;line-height:1.55}
      @media print{#setupHub,.setup-security-note{display:none!important}}
    `;
    document.head.appendChild(style);

    const note = document.createElement('div');
    note.className = 'setup-security-note';
    note.innerHTML = '<strong>Wichtige Sicherheitsregel:</strong> Trage hier niemals Seed-Wörter, private Schlüssel, Passwörter oder vollständige Wiederherstellungscodes ein. Dokumentiert wird nur die Organisation deines Setups.';
    const first = document.querySelector('.hero');
    if (first) first.insertAdjacentElement('afterend', note);

    const hub = document.createElement('div');
    hub.id = 'setupHub';
    hub.innerHTML = `<div class="hub-panel"><h3>Deine Setup-Zentrale</h3><p>Alle sieben Module speichern jetzt gemeinsam. Du kannst dein gesamtes Setup ansehen, sichern und wiederherstellen.</p><div class="hub-actions"><a href="setup-ausgabe.html">📄 Mein gesamtes Setup ansehen</a><a href="index.html">▦ Zur Kursübersicht</a><button class="hub-action" id="setupExport">⬇ Setup sichern</button><label class="hub-action" for="setupImport">⬆ Setup wiederherstellen</label><input id="setupImport" type="file" accept="application/json"></div></div><button class="hub-main" type="button">Mein Setup</button>`;
    document.body.appendChild(hub);
    hub.querySelector('.hub-main').addEventListener('click', () => hub.classList.toggle('open'));
    hub.querySelector('#setupExport').addEventListener('click', exportData);
    hub.querySelector('#setupImport').addEventListener('change', e => e.target.files[0] && importData(e.target.files[0]));
  }

  window.LBSetup = {read: readStore, write: writeStore, exportData};
  const start = () => { migrateAndBind(); createHub(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();