// Minimal-Core: Hintergrund (Video, Playlist, Slideshow, YouTube) + Ticker

const q = s => document.querySelector(s);

document.addEventListener('DOMContentLoaded', init);

async function init() {
  const cfg = await loadPageConfig();                 // pages/<route>/page.json
  await Promise.all([
    loadBackground(cfg.background || {}),
    loadTicker(cfg.ticker && cfg.ticker.enabled ? cfg.ticker.source : null),
  ]);
}

async function loadPageConfig() {
  let route = document.body.getAttribute('data-page');
  if (!route) {
    const name = (location.pathname.split('/').pop() || 'index.html').replace('.html', '');
    route = name || 'index';
  }
  const url = `pages/${route}/page.json`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`page.json not found for ${route}`);
  return res.json();
}

async function loadTicker(src) {
  const el = q('#ticker');
  if (!el || !src) { if (el) el.classList.add('hidden'); return; }

  try {
    const res = await fetch(src, { cache: 'no-store' });
    if (!res.ok) throw 0;
    const data = await res.json();
    const items = (data.items || []).map(i => (typeof i === 'string' ? i : i.text)).filter(Boolean);
    el.textContent = items.join(' • ');
    el.classList.remove('hidden');
  } catch {
    el.classList.add('hidden');
  }
}

async function loadBackground(bg) {
  const host = q('#bg');
  if (!host) return;
  host.innerHTML = '';

  switch (bg.mode) {
    case 'video': {
      mountVideo(host, [bg.src], { loop: bg.loop !== false });
      break;
    }
    case 'playlist': { // JSON mit {items:[{src, poster?},...], loop?, autoplay?, muted?}
      const res = await fetch(bg.src, { cache: 'no-store' });
      const data = await res.json();
      const sources = (data.items || []).map(i => i.src);
      mountVideo(host, sources, data);
      break;
    }
    case 'slideshow': { // library/sets/<name>.json
      const url = `library/sets/${bg.set}.json`;
      const res = await fetch(url, { cache: 'no-store' });
      const set = await res.json();
      playSlideshow(host, set);
      break;
    }
    case 'youtube': {    // { mode:"youtube", id:"<VIDEO_ID>" }
      mountYouTube(host, bg.id);
      break;
    }
    default:
      // leer lassen
      break;
  }
}

function mountVideo(container, sources, opts = {}) {
  if (!sources || !sources.length) return;
  const v = document.createElement('video');
  Object.assign(v.style, { position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' });
  v.playsInline = true;
  v.muted = opts.muted ?? true;          // Autoplay-Schutz
  v.autoplay = opts.autoplay ?? true;
  v.loop = opts.loop ?? true;
  v.id = 'bgVideo';

  let i = 0;
  const setSrc = () => {
    v.src = sources[i];
    v.load();
    v.play().catch(()=>{ /* Autoplay blockiert → Nutzerklick nötig */ });
  };
  v.addEventListener('ended', () => {
    if (!v.loop && sources.length > 1) {
      i = (i + 1) % sources.length;
      setSrc();
    }
  });

  container.appendChild(v);
  setSrc();
}

function playSlideshow(container, set) {
  const slides = set.slides || [];
  if (!slides.length) return;

  const img = document.createElement('img');
  Object.assign(img.style, {
    position:'absolute', inset:0, width:'100%', height:'100%',
    objectFit:'cover', opacity:0, transition:'opacity 800ms ease'
  });

  container.appendChild(img);

  const delay = Math.max(3, set.interval || 6) * 1000;
  let i = 0;

  const show = n => {
    const s = slides[n] || {};
    img.style.opacity = 0;
    // kleines Delay, damit der Fade sichtbar ist
    setTimeout(() => { img.src = s.src; img.alt = s.alt || ''; img.style.opacity = 1; }, 50);
  };

  show(i);
  setInterval(() => { i = (i + 1) % slides.length; show(i); }, delay);
}

function mountYouTube(container, id) {
  if (!id) return;
  const iframe = document.createElement('iframe');
  iframe.allow = 'autoplay; fullscreen; picture-in-picture';
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&modestbranding=1&playsinline=1`;
  Object.assign(iframe.style, { position:'absolute', inset:0, width:'100%', height:'100%', border:'0' });
  container.appendChild(iframe);
}
