<!-- Datei: /library/js/text/block-03-engine.js -->
<script>
// ░░ Baustein 03 – Engine (v2.3.5, mit Antwortspeicher) ░░
// - Speichert jede Nutzerwahl in window.__answers[frageIndex]
// - Zählt korrekt, ruft showResult(true) nur beim bewussten Abschluss
// - Keine Repeat-Zähler, keine erzwungene Scrollbewegung

document.addEventListener("DOMContentLoaded", () => {
  console.log("🧭 Course Engine v2.3.5 geladen – mit Antwortspeicher.");

  // --- Sprach- & Kursdaten abrufen ---
  const lang = localStorage.getItem("fsa_lang") || "de";
  const data = (window.block03_course && (window.block03_course[lang] || window.block03_course.de)) || window.block03_course?.de || null;
  const questions = data?.questions || [];
  const courseName = data?.title || (lang === "de" ? "Grundkurs" : "Course");

  // --- DOM-Referenzen ---
  const quizContainer = document.querySelector("#quiz") || document.querySelector("#quiz-root");
  const nextBtn = document.querySelector("#nextQuestion");
  const submitBtn = document.querySelector("#submitQuiz");

  // --- Abbruch, falls keine Fragen vorhanden ---
  if (!quizContainer || !questions.length) {
    console.warn("⚠️ Keine Fragen oder kein Ziel-Container gefunden – showResult() wird NICHT ausgelöst.");
    return;
  }

  // --- State ---
  let currentQuestion = 0;
  let correctCount = 0;

  // global bereitstellen (für Auswertung)
  window.__answers = Array.isArray(window.__answers) ? window.__answers : [];
  window.totalQuestions = questions.length;

  // --- Frage rendern ---
  function renderQuestion() {
    const q = questions[currentQuestion];
    if (!q) return;

    // bereits gewählte Antwort für diese Frage (falls Nutzer zurückkäme)
    const savedChoice = window.__answers[currentQuestion];

    quizContainer.innerHTML = `
      <div class="card" style="padding:1rem; margin-top:.4rem;">
        <h3 style="margin:.2rem 0 1rem 0;">${q.q}</h3>
        <ul class="answers" style="list-style:none; padding:0; margin:0; display:grid; gap:.5rem;">
          ${q.a.map((opt, i) => `
            <li>
              <label style="display:flex; gap:.6rem; align-items:flex-start; cursor:pointer;">
                <input type="radio" name="answer" value="${i}" ${savedChoice === i ? "checked" : ""} />
                <span>${opt.text}</span>
              </label>
            </li>
          `).join("")}
        </ul>

        <div style="display:flex; gap:.6rem; margin-top:1rem; flex-wrap:wrap;">
          ${
            currentQuestion < questions.length - 1
              ? `<button id="btn-next" class="btn-next" type="button"
                    style="background:#2563eb;border:0;color:#fff;padding:.6rem 1rem;border-radius:8px;cursor:pointer;">
                   ${lang === "de" ? "Nächste Frage" : "Next question"}
                 </button>`
              : `<button id="btn-finish" class="btn-finish" type="button"
                    style="background:#16a34a;border:0;color:#fff;padding:.6rem 1rem;border-radius:8px;cursor:pointer;">
                   ${lang === "de" ? "Kurs beenden" : "Finish course"}
                 </button>`
          }
        </div>
      </div>
    `;

    // lokale Buttons (damit alte Referenzen nicht nötig sind)
    const localNext = quizContainer.querySelector("#btn-next");
    const localFinish = quizContainer.querySelector("#btn-finish");

    localNext?.addEventListener("click", handleNext);
    localFinish?.addEventListener("click", finishCourse);
  }

  // --- Antwort prüfen & speichern ---
  function checkAndStoreAnswer() {
    const selected = quizContainer.querySelector("input[name='answer']:checked");
    if (!selected) return false;

    const chosenIndex = parseInt(selected.value, 10);
    // 1) Nutzerwahl persistent speichern für die Auswertung
    window.__answers[currentQuestion] = chosenIndex;

    // 2) Korrekt zählen
    const isCorrect = !!questions[currentQuestion].a[chosenIndex]?.correct;
    if (isCorrect) correctCount++;

    // global für showResult bereitstellen
    window.correctCount = correctCount;
    return true;
  }

  // --- Weiter-Button ---
  function handleNext() {
    const hasAnswer = checkAndStoreAnswer();
    if (!hasAnswer) {
      // optional: kleiner Hinweis, wenn nichts gewählt
      // (kein alert, um UX ruhig zu halten)
      return;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      finishCourse();
    }
  }

  // --- Submit-Button (falls du separate #submitQuiz im Layout hast) ---
  submitBtn?.addEventListener("click", () => finishCourse());

  // --- Abschlusslogik ---
  function finishCourse() {
    // letzte Antwort sichern (falls Nutzer direkt beendet)
    checkAndStoreAnswer();

    // globale Zähler sicher setzen
    window.totalQuestions = questions.length;
    window.correctCount = typeof window.correctCount === "number" ? window.correctCount : correctCount;

    console.log("✅ Kurs manuell abgeschlossen – showResult(true) wird aufgerufen.");
    if (typeof window.showResult === "function") {
      window.showResult(true); // manueller Trigger
    } else {
      console.warn("⚠️ showResult() nicht gefunden – keine Auswertung möglich.");
    }
  }

  // --- Startanzeige ---
  renderQuestion();
});
</script>
