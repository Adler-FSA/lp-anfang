// ░░ Baustein 04 – Kurslogik / Engine-Steuerung (v2.3.7) ░░
// Identisch mit block-03-engine.js v2.3.7
// Fix: Kein Springen beim Fragenwechsel, saubere Punktelogik, keine Wiederholungszähler

document.addEventListener("DOMContentLoaded", () => {
  console.log("🧭 Course Engine v2.3.7 aktiv – Scrollfix (Kurs 2–4) integriert.");

  const lang = localStorage.getItem("fsa_lang") || "de";
  const data = (block03_course && block03_course[lang]) || block03_course.de;
  const questions = data.questions || [];
  const courseName = data.title || "Grundkurs";

  const quizContainer = document.querySelector("#quiz");
  const nextBtn = document.querySelector("#nextQuestion");
  const submitBtn = document.querySelector("#submitQuiz");

  if (!questions.length || !quizContainer) {
    console.warn("⚠️ Keine Fragen gefunden oder Container fehlt – showResult() wird NICHT ausgelöst.");
    return;
  }

  let currentQuestion = 0;
  let correctCount = 0;

  // Scroll ruhig halten
  function freezeScrollPosition(fn) {
    const y = window.scrollY;
    const h = document.body.scrollHeight;
    fn();
    const newH = document.body.scrollHeight;
    const diff = newH - h;
    if (diff < 0) window.scrollTo({ top: y + diff, behavior: "instant" });
    else window.scrollTo({ top: y, behavior: "instant" });
  }

  // Frage anzeigen
  function renderQuestion() {
    const q = questions[currentQuestion];
    if (!q) return;

    freezeScrollPosition(() => {
      quizContainer.innerHTML = `
        <h3 style="margin-bottom:1rem;">${q.q}</h3>
        <ul class="answers" style="list-style:none;padding:0;margin:0;">
          ${q.a.map((opt, i) => `
            <li style="margin:.4rem 0;">
              <label style="cursor:pointer;display:flex;align-items:flex-start;gap:.5rem;">
                <input type="radio" name="answer" value="${i}" style="margin-top:.25rem;">
                <span>${opt.text}</span>
              </label>
            </li>`).join("")}
        </ul>
        <p class="mentor-tip" style="
          margin-top:1.2rem;
          padding:.8rem 1rem;
          background:rgba(255,255,255,0.05);
          border-left:4px solid var(--gold);
          border-radius:6px;
          color:#e5e7eb;
          font-style:italic;
        ">🧭 ${lang === "de"
          ? "Wähle eine Antwort aus und klicke auf Weiter."
          : "Select an answer and click Next."}</p>
      `;
    });
  }

  // Antwort prüfen
  function checkAnswer() {
    const selected = quizContainer.querySelector("input[name='answer']:checked");
    if (!selected) return;
    const chosen = parseInt(selected.value, 10);
    if (questions[currentQuestion].a[chosen].correct) {
      correctCount++;
      window.correctCount = correctCount;
    }
  }

  // Weiter-Button
  nextBtn?.addEventListener("click", () => {
    checkAnswer();
    currentQuestion++;
    if (currentQuestion < questions.length) renderQuestion();
    else finishCourse();
  });

  // Submit-Button
  submitBtn?.addEventListener("click", () => finishCourse());

  // Abschluss
  function finishCourse() {
    console.log("✅ Kurs abgeschlossen – showResult() ausgelöst.");
    if (typeof showResult === "function") {
      showResult(true);
      document.querySelector("#quiz-root")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn("⚠️ showResult() nicht gefunden – keine Auswertung möglich.");
    }
  }

  // Start
  renderQuestion();
});
