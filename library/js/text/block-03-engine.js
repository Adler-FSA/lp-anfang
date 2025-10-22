// ░░ Baustein 03 – Kurslogik / Engine-Steuerung (v2.3.6 – Fix: kein Scrollspringen) ░░
// - Verhindert Sprünge beim Rendern neuer Fragen
// - Behält konstanten Containerraum, kein scrollIntoView()
// - Funktional identisch mit v2.3.5 (Frage/Antwort/Score)

document.addEventListener("DOMContentLoaded", () => {
  console.log("🧭 Course Engine v2.3.6 geladen – stabiler Viewport.");

  const lang = localStorage.getItem("fsa_lang") || "de";
  const data = (window.block03_course && window.block03_course[lang]) || window.block03_course.de;
  const questions = data.questions || [];
  const courseName = data.title || "Grundkurs";

  const quizContainer = document.querySelector("#quiz-root");
  if (!quizContainer) {
    console.warn("⚠️ Kein #quiz-root gefunden.");
    return;
  }

  // Wrapper erstellen, falls noch nicht da
  let inner = quizContainer.querySelector(".quiz-inner");
  if (!inner) {
    inner = document.createElement("div");
    inner.className = "quiz-inner";
    inner.style.minHeight = "420px";
    quizContainer.appendChild(inner);
  }

  let currentQuestion = 0;
  let correctCount = 0;

  function renderQuestion() {
    const q = questions[currentQuestion];
    if (!q) return;

    // sanftes Überblenden statt Neusprung
    inner.style.opacity = 0;
    setTimeout(() => {
      inner.innerHTML = `
        <div style="transition:opacity .4s ease;">
          <h3 style="color:#d4af37;margin-bottom:.8rem;">${q.q}</h3>
          <ul style="list-style:none;padding:0;margin:0;">
            ${q.a.map((opt,i)=>`
              <li style="margin:.4rem 0;">
                <label style="cursor:pointer;">
                  <input type="radio" name="answer" value="${i}"
                    style="margin-right:.4rem;"> ${opt.text}
                </label>
              </li>`).join("")}
          </ul>
          <div style="text-align:center;margin-top:1.2rem;">
            <button id="nextBtn" style="
              background:rgba(0,0,0,0.7);
              border:1px solid rgba(212,175,55,.6);
              color:#d4af37;
              padding:.6rem 1.2rem;
              border-radius:6px;
              cursor:pointer;">
              ${lang==="de" ? (currentQuestion < questions.length-1 ? "Weiter" : "Abschließen") : 
                              (currentQuestion < questions.length-1 ? "Next" : "Finish")}
            </button>
          </div>
        </div>`;
      inner.style.opacity = 1;

      document.getElementById("nextBtn")?.addEventListener("click", nextQuestion);
    }, 180);
  }

  function nextQuestion() {
    const selected = inner.querySelector("input[name='answer']:checked");
    if (selected) {
      const idx = parseInt(selected.value, 10);
      if (questions[currentQuestion].a[idx].correct) correctCount++;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      finishCourse();
    }
  }

  function finishCourse() {
    console.log("✅ Kurs abgeschlossen – showResult() wird ausgelöst.");
    if (typeof window.showResult === "function") {
      window.correctCount = correctCount;
      window.totalQuestions = questions.length;
      window.showResult(true);
    } else {
      inner.innerHTML = `<p style="color:#d4af37;text-align:center;">
        ${lang==="de"?"Kurs abgeschlossen, Ergebnis wird geladen …":"Course completed, loading result …"}
      </p>`;
    }
  }

  renderQuestion();
});
