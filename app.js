(() => {
  const PAGES = ["index","campus","grundkurs","krypto","office"];

  const pageKey = (() => {
    const file = (location.pathname.split("/").pop() || "index.html");
    const base = file.replace(".html","");
    return PAGES.includes(base) ? base : "index";
  })();

  const cfgUrl = `pages/${pageKey}/page.json`;
  const $ = (s) => document.querySelector(s);

  async function j(url){ const r = await fetch(url); if(!r.ok) throw new Error(`${url} ${r.status}`); return r.json(); }

  function renderTicker(items){
    if(!items || !items.length) return;
    const wrap = $("#ticker"); wrap.innerHTML = "";
    const track = document.createElement("div");
    track.className = "track";
    track.textContent = items.join("   •   ");
    wrap.appendChild(track);
  }

  async function setup(){
    let cfg;
    try { cfg = await j(cfgUrl); }
    catch(e){ console.error("config load failed", e); return; }

    // Background
    const bg = cfg.background || {};
    const host = $("#bg");

    if(bg.mode === "video"){
      const v = document.createElement("video");
      v.autoplay = true; v.loop = true; v.muted = true; v.playsInline = true; v.src = bg.src;
      v.addEventListener("error", () => { host.style.background = "#111"; });
      host.appendChild(v);
    }
    else if(bg.mode === "playlist"){
      try {
        const pl = await j(bg.src);
        const items = (pl.items || []).map(x => ({src:x.src, poster:x.poster}));
        if(items.length){
          let i = 0;
          const v = document.createElement("video");
          v.autoplay = true; v.loop = false; v.muted = true; v.playsInline = true;
          function load(idx){
            v.src = items[idx].src;
            if(items[idx].poster) v.poster = items[idx].poster;
            v.play().catch(()=>{});
          }
          v.addEventListener("ended", () => { i = (i+1) % items.length; load(i); });
          load(0);
          host.appendChild(v);
        }
      } catch(e){ console.error("playlist load failed", e); }
    }
    else if(bg.mode === "slideshow"){
      try {
        const setName = bg.set || "sample-01";
        const set = await j(`library/sets/${setName}.json`);
        const slides = set.slides || [];
        if(slides.length){
          let i = 0;
          const a = document.createElement("img");
          const b = document.createElement("img");
          a.className = "slide is-active"; b.className = "slide";
          host.append(a,b);
          a.src = slides[0].src; a.alt = slides[0].alt || "";
          const interval = (set.interval || 6) * 1000;

          function next(){
            const curr = (i % 2) ? b : a;
            const nxt  = (i % 2) ? a : b;
            const s = slides[(i+1) % slides.length];
            nxt.src = s.src; nxt.alt = s.alt || "";
            requestAnimationFrame(() => { curr.classList.remove("is-active"); nxt.classList.add("is-active"); });
            i++; setTimeout(next, interval);
          }
          setTimeout(next, interval);
        }
      } catch(e){ console.error("slideshow load failed", e); }
    }

    // Ticker
    if(cfg.ticker?.enabled){
      try { const t = await j(cfg.ticker.source); renderTicker(t.items || []); }
      catch(e){ console.error("ticker load failed", e); }
    }
  }

  document.addEventListener("DOMContentLoaded", setup);
})();
