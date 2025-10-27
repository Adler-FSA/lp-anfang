// ░░ Baustein 04 – Kursintro (DE/EN, autoload) ░░
// Grundkurs 4 – Network & Mentorenschaft

const block04_intro = {
  de: {
    title: "🌐 Grundkurs 4 – Network & Mentorenschaft",
    line1:
      "Willkommen zu deinem vierten Schritt in der Finanziellen Souveränität Akademie. Hier geht es um Vertrauen, klare Kommunikation und echte Führung.",
    line2:
      "Du lernst, wie stabile Netzwerke entstehen, was Mentoren von Sponsoren unterscheidet und wie Vorbildverhalten Teams langfristig motiviert.",
    line3:
      "Ziel ist, souverän zu führen: transparent, verantwortungsvoll und auf Wachstum ausgelegt – ohne Hype, mit Haltung."
  },
  en: {
    title: "🌐 Basic Course 4 – Network & Mentorship",
    line1:
      "Welcome to your fourth step in the Financial Sovereignty Academy. This module focuses on trust, clear communication, and authentic leadership.",
    line2:
      "You’ll learn how stable networks are built, what separates mentors from sponsors, and how leading by example sustains motivation.",
    line3:
      "The aim: lead with sovereignty—transparent, responsible, and growth-oriented. No hype, just substance."
  }
};

function renderIntro(lang = "de") {
  const t = block04_intro[lang] || block04_intro.de;
  const section = document.getElementById("intro");
  if (!section) return;

  section.classList.add("card");
  section.style.marginTop = "clamp(48px, 8vw, 96px)";
  section.style.marginBottom = "clamp(16px, 3vw, 32px)";

  section.innerHTML = `
    <h1 style="
      color: var(--gold);
      font-size: clamp(1.6rem, 2.8vw, 2.4rem);
      line-height: 1.25;
      margin: 0 0 .6rem 0;
      text-align: center;
    ">${t.title}</h1>

    <div style="max-width: 72ch; margin: .25rem auto 0; font-size: clamp(.95rem, 1.4vw, 1.05rem);">
      <p style="margin:.5rem 0; color: var(--muted);">${t.line1}</p>
      <p style="margin:.5rem 0; color: var(--muted);">${t.line2}</p>
      <p style="margin:.5rem 0; color: var(--muted);">${t.line3}</p>
    </div>
  `;
}

// 🔁 Auto-render + Live-Umschalten (DE/EN)
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  renderIntro(lang);

  // Reagiert auf deinen Sprachumschalter (CustomEvent)
  document.addEventListener("fsa:lang-change", (e) => {
    renderIntro((e && e.detail) || localStorage.getItem("fsa_lang") || "de");
  });

  // Fallback: Tab-übergreifendes Umschalten via localStorage-Event
  window.addEventListener("storage", (e) => {
    if (e.key === "fsa_lang") renderIntro(e.newValue || "de");
  });
});
