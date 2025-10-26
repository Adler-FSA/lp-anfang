/* ░░ FSA Template-Loader – Grundkurs Basis (Version 2.6.3) ░░
   Lädt Bausteine sequentiell (UI → Kursmenü → Kursinhalt → Rücksprung)
   Ohne Änderungen am Original-Menü (menu.js bleibt aktiv).
*/

(function() {
  // Doppellade-Schutz
  if (window.fsaTemplateActive) return;
  window.fsaTemplateActive = true;

  const base = "library/js/";

  // 1️⃣ UI-Elemente
  const uiModules = [
    base + "menu.js",
    base + "lang-switcher.js",
    base + "music-button.js"
  ];

  // 2️⃣ Kursmenü (muss nach DOM geladen werden)
  const courseMenu = base + "grundkurs-menu.js";

  // 3️⃣ Kursinhalt
  const courseBlocks = [
    base + "text/block-01-intro.js",
    base + "text/block-03-course.js"
  ];

  // 4️⃣ Abschluss
  const finalModules = [base + "back-to-home.js"];

  function loadSequential(list, done) {
    if (list.length === 0) {
      if (done) done();
      return;
    }
    const file = list.shift();
    const s = document.createElement("script");
    s.src = `${file}?nocache=${Date.now()}`;
    s.defer = true;
    s.onload = () => {
      console.log("✔️ geladen:", file);
      loadSequential(list, done);
    };
    s.onerror = () => {
      console.warn("⚠️ Fehler beim Laden:", file);
      loadSequential(list, done);
    };
    document.head.appendChild(s);
  }

  // Hauptstart
  window.addEventListener("DOMContentLoaded", () => {
    console.log("📘 FSA Template-Loader gestartet (Grundkurs-Basis)");

    // 1️⃣ UI laden
    loadSequential([...uiModules], () => {
      console.log("✅ UI-Module geladen.");

      // 2️⃣ Warte, bis #kursmenu-anchor existiert
      const waitMenu = setInterval(() => {
        const anchor = document.querySelector("#kursmenu-anchor");
        if (anchor) {
          clearInterval(waitMenu);
          const script = document.createElement("script");
          script.src = `${courseMenu}?nocache=${Date.now()}`;
          script.defer = true;
          script.onload = () => {
            console.log("✅ Grundkurs-Menü geladen.");

            // 3️⃣ Kursinhalt
            loadSequential([...courseBlocks], () => {
              console.log("✅ Kurs-Bausteine geladen.");

              // 4️⃣ Rücksprung
              loadSequential([...finalModules], () => {
                console.log("🏁 Alle Module vollständig geladen.");
              });
            });
          };
          script.onerror = () => console.warn("⚠️ Menü-Block konnte nicht geladen werden.");
          document.head.appendChild(script);
        }
      }, 150);
    });
  });
})();
