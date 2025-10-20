// Baustein 04 (Erweiterung) – Slideshow-Engine für Grundkursfragen
// Universell für alle blockXX_course.js-Dateien, dynamisch & erweiterbar

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  const currentCourse = typeof block03_course !== "undefined" ? block03_course[lang] : null;
  if (!currentCourse) return console.warn("Kein Kursinhalt gefunden.");

  // === Variablen ===
  let index = 0;
  let correct = 0;
  let wrong = 0;
  const total = currentCourse.questions.length;

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

  // === Helferfunktionen ===
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const shuffled = shuffle([...currentCourse.questions]).map(q => ({
    q: q.q,
    a: shuffle([...q.a])
  }));

  function updateProgress() {
    const pct = ((index + 1) / total) * 100;
    bar.style.width = pct + "%";
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
          ${q.a
            .map(
              (a, i) =>
                `<button class="answer-btn" data-correct="${a.correct}">${String.fromCharCode(65 + i)}. ${a.text}</button>`
            )
            .join("")}
        </div>
      `;
      nav.innerHTML = `
        <button id="skipBtn">${lang === "de" ? "Überspringen" : "Skip"}</button>
      `;
      card.classList.remove("fade-out");
      card.classList.add("fade-in");

      document.querySelectorAll(".answer-btn").forEach(btn =>
        btn.addEventListener("click", e => {
          const isCorrect = e.target.dataset.correct === "true";
          if (isCorrect) correct++;
          else wrong++;
          nextQuestion();
        })
      );

      document.getElementById("skipBtn").onclick = nextQuestion;
    }, 250);
  }

  // === Nächste Frage oder Ende ===
  function nextQuestion() {
    card.classList.remove("fade-in");
    card.classList.add("fade-out");
    setTimeout(() => {
      index++;
      if (index < total) {
        showQuestion();
      } else {
        showResult();
      }
    }, 200);
  }

  // === Ergebnisanzeige ===
  function showResult() {
    let status = "";
    if (correct <= 5) status = lang === "de" ? "Wiederholen ❌" : "Repeat ❌";
    else if (correct <= 7) status = lang === "de" ? "Bronze 🥉" : "Bronze 🥉";
    else if (correct <= 9) status = lang === "de" ? "Silber 🥈" : "Silver 🥈";
    else status = lang === "de" ? "Gold 🥇" : "Gold 🥇";

    card.innerHTML = `
      <h2>${currentCourse.title}</h2>
      <p>${lang === "de" ? "Du hast" : "You got"} <strong>${correct}</strong> ${lang === "de" ? "von" : "out of"} <strong>${total}</strong> ${lang === "de" ? "Fragen richtig." : "correct answers."}</p>
      <p>${lang === "de" ? "Status:" : "Status:"} <strong>${status}</strong></p>
      <button id="restartBtn">${lang === "de" ? "Kurs wiederholen" : "Restart Course"}</button>
    `;
    nav.innerHTML = "";

    // Ergebnis lokal speichern
    localStorage.setItem("fsa_course1_score", correct);
    localStorage.setItem("fsa_course1_status", status);

    document.getElementById("restartBtn").onclick = () => location.reload();
  }

  // === Styles ===
  const style = document.createElement("style");
  style.textContent = `
    .quiz-slideshow {
      max-width: 700px;
      margin: 2cm auto;
      color: #e5e7eb;
      font-family: system-ui, sans-serif;
      text-align: left;
    }
    .quiz-progress {
      height: 6px;
      background: rgba(255,255,255,0.1);
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 1rem;
    }
    .quiz-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #3b82f6, #d4af37);
      transition: width 0.4s ease;
    }
    .quiz-card {
      background: rgba(17,24,39,0.7);
      border: 1px solid rgba(212,175,55,0.4);
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 0 20px rgba(59,130,246,0.15);
      transition: opacity 0.3s ease;
    }
    .quiz-card.fade-in { opacity: 1; }
    .quiz-card.fade-out { opacity: 0; }
    .answers {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      margin-top: 1rem;
    }
    .answer-btn {
      background: rgba(59,130,246,0.1);
      border: 1px solid rgba(59,130,246,0.3);
      color: #e5e7eb;
      border-radius: 6px;
      padding: 0.7rem 1rem;
      text-align: left;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    .answer-btn:hover {
      background: rgba(59,130,246,0.3);
    }
    .quiz-nav {
      margin-top: 1rem;
      display: flex;
      justify-content: flex-end;
    }
    #skipBtn, #restartBtn {
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-weight: 500;
    }
    #skipBtn:hover, #restartBtn:hover {
      background: #2563eb;
    }
  `;
  document.head.appendChild(style);

  // === Start ===
  showQuestion();
});
