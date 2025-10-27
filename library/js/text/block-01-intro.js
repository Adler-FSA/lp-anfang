// ░░ Baustein 01 – Kursintro (DE/EN, autoload) ░░
// Grundkurs 1 – Finanzielle Souveränität (Basis)

const block01_intro = {
  de: {
    title: "🧭 Grundkurs 1 – Finanzielle Souveränität (Basis)",
    line1:
      "Willkommen zu deinem ersten Schritt in der Finanziellen Souveränität Akademie. Hier beginnst du, Geld und Verantwortung wirklich zu verstehen.",
    line2:
      "Du lernst, wie Geld entsteht, warum Kontrolle darüber Freiheit bedeutet, und weshalb Wissen über Geldflüsse der Schlüssel zu echter Unabhängigkeit ist.",
    line3:
      "Dieser Kurs bildet das Fundament – Verständnis, Achtsamkeit und Eigenverantwortung im Umgang mit Geld."
  },
  en: {
    title: "🧭 Basic Course 1 – Financial Sovereignty (Foundation)",
    line1:
      "Welcome to your first step in the Financial Sovereignty Academy. This is where you start to truly understand money and responsibility.",
    line2:
      "You’ll learn how money is created, why control means freedom, and how understanding financial flows unlocks real independence.",
    line3:
      "This course lays the foundation – awareness, understanding, and personal responsibility in dealing with money."
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

// 🔁 Auto-render + Live-Umschalten
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  renderIntro(lang);

  document.addEventListener("fsa:lang-change", (e) => {
    renderIntro((e && e.detail) || localStorage.getItem("fsa_lang") || "de");
  });

  window.addEventListener("storage", (e) => {
    if (e.key === "fsa_lang") renderIntro(e.newValue || "de");
  });
});
