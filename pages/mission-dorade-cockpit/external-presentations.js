(()=>{
  const targets={
    'Geführte Mission-Dorade-Präsentation':'https://adler-fsa.github.io/lp-anfang/pages/mission-dorade-live-neuer-tab/index.html',
    'Guided Mission Dorade Presentation':'https://adler-fsa.github.io/lp-anfang/pages/mission-dorade-live-neuer-tab/index.html',
    'Schnellstart Mission Dorade':'https://adler-fsa.github.io/lp-anfang/pages/schnellstart-mission-dorade-neuer-tab/index.html',
    'Mission Dorade Quick Start':'https://adler-fsa.github.io/lp-anfang/pages/schnellstart-mission-dorade-neuer-tab/index.html'
  };

  document.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button) return;
    const card=button.closest('.card');
    if(!card) return;
    const title=(card.querySelector('h3')?.textContent||'').trim();
    const url=targets[title];
    if(!url) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const opened=window.open(url+'?nocache='+Date.now(),'_blank','noopener');
    if(!opened) window.location.href=url+'?nocache='+Date.now();
  },true);
})();
