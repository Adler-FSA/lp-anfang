// ░░ Baustein 01 – Begrüßungsblock (DE/EN, responsive) ░░
// Rendert die Einleitung in #intro, behält deinen Stil, aber mit besserem
// Verhalten auf Handy/Tablet (flexible Abstände, saubere Typo).

const block01_intro = {
  de: {
    title: "FSA Akademie – Grundkurs Basis",
    line1:
      "Willkommen zu deinem ersten Schritt in die Finanzielle Souveränität Akademie. Dieser Kurs legt das Fundament für dein Verständnis über Geld, Verantwortung und Freiheit.",
    line2:
      "Der Grundkurs Basis ist Teil von vier aufeinander aufbauenden Kursen. Insgesamt erwarten dich 40 Fragen, die dein Wissen festigen und dein Denken schärfen. Du erhältst je Kurs einen Status: 0–5 wiederholen, 6–7 Bronze, 8–9 Silber, 10 Gold.",
    line3:
      "Nach jedem Kurs folgt eine Auswertung: deine Antworten, der Mentor-Kommentar bei Fehlern und Lob bei richtigen Antworten. Bitte trage unten Vor- und Nachnamen ein – dein Mentor spricht dich persönlich an und dein Name erscheint später auf deinem Zertifikat."
  },
  en: {
    title: "FSA Academy – Basic Course Foundation",
    line1:
      "Welcome to your first step inside the Financial Sovereignty Academy. This course lays the foundation for your understanding of money, responsibility, and freedom.",
    line2:
      "The Basic Course Foundation is part of four consecutive courses. In total, you’ll face 40 questions designed to strengthen your knowledge and sharpen your thinking. Each course gives you a status: 0–5 repeat, 6–7 bronze, 8–9 silver, 10 gold.",
    line3:
      "After each course, you’ll receive an evaluation: your answers, mentor feedback for wrong answers, and short praise for correct ones. Please enter your first and last name below – your mentor will address you personally, and your name will appear on your certificate."
  }
};

function renderIntro(lang = "de") {
  const t = block01_intro[lang] || block01_intro.de;
  const section = document.getElementById("intro");
  if (!section) return;

  // Klasse behalten, aber responsive Abstände ergänzen
  section.classList.add("card");
  section.style.marginTop = "clamp(48px, 8vw, 96px)";   // statt 3–4 cm
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

// Init
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  renderIntro(lang);

  // Live-Umschalten unterstützen (falls dein lang-switcher 'fsa_lang' setzt)
  window.addEventListener("storage", (e) => {
    if (e.key === "fsa_lang") renderIntro(e.newValue || "de");
  });
});
