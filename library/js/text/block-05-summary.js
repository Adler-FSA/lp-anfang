// ░░ Baustein 05 – Gesamtauswertung / Qualification Summary (FSA v2.1, zweisprachig) ░░
// Lädt Punktestände, Wiederholungen & Mentor-Feedback aus localStorage (DSGVO-konform)

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  const firstName = localStorage.getItem("fsa_firstName") || "";
  const lastName = localStorage.getItem("fsa_lastName") || "";
  const fullName = `${firstName} ${lastName}`.trim() || (lang === "de" ? "Teilnehmer" : "Participant");

  // ░░ Sprachpaket ░░
  const text = {
    de: {
      title: "🏁 Gesamtauswertung",
      totalScore: "Gesamtpunkte:",
      status: "Qualifikationsstatus:",
      repeats: "Wiederholungen",
      next: "Zur Prüfung weiter ➜",
      feedbackTitle: "💡 Mentor-Feedback zu falschen Antworten:",
      yourAnswer: "Deine Antwort:",
      correctAnswer: "Richtige Antwort:",
      final: {
        repeat: ["Wiederholen ❌", "Bleib dran. Jeder, der durchhält, meistert die Prüfung am Ende."],
        bronze: ["Bronze 🥉", "Ein solider Anfang! Du bist auf dem richtigen Weg – dranbleiben lohnt sich."],
        silver: ["Silber 🥈", "Sehr gut! Dein Wissen wird stabil – du bist fast am Ziel."],
        gold: ["Gold 🥇", "Exzellent! Du hast bewiesen, dass du das Prinzip wirklich verstanden hast."]
      }
    },
    en: {
      title: "🏁 Final Summary",
      totalScore: "Total Score:",
      status: "Qualification Status:",
      repeats: "Repeats",
      next: "Continue to Exam ➜",
      feedbackTitle: "💡 Mentor feedback on incorrect answers:",
      yourAnswer: "Your answer:",
      correctAnswer: "Correct answer:",
      final: {
        repeat: ["Repeat ❌", "Keep going. Everyone who perseveres will master the exam in the end."],
        bronze: ["Bronze 🥉", "A solid start! You’re on the right path – stay consistent."],
        silver: ["Silver 🥈", "Very good! Your knowledge is becoming solid – you’re almost there."],
        gold: ["Gold 🥇", "Excellent! You’ve shown you truly understand the principles."]
      }
    }
  }[lang];

  // ░░ Kursdaten laden ░░
  const courses = [
    { key: "course1", title: lang === "de" ? "Grundkurs 1" : "Basic Course 1" },
    { key: "course2", title: lang === "de" ? "Grundkurs 2" : "Basic Course 2" },
    { key: "course3", title: lang === "de" ? "Grundkurs 3" : "Basic Course 3" },
    { key: "course4", title: lang === "de" ? "Grundkurs 4" : "Basic Course 4" }
  ];

  let totalScore = 0;
  let totalQuestions = 0;
  let summaryList = "";

  courses.forEach(c => {
    const score = parseInt(localStorage.getItem(`fsa_${c.key}_score`) || "0");
    const status = localStorage.getItem(`fsa_${c.key}_status`) || "—";
    const repeats = parseInt(localStorage.getItem(`fsa_${c.key}_repeats`) || "0");
    totalScore += score;
    totalQuestions += 10;
    summaryList += `
      <li>
        ${c.title}: <strong>${score}/10</strong> – ${status}
        <span class="repeats">(${text.repeats}: ${repeats})</span>
      </li>`;
  });

  // ░░ Gesamtstatus berechnen ░░
  const percentage = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
  let finalStatus, mentorTone;

  if (percentage < 60) [finalStatus, mentorTone] = text.final.repeat;
  else if (percentage < 75) [finalStatus, mentorTone] = text.final.bronze;
  else if (percentage < 90) [finalStatus, mentorTone] = text.final.silver;
  else [finalStatus, mentorTone] = text.final.gold;

  // ░░ Mentor-Feedback ░░
  const storedResults = JSON.parse(localStorage.getItem("fsa_course1_results") || "[]");
  let mentorFeedback = "";

  if (storedResults.length > 0) {
    const wrong = storedResults.filter(r => !r.isCorrect);
    if (wrong.length > 0) {
      mentorFeedback += `<div class="mentor-feedback"><h3>${text.feedbackTitle}</h3>`;
      wrong.forEach((r, i) => {
        mentorFeedback += `
          <div class="mentor-item">
            <p><strong>${lang === "de" ? "Frage" : "Question"} ${i + 1}:</strong> ${r.question}</p>
            <p><span class="wrong">${text.yourAnswer}</span> ${r.chosenAnswer}</p>
            <p><span class="right">${text.correctAnswer}</span> ${r.correctAnswer}</p>
            <p class="mentor-tip">🧭 ${r.mentorTip}</p>
          </div><hr>`;
      });
      mentorFeedback += `</div>`;
    }
  }

  // ░░ DOM erzeugen ░░
  const container = document.createElement("div");
  container.className = "summary-container";
  container.innerHTML = `
    <h1>FSA Akademie</h1>
    <h2>${text.title}</h2>
    <p class="username">${fullName}</p>
    <div class="progress-bar"><div class="progress" style="width:${percentage}%;"></div></div>
    <ul>${summaryList}</ul>
    <p><strong>${text.totalScore}</strong> ${totalScore} / ${totalQuestions}</p>
    <p><strong>${text.status}</strong> ${finalStatus}</p>
    <p class="mentor-tone">🧭 ${mentorTone}</p>
    ${mentorFeedback}
    <button id="nextBtn">${text.next}</button>
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
    .summary-container h2 { color:#fff;margin-bottom:.8rem;font-size:1.3rem; }
    .username { color:#9ca3af;margin-bottom:1rem; }
    .progress-bar {
      height:8px;background:rgba(255,255,255,0.1);border-radius:4px;
      margin:1rem auto 1.5rem;overflow:hidden;max-width:400px;
    }
    .progress {height:100%;background:linear-gradient(90deg,#3b82f6,#d4af37);transition:width .5s ease;}
    ul{text-align:left;display:inline-block;margin:0 auto 1rem;padding:0;list-style:none;}
    ul li{margin:.4rem 0;color:#d1d5db;}
    ul li .repeats{color:#9ca3af;font-size:.9rem;margin-left:.3rem;}
    .mentor-tone{margin-top:1rem;color:#d4af37;font-style:italic;}
    .mentor-feedback{margin-top:1.5rem;text-align:left;}
    .mentor-item{margin-bottom:1rem;}
    .wrong{color:#ef4444;font-weight:600;}
    .right{color:#10b981;font-weight:500;}
    .mentor-tip{color:#d4af37;margin-top:.3rem;}
    hr{border:none;border-top:1px solid rgba(212,175,55,0.2);margin:.8rem 0;}
    #nextBtn{
      margin-top:2rem;background:linear-gradient(90deg,#3b82f6,#d4af37);
      color:white;border:none;border-radius:6px;padding:.8rem 1.6rem;
      font-weight:600;cursor:pointer;transition:opacity .3s ease;
    }
    #nextBtn:hover{opacity:.85;}
  `;
  document.head.appendChild(style);

  // ░░ Weiterleitung ░░
  document.getElementById("nextBtn").addEventListener("click", () => {
    window.location.href = "pruefung.html";
  });

  // ░░ Speicherung für Urkunde ░░
  localStorage.setItem("fsa_finalStatus", finalStatus);
});
