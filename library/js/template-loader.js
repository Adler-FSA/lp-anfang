/* ░░ FSA Template-Loader – Grundkurs-Basis (Version 2.6.0) ░░
   Lädt nur die relevanten Bausteine ohne Punktelogik.
   Reihenfolge: Menü → Sprache → Musik → Kursinhalte
*/

(function() {
  if (window.fsaLoaderActive) return;
  window.fsaLoaderActive = true;

  const files = [
    // Basis / Navigation
    "library/js/menu.js",
    "library/js/lang-switcher.js",
    "library/js/music-button.js",
    "library/js/grundkurs-menu.js",

    // Kursinhalte
    "library/js/text/block-01-intro.js",
    "library/js/text/block-03-course.js",

    // Abschluss / Rücksprung
    "library/js/back-to-home.js"
  ];

  let loaded = 0;

  function loadNext() {
    if (loaded >= files.length) {
      console.log("✅ Alle FSA-Bausteine für Grundkurs Basis geladen.");
      return;
    }
    const path = files[loaded];
    const s = document.createElement("script");
    s.src = `${path}?nocache=${Date.now()}`;
    s.defer = true;
    s.onload = () => {
      console.log(`✔️ Baustein ${loaded + 1}/${files.length}: ${path}`);
      loaded++;
      loadNext();
    };
    s.onerror = () => {
      console.warn(`⚠️ Fehler beim Laden von ${path}`);
      loaded++;
      loadNext();
    };
    document.head.appendChild(s);
  }

  window.addEventListener("DOMContentLoaded", () => setTimeout(loadNext, 300));
})();
