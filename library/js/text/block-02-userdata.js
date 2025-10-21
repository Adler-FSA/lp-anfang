// ░░ Baustein 02 – Nameingabe & lokale Speicherung (responsive + DE/EN + Live-Update) ░░
// DSGVO-konform: nur LocalStorage, keine Serverübertragung

const block02_userdata = {
  de: {
    title:  "Deine Kursanmeldung",
    firstPH: "Vorname",
    lastPH:  "Nachname",
    buttonStart:  "Kurs starten",
    buttonResume: "Kurs fortsetzen",
    help:    "Bitte trage deinen Namen ein, damit dein Mentor dich persönlich ansprechen kann.",
    saved:   "✅ Name wurde gespeichert."
  },
  en: {
    title:  "Your Course Registration",
    firstPH: "First name",
    lastPH:  "Last name",
    buttonStart:  "Start course",
    buttonResume: "Continue course",
    help:    "Please enter your name so your mentor can address you personally.",
    saved:   "✅ Name saved."
  }
};

function renderUserData(lang = "de") {
  const t = block02_userdata[lang] || block02_userdata.de;
  const form = document.getElementById("nameForm");
  if (!form) return;

  const first = document.getElementById("firstName");
  const last  = document.getElementById("lastName");
  const helpP = form.parentElement.querySelector("#nameForm ~ p");
  const titleBlock = form.parentElement.querySelector(".userdata-title");

  // Falls der Titel noch nicht existiert → hinzufügen
  if (!titleBlock) {
    const title = document.createElement("h2");
    title.className = "userdata-title";
    title.textContent = t.title;
    title.style.color = "var(--gold)";
    title.style.textAlign = "center";
    title.style.marginBottom = "0.6cm";
    form.parentElement.prepend(title);
  } else {
    titleBlock.textContent = t.title;
  }

  const btn = form.querySelector("button");
  if (!first || !last || !btn) return;

  // vorhandene Werte anwenden
  const savedFirst = localStorage.getItem("fsa_firstName") || "";
  const savedLast  = localStorage.getItem("fsa_lastName")  || "";
  const nameExists = savedFirst && savedLast;

  first.placeholder = t.firstPH;
  last.placeholder  = t.lastPH;
  first.value = savedFirst;
  last.value  = savedLast;
  btn.textContent = nameExists ? t.buttonResume : t.buttonStart;
  if (helpP) helpP.textContent = t.help;

  // Formularverhalten
  form.onsubmit = (e) => {
    e.preventDefault();
    const f = first.value.trim();
    const l = last.value.trim();
    if (!f || !l) return;

    localStorage.setItem("fsa_firstName", f);
    localStorage.setItem("fsa_lastName", l);

    // Erfolgshinweis
    showSaveHint(t.saved);

    // Buttontext anpassen
    btn.textContent = t.buttonResume;

    // Live-Update in der Auswertung, falls vorhanden
    const userField = document.querySelector(".summary-container .username");
    if (userField) userField.textContent = `${f} ${l}`;

    // Zum Quiz scrollen
    const quizRoot = document.getElementById("quiz-root");
    quizRoot?.scrollIntoView({ behavior: "smooth" });
  };
}

function showSaveHint(msg) {
  let hint = document.querySelector(".save-hint");
  if (!hint) {
    hint = document.createElement("div");
    hint.className = "save-hint";
    const formSection = document.querySelector("#nameForm")?.parentElement;
    formSection?.appendChild(hint);
  }
  hint.textContent = msg;
  hint.style.opacity = "1";
  setTimeout(() => (hint.style.opacity = "0"), 2500);
}

// Initialisierung
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  renderUserData(lang);

  // Sprache live aktualisieren
  window.addEventListener("storage", (e) => {
    if (e.key === "fsa_lang") renderUserData(e.newValue || "de");
  });

  // Stil anhängen
  const style = document.createElement("style");
  style.textContent = `
    .namegrid {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      gap: .8rem;
      align-items: center;
    }
    @media (max-width: 640px) {
      .namegrid {
        grid-template-columns: 1fr;
      }
      .namegrid button {
        width: 100%;
      }
    }
    .save-hint {
      margin-top: .6rem;
      color: #10b981;
      font-size: .95rem;
      font-weight: 500;
      text-align: center;
      transition: opacity .4s ease;
    }
  `;
  document.head.appendChild(style);
});
