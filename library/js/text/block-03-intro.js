// ░░ Baustein 03 – Kursintro (DE/EN, autoload) ░░

const block03_intro = {
  de: {
    title: "💡 Grundkurs 3 – Einkommen & Chancen",
    line1:
      "Willkommen zu deinem dritten Schritt in der Finanziellen Souveränität Akademie. In diesem Kurs geht es um das Verständnis von Einkommen, Chancen und Risiken im Kryptobereich.",
    line2:
      "Du lernst, wie echtes passives Einkommen entsteht, wie du seriöse Projekte erkennst und welche Denkweise langfristigen Erfolg fördert.",
    line3:
      "Der Grundkurs Einkommen ist Teil 3 von 4 aufeinander aufbauenden Kursen. Dieser Abschnitt hilft dir, Chancen realistisch einzuschätzen und deine Strategie verantwortungsvoll zu gestalten."
  },
  en: {
    title: "💡 Basic Course 3 – Income & Opportunities",
    line1:
      "Welcome to your third step inside the Financial Sovereignty Academy. This course focuses on understanding income, opportunities, and risks in the crypto world.",
    line2:
      "You’ll learn how true passive income is built, how to identify genuine projects, and which mindset supports long-term success.",
    line3:
      "The Income Course is part 3 of 4 sequential modules. It helps you evaluate opportunities realistically and build a responsible strategy."
  }
};

function renderIntro(lang = "de") {
  const t = block03_intro[lang] || block03_intro.de;
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

  window.addEventListener("storage", (e) => {
    if (e.key === "fsa_lang") renderIntro(e.newValue || "de");
  });
});
