<!-- Datei: /library/js/text/block-04-engine-slideshow.js -->
<script>
// ░░ Baustein 04 – Slideshow-Engine (Grundkurs-Reihe FSA Akademie) ░░
// Version 2.5.2 – Klassische FSA-Optik + Übergabe an zentrale Engine-Logik
// © FSA Akademie

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  const course = typeof block03_course !== "undefined" ? block03_course[lang] : null;
  if (!course) return console.warn("⚠️ Kein Kursinhalt gefunden (block03_course).");

  let index = 0;
  let correct = 0;
  const total = course.questions.length;
  const results = [];

  const quizRoot = document.getElementById("quiz-root");
  if (!quizRoot) return console.warn("⚠️ Kein Ziel-Container (#quiz-root) gefunden.");

  // === Grundstruktur ===
  const quiz = document.createElement("section");
  quiz.className = "quiz-slideshow";
  quizRoot.appendChild(quiz);

  const progressWrap = document.createElement("div");
  progressWrap.className = "quiz-progress";
  progressWrap.innerHTML = `<div class="quiz-bar"></div>`;
  quiz.appendChild(progressWrap);

  const card = document.createElement("div");
  card.className = "quiz-card";
  quiz.appendChild(card);

  const nav = document.createElement("div");
  nav.className = "quiz-nav";
  quiz.appendChild(nav);

  const bar = progressWrap.querySelector(".quiz-bar");

  const shuffle = arr => arr.sort(() => Math.random() - 0.5);
  const questions = shuffle([...course.questions]);

  const updateProgress = () => {
    bar.style.width = ((index + 1) / total) * 100 + "%";
  };

  // === Anzeige einer Frage ===
  const showQuestion = () => {
    const q = questions[index];
    updateProgress();
    card.replaceChildren();
    nav.replaceChildren();

    card.innerHTML = `
      <div class="quiz-card-inner">
        <h3 class="quiz-question-count">${lang === "de" ? "Frage" : "Question"} ${index + 1} ${lang === "de" ? "von" : "of"} ${total}</h3>
        <h2 class="quiz-question">${q.q}</h2>
        <div class="answers">
          ${shuffle([...q.a])
            .map(
              (a, i) => `
              <button class="answer-btn" data-correct="${a.correct}">
                <span class="letter">${String.fromCharCode(65 + i)}.</span> ${a.text}
              </button>`
            )
            .join("")}
        </div>
      </div>
    `;

    nav.innerHTML = `<button id="skipBtn">${lang === "de" ? "Überspringen" : "Skip"}</button>`;

    const buttons = card.querySelectorAll(".answer-btn");
    buttons.forEach(btn =>
      btn.addEventListener("click", e => {
        buttons.forEach(b => (b.disabled = true));
        const isCorrect = e.target.dataset.correct === "true";
        if (isCorrect) correct++;

        results.push({
          question: q.q,
          chosen: e.target.textContent.trim(),
          correct: q.a.find(a => a.correct)?.text || "",
          mentor: q.mentor || "",
          ok: isCorrect
        });

        index++;
        if (index < total) setTimeout(showQuestion, 250);
        else {
          // 🔁 Übergabe an zentrale Engine statt eigene showResult()
          if (typeof window.finishCourse === "function") {
            setTimeout(() => window.finishCourse(), 400);
          } else {
            console.warn("⚠️ Keine finishCourse() gefunden – fallback auf lokale Anzeige");
            setTimeout(localShowResult, 400);
          }
        }
      })
    );

    document.getElementById("skipBtn").onclick = () => {
      buttons.forEach(b => (b.disabled = true));
      results.push({
        question: q.q,
        chosen: "— (Übersprungen)",
        correct: q.a.find(a => a.correct)?.text || "",
        mentor: q.mentor || "",
        ok: false
      });
      index++;
      if (index < total) showQuestion();
      else if (typeof window.finishCourse === "function") window.finishCourse();
      else localShowResult();
    };
  };

  // === Fallback-Ergebnis (nur wenn Engine fehlt) ===
  const localShowResult = () => {
    card.replaceChildren();
    nav.replaceChildren();

    const score = Math.round((correct / total) * 100);
    const status =
      score < 60 ? "Bronze 🥉" :
      score < 85 ? "Silber 🥈" :
      "Gold 🥇";

    const color =
      /Gold/i.test(status) ? "#d4af37" :
      /Silber|Silver/i.test(status) ? "#93c5fd" :
      "#cd7f32";

    card.innerHTML = `
      <div class="result-panel" style="border-color:${color}">
        <h2 style="color:${color}">🏁 ${lang === "de" ? "Ergebnis" : "Result"}</h2>
        <p>${lang === "de"
          ? `Du hast <strong>${correct}</strong> von <strong>${total}</strong> richtig beantwortet.`
          : `You answered <strong>${correct}</strong> of <strong>${total}</strong> correctly.`}</p>
        <p><strong style="color:${color}">${status}</strong></p>
        <button id="restartBtn">${lang === "de" ? "Neu starten" : "Restart"}</button>
      </div>
    `;
    document.getElementById("restartBtn").onclick = () => location.reload();
  };

  // === Stil: klassische FSA-Optik ===
  const style = document.createElement("style");
  style.textContent = `
    .quiz-slideshow{max-width:860px;margin:2cm auto;padding:0 1rem;color:#e5e7eb;font-family:system-ui;text-align:center}
    .quiz-progress{height:6px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden;margin-bottom:1rem}
    .quiz-bar{height:100%;width:0%;background:linear-gradient(90deg,#3b82f6,#d4af37);transition:width .4s ease}
    .quiz-card-inner{background:rgba(17,24,39,.8);border:1px solid rgba(212,175,55,.5);border-radius:14px;
      padding:clamp(1rem,3vw,2rem);box-shadow:0 0 25px rgba(212,175,55,.25);font-size:1.05rem;line-height:1.6;
      text-align:left;margin:0 auto;max-width:720px;}
    .quiz-question{color:#facc15;margin-bottom:1rem;font-weight:600;}
    .quiz-question-count{color:#a1a1aa;margin-bottom:.3rem;text-align:center;}
    .answers{display:flex;flex-direction:column;gap:.8rem;margin-top:1.2rem;}
    .answer-btn{background:rgba(30,41,59,.9);border:1px solid rgba(212,175,55,.3);color:#e5e7eb;border-radius:8px;
      padding:1rem;cursor:pointer;font-size:1rem;transition:all .2s ease;box-shadow:0 0 8px rgba(0,0,0,.3);}
    .answer-btn:hover{background:rgba(212,175,55,.2);transform:scale(1.02);}
    .letter{color:#d4af37;margin-right:.4rem;font-weight:600;}
    .quiz-nav{margin-top:1rem;display:flex;justify-content:center;}
    #skipBtn{background:#2563eb;color:#fff;border:none;border-radius:8px;padding:.7rem 1.2rem;cursor:pointer;
      font-weight:500;transition:background .3s ease;}
    #skipBtn:hover{background:#1d4ed8;}
    @media(max-width:640px){.quiz-card-inner{padding:1rem}.answer-btn{font-size:1rem;padding:.8rem}}
  `;
  document.head.appendChild(style);

  showQuestion();
});
</script>
