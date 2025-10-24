<!-- Datei: library/js/template-loader.js -->
<script>
/* ░░ FSA Template-Loader – Grundkurs-Basis ░░
   Lädt alle Module & Text-Bausteine sequentiell,
   prüft Fehler, kompatibel mit iPad/iPhone/Desktop. */

(function() {
  const files = [
    "library/js/menu.js",
    "library/js/lang-switcher.js",
    "library/js/music-button.js",
    "library/js/text/block-01-intro.js",
    "library/js/grundkurs-menu.js",
    "library/js/text/block-03-course.js",
    "library/js/text/block-03-engine.js",
    "library/js/text/block-04-engine.js",
    "library/js/text/block-04-engine-slideshow.js",
    "library/js/text/block-05-summary.js",
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

  // Start mit kleinem Delay, um DOM zu sichern
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(loadNext, 300);
  });
})();
</script>
