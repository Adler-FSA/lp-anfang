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

// Reihenfolge der Bausteine (relative Pfade für GitHub Pages)
const courseBlocks = [
  "library/js/text/block-01-intro.js",
  "library/js/grundkurs-menu.js",
  "library/js/text/block-02-userdata.js",
  "library/js/text/block-03-course.js",
  "library/js/text/block-04-engine-slideshow.js",
  "library/js/text/block-05-summary.js"
];

// Funktionsleiste und Menü (bleiben global)
const globalBlocks = [
  "library/js/menu.js",
  "library/js/lang-switcher.js",
  "library/js/music-button.js",
  "library/js/back-to-home.js"
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
  console.log("FSA Template geladen – Kurs:", courseKey);

  // 1. Globale Scripts zuerst laden (Menü, Musik, Sprache)
  loadScriptSequentially([...globalBlocks], () => {
    console.log("✅ Globale Blöcke geladen.");

    // 2. Danach Kurs-spezifische Bausteine laden
    loadScriptSequentially([...courseBlocks], () => {
      console.log("✅ Kurs-Bausteine vollständig geladen.");
    });
  });
});
