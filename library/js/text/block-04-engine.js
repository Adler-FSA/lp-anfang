/*!
 * FSA Akademie – block-04-engine.js (v3.0.0)
 * -----------------------------------------
 * Bewertungs-Engine & Fortschrittsspeicher (Bronze/Silber/Gold)
 * Autor: Adler-FSA Projekt
 * Datum: 2025-10-22
 * 
 * Funktionen:
 * - 10-Fragen-Logik mit 4 Bewertungsstufen (Wiederholen / Bronze / Silber / Gold)
 * - Auswertung + Mentor-Kommentar + Feedback falscher Antworten
 * - Speicherung im LocalStorage (DSGVO-konform)
 * - Buttons: Ergebnis speichern / Kurs zurücksetzen / Weiter zu nächstem Kurs
 * - Mobiloptimiertes Layout
 */

(function () {
  // ───────────────────────────────────────────────
  // 1️⃣ Kurs-Key aus URL ableiten
  // ───────────────────────────────────────────────
  function detectCourseKey() {
    const p = (location.pathname || "").toLowerCase();
    if (p.includes("sicherheit")) return "course2";
    if (p.includes("einkommen"))  return "course3";
    if (p.includes("network"))    return "course4";
    return "course1"; // Standard: Grundkurs Basis
  }
  const courseKey = detectCourseKey();

  // ───────────────────────────────────────────────
  // 2️⃣ Sprache & Texte
  // ───────────────────────────────────────────────
  const lang = localStorage.getItem("fsa_lang") || "de";
  const TT = {
    de: {
      evalFor: "Auswertung für",
      youScored: (s, t) => `Du hast <strong>${s}</strong> von <strong>${t}</strong> Fragen richtig beantwortet.`,
      statusLbl: "Status",
      save: "Ergebnis speichern",
      savedHint: "✅ Ergebnis übertragen.",
      cantSave: "ℹ️ Ergebnis unter 6 Punkten wird nicht gespeichert. Bitte Kurs wiederholen.",
      repeat: "Kurs zurücksetzen",
      repeatDone: "🔄 Zurückgesetzt. Kurs kann neu gestartet werden.",
      toNext: n => `Weiter zu Grundkurs ${n} →`,
      wrongTitle: "💡 Mentor-Feedback zu falschen Antworten:",
      yourAnswer: "Deine Antwort:",
      correctAnswer: "Richtige Antwort:",
      explanation: "Hinweis:",
      confirmReset: "Willst du diesen Kurs wirklich zurücksetzen? (Fortschritt wird gelöscht.)"
    },
    en: {
      evalFor: "Evaluation for",
      youScored: (s, t) => `You answered <strong>${s}</strong> out of <strong>${t}</strong> questions correctly.`,
      statusLbl: "Status",
      save: "Save result",
      savedHint: "✅ Result saved.",
      cantSave: "ℹ️ Results below 6 are not saved. Please repeat the course.",
      repeat: "Reset course",
      repeatDone: "🔄 Reset. You can start again.",
      toNext: n => `Continue to Course ${n} →`,
      wrongTitle: "💡 Mentor feedback on incorrect answers:",
      yourAnswer: "Your answer:",
      correctAnswer: "Correct answer:",
      explanation: "Note:",
      confirmReset: "Do you really want to reset this course? (Progress will be cleared.)"
    }
  }[lang];

  // ───────────────────────────────────────────────
  // 3️⃣ Bewertungslogik & Farbzuordnung
  // ───────────────────────────────────────────────
  function getStatus(score) {
    if (score <= 5)  return "Wiederholen ❌";
    if (score === 6) return "Bronze 🥉";
    if (score <= 8)  return "Silber 🥈";
    return "Gold 🥇";
  }
  function getColor(score) {
    if (score <= 5)  return "#ef4444";
    if (score === 6) return "#cd7f32";
    if (score <= 8)  return "#93c5fd";
    return "#d4af37";
  }

  function nextCourseHref(key) {
    if (key === "course1") return "grundkurs-sicherheit.html";
    if (key === "course2") return "grundkurs-einkommen.html";
    if (key === "course3") return "grundkurs-network.html";
    return "grundkurs-pruefung-vorbereitung.html";
  }

  // ───────────────────────────────────────────────
  // 4️⃣ Speicher-Keys
  // ───────────────────────────────────────────────
  const SCORE_KEY   = `fsa_${courseKey}_score`;
  const STATUS_KEY  = `fsa_${courseKey}_status`;
  const REPEAT_KEY  = `fsa_${courseKey}_repeats`;
  const RESULTS_KEY = `fsa_${courseKey}_results`;

  // ───────────────────────────────────────────────
  // 5️⃣ Hauptfunktion showResult()
  // ───────────────────────────────────────────────
  function showResult(triggeredByUser) {
    if (triggeredByUser !== true) return;

    const totalQuestions = typeof window.totalQuestions === "number" ? window.totalQuestions : 10;
    const score = typeof window.correctCount === "number" ? window.correctCount : 0;

    const firstName = localStorage.getItem("fsa_firstName") || "";
    const lastName  = localStorage.getItem("fsa_lastName")  || "";
    const fullName  = `${firstName} ${lastName}`.trim();

    const status  = getStatus(score);
    const color   = getColor(score);
    const percent = Math.round((score / totalQuestions) * 100);

    const courseData = (window.block03_course && (window.block03_course[lang] || window.block03_course.de)) || null;
    const courseName = (courseData && courseData.title) ? courseData.title : "Grundkurs";

    const storedResults = JSON.parse(localStorage.getItem(RESULTS_KEY) || "[]");
    const wrong = storedResults.filter(r => r && r.isCorrect === false);

    const container = document.getElementById("quiz-root") || document.body;

    // Mentor-Kommentar
    let mentorText = "";
    if (score <= 5)
      mentorText = lang === "de" ? "Unter 6 Punkten: Bitte wiederholen." : "Below 6 points: please repeat.";
    else if (score === 6)
      mentorText = lang === "de" ? "Bronze – guter Start!" : "Bronze – solid start!";
    else if (score <= 8)
      mentorText = lang === "de" ? "Silber – fast geschafft!" : "Silver – almost there!";
    else
      mentorText = lang === "de" ? "Gold – stark! Sicher speichern und weiter." : "Gold – excellent! Save and continue.";

    // HTML aufbauen
    let wrongHtml = "";
    if (wrong.length) {
      wrongHtml += `<div class="mentor-feedback"><h3>${TT.wrongTitle}</h3>`;
      wrong.forEach((r, i) => {
        wrongHtml += `
          <div class="mentor-item">
            <p><strong>${lang === "de" ? "Frage" : "Question"} ${i + 1}:</strong> ${r.question || ""}</p>
            ${r.chosenAnswer ? `<p><span class="wrong">${TT.yourAnswer}</span> ${r.chosenAnswer}</p>` : ""}
            ${r.correctAnswer ? `<p><span class="right">${TT.correctAnswer}</span> ${r.correctAnswer}</p>` : ""}
            ${r.mentorTip ? `<p class="mentor-tip">🧭 ${TT.explanation} ${r.mentorTip}</p>` : ""}
          </div><hr>`;
      });
      wrongHtml += `</div>`;
    }

    container.innerHTML = `
      <div class="fsa-result">
        <h2 style="color:${color};">${courseName}</h2>
        ${fullName ? `<p class="username">${TT.evalFor} <strong>${fullName}</strong></p>` : ""}
        <div class="progress-bar"><div class="progress" style="width:${percent}%;background:${color};"></div></div>
        <p>${TT.youScored(score, totalQuestions)}</p>
        <p>${TT.statusLbl}: <strong style="color:${color};">${status}</strong></p>
        <blockquote class="mentor-quote">“${mentorText}”</blockquote>
        ${wrongHtml}
        <div class="action-row">
          <button id="saveResultBtn" class="btn primary">${TT.save}</button>
          <button id="resetCourseBtn" class="btn ghost">${TT.repeat}</button>
          ${score >= 9 && courseKey !== "course4"
            ? `<button id="nextCourseBtn" class="btn link">${TT.toNext(
                 courseKey === "course1" ? 2 : courseKey === "course2" ? 3 : 4
               )}</button>`
            : ""}
        </div>
        <p id="tinyInfo" class="tiny-info"></p>
      </div>
    `;

    injectLocalStyles();
    const info = container.querySelector("#tinyInfo");

    // Ergebnis speichern
    container.querySelector("#saveResultBtn")?.addEventListener("click", () => {
      if (score < 6) return (info.textContent = TT.cantSave);
      localStorage.setItem(SCORE_KEY, score);
      localStorage.setItem(STATUS_KEY, status);
      if (score >= 9) localStorage.setItem(`fsa_${courseKey}_passed`, "true");
      info.textContent = TT.savedHint;
    });

    // Kurs zurücksetzen
    container.querySelector("#resetCourseBtn")?.addEventListener("click", () => {
      if (!confirm(TT.confirmReset)) return;
      localStorage.removeItem(SCORE_KEY);
      localStorage.removeItem(STATUS_KEY);
      localStorage.removeItem(RESULTS_KEY);
      const repeats = parseInt(localStorage.getItem(REPEAT_KEY) || "0", 10);
      localStorage.setItem(REPEAT_KEY, repeats + 1);
      info.textContent = TT.repeatDone;
      setTimeout(() => location.reload(), 800);
    });

    // Weiterleitung bei Gold
    container.querySelector("#nextCourseBtn")?.addEventListener("click", () => {
      localStorage.setItem(SCORE_KEY, score);
      localStorage.setItem(STATUS_KEY, status);
      location.href = nextCourseHref(courseKey) + "?nocache=" + Date.now();
    });
  }

  // Styles
  let stylesInjected = false;
  function injectLocalStyles() {
    if (stylesInjected) return;
    stylesInjected = true;
    const s = document.createElement("style");
    s.textContent = `
      .fsa-result{background:rgba(17,24,39,0.8);border:1px solid rgba(212,175,55,0.45);
        border-radius:12px;padding:1.2rem;margin:1rem auto;max-width:900px;
        box-shadow:0 0 22px rgba(212,175,55,0.12);text-align:center;}
      .progress-bar{height:14px;background:#1e293b;border-radius:8px;overflow:hidden;margin:0.6rem auto 0.8rem;max-width:520px;}
      .progress{height:100%;transition:width 0.8s ease}
      .mentor-feedback{margin-top:0.9rem;text-align:left}
      .mentor-item .wrong{color:#ef4444;font-weight:600}
      .mentor-item .right{color:#10b981;font-weight:600}
      .mentor-tip{color:#d4af37;margin-top:0.25rem}
      .action-row{display:flex;flex-wrap:wrap;gap:0.6rem;justify-content:center;margin-top:1rem}
      .btn{border-radius:8px;padding:0.7rem 1.2rem;cursor:pointer;transition:all .25s ease;font-weight:600;border:1px solid transparent}
      .btn.primary{background:linear-gradient(90deg,#3b82f6,#d4af37);color:#fff;}
      .btn.ghost{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.25);color:#e5e7eb;}
      .btn.link{background:transparent;border:1px solid rgba(212,175,55,0.6);color:#d4af37;}
      @media(max-width:640px){.btn{width:100%;}}
    `;
    document.head.appendChild(s);
  }

  // global verfügbar
  window.showResult = showResult;
  console.log("✅ block-04-engine.js geladen – bereit für showResult(true).");
})();
