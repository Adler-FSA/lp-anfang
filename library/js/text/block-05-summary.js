// ░░ Baustein 05 – Gesamtauswertung / Qualifikations-Summary ░░
// Liest Ergebnisse aus localStorage, berechnet Gesamtstatus
// und zeigt Mentor-Feedback bei falschen Antworten an.

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";

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
    summaryList += `<li>${c.title}: ${score}/10 – ${status}</li>`;
  });

  const percentage = Math.round((totalScore / totalQuestions) * 100);
  let finalStatus = "";
  if (percentage < 60) finalStatus = "Wiederholen ❌";
  else if (percentage < 75) finalStatus = "Bronze 🥉";
  else if (percentage < 90) finalStatus = "Silber 🥈";
  else finalStatus = "Gold 🥇";

  // ░░ Fehleranalyse ░░
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

  // ░░ Zusammenfassung anzeigen ░░
  const container = document.createElement("div");
  container.className = "summary-container";
  container.innerHTML = `
    <h2>${lang === "de" ? "🏁 Gesamtauswertung" : "🏁 Final Summary"}</h2>
    <ul>${summaryList}</ul>
    <p><strong>${lang === "de" ? "Gesamtpunkte:" : "Total Score:"}</strong> ${totalScore} / ${totalQuestions}</p>
    <p><strong>${lang === "de" ? "Qualifikationsstatus:" : "Qualification Status:"}</strong> ${finalStatus}</p>
    ${mentorFeedback}
  `;
  document.body.appendChild(container);

  // Stil
  const style = document.createElement("style");
  style.textContent = `
    .summary-container {margin:1.5cm auto;max-width:900px;padding:1.5rem;
      background:rgba(18,24,33,0.85);border:1px solid rgba(212,175,55,0.35);
      border-radius:14px;box-shadow:0 0 22px rgba(212,175,55,0.08);}
    .summary-container h2 {color:#d4af37;margin-bottom:.5rem;}
    .mentor-feedback {margin-top:1.5rem;}
    .mentor-item {margin-bottom:1rem;}
    .wrong {color:#ef4444;font-weight:600;}
    .right {color:#10b981;}
    .mentor-tip {color:#d4af37;margin-top:.3rem;}
    hr {border:none;border-top:1px solid rgba(212,175,55,0.2);margin:0.8rem 0;}
  `;
  document.head.appendChild(style);

  // Speicherung für Urkunde
  localStorage.setItem("fsa_finalStatus", finalStatus);
});
