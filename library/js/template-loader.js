/* ░░ FSA Template-Loader – Grundkurs-Basis (Version 2.5.2) ░░
   Lädt Module & Text-Bausteine sequentiell, mit Slideshow-Übergabe.
   Engine-Reihenfolge: 03 Engine → 04 Engine → 04 Slideshow */

(function() {
  const files = [
    // UI / Basis
    "library/js/menu.js",
    "library/js/lang-switcher.js",
    "library/js/music-button.js",

    // Kursinhalt
    "library/js/text/block-01-intro.js",
    "library/js/grundkurs-menu.js",
    "library/js/text/block-03-course.js",
    //Rücksprung
    "library/js/back-to-home.js"
  ];

  let loaded = 0;
  const total = files.length;

  function loadNext() {
    if (loaded >= total) {
      console.log("✅ Alle FSA-Bausteine erfolgreich geladen.");
      return;
    }

    const path = files[loaded];
    const s = document.createElement("script");
    s.src = `${path}?nocache=${Date.now()}`;
    s.defer = true;

    s.onload = () => {
      loaded++;
      console.log(`✔️ Baustein ${loaded}/${total}: ${path} geladen.`);
      loadNext();
    };

    s.onerror = () => {
      console.warn(`⚠️ Fehler beim Laden von ${path}`);
      loaded++;
      loadNext();
    };

    document.head.appendChild(s);
  }

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(loadNext, 300);
  });
})();
