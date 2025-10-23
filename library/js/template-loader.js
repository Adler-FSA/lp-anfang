// ░░ template-loader.js – Sequenzielles Laden der FSA-Kursbausteine (final) ░░
// Ziele:
// • Garantierte Lade-Reihenfolge der Text-/Engine-Module
// • Keine Duplikate (idempotent) – vorhandene <script>-Tags werden erkannt & übersprungen
// • Kein Reload, keine UI-Sprünge, keine Blockierung des Main-Threads
// • Signal "fsa:modules-ready", sobald alles sauber geladen ist

(function () {
  const loaded = new Set(); // merkt bereits geladene IDs (auch aus vorhandenen Tags)

  // Bereits vorhandene Script-Tags erfassen (z.B. wenn im HTML eingebunden)
  Array.from(document.scripts).forEach(s => {
    const id = s.dataset.id || s.getAttribute("id");
    if (id) loaded.add(id);
  });

  function addScriptOnce(id, src) {
    // Wenn bereits per ID geladen/angekündigt → nichts tun
    if (loaded.has(id)) return Promise.resolve({ id, skipped: true });

    // Falls schon ein Script mit gleicher src existiert → als geladen markieren
    const sameSrc = Array.from(document.scripts).find(sc => sc.src && sc.src.endsWith(src));
    if (sameSrc) {
      loaded.add(id);
      return Promise.resolve({ id, skipped: true });
    }

    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = false;                    // Reihenfolge fest
      s.defer = true;                     // Render nicht blockieren
      s.dataset.id = id;

      s.onload = () => {
        loaded.add(id);
        resolve({ id, skipped: false });
      };
      s.onerror = (e) => reject(new Error(`Ladefehler bei ${id}: ${src}`));

      document.head.appendChild(s);
    });
  }

  // === Lade-Reihenfolge (sauber & stabil) ===
  // Hinweis: Menü-Dateien sind oft schon im HTML – der Loader überspringt doppelte Einträge idempotent.
  const queue = [
    // Globale Menüs & Helfer
    { id: "menu",            src: "/lp-anfang/library/js/menu.js" },
    { id: "grundkurs-menu",  src: "/lp-anfang/library/js/grundkurs-menu.js" },
    { id: "lang-switcher",   src: "/lp-anfang/library/js/lang-switcher.js" },
    { id: "music-button",    src: "/lp-anfang/library/js/music-button.js" },
    { id: "back-to-home",    src: "/lp-anfang/library/js/back-to-home.js" },

    // Kursbausteine – TEXT
    { id: "block-01-intro",  src: "/lp-anfang/library/js/text/block-01-intro.js" },
    { id: "block-02-user",   src: "/lp-anfang/library/js/text/block-02-userdata.js" },
    { id: "block-03-course", src: "/lp-anfang/library/js/text/block-03-course.js" },

    // Kursbausteine – ENGINE/LOGIK
    { id: "block-04-slide",  src: "/lp-anfang/library/js/text/block-04-engine-slideshow.js" },
    { id: "block-03-engine", src: "/lp-anfang/library/js/text/block-03-engine.js" },
    { id: "block-04-engine", src: "/lp-anfang/library/js/text/block-04-engine.js" },

    // Gesamtauswertung
    { id: "block-05-summary", src: "/lp-anfang/library/js/text/block-05-summary.js" }
  ];

  // Sequenziell abarbeiten
  (async () => {
    for (const mod of queue) {
      // kleine Pause, damit der Browser Layout/Styles setzen kann (verhindert "hartes Springen")
      await new Promise(r => setTimeout(r, 0));
      await addScriptOnce(mod.id, mod.src);
    }

    // Signal: Module sind bereit
    document.dispatchEvent(new CustomEvent("fsa:modules-ready"));

    // Falls der Nutzer bereits Namen eingegeben hat und #startBtn nicht geklickt wurde,
    // lassen wir die Seite in Ruhe. Start bleibt wie bisher über den Button.
    // (Kein Auto-Start – entspricht deiner Vorgabe.)
  })().catch(err => {
    // Unauffälliges Logging – kein UI-Flash
    console.warn(err?.message || err);
  });
})();
