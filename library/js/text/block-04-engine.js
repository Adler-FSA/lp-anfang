// ░░ Baustein 04 – Engine / Kursauswertung & Fortschrittsspeicher ░░
// - speichert je Kurs unter fsa_course{X}_score/status/repeats
// - erhöht repeats nur bei echtem Abschluss (kein Reload)
// - Button: bei Gold -> Weiter zu nächstem Grundkurs, sonst Wiederholen

(function(){
  // Kurs-Schlüssel aus URL ableiten
  function detectCourseKey() {
    const p = (location.pathname || "").toLowerCase();
    if (p.includes("grundkurs-basis")) return {key:"course1", idx:1, next:"grundkurs-sicherheit.html"};
    if (p.includes("grundkurs-sicherheit")) return {key:"course2", idx:2, next:"grundkurs-einkommen.html"};
    if (p.includes("grundkurs-einkommen")) return {key:"course3", idx:3, next:"grundkurs-network.html"};
    if (p.includes("grundkurs-network")) return {key:"course4", idx:4, next:"grundkurs-pruefung-vorbereitung.html"};
    return {key:"course1", idx:1, next:"grundkurs-sicherheit.html"};
  }

  const ctx = detectCourseKey();

  window.showResult = function showResult(triggeredByUser){
    if (triggeredByUser !== true) return;

    // Erwartet: correctCount, totalQuestions, container, courseName, lang, t, renderStats
    const score = typeof window.correctCount === "number" ? window.correctCount : 0;
    const total = typeof window.totalQuestions === "number" ? window.totalQuestions : 10;
    const firstName = localStorage.getItem("fsa_firstName") || "";
    const lastName  = localStorage.getItem("fsa_lastName")  || "";
    const fullName  = `${firstName} ${lastName}`.trim();
    const lang = localStorage.getItem("fsa_lang") || "de";

    // Status-Texte (fallback)
    const defaultT = {
      statuses: { retry:"Wiederholen ❌", bronze:"Bronze 🥉", silver:"Silber 🥈", gold:"Gold 🥇" },
      status: lang==="de" ? "Status" : "Status",
      restart: lang==="de" ? "Kurs wiederholen" : "Repeat course"
    };
    const TT = (window.t && window.t.statuses) ? window.t : defaultT;

    // Status bestimmen
    let status = "", mentorText = "";
    if (score <= 5) {
      status = TT.statuses.retry;
      mentorText = lang==="de"
        ? "Lass dich nicht entmutigen. Versuch es noch einmal – du bist näher am Ziel, als du denkst."
        : "Don’t be discouraged. Try again — you’re closer than you think.";
    } else if (score <= 7) {
      status = TT.statuses.bronze;
      mentorText = lang==="de"
        ? "Gutes Fundament. Bleib konsequent – dein nächster Flug trägt dich höher."
        : "Solid base. Stay consistent — your next flight will take you higher.";
    } else if (score <= 9) {
      status = TT.statuses.silver;
      mentorText = lang==="de"
        ? "Stark! Mit etwas Feinschliff erreichst du volle Souveränität."
        : "Strong! With a bit more refinement, you’ll reach sovereignty.";
    } else {
      status = TT.statuses.gold;
      mentorText = lang==="de"
        ? "Großartig! Du hast die Prinzipien wirklich verinnerlicht."
        : "Outstanding! You’ve internalized the core principles.";
    }

    // Fortschritt speichern (nur bei echtem Abschluss)
    (function saveCourseProgress(courseKey, score, status){
      if (score <= 0 && !status) return;
      localStorage.setItem(`fsa_${courseKey}_score`, String(score));
      localStorage.setItem(`fsa_${courseKey}_status`, status);

      const rKey = `fsa_${courseKey}_repeats`;
      const repeats = parseInt(localStorage.getItem(rKey) || "0", 10);
      localStorage.setItem(rKey, String(repeats + 1));

      if (status.toLowerCase().includes("gold")) {
        localStorage.setItem(`fsa_${courseKey}_passed`, "true");
      }

      const allDone = ["course1","course2","course3","course4"].every(k => localStorage.getItem(`fsa_${k}_status`));
      if (allDone) localStorage.setItem("fsa_allCoursesDone", "true");
      else localStorage.removeItem("fsa_allCoursesDone");
    })(ctx.key, score, status);

    localStorage.setItem("fsa_lastScore", String(score));
    localStorage.setItem("fsa_lastStatus", status);

    // UI Farben/Balken
    const percent = Math.round((score / total) * 100);
    const color = score <= 5 ? "#ef4444" : score <=7 ? "#cd7f32" : score <=9 ? "#93c5fd" : "#d4af37";

    // Button-Logik
    const isGold = status.toLowerCase().includes("gold");
    const buttonLabel = isGold
      ? (lang==="de" ? (ctx.idx<4 ? "Weiter zum nächsten Kurs →" : "Zur Prüfungsvorbereitung →")
                     : (ctx.idx<4 ? "Continue to next course →" : "Go to exam prep →"))
      : (lang==="de" ? "Kurs wiederholen" : "Repeat course");

    const buttonAction = isGold
      ? () => { window.location.href = ctx.next + "?nocache=" + Date.now(); }
      : () => { location.reload(); };

    // Render
    const container = window.container || document.querySelector("#quiz-root") || document.body;
    const courseName = window.courseName || (lang==="de" ? "Grundkurs" : "Course");

    container.innerHTML = `
      <div style="background:rgba(17,24,39,0.8);border:1px solid ${color};
        border-radius:12px;padding:2rem;text-align:center;
        box-shadow:0 0 25px rgba(212,175,55,0.15);margin-top:1cm;">
        <h2 style="color:${color};font-size:1.6rem;margin-bottom:0.4rem;">${courseName}</h2>
        ${fullName ? `<p style="font-size:1.05rem;color:#94a3b8;margin-bottom:1.2rem;">
          ${lang==="de"?"Auswertung für":"Evaluation for"} <strong>${fullName}</strong>
        </p>` : ""}
        ${typeof window.renderStats==="function" ? window.renderStats() : ""}
        <div style="margin:1rem auto 1.4rem auto;width:80%;background:#1e293b;border-radius:8px;height:16px;overflow:hidden;">
          <div style="width:${percent}%;height:100%;background:${color};transition:width 1s ease;"></div>
        </div>
        <p style="margin-bottom:0.8rem;">
          ${lang==="de"
            ? `Du hast <strong>${score}</strong> von <strong>${total}</strong> Fragen richtig.`
            : `You answered <strong>${score}</strong> out of <strong>${total}</strong> correctly.`}
        </p>
        <p style="margin-bottom:1rem;">
          ${lang==="de"?"Status":"Status"}: <strong style="color:${color};">${status}</strong>
        </p>
        <blockquote style="font-style:italic;color:#e5e7eb;background:rgba(255,255,255,0.05);
          border-left:4px solid ${color};padding:1rem 1.5rem;border-radius:6px;
          margin:1.2rem auto;max-width:700px;">“${mentorText}”</blockquote>
        <button id="courseActionBtn" style="display:block;margin:2rem auto 0 auto;
          background:rgba(0,0,0,0.7);border:1px solid rgba(212,175,55,0.6);
          color:#d4af37;padding:0.8rem 1.6rem;border-radius:6px;cursor:pointer;transition:all .3s ease;">
          ${buttonLabel}
        </button>
      </div>`;

    document.getElementById("courseActionBtn")?.addEventListener("click", buttonAction);
  };

  console.log("✅ Engine aktiv – speichert pro Kurs & steuert Weiter/Wiederholen dynamisch.");
})();
