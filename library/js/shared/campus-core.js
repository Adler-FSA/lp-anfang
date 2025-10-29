/* ==========================================================================
   FSA Campus – Globaler Core-Loader (v1.0)
   Pfad: /library/js/shared/campus-core.js
   Aufgabe:
   • Erkennt automatisch, welche Campus-Seite aktiv ist (Social, Community, Mentor, Souveränität)
   • Lädt automatisch die vier zugehörigen Text-Container
   • Fügt das Campus-Menü (campus-menu.js) zwischen Container 2 und 3 ein
   • Arbeitet mit globalen Modulen (menu.js, lang-switcher.js, music-button.js)
   • Nutzt ?nocache=<timestamp> für jede JS-Datei
   ========================================================================== */

(function FsaCampusCore(){
  // ------- Hilfsfunktionen -------
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      const s = document.createElement('script');
      const ts = Date.now();
      s.src = `${src}${src.includes('?')?'&':'?'}nocache=${ts}`;
      s.defer = true;
      s.onload = resolve;
      s.onerror = ()=>reject(new Error(`Fehler beim Laden von ${src}`));
      document.head.appendChild(s);
    });
  }

  // ------- Seite erkennen -------
  const path = location.pathname;
  let modules = [];

  if(/\/pages\/social\.html$/.test(path)){
    modules = [
      { key:"social-01", src:"/lp-anfang/library/js/campus/social/social-01-intro.js" },
      { key:"social-02", src:"/lp-anfang/library/js/campus/social/social-02-practice.js" },
      { key:"social-03", src:"/lp-anfang/library/js/campus/social/social-03-mentor.js" },
      { key:"social-04", src:"/lp-anfang/library/js/campus/social/social-04-growth.js" },
    ];
  }
  else if(/\/pages\/community\.html$/.test(path)){
    modules = [
      { key:"community-01", src:"/lp-anfang/library/js/campus/community/community-01-intro.js" },
      { key:"community-02", src:"/lp-anfang/library/js/campus/community/community-02-zoom.js" },
      { key:"community-03", src:"/lp-anfang/library/js/campus/community/community-03-stammtisch.js" },
      { key:"community-04", src:"/lp-anfang/library/js/campus/community/community-04-growth.js" },
    ];
  }
  else if(/\/pages\/mentoren\.html$/.test(path)){
    modules = [
      { key:"mentor-01", src:"/lp-anfang/library/js/campus/mentor/mentor-01-intro.js" },
      { key:"mentor-02", src:"/lp-anfang/library/js/campus/mentor/mentor-02-method.js" },
      { key:"mentor-03", src:"/lp-anfang/library/js/campus/mentor/mentor-03-lead.js" },
      { key:"mentor-04", src:"/lp-anfang/library/js/campus/mentor/mentor-04-growth.js" },
    ];
  }
  else if(/\/pages\/souveraeni?taet\.html$/.test(path)){
    modules = [
      { key:"sovereign-01", src:"/lp-anfang/library/js/campus/sovereign/sovereign-01-intro.js" },
      { key:"sovereign-02", src:"/lp-anfang/library/js/campus/sovereign/sovereign-02-principles.js" },
      { key:"sovereign-03", src:"/lp-anfang/library/js/campus/sovereign/sovereign-03-practice.js" },
      { key:"sovereign-04", src:"/lp-anfang/library/js/campus/sovereign/sovereign-04-future.js" },
    ];
  }

  // ------- Slots vorbereiten -------
  const root = document.body;

  function ensureSlot(n){
    const id = `campus-container-${n}`;
    let el = document.getElementById(id);
    if(!el){
      el = document.createElement('section');
      el.id = id;
      el.style.margin = '28px 0';
      root.appendChild(el);
    } else {
      el.innerHTML = "";
    }
    return el;
  }

  function ensureMenuSlot(){
    let slot = document.getElementById("campus-menu-slot");
    if(!slot){
      slot = document.createElement('div');
      slot.id = "campus-menu-slot";
      slot.style.margin = '32px 0';
      const c2 = document.getElementById('campus-container-2') || ensureSlot(2);
      c2.after(slot);
    }
    return slot;
  }

  // ------- Ablauf -------
  async function boot(){
    if(modules.length === 0) return;

    // Container 1–4 anlegen
    for(let i=1;i<=modules.length;i++) ensureSlot(i);

    // Module nacheinander laden
    for(let i=0;i<modules.length;i++){
      const m = modules[i];
      try{
        await loadScript(m.src);
        console.info(`[FSA Campus] Modul geladen: ${m.key}`);
      }catch(err){
        console.error(`[FSA Campus] Fehler bei Modul ${m.key}:`, err);
      }

      // Campus-Menü nach Container 2 einfügen
      if(i === 1){
        setTimeout(()=>{
          const slot = ensureMenuSlot();
          const menu = document.querySelector('.campus-menu');
          if(menu && slot && menu.parentElement !== slot){
            slot.innerHTML = "";
            slot.appendChild(menu);
          }
        }, 150);
      }
    }
  }

  // ------- Start -------
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
