// ░░ Baustein 04 – Kursauswertung & Fortschrittsspeicher (v2.0) ░░
// • Kein „Wiederholen“-Status mehr
// • Status: Bronze (6–7), Silber (8–9), Gold (10)
// • Button: Gold -> nächster Kurs, sonst „Kurs wiederholen“ (setzt nur diesen Kurs zurück)

(function () {
  // Kurs-Kontext bestimmen
  function detectCourseKey() {
    const p = (location.pathname || "").toLowerCase();
    if (p.includes("grundkurs-basis")) return { key: "course1", idx: 1, next: "grundkurs-sicherheit.html" };
    if (p.includes("grundkurs-sicherheit")) return { key: "course2", idx: 2, next: "grundkurs-einkommen.html" };
    if (p.includes("grundkurs-einkommen")) return { key: "course3", idx: 3, next: "grundkurs-network.html" };
    if (p.includes("grundkurs-network")) return { key: "course4", idx: 4, next: "grundkurs-pruefung-vorbereitung.html" };
    return { key: "course1", idx: 1, next: "grundkurs-sicherheit.html" };
  }

  const ctx = detectCourseKey();

  window.showResult = function showResult(triggeredByUser) {
    if (triggeredByUser !== true) return;

    const score = window.correctCount || 0;
    const total = window.totalQuestions || 10;
    const lang = localStorage.getItem("fsa_lang") || "de";
    const first = localStorage.getItem("fsa_firstName") || "";
    const last = localStorage.getItem("fsa_lastName") || "";
    const fullName = `${first} ${last}`.trim();

    // Statuslogik
    let status = "", mentorText = "";
    if (score <= 5) {
      status = "—";
      mentorText = lang === "de"
        ? "Mach weiter – jede Wiederholung stärkt dein Fundament."
        : "Keep going — every round strengthens your foundation.";
    } else if (score <= 7) {
      status = "Bronze 🥉";
      mentorText = lang === "de"
        ? "Guter Start! Du hast das Fundament verstanden."
        : "Good start! You’ve understood the basics.";
    } else if (score <= 9) {
      status = "Silber 🥈";
      mentorText = lang === "de"
        ? "Stark! Du bist auf einem sehr guten Weg."
        : "Strong! You’re well on your way.";
    } else {
      status = "Gold 🥇";
      mentorText = lang === "de"
        ? "Ausgezeichnet! Du hast das Thema vollständig gemeistert."
        : "Excellent! You’ve mastered this topic.";
    }

    // Fortschritt speichern
    localStorage.setItem(`fsa_${ctx.key}_score`, String(score));
    localStorage.setItem(`fsa_${ctx.key}_status`, status);
    if (status.includes("Gold")) localStorage.setItem(`fsa_${ctx.key}_passed`, "true");

    // Prüfungsvorbereitung: globaler Marker
    const all = ["course1", "course2", "course3", "course4"];
    const done = all.every(k => localStorage.getItem(`fsa_${k}_status`));
    localStorage.setItem("fsa_allCoursesDone", done ? "true" : "false");

    // UI
    const color =
      score <= 5 ? "#ef4444" :
      score <= 7 ? "#cd7f32" :
      score <= 9 ? "#93c5fd" : "#d4af37";
    const percent = Math.round((score / total) * 100);

    const isGold = status.includes("Gold");
    const label = isGold
      ? (lang === "de"
          ? (ctx.idx < 4 ? "Weiter zum nächsten Kurs →" : "Zur Prüfungsvorbereitung →")
          : (ctx.idx < 4 ? "Continue to next course →" : "Go to exam prep →"))
      : (lang === "de" ? "Kurs wiederholen" : "Repeat course");

    const action = isGold
      ? () => (window.location.href = ctx.next + "?nocache=" + Date.now())
      : () => {
          // nur diesen Kurs zurücksetzen
          localStorage.removeItem(`fsa_${ctx.key}_score`);
          localStorage.removeItem(`fsa_${ctx.key}_status`);
          localStorage.removeItem(`fsa_${ctx.key}_passed`);
          location.reload();
        };

    const container = document.querySelector("#quiz-root") || document.body;
    container.innerHTML = `
      <div style="background:rgba(17,24,39,0.85);border:1px solid ${color};
        border-radius:12px;padding:2rem;text-align:center;max-width:900px;margin:1cm auto;
        box-shadow:0 0 25px rgba(212,175,55,0.15);">
        <h2 style="color:${color};font-size:1.6rem;margin-bottom:.4rem;">${
          lang === "de" ? "Ergebnis" : "Result"
        }</h2>
        <p style="color:#94a3b8;margin:.6rem 0 1.2rem;">${
          lang === "de" ? "Auswertung für" : "Evaluation for"
        } <strong>${fullName}</strong></p>
        <div style="margin:1rem auto 1.4rem;width:80%;background:#1e293b;border-radius:8px;height:16px;overflow:hidden;">
          <div style="width:${percent}%;height:100%;background:${color};transition:width 1s ease;"></div>
        </div>
        <p>${lang === "de"
          ? `Du hast <strong>${score}</strong> von <strong>${total}</strong> Fragen richtig.`
          : `You answered <strong>${score}</strong> of <strong>${total}</strong> correctly.`}</p>
        <p>${lang === "de" ? "Status" : "Status"}:
          <strong style="color:${color};">${status}</strong></p>
        <blockquote style="font-style:italic;color:#e5e7eb;background:rgba(255,255,255,0.05);
          border-left:4px solid ${color};padding:1rem 1.5rem;border-radius:6px;
          margin:1.2rem auto;max-width:700px;">“${mentorText}”</blockquote>
        <button id="courseActionBtn" style="margin-top:1.6rem;
          background:rgba(0,0,0,0.7);border:1px solid rgba(212,175,55,0.6);
          color:#d4af37;padding:.8rem 1.6rem;border-radius:6px;cursor:pointer;transition:all .3s ease;">
          ${label}
        </button>
      </div>`;
    document.getElementById("courseActionBtn")?.addEventListener("click", action);
  };

  console.log("✅ block-04-engine.js aktiv (v2.0) – Bronze/Silber/Gold, kein Wiederholen-Status.");
})();
