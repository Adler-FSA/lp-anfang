/*!
 * FSA – block-03-engine.js (v2.3.7)
 * Quiz-Engine für Grundkurse
 * - Sanfter Fade zwischen Fragen
 * - Kein Scroll-Sprung
 * - Ruft showResult(true) erst am Ende auf
 * - Keine Repeat-Zähler
 */

(function(){
  document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";

    // Kursdaten aus block03_course laden
    const data = (window.block03_course && window.block03_course[lang]) || (window.block03_course && window.block03_course.de);
    if (!data || !Array.isArray(data.questions) || !data.questions.length) {
      console.warn("⚠️ Keine Fragen gefunden in block03_course.");
      return;
    }

    const questions = data.questions;
    const courseTitle = data.title || (lang==="de" ? "Grundkurs" : "Course");

    // Zielcontainer (#quiz-root) vorbereiten
    const root = document.getElementById("quiz-root") || (function(){
      const m = document.createElement("section");
      m.id = "quiz-root";
      document.body.appendChild(m);
      return m;
    })();

    // Inneres Quiz-Element (stabiler Knoten => weniger Layoutsprünge)
    let quiz = document.getElementById("quiz");
    if (!quiz) {
      quiz = document.createElement("div");
      quiz.id = "quiz";
      quiz.className = "fsa-quiz";
      root.appendChild(quiz);
    }

    // Stil (Fade & Grundlayout) injizieren
    const styleId = "fsa-quiz-style-v237";
    if (!document.getElementById(styleId)) {
      const st = document.createElement("style");
      st.id = styleId;
      st.textContent = `
        .fsa-quiz { position: relative; min-height: 280px; }
        .fsa-fade { opacity: 0; transition: opacity .2s ease; }
        .fsa-fade.show { opacity: 1; }

        .answers { list-style:none; margin:0; padding:0; display:grid; gap:.6rem; }
        .answers li label {
          display:flex; gap:.6rem; align-items:flex-start;
          border:1px solid rgba(255,255,255,.12); border-radius:10px;
          padding:.7rem .9rem; background:rgba(255,255,255,.04); cursor:pointer;
        }
        .answers input { margin-top:.25rem; }
        .mentor-tip { margin:.8rem 0 0; color:#cbd5e1; font-style:italic; }

        .btn-row { display:flex; flex-wrap:wrap; gap:.8rem; margin-top:1rem; }
        .btn { background:rgba(0,0,0,.7); color:#d4af37;
          border:1px solid rgba(212,175,55,.6); border-radius:8px;
          padding:.7rem 1.2rem; font-weight:600; cursor:pointer; transition:.25s;
        }
        .btn:hover{ filter:brightness(1.08) }
        .btn.primary{ background:linear-gradient(90deg,#3b82f6,#d4af37); color:#fff; border:none }
        .progressbar{ height:10px; background:rgba(255,255,255,.12); border-radius:6px;
          overflow:hidden; margin:1rem 0 1.2rem }
        .progressbar>div{ height:100%; background:linear-gradient(90deg,#3b82f6,#d4af37) }
        @media (max-width:740px){
          .answers li label{ padding:.7rem .8rem }
          .btn-row{ justify-content:space-between }
          .btn{ flex:1 1 auto; text-align:center }
        }
      `;
      document.head.appendChild(st);
    }

    // Zustand
    let current = 0;
    let correct = 0;

    // Exporte für Auswertung
    window.totalQuestions = questions.length;
    window.correctCount   = 0;                  // wird am Ende gesetzt
    window.courseName     = courseTitle;
    window.renderStats    = function(){
      const pct = Math.round((correct / questions.length) * 100);
      return `
        <div class="progressbar"><div style="width:${pct}%"></div></div>
        <p style="margin:.2rem 0 .6rem; color:#94a3b8">
          ${lang==="de" ? "Fortschritt" : "Progress"}: <strong>${current+1}/${questions.length}</strong>
        </p>
      `;
    };

    // Fade Utility
    function fadeIn(el){
      el.classList.remove("show");
      // Force reflow
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;
      el.classList.add("show");
    }

    // Scroll-Fix: Scrollposition festhalten
    function renderQuestion() {
      const prevY = window.scrollY;
      const q = questions[current];
      const pct = Math.round((current / questions.length) * 100);

      // Mentor-Text: wenn Objekt {correct, wrong}, zeigen wir neutralen Hinweis;
      // wenn String, direkt anzeigen
      const mentorText = typeof q.mentor === "object"
        ? (q.mentor.neutral || (lang==="de" ? "Beantworte in Ruhe. Dein Mentor kommentiert danach." : "Answer calmly. Mentor feedback follows."))
        : (q.mentor || "");

      quiz.classList.add("fsa-fade");
      quiz.innerHTML = `
        <div class="progressbar"><div style="width:${pct}%"></div></div>
        <h2 style="color:var(--gold); margin:0 0 .6rem 0;">${courseTitle}</h2>
        <p class="q-title" style="font-size:1.05rem; margin:.4rem 0 1rem;">${q.q}</p>
        <ul class="answers">
          ${q.a.map((opt, i) => `
            <li>
              <label>
                <input type="radio" name="ans" value="${i}">
                <span>${opt.text}</span>
              </label>
            </li>`).join("")}
        </ul>
        <p class="mentor-tip">🧭 ${mentorText}</p>
        <div class="btn-row">
          <button class="btn" id="prevBtn" ${current===0 ? "disabled" : ""}>
            ${lang==="de" ? "Zurück" : "Back"}
          </button>
          <button class="btn primary" id="nextBtn">
            ${current === questions.length - 1
              ? (lang==="de" ? "Abschließen" : "Finish")
              : (lang==="de" ? "Weiter" : "Next")}
          </button>
        </div>
      `;

      // show fade
      setTimeout(() => fadeIn(quiz), 10);

      // Restore scroll (kein Sprung)
      window.scrollTo({ top: prevY });

      // Buttons
      document.getElementById("prevBtn")?.addEventListener("click", () => {
        if (current > 0) {
          current--;
          renderQuestion();
        }
      });

      document.getElementById("nextBtn")?.addEventListener("click", () => {
        const sel = quiz.querySelector("input[name='ans']:checked");
        if (!sel) {
          alert(lang==="de" ? "Bitte eine Antwort wählen." : "Please select an answer.");
          return;
        }
        const chosen = parseInt(sel.value, 10);
        const isCorrect = !!q.a[chosen].correct;
        if (isCorrect) correct++;

        // Optional: pro Frage differenziertes Mentor-Feedback – ruhig halten (keine Sprünge)
        // Wir zeigen hier kein zusätzliches Overlay, um Sprünge zu vermeiden.

        if (current < questions.length - 1) {
          current++;
          renderQuestion();
        } else {
          finishCourse();
        }
      });
    }

    function finishCourse(){
      // Finale Werte global setzen, dann Auswertung anzeigen lassen
      window.correctCount = correct;

      // Kein Scroll-Sprung: Position halten
      const prevY = window.scrollY;

      if (typeof window.showResult === "function") {
        window.showResult(true);
        // zurück zur Position (falls Auswertung größer/kleiner ist)
        setTimeout(() => window.scrollTo({ top: prevY }), 0);
      } else {
        console.warn("⚠️ showResult() nicht gefunden – keine Auswertung möglich.");
      }
    }

    // Start
    renderQuestion();
  });
})();
