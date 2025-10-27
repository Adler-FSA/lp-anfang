// ░░ Baustein 02 – Begrüßungsblock (Sicherheit) – DE/EN, responsive, auto-render ░░

const block02_intro = {
  de: {
    title: "FSA Akademie – Grundkurs Sicherheit",
    line1:
      "Willkommen zu deinem 2. Kurs und Schritt in die Finanzielle Souveränität. Dieser Kurs vertieft das Thema Sicherheit & Selbstverwahrung. Das Ziel ist, dein Bewusstsein zu schärfen: Es ist kein Spiel – nur ein verantwortungsvoller Umgang mit dem Fundament der finanziellen Souveränität bewahrt sie langfristig.",
    line2:
      "Halbherziges Handeln kostet oft viel Geld. Bewusstes Handeln spart Geld – und lässt es wachsen.",
    line3:
      "Der Grundkurs Sicherheit ist Teil 2 von 4 aufeinander aufbauenden Kursen. Dieser Abschnitt hilft dir, dein Wissen zu festigen und dein Denken zu schärfen.",
    line4:
      "Nach jedem Kurs folgt eine Auswertung: deine Antworten, der Mentor-Kommentar bei Fehlern und Lob bei richtigen Antworten."
  },
  en: {
    title: "FSA Academy – Basic Course Security",
    line1:
      "Welcome to your second course and step toward Financial Sovereignty. This module deepens Security & Self-Custody. The aim is to raise your awareness: this is not a game — only responsible handling of the foundation of financial sovereignty keeps it stable over time.",
    line2:
      "Half-hearted actions are expensive. Conscious actions save money — and help it grow.",
    line3:
      "The Security course is part 2 of 4 consecutive modules. This section helps you consolidate your knowledge and sharpen your thinking.",
    line4:
      "After each course you’ll receive an evaluation: your answers, mentor comments for mistakes, and short praise for correct ones."
  }
};

// Gleiche API wie beim Basis-Intro, damit der Sprachumschalter funktioniert
function renderIntro(lang = "de") {
  const t = block02_intro[lang] || block02_intro.de;
  const section = document.getElementById("intro");
  if (!section) return;

  section.classList.add("card"); // Styling kommt aus der Seite
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
      <p style="margin:.5rem 0; color: var(--muted);">${t.line4}</p>
    </div>
  `;
}

// Auto-Render & Live-Umschalten (kompatibel mit deinem lang-switcher)
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  renderIntro(lang);

  // reagiert auf Storage-Wechsel (z.B. anderer Tab)
  window.addEventListener("storage", (e) => {
    if (e.key === "fsa_lang") renderIntro(e.newValue || "de");
  });

  // reagiert auf das Custom Event deines Umschalters (mobile Fallback)
  document.addEventListener("fsa:lang-change", (ev) => {
    renderIntro(ev.detail || "de");
  });
});
