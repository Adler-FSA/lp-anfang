// FSA Slideshow – sanftes Crossfade
(function(){
  const defaults = {
    interval: 8000,
    fadeTime: 2000,
    path: 'library/images/pool-live/',
    defaultShow: 'bodensee'
  };
  let cfg = {...defaults};
  let slidesData = [];
  let idx = 0;
  let active = 0;
  const layers = [];
  const container = document.getElementById('slideshow');
  let showName = cfg.defaultShow;

  fetch('config.json', {cache:'no-store'})
    .then(r => r.ok ? r.json() : {})
    .then(conf => {
      if (conf.interval) cfg.interval = conf.interval;
      if (conf.fadeTime) cfg.fadeTime = conf.fadeTime;
      if (conf.show) showName = conf.show;
    })
    .catch(()=>{})
    .finally(loadShow);

  function loadShow(){
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
      layers.push(layer);
    }

    fetch(`shows/${showName}.json`, {cache:'no-store'})
      .then(r => r.ok ? r.json() : {slides: []})
      .then(data => {
        slidesData = data.slides || [];
        if (slidesData.length > 0) startSlideshow();
      })
      .catch(()=>{});
  }

  function nextImage() {
    idx = (idx + 1) % slidesData.length;
    const nextLayer = 1 - active;
    layers[nextLayer].style.backgroundImage = `url(${cfg.path}${slidesData[idx]})`;
    layers[nextLayer].style.opacity = '1';
    layers[active].style.opacity = '0';
    active = nextLayer;
  }

  function preloadSlides(){
    slidesData.forEach(name => {
      const img = new Image();
      img.src = cfg.path + name;
    });
  }

  function startSlideshow(){
    layers[0].style.backgroundImage = `url(${cfg.path}${slidesData[0]})`;
    preloadSlides();
    setInterval(nextImage, cfg.interval);
  }
})();