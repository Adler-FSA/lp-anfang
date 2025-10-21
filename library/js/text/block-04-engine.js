// ░░ Baustein 04 – Engine / Kursauswertung & Fortschrittsspeicher ░░
// Neu: Button-Aktion reagiert klar auf Status (Wiederholen / Bronze / Silber / Gold)
// Fix: Wiederholungszähler nur bei echtem Abschluss (Button / manuelles Auslösen)
// Fix: Kein Zähl-Trigger bei Reload, Seitenstart oder Fremdaufrufen

function showResult(triggeredByUser) {
  if (triggeredByUser !== true) {
    console.log("🧩 showResult() abgebrochen – kein Benutzertrigger erkannt.");
    return;
  }

  // ░░ Grunddaten ░░
  const score = typeof correctCount === "number" ? correctCount : 0;
  const firstName = localStorage.getItem("fsa_firstName") || "";
  const lastName  = localStorage.getItem("fsa_lastName")  || "";
  const fullName  = `${firstName} ${lastName}`.trim();

  // ░░ Status bestimmen ░░
  let status = "", mentorText = "";
  if (score <= 5) {
    status = "Wiederholen ❌";
    mentorText = lang === "de"
      ? "Lass dich nicht entmutigen. Jeder Adler hebt sich erst durch die ersten Flügelschläge. Versuch es noch einmal – du bist näher am Ziel, als du denkst."
      : "Don’t be discouraged. Every eagle learns to soar by its first wingbeats. Try again — you’re closer than you think.";
  } else if (score <= 7) {
    status = "Bronze 🥉";
    mentorText = lang === "de"
      ? "Ein gutes Fundament. Du hast verstanden, worum es geht. Bleib konsequent, der nächste Flug trägt dich höher."
      : "A solid foundation. You’ve grasped the essence. Stay consistent — your next flight will take you higher.";
  } else if (score <= 9) {
    status = "Silber 🥈";
    mentorText = lang === "de"
      ? "Starke Leistung. Du zeigst Disziplin und Verständnis. Mit etwas mehr Feinschliff erreichst du die volle Souveränität."
      : "Strong performance. You show discipline and understanding. With a bit more refinement, you’ll reach full sovereignty.";
  } else {
    status = "Gold 🥇";
    mentorText = lang === "de"
      ? "Großartig! Du hast die Prinzipien wirklich verinnerlicht. Diese Klarheit ist die wahre Stärke der finanziellen Freiheit."
      : "Outstanding! You’ve internalized the core principles. This clarity is the true strength of financial freedom.";
  }

  // ░░ Fortschritt speichern ░░
  function saveCourseProgress(courseKey, score, status) {
    if (score <= 0 && !status) return;
    localStorage.setItem(`fsa_${courseKey}_score`, score);
    localStorage.setItem(`fsa_${courseKey}_status`, status);

    const repeatKey = `fsa_${courseKey}_repeats`;
    let repeats = parseInt(localStorage.getItem(repeatKey) || "0");
    localStorage.setItem(repeatKey, repeats + 1);

    const allDone = ["course1", "course2", "course3", "course4"].every(
      key => localStorage.getItem(`fsa_${key}_status`)
    );
    allDone
      ? localStorage.setItem("fsa_allCoursesDone", "true")
      : localStorage.removeItem("fsa_allCoursesDone");
  }

  // ░░ Ergebnis sichern ░░
  localStorage.setItem("fsa_lastScore", score);
  localStorage.setItem("fsa_lastStatus", status);
  saveCourseProgress("course1", score, status);

  // ░░ Balkenfarbe ░░
  const percent = Math.round((score / totalQuestions) * 100);
  const color =
    score <= 5 ? "#ef4444" : score <= 7 ? "#cd7f32" : score <= 9 ? "#93c5fd" : "#d4af37";

  // ░░ Kursabschluss-Button ░░
  let buttonLabel = "";
  let buttonAction = null;
  const normalizedStatus = status.toLowerCase().replace(/[^a-z]/g, "");

  if (normalizedStatus.includes("gold")) {
    buttonLabel = lang === "de" ? "Weiter zu Grundkurs 2 →" : "Continue to Course 2 →";
    buttonAction = () => {
      console.log("🎯 Kurs 1 abgeschlossen – Weiterleitung zu Kurs 2");
      window.location.href = "grundkurs-2.html?nocache=" + Date.now();
    };
  } else {
    buttonLabel = lang === "de" ? "Kurs wiederholen" : "Repeat course";
    buttonAction = () => location.reload();
  }

  // ░░ Anzeige ░░
  container.innerHTML = `
    <div style="background:rgba(17,24,39,0.8);border:1px solid ${color};
      border-radius:12px;padding:2rem;text-align:center;
      box-shadow:0 0 25px rgba(212,175,55,0.15);margin-top:1cm;">
      <h2 style="color:${color};font-size:1.6rem;margin-bottom:0.4rem;">${courseName}</h2>
      ${fullName ? `<p style="font-size:1.05rem;color:#94a3b8;margin-bottom:1.2rem;">
        ${lang==="de"?"Auswertung für":"Evaluation for"} <strong>${fullName}</strong>
      </p>` : ""}
      ${renderStats()}
      <div style="margin:1rem auto 1.4rem auto;width:80%;background:#1e293b;border-radius:8px;height:16px;overflow:hidden;">
        <div style="width:${percent}%;height:100%;background:${color};transition:width 1s ease;"></div>
      </div>
      <p style="margin-bottom:0.8rem;">
        ${lang==="de"
          ?`Du hast <strong>${score}</strong> von <strong>${totalQuestions}</strong> Fragen richtig beantwortet.`
          :`You answered <strong>${score}</strong> out of <strong>${totalQuestions}</strong> questions correctly.`}
      </p>
      <p style="margin-bottom:1rem;">${lang==="de"?"Status":"Status"}:
        <strong style="color:${color};">${status}</strong></p>
      <blockquote style="font-style:italic;color:#e5e7eb;background:rgba(255,255,255,0.05);
        border-left:4px solid ${color};padding:1rem 1.5rem;border-radius:6px;
        margin:1.2rem auto;max-width:700px;">“${mentorText}”</blockquote>
      <button id="courseActionBtn" style="display:block;margin:2rem auto 0 auto;
        background:rgba(0,0,0,0.7);border:1px solid rgba(212,175,55,0.6);
        color:#d4af37;padding:0.8rem 1.6rem;border-radius:6px;
        cursor:pointer;transition:all 0.3s ease;">${buttonLabel}</button>
    </div>`;

  // ░░ Button-Aktion aktivieren ░░
  document.getElementById("courseActionBtn")
    ?.addEventListener("click", buttonAction);
}

// ░░ Schutz ░░
window.addEventListener("DOMContentLoaded", () => {
  window.showResult = showResult;
  console.log("✅ Engine aktiv – Kursabschluss-Button reagiert dynamisch auf Status.");
});
