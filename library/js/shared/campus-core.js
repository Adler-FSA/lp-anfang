// /lp-anfang/library/js/shared/campus-core.js
// FSA Campus – Core-Loader (Slots, Sequenzen, Menü-Platzierung)

(function FsaCampusCore(){
  // ------- Utilities -------
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      const s = document.createElement('script');
      const ts = Date.now();
      s.src = `${src}${src.includes('?')?'&':'?'}nocache=${ts}`;
      s.defer = true;
      s.onload = resolve;
      s.onerror = ()=>reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(s);
    });
  }

  // ------- Seite erkennen → Sequenz wählen -------
  const path = location.pathname;
  const isSovereign = /\/pages\/souveraeni?taet\.html$/.test(path);

  // Mapping: Name → Pfad zur Moduldatei (Text-Container DE/EN intern)
  const modules = isSovereign ? [
    { key: "campus-sovereign-01", src: "/lp-anfang/library/js/text-campus/campus-sovereign-01.js" },
    { key: "campus-sovereign-02", src: "/lp-anfang/library/js/text-campus/campus-sovereign-02.js" },
    { key: "campus-sovereign-03", src: "/lp-anfang/library/js/text-campus/campus-sovereign-03.js" },
    { key: "campus-sovereign-04", src: "/lp-anfang/library/js/text-campus/campus-sovereign-04.js" },
  ] : [];

  // ------- Slots vorbereiten -------
  // Intro-Box (optional) wird von HTML bereitgestellt: #campus-intro
  const root = document.body;

  // vorhandene Container leeren/erzeugen
  function ensureSlot(n){
    const id = `campus-container-${n}`;
    let el = document.getElementById(id);
    if(!el){
      el = document.createElement('section');
      el.id = id;
      el.style.margin = '24px 0';
      root.appendChild(el);
    }else{
      el.innerHTML = "";
    }
    return el;
  }

  // Menü-Slot (zwischen 2 und 3)
  function ensureMenuSlot(){
    let slot = document.getElementById("campus-menu-slot");
    if(!slot){
      slot = document.createElement('div');
      slot.id = "campus-menu-slot";
      slot.style.margin = '18px 0 8px';
      // nach container-2 einfügen
      const c2 = document.getElementById('campus-container-2') || ensureSlot(2);
      c2.after(slot);
    }
    return slot;
  }

  // ------- Sequenz laden -------
  async function boot(){
    if(modules.length === 0) return;

    // Slots 1..4 bereitstellen
    for(let i=1;i<=modules.length;i++) ensureSlot(i);

    // Module nacheinander laden und initialisieren
    for(let i=0;i<modules.length;i++){
      const m = modules[i];

      // Skript laden (mit nocache)
      await loadScript(m.src);

      // Intro entfernen, sobald der erste Container montiert
      if(i === 0){
        const intro = document.getElementById('campus-intro');
        if(intro) intro.remove();
      }

      // Modul-Funktion aufrufen
      if(!window.FSA_CAMPUS || typeof window.FSA_CAMPUS[m.key] !== "function"){
        console.warn(`[FSA] Modul nicht gefunden: ${m.key}`);
        continue;
      }
      try{
        window.FSA_CAMPUS[m.key](); // Modul montiert sich selbst in den passenden Slot
      }catch(err){
        console.error(`[FSA] Fehler in Modul ${m.key}:`, err);
      }

      // Nach dem zweiten Container: Menü exakt dazwischen platzieren
      if(i === 1){
        // Sicherstellen, dass das campus-menu Script da ist
        // (dein vorhandenes /library/js/campus-menu.js lädt sich selbst)
        // Falls das Menü schon am <body>-Ende hängt → in den Slot verschieben
        setTimeout(()=>{
          const slot = ensureMenuSlot();
          const menu = document.querySelector('.campus-menu');
          if(menu && slot && menu.parentElement !== slot){
            slot.innerHTML = ""; // Slot leeren
            slot.appendChild(menu);
          }
        }, 100); // kurzer Delay bis das Menü-Element im DOM ist
      }
    }
  }

  // Start
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
