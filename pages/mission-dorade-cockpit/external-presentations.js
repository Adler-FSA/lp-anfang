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

    const destination=url+'?nocache='+Date.now();
    try{
      window.top.location.href=destination;
    }catch(error){
      window.location.href=destination;
    }
  },true);
})();