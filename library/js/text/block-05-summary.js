// ░░ Baustein 05 – Gesamtauswertung / Qualifikations-Summary (Finale FSA-Version) ░░
// Optisch veredelt + Mentor-Feedback + Fortschrittsbalken + "Zur Prüfung"-Button

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  const userName = localStorage.getItem("fsa_userName") || "Teilnehmer";

  const courses = [
    { key: "course1", title: "Grundkurs 1" },
    { key: "course2", title: "Grundkurs 2" },
    { key: "course3", title: "Grundkurs 3" },
    { key: "course4", title: "Grundkurs 4" }
  ];

  let totalScore = 0;
  let totalQuestions = 0;
  let summaryList = "";

  courses.forEach(c => {
    const score = parseInt(localStorage.getItem(`fsa_${c.key}_score`) || 0);
    const status = localStorage.getItem(`fsa_${c.key}_status`) || "—";
    totalScore += score;
    totalQuestions += 10;
    summaryList += `<li>${c.title}: <strong>${score}/10</strong> – ${status}</li>`;
  });

  const percentage = Math.round((totalScore / totalQuestions) * 100);
  let finalStatus = "";
  let mentorTone = "";

  if (percentage < 60) {
    finalStatus = "Wiederholen ❌";
    mentorTone = "Bleib dran. Jeder, der Durchhält, meistert die Prüfung am Ende.";
  } else if (percentage < 75) {
    finalStatus = "Bronze 🥉";
    mentorTone = "Ein solider Anfang! Du bist auf dem richtigen Weg – dranbleiben lohnt sich.";
  } else if (percentage < 90) {
    finalStatus = "Silber 🥈";
    mentorTone = "Sehr gut! Dein Wissen wird stabil – du bist fast am Ziel.";
  } else {
    finalStatus = "Gold 🥇";
    mentorTone = "Exzellent! Du hast bewiesen, dass du das Prinzip wirklich verstanden hast.";
  }

  // ░░ Feedback zu falschen Antworten ░░
  const storedResults = JSON.parse(localStorage.getItem("fsa_course1_results") || "[]");
  let mentorFeedback = "";

  if (storedResults.length > 0) {
    const wrong = storedResults.filter(r => !r.isCorrect);
    if (wrong.length > 0) {
      mentorFeedback += `<div class="mentor-feedback"><h3>💡 Mentor-Feedback zu falschen Antworten:</h3>`;
      wrong.forEach((r, i) => {
        mentorFeedback += `
          <div class="mentor-item">
            <p><strong>Frage ${i + 1}:</strong> ${r.question}</p>
            <p><span class="wrong">Deine Antwort:</span> <span class="wrong">${r.chosenAnswer}</span></p>
            <p><span class="right">Richtige Antwort:</span> ${r.correctAnswer}</p>
            <p class="mentor-tip">🧭 ${r.mentorTip}</p>
          </div>
          <hr>
        `;
      });
      mentorFeedback += `</div>`;
    }
  }

  // ░░ Gesamtauswertung anzeigen ░░
  const container = document.createElement("div");
  container.className = "summary-container";
  container.innerHTML = `
    <h1>FSA Akademie</h1>
    <h2>${lang === "de" ? "🏁 Gesamtauswertung" : "🏁 Final Summary"}</h2>
    <p class="username">${userName}</p>
    <div class="progress-bar">
      <div class="progress" style="width:${percentage}%;"></div>
    </div>
    <ul>${summaryList}</ul>
    <p><strong>${lang === "de" ? "Gesamtpunkte:" : "Total Score:"}</strong> ${totalScore} / ${totalQuestions}</p>
    <p><strong>${lang === "de" ? "Qualifikationsstatus:" : "Qualification Status:"}</strong> ${finalStatus}</p>
    <p class="mentor-tone">🧭 ${mentorTone}</p>
    ${mentorFeedback}
    <button id="nextBtn">${lang === "de" ? "Zur Prüfung weiter ➜" : "Continue to Exam ➜"}</button>
  `;
  document.body.appendChild(container);

  // ░░ Stil ░░
  const style = document.createElement("style");
  style.textContent = `
    .summary-container {
      margin: 2cm auto;
      max-width: 900px;
      padding: 2rem;
      background: rgba(15,20,30,0.85);
      border: 1px solid rgba(212,175,55,0.4);
      border-radius: 16px;
      box-shadow: 0 0 25px rgba(212,175,55,0.15);
      color: #e5e7eb;
      font-family: system-ui, sans-serif;
      text-align: center;
    }
    .summary-container h1 {
      color: #d4af37;
      margin-bottom: 0.5rem;
      font-size: 1.6rem;
      letter-spacing: 0.05em;
    }
    .summary-container h2 {
      color: #fff;
      margin-bottom: 0.8rem;
      font-size: 1.3rem;
    }
    .username {
      color: #9ca3af;
      margin-bottom: 1rem;
    }
    .progress-bar {
      height: 8px;
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
      margin: 1rem auto 1.5rem;
      overflow: hidden;
      max-width: 400px;
    }
    .progress {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #d4af37);
      transition: width 0.5s ease;
    }
    ul {
      text-align: left;
      display: inline-block;
      margin: 0 auto 1rem;
      padding: 0;
      list-style: none;
    }
    ul li {
      margin: 0.4rem 0;
      color: #d1d5db;
    }
    .mentor-tone {
      margin-top: 1rem;
      color: #d4af37;
      font-style: italic;
    }
    .mentor-feedback {
      margin-top: 1.5rem;
      text-align: left;
    }
    .mentor-item { margin-bottom: 1rem; }
    .wrong { color: #ef4444; font-weight: 600; }
    .right { color: #10b981; }
    .mentor-tip { color: #d4af37; margin-top: .3rem; }
    hr { border: none; border-top: 1px solid rgba(212,175,55,0.2); margin: 0.8rem 0; }
    #nextBtn {
      margin-top: 2rem;
      background: linear-gradient(90deg, #3b82f6, #d4af37);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 0.8rem 1.6rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.3s ease;
    }
    #nextBtn:hover { opacity: 0.8; }
  `;
  document.head.appendChild(style);

  // ░░ Logik ░░
  document.getElementById("nextBtn").addEventListener("click", () => {
    window.location.href = "pruefung.html";
  });

  // Speichern für Urkunde
  localStorage.setItem("fsa_finalStatus", finalStatus);
});
