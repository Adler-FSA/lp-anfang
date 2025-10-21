// ░░ Template-Loader für FSA Grundkurse ░░
// Lädt globale Module + Kursbausteine sequenziell und setzt den Kurskontext.

(function () {
  // ► Kurs-Key aus dem Pfad ableiten
  const p = (window.location.pathname || "").toLowerCase();

  let courseKey = "course1";
  if (p.includes("grundkurs-basis"))       courseKey = "course1";
  else if (p.includes("grundkurs-sicherheit")) courseKey = "course2";
  else if (p.includes("grundkurs-einkommen"))  courseKey = "course3";
  else if (p.includes("grundkurs-network"))    courseKey = "course4";
  else if (p.includes("pruefung"))             courseKey = "exam";

  // global verfügbar machen (falls ein Baustein es braucht)
  window.fsaCourseKey = courseKey;

  // ► Basispfad relativ zur Seite
  const base = "library/js/";

  // ► Globale Blöcke (Top-Menü, Sprache, Musik, Zurück-Button)
  const globalBlocks = [
    base + "menu.js",
    base + "lang-switcher.js",
    base + "music-button.js",
    base + "back-to-home.js"
  ];

  // ► Kurs-Blöcke (REIHENFOLGE WICHTIG!)
  // Menü soll direkt nach dem Intro sichtbar sein, Name bleibt optional.
  const courseBlocks = [
    base + "text/block-01-intro.js",          // Intro
    base + "grundkurs-menu.js",               // Grundkurs-Menü (unter Intro)
    base + "text/block-02-userdata.js",       // Name (optional)
    base + "text/block-03-course.js",         // Fragenkatalog (DE/EN)
    base + "text/block-04-engine.js",         // Kurslogik/Result-Engine
    base + "text/block-04-engine-slideshow.js", // UI/Slideshow falls genutzt
    base + "text/block-05-summary.js"         // Gesamtauswertung/Panel
  ];

  // ► Helper: Skripte nacheinander laden (mit Cache-Buster)
  function loadSequential(scripts, done) {
    if (!scripts.length) return done && done();
    const src = scripts.shift() + "?nocache=" + Date.now();
    const s = document.createElement("script");
    s.src = src;
    s.defer = true;
    s.onload = () => loadSequential(scripts, done);
    s.onerror = () => {
      console.warn("⚠️ Fehler beim Laden:", src);
      loadSequential(scripts, done); // weiter versuchen
    };
    document.body.appendChild(s);
  }

  // ► Start
  window.addEventListener("load", () => {
    console.log("📘 FSA Template geladen – Kurs:", courseKey);

    loadSequential([...globalBlocks], () => {
      console.log("✅ Globale Blöcke geladen.");
      loadSequential([...courseBlocks], () => {
        console.log("✅ Kurs-Bausteine vollständig geladen.");
      });
    });
  });
})();
