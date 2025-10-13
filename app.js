// Minimal-Core für Video/Slideshow + Ticker (Phase 1)

const q = s => document.querySelector(s);

// Page-Konfig laden (pages/<route>/page.json)
async function loadPageConfig() {
  // Route aus body[data-page] oder aus Pfad ableiten
  let route = document.body.getAttribute('data-page');
  if (!route) {
    const name = (location.pathname.split('/').pop() || 'index.html')
      .replace('.html','');
    route = name || 'index';
  }
  const url = `pages/${route}/page.json`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`page.json not found for ${route}`);
  return res.json();
}

// Ticker laden
async function loadTicker(src) {
  const el = q('#ticker');
  if (!el) return;
  if (!src) { el.classList.add('hidden'); return; }

  try {
    const res = await fetch(src, { cache: 'no-store' });
    if (!res.ok) throw 0;
    const data = await res.json();
    // simple join – Phase 1
    const items = (data.items || []).join('  •  ');
    el.textContent = items || '';
    if (!items) el.classList.add('hidden');
    else el.classList.remove('hidden');
  } catch {
    el.classList.add('hidden');
  }
}

// Fullscreen-Background initialisieren
async function mountBackground(bgCfg) {
  const wrap = q('#bg');
  if (!wrap) return;

  // aufräumen
  wrap.innerHTML = '';

  const mode = bgCfg?.mode || 'video';

  if (mode === 'video') {
    const src = bgCfg?.src;
    if (!src) return;
    const v = document.createElement('video');
    v.src = src;
    v.autoplay = true;
    v.loop = true;
    v.muted = true; // DSGVO: stumm bis Opt-in
    v.playsInline = true;
    wrap.appendChild(v);
    try { await v.play(); } catch {}
  } else if (mode === 'slideshow') {
    // ganz einfache Slideshow für Phase 1
    const setName = bgCfg?.set || 'sample-01';
    const setUrl = `library/sets/${setName}.json`;
    const res = await fetch(setUrl, { cache: 'no-store' });
    if (!res.ok) return;
    const set = await res.json();
    const slides = set.slides || [];
    let i = 0;

    const img = document.createElement('img');
    wrap.appendChild(img);

    const show = () => {
      if (!slides.length) return;
      const s = slides[i % slides.length];
      img.src = s.src;
      i++;
    };

    const interval = Math.max(3, Number(set.interval || 6)) * 1000;
    show();
    setInterval(show, interval);
  }
}

// Boot
(async () => {
  try {
    const cfg = await loadPageConfig();
    await mountBackground(cfg.background);

    const tickerEnabled = cfg.ticker?.enabled;
    const tickerSrc = cfg.ticker?.source;
    await loadTicker(tickerEnabled ? tickerSrc : null);
  } catch (e) {
    // Seite bleibt leer – ist ok für Phase 1
    console.warn(e);
  }
})();
