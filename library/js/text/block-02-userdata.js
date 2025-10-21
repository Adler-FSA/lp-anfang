// ░░ Baustein 02 – Nameingabe & lokale Speicherung (DE/EN + Erfolgshinweis) ░░
// DSGVO-konform: nur LocalStorage, keine Serverübertragung

const block02_userdata = {
  de: {
    firstPH: "Vorname",
    lastPH:  "Nachname",
    button:  "Kurs starten",
    help:    "Bitte trage deinen Namen ein, damit dein Mentor dich persönlich ansprechen kann.",
    saved:   "✅ Name wurde gespeichert."
  },
  en: {
    firstPH: "First name",
    lastPH:  "Last name",
    button:  "Start course",
    help:    "Please enter your name so your mentor can address you personally.",
    saved:   "✅ Name saved."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  const t = block02_userdata[lang] || block02_userdata.de;

  const first = document.getElementById("firstName");
  const last  = document.getElementById("lastName");
  const form  = document.getElementById("nameForm");
  const btn   = form?.querySelector("button");
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

  // beim Absenden speichern + Erfolgshinweis
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = (first.value || "").trim();
    const l = (last.value || "").trim();

    if (!f || !l) return; // nichts speichern, wenn leer

    localStorage.setItem("fsa_firstName", f);
    localStorage.setItem("fsa_lastName",  l);

    // visueller Hinweis unterhalb des Formulars
    const hint = document.createElement("div");
    hint.textContent = `${t.saved}`;
    hint.className = "save-hint";
    form.appendChild(hint);
    setTimeout(() => hint.remove(), 3000);
  });

  // Stil für Erfolgshinweis
  const style = document.createElement("style");
  style.textContent = `
    .save-hint {
      margin-top: .6rem;
      color: #10b981;
      font-size: .95rem;
      font-weight: 500;
      transition: opacity .3s ease;
    }
  `;
  document.head.appendChild(style);
});
