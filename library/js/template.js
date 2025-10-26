/* ░░ FSA Template-Loader – Grundkurs-Basis (Version 2.6.1) ░░
   Vereinheitlichtes Ladesystem für FSA-Kurse.
   Lädt globale Module → Menü → Kursinhalte → Abschluss.
   Entfernt alle Bronze/Silber/Gold-Referenzen.
*/

(function () {
  if (window.fsaTemplateActive) return;
  window.fsaTemplateActive = true;

  // --- Kurs-Kontext erkennen ---
  const path = window.location.pathname.toLowerCase();
  let courseKey = "basis";
  if (path.includes("sicherheit")) courseKey = "sicherheit";
  else if (path.includes("einkommen")) courseKey = "einkommen";
  else if (path.includes("network")) courseKey = "network";
  else if (path.includes("pruefung")) courseKey = "pruefung";

  window.fsaCourseKey = courseKey;
  console.log("📘 FSA Template aktiviert – Kurs:", courseKey);

  // --- Pfadbasis ---
  const base = "library/js/";

  // --- Globale UI-Module ---
  const globalBlocks = [
    base + "menu.js",
    base + "lang-switcher.js",
    base + "music-button.js"
  ];

  // --- Kurs-Menü separat, da DOM-Anker vorhanden sein muss ---
  const menuBlock = base + "grundkurs-menu.js";

  // --- Kursinhalt je nach Kurs ---
  const courseBlocks = [
    base + "text/block-01-intro.js",
    base + "text/block-03-course.js"
  ];

  // --- Abschlussmodul / Rücksprung ---
  const finalBlocks = [base + "back-to-home.js"];

  // --- Sequenzieller Lader ---
  function loadNext(list, done) {
    if (list.length === 0) {
      if (done) done();
      return;
    }
    const file = list.shift();
    const s = document.createElement("script");
    s.src = file + "?nocache=" + Date.now();
    s.defer = true;
    s.onload = () => {
      console.log("✔️ geladen:", file);
      loadNext(list, done);
    };
    s.onerror = () => {
      console.warn("⚠️ Fehler beim Laden:", file);
      loadNext(list, done);
    };
    document.head.appendChild(s);
  }

  // --- Start ---
  window.addEventListener("DOMContentLoaded", () => {
    // 1️⃣ Globale Module
    loadNext([...globalBlocks], () => {
      console.log("✅ Globale Module geladen");

      // 2️⃣ Kurs-Menü (nach DOM)
      const waitForAnchor = setInterval(() => {
        if (document.querySelector("#kursmenu-anchor")) {
          clearInterval(waitForAnchor);
          const s = document.createElement("script");
          s.src = menuBlock + "?nocache=" + Date.now();
          s.defer = true;
          s.onload = () => {
            console.log("✅ Grundkurs-Menü geladen");
            // 3️⃣ Kursinhalte
            loadNext([...courseBlocks], () => {
              console.log("✅ Kurs-Bausteine geladen");
              // 4️⃣ Abschluss
              loadNext([...finalBlocks], () => {
                console.log("✅ Alle Module vollständig geladen");
              });
            });
          };
          s.onerror = () => console.warn("⚠️ Fehler beim Menü-Block");
          document.head.appendChild(s);
        }
      }, 150);
    });
  });
})();
