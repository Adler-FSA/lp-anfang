// Baustein 05 – Gesamtauswertung / Qualifikations-Summary
// Liest Kurs-Ergebnisse aus localStorage und berechnet den Gesamtstatus

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";

  // Struktur für spätere Kurse (Grundkurs 1–4)
  const courses = [
    { key: "course1", title: "Grundkurs 1" },
    { key: "course2", title: "Grundkurs 2" },
    { key: "course3", title: "Grundkurs 3" },
    { key: "course4", title: "Grundkurs 4" }
  ];

  // Beispiel: Engine speichert später unter diesen Keys:
  // localStorage.setItem("fsa_course1_score", 8);
  // localStorage.setItem("fsa_course1_status", "Silber 🥈");

  let totalScore = 0;
  let totalQuestions = 0;
  let summaryList = "";

  courses.forEach(c => {
    const score = parseInt(localStorage.getItem(`fsa_${c.key}_score`) || 0);
    const status = localStorage.getItem(`fsa_${c.key}_status`) || "—";
    totalScore += score;
    totalQuestions += 10; // pro Kurs 10 Fragen
    summaryList += `<li>${c.title}: ${score}/10 – ${status}</li>`;
  });

  // Gesamtauswertung
  const percentage = Math.round((totalScore / totalQuestions) * 100);
  let finalStatus = "";
  if (percentage < 60) finalStatus = "Wiederholen ❌";
  else if (percentage < 75) finalStatus = "Bronze 🥉";
  else if (percentage < 90) finalStatus = "Silber 🥈";
  else finalStatus = "Gold 🥇";

  // Ausgabe auf Seite
  const container = document.createElement("div");
  container.className = "summary-container";
  container.innerHTML = `
    <h2>${lang === "de" ? "🏁 Gesamtauswertung" : "🏁 Final Summary"}</h2>
    <ul>${summaryList}</ul>
    <p><strong>${lang === "de" ? "Gesamtpunkte:" : "Total Score:"}</strong> ${totalScore} / ${totalQuestions}</p>
    <p><strong>${lang === "de" ? "Qualifikationsstatus:" : "Qualification Status:"}</strong> ${finalStatus}</p>
  `;
  document.body.appendChild(container);

  // Ergebnis lokal speichern (für Urkunde)
  localStorage.setItem("fsa_finalStatus", finalStatus);
});
