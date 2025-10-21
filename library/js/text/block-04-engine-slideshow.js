// ░░ Baustein 04 – Slideshow-Engine mit Wiederholungszähler & Namensanzeige ░░
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  const currentCourse = typeof block03_course !== "undefined" ? block03_course[lang] : null;
  if (!currentCourse) return console.warn("Kein Kursinhalt gefunden.");

  // === Grundvariablen ===
  let index = 0, correct = 0, wrong = 0;
  const total = currentCourse.questions.length;
  const results = [];

  // === Wiederholungszähler laden & erhöhen ===
  const repeatKey = "fsa_course1_repeats";
  let repeatCount = parseInt(localStorage.getItem(repeatKey) || "0");
  repeatCount++;
  localStorage.setItem(repeatKey, repeatCount);

  // === DOM-Struktur ===
  const quizContainer = document.createElement("div");
  quizContainer.className = "quiz-slideshow";
  document.body.appendChild(quizContainer);

  const progress = document.createElement("div");
  progress.className = "quiz-progress";
  const bar = document.createElement("div");
  bar.className = "quiz-bar";
  progress.appendChild(bar);
  quizContainer.appendChild(progress);

  const card = document.createElement("div");
  card.className = "quiz-card";
  quizContainer.appendChild(card);

  const nav = document.createElement("div");
  nav.className = "quiz-nav";
  quizContainer.appendChild(nav);

  // === Hilfsfunktionen ===
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const shuffled = shuffle([...currentCourse.questions]).map(q => ({
    q: q.q,
    a: shuffle([...q.a]),
    mentor: q.mentor || ""
  }));

  function updateProgress() {
    bar.style.width = ((index + 1) / total) * 100 + "%";
  }

  // === Frage anzeigen ===
  function showQuestion() {
    const q = shuffled[index];
    updateProgress();

    card.classList.add("fade-out");
    setTimeout(() => {
      card.innerHTML = `
        <h3>${lang === "de" ? "Frage" : "Question"} ${index + 1} ${lang === "de" ? "von" : "of"} ${total}</h3>
        <h2>${q.q}</h2>
        <div class="answers">
          ${q.a.map((a,i)=>`
            <button class="answer-btn" data-correct="${a.correct}" data-text="${a.text}">
              ${String.fromCharCode(65+i)}. ${a.text}
            </button>
          `).join("")}
        </div>`;
      nav.innerHTML = `<button id="skipBtn">${lang==="de"?"Überspringen":"Skip"}</button>`;
      card.classList.remove("fade-out");
      card.classList.add("fade-in");

      document.querySelectorAll(".answer-btn").forEach(btn =>
        btn.addEventListener("click", e => {
          const chosen = e.target.dataset.text;
          const isCorrect = e.target.dataset.correct === "true";
          const right = q.a.find(a => a.correct)?.text || "";
          results.push({
            question: q.q,
            chosenAnswer: chosen,
            correctAnswer: right,
            mentorTip: q.mentor || "",
            isCorrect
          });
          if (isCorrect) correct++; else wrong++;
          nextQuestion();
        })
      );
      document.getElementById("skipBtn").onclick = () => {
        results.push({
          question: q.q,
          chosenAnswer: "— (Übersprungen)",
          correctAnswer: q.a.find(a => a.correct)?.text || "",
          mentorTip: q.mentor || "",
          isCorrect: false
        });
        wrong++;
        nextQuestion();
      };
    }, 250);
  }

  function nextQuestion() {
    card.classList.remove("fade-in");
    card.classList.add("fade-out");
    setTimeout(() => {
      index++;
      if (index < total) showQuestion();
      else showResult();
    }, 200);
  }

  // === Ergebnisanzeige (edles Panel mit Name & Mentor-Ton) ===
  function showResult() {
    const firstName = localStorage.getItem("fsa_firstName") || "";
    const lastName = localStorage.getItem("fsa_lastName") || "";
    const fullName = `${firstName} ${lastName}`.trim();

    let status = "";
    let mentorText = "";

    if (correct <= 5) {
      status = lang==="de"?"Wiederholen ❌":"Repeat ❌";
      mentorText = lang==="de"
        ? "Lass dich nicht entmutigen – jeder Adler braucht Anlauf, um abzuheben. Versuch es erneut, du bist näher als du glaubst."
        : "Don’t be discouraged — every eagle needs a run-up before taking flight. Try again; you’re closer than you think.";
    } else if (correct <=7) {
      status = "Bronze 🥉";
      mentorText = lang==="de"
        ? "Ein solides Fundament. Du hast verstanden, worum es geht. Bleib dran – der nächste Flug trägt dich höher."
        : "A solid foundation. You’ve grasped the idea; stay consistent – your next flight will take you higher.";
    } else if (correct <=9) {
      status = "Silber 🥈";
      mentorText = lang==="de"
        ? "Starke Leistung. Mit etwas mehr Feinschliff erreichst du die volle Souveränität."
        : "Strong performance. With a little more refinement, you’ll reach full sovereignty.";
    } else {
      status = "Gold 🥇";
      mentorText = lang==="de"
        ? "Großartig! Du hast die Prinzipien wirklich verinnerlicht – das ist wahre Stärke."
        : "Outstanding! You’ve internalized the core principles – that’s real strength.";
    }

    const percent = Math.round((correct / total) * 100);
    const color = correct <=5 ? "#ef4444" : correct <=7 ? "#cd7f32" : correct <=9 ? "#93c5fd" : "#d4af37";

    card.innerHTML = `
      <div class="result-panel" style="border-color:${color}">
        <h2 style="color:${color}">🏁 FSA Akademie – Grundkurs Basis</h2>
        ${fullName ? `<p class="user-name">${lang==="de"?"Auswertung für":"Evaluation for"} <strong>${fullName}</strong></p>` : ""}
        <p>${lang==="de"?"Wiederholungen:":"Repeats:"} <strong>${repeatCount}</strong></p>
        <div class="progress-bar">
          <div style="width:${percent}%; background:${color};"></div>
        </div>
        <p>${lang==="de"
          ? `Du hast <strong>${correct}</strong> von <strong>${total}</strong> Fragen richtig beantwortet.`
          : `You answered <strong>${correct}</strong> out of <strong>${total}</strong> questions correctly.`}
        </p>
        <p>${lang==="de"?"Status:":"Status:"} <strong style="color:${color}">${status}</strong></p>
        <blockquote>“${mentorText}”</blockquote>
        <button id="restartBtn">${lang==="de"?"Kurs wiederholen":"Restart Course"}</button>
      </div>
    `;
    nav.innerHTML = "";

    localStorage.setItem("fsa_course1_score", correct);
    localStorage.setItem("fsa_course1_status", status);
    localStorage.setItem("fsa_course1_results", JSON.stringify(results));

    document.getElementById("restartBtn").onclick = () => location.reload();
  }

  // === Stil ===
  const style = document.createElement("style");
  style.textContent = `
    .quiz-slideshow{max-width:700px;margin:2cm auto;color:#e5e7eb;font-family:system-ui;text-align:left}
    .quiz-progress{height:6px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden;margin-bottom:1rem}
    .quiz-bar{height:100%;width:0%;background:linear-gradient(90deg,#3b82f6,#d4af37);transition:width .4s ease}
    .quiz-card{background:rgba(17,24,39,.7);border:1px solid rgba(212,175,55,.4);border-radius:10px;padding:1.5rem;
      box-shadow:0 0 20px rgba(59,130,246,.15);transition:opacity .3s ease}
    .quiz-card.fade-in{opacity:1}.quiz-card.fade-out{opacity:0}
    .answers{display:flex;flex-direction:column;gap:.6rem;margin-top:1rem}
    .answer-btn{background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.3);color:#e5e7eb;
      border-radius:6px;padding:.7rem 1rem;text-align:left;cursor:pointer;transition:background .2s ease}
    .answer-btn:hover{background:rgba(59,130,246,.3)}
    .quiz-nav{margin-top:1rem;display:flex;justify-content:flex-end}
    #skipBtn,#restartBtn{background:#3b82f6;color:white;border:none;border-radius:6px;padding:.5rem 1rem;
      cursor:pointer;font-weight:500}#skipBtn:hover,#restartBtn:hover{background:#2563eb}
    .result-panel{background:rgba(17,24,39,.8);border:1px solid rgba(212,175,55,.4);border-radius:12px;
      padding:2rem;text-align:center;box-shadow:0 0 25px rgba(212,175,55,.15);margin-top:1.2cm}
    .result-panel blockquote{font-style:italic;color:#e5e7eb;background:rgba(255,255,255,.05);
      border-left:4px solid rgba(212,175,55,.6);padding:1rem 1.5rem;border-radius:6px;margin:1.2rem auto;max-width:650px}
    .user-name{color:#94a3b8;margin-bottom:.6rem}
    .progress-bar{width:80%;height:16px;background:#1e293b;border-radius:8px;margin:1rem auto 1.2rem auto;overflow:hidden}
    .progress-bar div{height:100%;transition:width 1s ease}
  `;
  document.head.appendChild(style);

  // === Start ===
  showQuestion();
});
