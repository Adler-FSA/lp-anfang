// library/js/topbar-patch.js
(function(){
  const nocache = "20251027";
  const head = document.head || document.getElementsByTagName('head')[0];

  // Basis-Stil (immer oben fix)
  const css = document.createElement("style");
  css.textContent = `
    #fsa-topbar {
      position: fixed;
      top: 0; left: 0; width: 100%;
      z-index: 9999;
      background: rgba(11,15,20,0.96);
      border-bottom: 1px solid rgba(212,175,55,0.15);
      box-shadow: 0 2px 10px rgba(0,0,0,0.35);
      padding: 10px 0;
      text-align: center;
      backdrop-filter: blur(8px);
    }
  `;
  head.appendChild(css);

  // Container einfügen (oben im Body)
  const topbar = document.createElement("div");
  topbar.id = "fsa-topbar";
  document.body.prepend(topbar);

  // Scripte dynamisch nachladen und in Reihenfolge einfügen
  const scripts = [
    `library/js/menu.js?nocache=${nocache}`,
    `library/js/lang-switcher.js?nocache=${nocache}`,
    `library/js/music-button.js?nocache=${nocache}`
  ];

  function loadNext(i){
    if(i >= scripts.length) return;
    const s = document.createElement("script");
    s.src = scripts[i];
    s.onload = ()=>loadNext(i+1);
    topbar.appendChild(s);
  }
  loadNext(0);

  // Platz freihalten, damit die Seite nicht vom fixen Menü überlappt wird
  const spacer = document.createElement("div");
  spacer.style.height = "80px";
  document.body.insertBefore(spacer, document.body.firstChild.nextSibling);
})();
