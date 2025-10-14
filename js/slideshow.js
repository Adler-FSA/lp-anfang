// FSA Slideshow – sanfter Übergang ohne Schwarzblende
(function(){
  const defaults = {
    interval: 8000,     // Zeit zwischen Bildern
    fadeTime: 2000,     // Dauer Übergang
    path: 'library/images/pool-live/',
    count: 48,
    pattern: i => `slide-${String(i).padStart(2,'0')}.jpg`
  };

  let cfg = {...defaults};
  let idx = 1;
  let active = 0;
  const slides = [];

  // Zwei Layer erzeugen
  const container = document.getElementById('slideshow');
  for (let i = 0; i < 2; i++) {
    const layer = document.createElement('div');
    layer.style.position = 'absolute';
    layer.style.top = '0';
    layer.style.left = '0';
    layer.style.width = '100%';
    layer.style.height = '100%';
    layer.style.backgroundSize = 'cover';
    layer.style.backgroundPosition = 'center';
    layer.style.transition = `opacity ${cfg.fadeTime}ms ease-in-out`;
    layer.style.opacity = i === 0 ? '1' : '0';
    container.appendChild(layer);
    slides.push(layer);
  }

  // Preload Bilder
  for (let i = 1; i <= cfg.count; i++) {
    const img = new Image();
    img.src = cfg.path + cfg.pattern(i);
  }

  function nextImage() {
    idx = (idx % cfg.count) + 1;
    const nextLayer = 1 - active;
    slides[nextLayer].style.backgroundImage = `url(${cfg.path}${cfg.pattern(idx)})`;
    slides[nextLayer].style.opacity = '1';
    slides[active].style.opacity = '0';
    active = nextLayer;
  }

  // Start mit erstem Bild
  slides[0].style.backgroundImage = `url(${cfg.path}${cfg.pattern(idx)})`;
  setInterval(nextImage, cfg.interval);
})();
