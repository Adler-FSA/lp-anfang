// Baustein 02 – Nameingabe & lokale Speicherung (DE/EN)
// DSGVO-konform: nur LocalStorage, keine Serverübertragung

const block02_userdata = {
  de: {
    firstPH: "Vorname",
    lastPH:  "Nachname",
    button:  "Kurs starten",
    help:    "Bitte trage deinen Namen ein, damit dein Mentor dich persönlich ansprechen kann."
  },
  en: {
    firstPH: "First name",
    lastPH:  "Last name",
    button:  "Start course",
    help:    "Please enter your name so your mentor can address you personally."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  const t = block02_userdata[lang] || block02_userdata.de;

  const first = document.getElementById("firstName");
  const last  = document.getElementById("lastName");
  const form  = document.getElementById("nameForm");
  const btn   = form?.querySelector("button");
  // Hilfetext: Absatz direkt NACH dem Formular in derselben Section
  const helpP = form?.parentElement?.querySelector("#nameForm ~ p");

  // UI-Texte anwenden
  if (first) first.placeholder = t.firstPH;
  if (last)  last.placeholder  = t.lastPH;
  if (btn)   btn.textContent   = t.button;
  if (helpP) helpP.textContent = t.help;

  // vorhandene Werte wiederherstellen
  const savedFirst = localStorage.getItem("fsa_firstName");
  const savedLast  = localStorage.getItem("fsa_lastName");
  if (savedFirst) first.value = savedFirst;
  if (savedLast)  last.value  = savedLast;

  // beim Absenden speichern
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("fsa_firstName", (first.value || "").trim());
    localStorage.setItem("fsa_lastName",  (last.value  || "").trim());
  });
});
