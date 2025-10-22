// ░░ Baustein 03 – Kurslogik / Engine-Steuerung (v2.3.6) ░░
// Fix: Kein automatisches Hochscrollen mehr beim Laden oder bei neuen Fragen
// Fix: Kein automatischer Aufruf von showResult() beim Reload
// Fix: Wiederholungszähler entfernt – sauberes Fortschrittsverhalten bleibt

document.addEventListener("DOMContentLoaded", () => {
  console.log("🧭 Course Engine v2.3.6 aktiv – Scrollfix integriert.");

  // --- Sprach- & Kursdaten abrufen ---
  const lang = localStorage.getItem("fsa_lang") || "de";
  const data = (block03_course && block03_course[lang]) || block03_course.de;
  const questions = data.questions || [];
  const courseName = data.title || "Grundkurs";

  // --- DOM-Referenzen ---
  const quizContainer = document.querySelector("#quiz");
  const nextBtn = document.querySelector("#nextQuestion");
  const submitBtn = document.querySelector("#submitQuiz");

  // --- Abbruch, falls keine Fragen vorhanden ---
  if (!questions.length || !quizContainer) {
    console.warn("⚠️ Keine Fragen gefunden oder Container fehlt – showResult() wird NICHT ausgelöst.");
    return;
  }

  // --- Variablen ---
  let currentQuestion = 0;
  let correctCount = 0;

  // --- Frage rendern (Scrollfix integriert) ---
  function renderQuestion() {
    const q = questions[currentQuestion];
    if (!q) return;

    // Vorherige Höhe merken → kein Sprung
    const prevScroll = window.scrollY;

    quizContainer.innerHTML = `
      <h3 style="margin-bottom:1rem;">${q.q}</h3>
      <ul class="answers" style="list-style:none;padding:0;margin:0;">
        ${q.a.map((opt, i) => `
          <li style="margin:.4rem 0;">
            <label style="cursor:pointer;display:flex;align-items:flex-start;gap:.5rem;">
              <input type="radio" name="answer" value="${i}" style="margin-top:.2rem;">
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
      ">🧭 ${lang === "de" ? "Wähle eine Antwort aus und klicke auf Weiter." : "Select an answer and click Next."}</p>
    `;

    // Nach dem Rendern Scrollposition zurücksetzen
    window.scrollTo({ top: prevScroll });
  }

  // --- Antwort prüfen ---
  function checkAnswer() {
    const selected = quizContainer.querySelector("input[name='answer']:checked");
    if (!selected) return;
    const chosen = parseInt(selected.value, 10);
    if (questions[currentQuestion].a[chosen].correct) {
      correctCount++;
      window.correctCount = correctCount;
    }
  }

  // --- Weiter-Button ---
  nextBtn?.addEventListener("click", () => {
    checkAnswer();
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      finishCourse();
    }
  });

  // --- Submit-Button (optional) ---
  submitBtn?.addEventListener("click", () => finishCourse());

  // --- Kursende ---
  function finishCourse() {
    console.log("✅ Kurs abgeschlossen – showResult() ausgelöst.");
    if (typeof showResult === "function") {
      showResult(true);
      // Sanft zur Auswertung scrollen
      document.querySelector("#quiz-root")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn("⚠️ showResult() nicht gefunden – keine Auswertung möglich.");
    }
  }

  // --- Startanzeige ---
  renderQuestion();
});
