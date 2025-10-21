// ░░ Baustein 03 – Kurslogik / Engine-Steuerung (v2.3.5) ░░
// Fix: Kein automatischer Aufruf von showResult() beim Laden oder Reload
// Fix: Wiederholungszähler wird nur bei aktivem Abschluss erhöht

document.addEventListener("DOMContentLoaded", () => {
  console.log("🧭 Course Engine v2.3.5 geladen – wartet auf manuelles Beenden.");

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
  if (!questions.length) {
    console.warn("⚠️ Keine Fragen gefunden – showResult() wird NICHT ausgelöst.");
    return;
  }

  // --- Variablen ---
  let currentQuestion = 0;
  let correctCount = 0;

  // --- Frage anzeigen ---
  function renderQuestion() {
    const q = questions[currentQuestion];
    if (!q) return;
    quizContainer.innerHTML = `
      <h3>${q.q}</h3>
      <ul class="answers">
        ${q.a.map((opt, i) => `
          <li>
            <label>
              <input type="radio" name="answer" value="${i}">
              ${opt.text}
            </label>
          </li>`).join("")}
      </ul>
      <p class="mentor-tip">🧭 ${q.mentor}</p>
    `;
  }

  // --- Antwort prüfen ---
  function checkAnswer() {
    const selected = quizContainer.querySelector("input[name='answer']:checked");
    if (!selected) return;
    const chosen = parseInt(selected.value, 10);
    if (questions[currentQuestion].a[chosen].correct) correctCount++;
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

  // --- Submit-Button (falls vorhanden) ---
  submitBtn?.addEventListener("click", () => finishCourse());

  // --- Abschlusslogik ---
  function finishCourse() {
    console.log("✅ Kurs manuell abgeschlossen – showResult() ausgelöst.");
    if (typeof showResult === "function") {
      showResult(true); // manueller Trigger
    } else {
      console.warn("⚠️ showResult() nicht gefunden – keine Auswertung möglich.");
    }
  }

  // --- Startanzeige ---
  renderQuestion();
});
