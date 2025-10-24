<!-- Datei: library/js/text/block-04-engine-slideshow.js -->
<script>
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  const course = typeof block03_course !== "undefined" ? block03_course[lang] : null;
  if (!course) return console.warn("⚠️ Kein Kursinhalt gefunden (block03_course).");

  // === Variablen ===
  let index = 0;
  let correct = 0;
  const total = course.questions.length;
  const results = [];

  // === Container erzeugen ===
  const quiz = document.createElement("section");
  quiz.className = "quiz-slideshow";
  document.getElementById("quiz-root")?.appendChild(quiz);

  const barWrap = document.createElement("div");
  barWrap.className = "quiz-progress";
  barWrap.innerHTML = `<div class="quiz-bar"></div>`;
  quiz.appendChild(barWrap);

  const card = document.createElement("div");
  card.className = "quiz-card";
  quiz.appendChild(card);

  const nav = document.createElement("div");
  nav.className = "quiz-nav";
  quiz.appendChild(nav);

  const bar = barWrap.querySelector(".quiz-bar");

  // === Hilfsfunktionen ===
  const shuffle = arr => arr.sort(() => Math.random() - 0.5);
  const questions = shuffle([...course.questions]);

  const updateProgress = () => {
    bar.style.width = ((index + 1) / total) * 100 + "%";
  };

  // === Fragenanzeige ===
  const showQuestion = () => {
    const q = questions[index];
    updateProgress();
    card.replaceChildren();
    nav.replaceChildren();

    card.innerHTML = `
      <h3>${lang === "de" ? "Frage" : "Question"} ${index + 1} ${lang === "de" ? "von" : "of"} ${total}</h3>
      <h2>${q.q}</h2>
      <div class="answers">
        ${shuffle([...q.a])
          .map(
            (a, i) => `
            <button class="answer-btn" data-correct="${a.correct}">
              ${String.fromCharCode(65 + i)}. ${a.text}
            </button>`
          )
          .join("")}
      </div>
    `;

    const buttons = card.querySelectorAll(".answer-btn");
    buttons.forEach(btn =>
      btn.addEventListener("click", e => {
        buttons.forEach(b => (b.disabled = true));
        const correctBtn = e.target.dataset.correct === "true";
        if (correctBtn) correct++;

        results.push({
          question: q.q,
          chosen: e.target.textContent.trim(),
          correct: q.a.find(a => a.correct)?.text || "",
          mentor: q.mentor || "",
          ok: correctBtn
        });

        index++;
        if (index < total) setTimeout(showQuestion, 250);
        else setTimeout(showResult, 400);
      })
    );
  };

  // === Ergebnisanzeige ===
  const showResult = () => {
    card.replaceChildren();
    nav.replaceChildren();

    const score = Math.round((correct / total) * 100);
    const status =
      score < 60 ? "Bronze 🥉" :
      score < 85 ? "Silber 🥈" :
      "Gold 🥇";

    localStorage.setItem("fsa_course1_score", String(score));
    localStorage.setItem("fsa_course1_status", status);
    if (/Gold/i.test(status))
      localStorage.setItem("fsa_course1_passed", "true");
    else
      localStorage.removeItem("fsa_course1_passed");

    const color =
      /Gold/i.test(status) ? "#d4af37" :
      /Silber|Silver/i.test(status) ? "#93c5fd" :
      "#cd7f32";

    const mentorTip = results.find(r => !r.ok)?.mentor || "";

    card.innerHTML = `
      <div class="result-panel" style="border-color:${color}">
        <h2 style="color:${color}">🏁 FSA Akademie – ${lang === "de" ? "Grundkurs Basis" : "Basic Course"}</h2>
        <p>${lang === "de"
          ? `Du hast <strong>${correct}</strong> von <strong>${total}</strong> Fragen richtig beantwortet.`
          : `You answered <strong>${correct}</strong> out of <strong>${total}</strong> correctly.`}</p>
        <div class="progress-bar"><div style="width:${score}%; background:${color};"></div></div>
        <p>${lang === "de" ? "Status:" : "Status:"} <strong style="color:${color}">${status}</strong></p>
        ${mentorTip
          ? `<blockquote>“${mentorTip}”</blockquote>`
          : ""}
        <div class="result-buttons">
          ${/Gold/i.test(status)
            ? `<button id="nextCourseBtn">${lang === "de" ? "Weiter" : "Next"}</button>`
            : ""}
          <button id="restartBtn">${lang === "de" ? "Neu starten" : "Restart"}</button>
        </div>
      </div>
    `;

    document.getElementById("restartBtn").onclick = () => {
      ["score", "status", "passed"].forEach(k =>
        localStorage.removeItem(`fsa_course1_${k}`)
      );
      location.reload();
    };

    const ctxNext = "grundkurs-sicherheit.html"; // Standard-Nachfolger
    const nextBtn = document.getElementById("nextCourseBtn");
    if (nextBtn)
      nextBtn.onclick = () =>
        (window.location.href = `${ctxNext}?nocache=${Date.now()}`);
  };

  // === Stildefinition (responsive & mobiloptimiert) ===
  const style = document.createElement("style");
  style.textContent = `
    .quiz-slideshow{max-width:860px;margin:2cm auto;padding:0 1rem;color:#e5e7eb;font-family:system-ui;text-align:left}
    .quiz-progress{height:6px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden;margin-bottom:1rem}
    .quiz-bar{height:100%;width:0%;background:linear-gradient(90deg,#3b82f6,#d4af37);transition:width .4s ease}
    .quiz-card{background:rgba(17,24,39,.8);border:1px solid rgba(212,175,55,.4);border-radius:14px;padding:clamp(1rem,3vw,2rem);
      box-shadow:0 0 25px rgba(212,175,55,.15);font-size:clamp(1rem,2vw,1.1rem);line-height:1.6}
    .quiz-card h2{font-size:clamp(1.1rem,2.5vw,1.3rem);color:#d4af37;margin-bottom:1rem}
    .answers{display:flex;flex-direction:column;gap:.7rem;margin-top:1.2rem}
    .answer-btn{background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.3);color:#e5e7eb;border-radius:6px;
      padding:1rem;cursor:pointer;font-size:1rem;transition:background .2s ease;touch-action:manipulation}
    .answer-btn:hover,.answer-btn:active{background:rgba(59,130,246,.3)}
    .quiz-nav{margin-top:1rem;display:flex;justify-content:flex-end}
    #restartBtn,#nextCourseBtn{background:#3b82f6;color:white;border:none;border-radius:6px;
      padding:.7rem 1.1rem;cursor:pointer;font-weight:500;margin:.3rem}
    #restartBtn:hover,#nextCourseBtn:hover{background:#2563eb}
    .result-panel{background:rgba(17,24,39,.8);border:1px solid rgba(212,175,55,.4);
      border-radius:12px;padding:2rem;text-align:center;box-shadow:0 0 25px rgba(212,175,55,.15);margin-top:1.2cm}
    .result-panel blockquote{font-style:italic;color:#e5e7eb;background:rgba(255,255,255,.05);
      border-left:4px solid rgba(212,175,55,.6);padding:1rem 1.5rem;border-radius:6px;margin:1.2rem auto;max-width:650px}
    .progress-bar{width:80%;height:16px;background:#1e293b;border-radius:8px;margin:1rem auto;overflow:hidden}
    .progress-bar div{height:100%;transition:width 1s ease}
    @media(max-width:640px){.quiz-slideshow{margin:1.5cm auto;padding:0 .6rem}.answer-btn{font-size:1rem;padding:.8rem}}
  `;
  document.head.appendChild(style);

  // === Start ===
  showQuestion();
});
</script>
