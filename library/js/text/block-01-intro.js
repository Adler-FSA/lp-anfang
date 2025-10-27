// ░░ Baustein 01 – Begrüßungsblock (DE/EN, responsive, auto-render) ░░

const block01_intro = {
  de: {
    title: "FSA Akademie – Grundkurs Basis",
    line1:
      "Willkommen zu deinem ersten Schritt in die Finanzielle Souveränität Akademie. Dieser Kurs legt das Fundament für dein Verständnis über Geld, Verantwortung und Freiheit.",
    line2:
      "Der Grundkurs Basis ist Teil von vier aufeinander aufbauenden Kursen. Dieser Abschnitt hilft dir, dein Wissen zu festigen und dein Denken zu schärfen.",
    line3:
      "Nach jedem Kurs folgt eine Auswertung: deine Antworten, der Mentor-Kommentar bei Fehlern und Lob bei richtigen Antworten."
  },
  en: {
    title: "FSA Academy – Basic Course Foundation",
    line1:
      "Welcome to your first step inside the Financial Sovereignty Academy. This course lays the foundation for your understanding of money, responsibility, and freedom.",
    line2:
      "The Basic Course Foundation is part of four consecutive modules. This section helps you strengthen your knowledge and sharpen your thinking.",
    line3:
      "After each course, you’ll receive feedback: your answers, mentor comments for mistakes, and praise for correct ones."
  }
};

function renderIntro(lang = "de") {
  const t = block01_intro[lang] || block01_intro.de;
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

// 🔁 Init + Live-Umschalten (DE/EN)
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  renderIntro(lang);

  window.addEventListener("storage", (e) => {
    if (e.key === "fsa_lang") renderIntro(e.newValue || "de");
  });
});
