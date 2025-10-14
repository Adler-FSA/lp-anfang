// FSA Slideshow – sanfter Bildwechsel mit Preload
(function(){
  const defaults = {
    interval: 8000, // 8 Sekunden Anzeigezeit
    fadeTime: 2000, // 2 Sekunden weicher Übergang
    path: 'library/images/pool-live/',
    count: 48,
    pattern: i => `slide-${String(i).padStart(2,'0')}.jpg`
  };

  let cfg = {...defaults};
  let idx = 1;
  const el = document.getElementById('slideshow');

  // Preload: alle Bilder schon mal anstoßen
  for (let i = 1; i <= cfg.count; i++) {
    const img = new Image();
    img.src = cfg.path + cfg.pattern(i);
  }

  function setBg(i){
    const nextImg = `url(${cfg.path}${cfg.pattern(i)})`;
    el.style.opacity = 0; // Ausblenden
    setTimeout(()=>{
      el.style.backgroundImage = nextImg;
      el.style.opacity = 1; // Einblenden
    }, cfg.fadeTime);
  }

  function start(){
    el.style.transition = `opacity ${cfg.fadeTime}ms ease-in-out`;
    el.style.backgroundImage = `url(${cfg.path}${cfg.pattern(idx)})`;
    el.style.opacity = 1;
    setInterval(()=>{
      idx = (idx % cfg.count) + 1;
      setBg(idx);
    }, cfg.interval);
  }

  // Optional: config.json laden
  fetch('config.json', {cache:'no-store'})
    .then(r => r.ok ? r.json() : defaults)
    .then(j => { cfg = {...defaults, ...j}; })
    .catch(()=>{})
    .finally(start);
})();
