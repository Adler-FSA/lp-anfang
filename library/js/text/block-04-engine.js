// Baustein 04 – Kurs-Engine (universell für alle Grundkurse)
// nutzt Sprache aus localStorage ("fsa_lang"), keine eigene Umschaltlogik
// mischt Fragen & Antworten, zählt richtig/falsch, speichert Ergebnis lokal

document.addEventListener("DOMContentLoaded", () => {

  // Sprache lesen (Standard: DE)
  const lang = localStorage.getItem("fsa_lang") || "de";

  // Aktuellen Kurs setzen (z. B. block03_course)
  const currentCourse = typeof block03_course !== "undefined" ? block03_course[lang] : null;
  if (!currentCourse) return console.warn("Kein Kursinhalt gefunden.");

  // Grundvariablen
  let currentQuestion = 0;
  let correctCount = 0;
  let wrongCount = 0;
  const totalQuestions = currentCourse.questions.length;

  // Fisher–Yates Shuffle
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Kurs mischen
  const shuffledQuestions = shuffle([...currentCourse.questions]).map(q => ({
    q: q.q,
    a: shuffle([...q.a])
  }));

  // DOM-Elemente erzeugen
  const container = document.createElement("div");
  container.className = "quiz-container";
  document.body.appendChild(container);

  // Frage anzeigen
  function showQuestion(index) {
    const item = shuffledQuestions[index];
    container.innerHTML = `
      <h2>${currentCourse.title}</h2>
      <p class="question">${index + 1}/${totalQuestions}: ${item.q}</p>
      <div class="answers">
        ${item.a.map((ans, i) => `<button class="ans" data-correct="${ans.correct}">${ans.text}</button>`).join("")}
      </div>
    `;

    document.querySelectorAll(".ans").forEach(btn => {
      btn.addEventListener("click", e => {
        const isCorrect = e.target.dataset.correct === "true";
        if (isCorrect) correctCount++; else wrongCount++;
        currentQuestion++;
        if (currentQuestion < totalQuestions) {
          showQuestion(currentQuestion);
        } else {
          showResult();
        }
      });
    });
  }

  // Ergebnis anzeigen
  function showResult() {
    const score = correctCount;
    let status = "";
    if (score <= 5) status = "Wiederholen ❌";
    else if (score <= 7) status = "Bronze 🥉";
    else if (score <= 9) status = "Silber 🥈";
    else status = "Gold 🥇";

    container.innerHTML = `
      <h2>${currentCourse.title}</h2>
      <p>Du hast <strong>${score}</strong> von <strong>${totalQuestions}</strong> Fragen richtig beantwortet.</p>
      <p>Status: <strong>${status}</strong></p>
      <button id="restartBtn">Kurs wiederholen</button>
    `;

    // Ergebnis lokal speichern
    localStorage.setItem("fsa_lastScore", score);
    localStorage.setItem("fsa_lastStatus", status);

    document.getElementById("restartBtn").onclick = () => location.reload();
  }

  // Start
  showQuestion(currentQuestion);
});
