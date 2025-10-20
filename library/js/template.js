// ░░ Template-Loader für FSA Grundkurse ░░
// Lädt alle Bausteine in definierter Reihenfolge und setzt den Kurskontext dynamisch.

// Kurskennung aus Dateiname bestimmen (z. B. grundkurs-basis.html → course1)
const path = window.location.pathname;
let courseKey = "course1"; // Standard
if (path.includes("basis")) courseKey = "course1";
else if (path.includes("sicherheit")) courseKey = "course2";
else if (path.includes("einkommen")) courseKey = "course3";
else if (path.includes("network")) courseKey = "course4";
else if (path.includes("pruefung")) courseKey = "exam";

// Kurskennung global verfügbar machen
window.fsaCourseKey = courseKey;

// === relative Pfade von /lp-anfang/ zur library/ ===
const basePath = "../library/js/";

// Reihenfolge der Kursbausteine
const courseBlocks = [
  basePath + "text/block-01-intro.js",
  basePath + "grundkurs-menu.js",
  basePath + "text/block-02-userdata.js",
  basePath + "text/block-03-course.js",
  basePath + "text/block-04-engine-slideshow.js",
  basePath + "text/block-05-summary.js"
];

// Globale Module (Menü, Sprache, Musik, Zurück-Button)
const globalBlocks = [
  basePath + "menu.js",
  basePath + "lang-switcher.js",
  basePath + "music-button.js",
  basePath + "back-to-home.js"
];

// === Dynamischer Ladevorgang ===
function loadScriptSequentially(scripts, callback) {
  if (scripts.length === 0) return callback && callback();
  const src = scripts.shift();
  const s = document.createElement("script");
  s.src = src + "?nocache=" + Date.now(); // Cache-Bypass
  s.onload = () => loadScriptSequentially(scripts, callback);
  s.onerror = () => {
    console.warn("⚠️ Fehler beim Laden von:", src);
    loadScriptSequentially(scripts, callback);
  };
  document.body.appendChild(s);
}

// === Startpunkt ===
document.addEventListener("DOMContentLoaded", () => {
  console.log("📘 FSA Template geladen – Kurs:", courseKey);

  // 1. Globale Blöcke zuerst laden
  loadScriptSequentially([...globalBlocks], () => {
    console.log("✅ Globale Blöcke geladen.");

    // 2. Danach die kurs-spezifischen Bausteine
    loadScriptSequentially([...courseBlocks], () => {
      console.log("✅ Kurs-Bausteine vollständig geladen.");
    });
  });
});
