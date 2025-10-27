// ░░ Baustein 05 – Abschlussprüfung Intro (DE/EN, auto-render) ░░

const block05_intro = {
  de: {
    title: "🏁 Abschlussprüfung – Finanzielle Souveränität",
    line1:
      "Willkommen zur Abschlussprüfung der FSA Akademie.",
    line2:
      "Hier prüfst du dein Verständnis über zentrale und dezentrale Systeme, Eigenverantwortung und finanzielle Souveränität.",
    line3:
      "Die 15 Fragen helfen dir, dein Wissen zu vertiefen – nicht nur zu bestehen, sondern zu verstehen. Nachdem du alle Kurse besucht und deine Basis erkundet hast, kannst du dein Leben finanziell souverän gestalten."
  },
  en: {
    title: "🏁 Final Exam – Financial Sovereignty",
    line1:
      "Welcome to the final exam of the FSA Academy.",
    line2:
      "Here you review your understanding of centralized and decentralized systems, personal responsibility, and financial sovereignty.",
    line3:
      "These 15 questions will help you deepen your knowledge – not just to pass, but to understand. After completing all previous courses and exploring your foundation, you are ready to live financially sovereign."
  }
};

function renderIntro(lang = "de") {
  const t = block05_intro[lang] || block05_intro.de;
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
