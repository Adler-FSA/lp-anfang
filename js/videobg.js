// FSA Video Background – Basisversion
(function(){
  let videoConfig = null;

  fetch('config.json', {cache: 'no-store'})
    .then(r => r.ok ? r.json() : {})
    .then(conf => {
      if (conf.video && conf.video.src) {
        videoConfig = conf.video;
        initVideo();
      }
    })
    .catch(()=>{});

  function initVideo(){
    const bg = document.createElement('video');
    bg.src = videoConfig.src;
    bg.autoplay = true;
    bg.loop = true;
    bg.muted = true;
    bg.playsInline = true;

    bg.style.position = 'absolute';
    bg.style.top = '0';
    bg.style.left = '0';
    bg.style.width = '100%';
    bg.style.height = '100%';
    bg.style.objectFit = 'cover';
    bg.style.zIndex = '-1';

    document.body.prepend(bg);
  }
})();