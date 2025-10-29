/* ==========================================================================
   FSA Campus – Globaler Core-Loader (v1.1)
   Pfad: /library/js/shared/campus-core.js
   Aufgabe:
   • Erkennt automatisch, welche Campus-Seite aktiv ist (Social, Community, Mentor, Souveränität)
   • Lädt automatisch die vier zugehörigen Text-Container
   • Fügt das Campus-Menü (campus-menu.js) zwischen Container 2 und 3 ein
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
      { key:"campus-social-01", src:"/lp-anfang/library/js/text-campus/campus-social-01.js" },
      { key:"campus-social-02", src:"/lp-anfang/library/js/text-campus/campus-social-02.js" },
      { key:"campus-social-03", src:"/lp-anfang/library/js/text-campus/campus-social-03.js" },
      { key:"campus-social-04", src:"/lp-anfang/library/js/text-campus/campus-social-04.js" },
    ];
  }
  else if(/\/pages\/community\.html$/.test(path)){
    modules = [
      { key:"campus-community-01", src:"/lp-anfang/library/js/text-campus/campus-community-01.js" },
      { key:"campus-community-02", src:"/lp-anfang/library/js/text-campus/campus-community-02.js" },
      { key:"campus-community-03", src:"/lp-anfang/library/js/text-campus/campus-community-03.js" },
      { key:"campus-community-04", src:"/lp-anfang/library/js/text-campus/campus-community-04.js" },
    ];
  }
  else if(/\/pages\/mentoren\.html$/.test(path)){
    modules = [
      { key:"campus-mentor-01", src:"/lp-anfang/library/js/text-campus/campus-mentor-01.js" },
      { key:"campus-mentor-02", src:"/lp-anfang/library/js/text-campus/campus-mentor-02.js" },
      { key:"campus-mentor-03", src:"/lp-anfang/library/js/text-campus/campus-mentor-03.js" },
      { key:"campus-mentor-04", src:"/lp-anfang/library/js/text-campus/campus-mentor-04.js" },
    ];
  }
  else if(/\/pages\/souveraeni?taet\.html$/.test(path)){
    modules = [
      { key:"campus-sovereign-01", src:"/lp-anfang/library/js/text-campus/campus-sovereign-01.js" },
      { key:"campus-sovereign-02", src:"/lp-anfang/library/js/text-campus/campus-sovereign-02.js" },
      { key:"campus-sovereign-03", src:"/lp-anfang/library/js/text-campus/campus-sovereign-03.js" },
      { key:"campus-sovereign-04", src:"/lp-anfang/library/js/text-campus/campus-sovereign-04.js" },
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
