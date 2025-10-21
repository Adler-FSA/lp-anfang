// ░░ Baustein 01 – Begrüßungsblock (DE/EN) ░░
// "FSA Akademie – Grundkurs Basis" mit festem Abstand & Kurs-Erklärung

const block01_intro = {
  de: {
    title: "FSA Akademie – Grundkurs Basis",
    line1: "Willkommen zu deinem ersten Schritt in die Finanzielle Souveränität Akademie. Dieser Kurs legt das Fundament für dein Verständnis über Geld, Verantwortung und Freiheit.",
    line2: "Der Grundkurs Basis ist Teil von vier aufeinander aufbauenden Kursen. Insgesamt erwarten dich 40 Fragen, die dein Wissen festigen und dein Denken schärfen. Du erhältst je Kurs einen Status: 0–5 wiederholen, 6–7 Bronze, 8–9 Silber, 10 Gold.",
    line3: "Nach jedem Kurs folgt eine Auswertung: deine Antworten, der Mentor-Kommentar bei Fehlern und Lob bei richtigen Antworten. Bitte trage unten Vor- und Nachnamen ein – dein Mentor spricht dich persönlich an und dein Name erscheint später auf deinem Zertifikat."
  },
  en: {
    title: "FSA Academy – Basic Course Foundation",
    line1: "Welcome to your first step inside the Financial Sovereignty Academy. This course lays the foundation for your understanding of money, responsibility, and freedom.",
    line2: "The Basic Course Foundation is part of four consecutive courses. In total, you’ll face 40 questions designed to strengthen your knowledge and sharpen your thinking. Each course gives you a status: 0–5 repeat, 6–7 bronze, 8–9 silver, 10 gold.",
    line3: "After each course, you’ll receive an evaluation: your answers, mentor feedback for wrong answers, and short praise for correct ones. Please enter your first and last name below – your mentor will address you personally, and your name will appear on your certificate."
  }
};

// ░░ Renderer ░░
// Erstellt das Intro-Layout mit definierten Abständen
function renderIntro(lang = "de") {
  const t = block01_intro[lang] || block01_intro.de;
  const section = document.getElementById("intro");
  if (!section) return;

  section.className = "card intro-block";
  section.style.marginTop = "3cm";     // Abstand nach oben
  section.style.marginBottom = "1.5cm"; // Abstand nach unten

  section.innerHTML = `
    <h1 style="
      color:#d4af37;
      font-size:1.8rem;
      margin-bottom:0.6cm;
      text-align:center;
    ">${t.title}</h1>
    <p>${t.line1}</p>
    <p>${t.line2}</p>
    <p>${t.line3}</p>
  `;
}

// automatische Initialisierung bei DOM-Start
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  renderIntro(lang);
});
