// ░░ Baustein 04 – Engine / Kursauswertung & Fortschrittsspeicher (v2.3.5) ░░
// Fix: Wiederholungszähler nur bei manuellem Abschluss, kein Auto-Trigger durch Reload
// Fix: Fortschritt, Name & Mentor-Kommentar stabil über mehrere Sitzungen hinweg

function showResult(triggeredByUser = false) {
  // Nur reagieren, wenn vom Benutzer ausgelöst (z. B. Button „Auswerten“)
  if (!triggeredByUser) return;

  const score = typeof correctCount === "number" ? correctCount : 0;
  const firstName = localStorage.getItem("fsa_firstName") || "";
  const lastName  = localStorage.getItem("fsa_lastName")  || "";
  const fullName  = `${firstName} ${lastName}`.trim();

  // ░░ Status bestimmen ░░
  let status = "", mentorText = "";
  if (score <= 5) {
    status = t.statuses.retry;
    mentorText = lang === "de"
      ? "Lass dich nicht entmutigen. Jeder Adler hebt sich erst durch die ersten Flügelschläge. Versuch es noch einmal – du bist näher am Ziel, als du denkst."
      : "Don’t be discouraged. Every eagle learns to soar by its first wingbeats. Try again — you’re closer than you think.";
  } else if (score <= 7) {
    status = t.statuses.bronze;
    mentorText = lang === "de"
      ? "Ein gutes Fundament. Du hast verstanden, worum es geht. Bleib konsequent, der nächste Flug trägt dich höher."
      : "A solid foundation. You’ve grasped the essence. Stay consistent — your next flight will take you higher.";
  } else if (score <= 9) {
    status = t.statuses.silver;
    mentorText = lang === "de"
      ? "Starke Leistung. Du zeigst Disziplin und Verständnis. Mit etwas mehr Feinschliff erreichst du die volle Souveränität."
      : "Strong performance. You show discipline and understanding. With a bit more refinement, you’ll reach full sovereignty.";
  } else {
    status = t.statuses.gold;
    mentorText = lang === "de"
      ? "Großartig! Du hast die Prinzipien wirklich verinnerlicht. Diese Klarheit ist die wahre Stärke der finanziellen Freiheit."
      : "Outstanding! You’ve internalized the core principles. This clarity is the true strength of financial freedom.";
  }

  // ░░ Fortschritt speichern (nur wenn wirklich abgeschlossen) ░░
  function saveCourseProgress(courseKey, score, status) {
    if (score <= 0 && !status) return; // keine Speicherung bei leerem Ergebnis

    localStorage.setItem(`fsa_${courseKey}_score`, score);
    localStorage.setItem(`fsa_${courseKey}_status`, status);

    // Wiederholungen nur bei aktivem Abschluss
    const repeatKey = `fsa_${courseKey}_repeats`;
    let repeats = parseInt(localStorage.getItem(repeatKey) || "0");
    localStorage.setItem(repeatKey, repeats + 1);

    // Alle vier Kurse abgeschlossen?
    const allDone = ["course1", "course2", "course3", "course4"].every(
      key => localStorage.getItem(`fsa_${key}_status`)
    );
    if (allDone) localStorage.setItem("fsa_allCoursesDone", "true");
    else localStorage.removeItem("fsa_allCoursesDone");
  }

  // ░░ Ergebnis & Status sichern ░░
  localStorage.setItem("fsa_lastScore", score);
  localStorage.setItem("fsa_lastStatus", status);
  saveCourseProgress("course1", score, status);

  // ░░ Fortschrittsanzeige ░░
  const percent = Math.round((score / totalQuestions) * 100);
  const color =
    score <= 5 ? "#ef4444" : score <= 7 ? "#cd7f32" : score <= 9 ? "#93c5fd" : "#d4af37";

  const allDone = localStorage.getItem("fsa_allCoursesDone") === "true";
  const certificateNotice = allDone
    ? `<p style="color:#d4af37;font-weight:600;margin-top:1rem;">
         🎓 ${lang==="de"?"Alle Grundkurse abgeschlossen – Urkunde bereit.":"All basic courses completed – Certificate available."}
       </p>` : "";

  // ░░ Edles Auswertungspanel ░░
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
      <p style="margin-bottom:1rem;">${t.status}: <strong style="color:${color};">${status}</strong></p>
      <blockquote style="font-style:italic;color:#e5e7eb;background:rgba(255,255,255,0.05);
        border-left:4px solid ${color};padding:1rem 1.5rem;border-radius:6px;
        margin:1.2rem auto;max-width:700px;">“${mentorText}”</blockquote>
      ${certificateNotice}
      <button id="restartBtn" style="display:block;margin:2rem auto 0 auto;
        background:rgba(0,0,0,0.7);border:1px solid rgba(212,175,55,0.6);
        color:#d4af37;padding:0.8rem 1.6rem;border-radius:6px;
        cursor:pointer;transition:all 0.3s ease;">${t.restart}</button>
    </div>`;

  // ░░ Neustart nur manuell ░░
  document.getElementById("restartBtn")
    ?.addEventListener("click", () => location.reload());
}

// ░░ Sicherheitsnetz: showResult NIE automatisch aufrufen ░░
window.addEventListener("DOMContentLoaded", () => {
  // kein automatischer Start!
  console.log("✅ Engine v2.3.5 geladen – kein Auto-Trigger aktiv.");
});
