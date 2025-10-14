// FSA Slideshow – fester Pool: /library/images/pool-live/
// Lädt optional config.json, fällt sonst auf Defaults zurück.
(function(){
  const defaults = {
    interval: 5000, // ms
    path: 'library/images/pool-live/',
    count: 48,
    pattern: i => `slide-${String(i).padStart(2,'0')}.jpg`
  };

  let cfg = {...defaults};
  let idx = 1;
  let timer = null;

  function setBg(i){
    const el = document.getElementById('slideshow');
    if (!el) return;
    el.style.backgroundImage = `url(${cfg.path}${cfg.pattern(i)})`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.style.height = '100vh';
    el.style.width = '100%';
    el.style.transition = 'background-image 1s ease-in-out';
  }

  function start(){
    setBg(idx);
    if (timer) clearInterval(timer);
    timer = setInterval(()=>{
      idx = (idx % cfg.count) + 1;
      setBg(idx);
    }, cfg.interval);
  }

  fetch('config.json', {cache:'no-store'})
    .then(r => r.ok ? r.json() : defaults)
    .then(j => { cfg = {...defaults, ...j}; })
    .catch(()=>{})
    .finally(start);
})();
