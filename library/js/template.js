// ░░ Template-Loader für FSA Grundkurse ░░
// Lädt alle Bausteine in definierter Reihenfolge und setzt den Kurskontext dynamisch.

const path = window.location.pathname;
let courseKey = "course1";
if (path.includes("basis")) courseKey = "course1";
else if (path.includes("sicherheit")) courseKey = "course2";
else if (path.includes("einkommen")) courseKey = "course3";
else if (path.includes("network")) courseKey = "course4";
else if (path.includes("pruefung")) courseKey = "exam";

window.fsaCourseKey = courseKey;

// === absolute Pfade ab Root ===
const base = "/lp-anfang/library/js/";

const courseBlocks = [
  base + "text/block-01-intro.js",
  base + "grundkurs-menu.js",
  base + "text/block-02-userdata.js",
  base + "text/block-03-course.js",
  base + "text/block-04-engine-slideshow.js",
  base + "text/block-05-summary.js"
];

const globalBlocks = [
  base + "menu.js",
  base + "lang-switcher.js",
  base + "music-button.js",
  base + "back-to-home.js"
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

// === Startpunkt (nach vollständigem Laden der Seite) ===
window.addEventListener("load", () => {
  console.log("📘 FSA Template geladen – Kurs:", courseKey);

  // 1. Globale Scripts zuerst laden (Menü, Musik, Sprache)
  loadScriptSequentially([...globalBlocks], () => {
    console.log("✅ Globale Blöcke geladen.");

    // 2. Danach Kurs-spezifische Bausteine laden
    loadScriptSequentially([...courseBlocks], () => {
      console.log("✅ Kurs-Bausteine vollständig geladen.");
    });
  });
});
