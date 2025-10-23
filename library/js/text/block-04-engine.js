// ░░ Baustein 04 – Kursauswertung & Fortschritt (Fix: Pixelgenau kein Springen) ░░
// - Kein Scroll-Springen mehr beim Wechsel der Fragen
// - Behält exakt dieselbe Bildschirmposition bei jedem Render
// - Vollständig kompatibel mit allen Grundkurs-Seiten

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn, { passive: true });

  // ---------- 1) Kurs-Kontext ----------
  function detectCourseCtx() {
    const p = (location.pathname || "").toLowerCase();
    if (p.includes("grundkurs-basis"))      return { key: "course1", idx: 1, next: "grundkurs-sicherheit.html" };
    if (p.includes("grundkurs-sicherheit")) return { key: "course2", idx: 2, next: "grundkurs-einkommen.html" };
    if (p.includes("grundkurs-einkommen"))  return { key: "course3", idx: 3, next: "grundkurs-network.html" };
    if (p.includes("grundkurs-network"))    return { key: "course4", idx: 4, next: "grundkurs-pruefung-vorbereitung.html" };
    return { key: "course1", idx: 1, next: "grundkurs-sicherheit.html" };
  }
  const ctx = detectCourseCtx();

  // ---------- 2) Sprache ----------
  const lang = localStorage.getItem("fsa_lang") || "de";
  const T = (lang === "en") ? {
    you: "Participant",
    resultTitle: "Course Result",
    points: (s, t) => `You answered <strong>${s}</strong> out of <strong>${t}</strong> correctly.`,
    statusLabel: "Status:",
    statuses: { retry: "Repeat ❌", bronze: "Bronze 🥉", silver: "Silver 🥈", gold: "Gold 🥇" },
    mentorListHead: "Mentor feedback on your mistakes:",
    noMistakes: "Perfect round – no mistakes.",
    repeatBtn: "Repeat course",
    nextBtn: (idx) => idx < 4 ? "Continue to next course →" : "Go to exam prep →",
    goldHint: "Each course is only complete when you reach <strong>Gold</strong>. With four courses, four times Gold gives you the qualification of <strong>36 points</strong>. Only then do you unlock your final exam.",
  } : {
    you: "Teilnehmer",
    resultTitle: "Kursauswertung",
    points: (s, t) => `Du hast <strong>${s}</strong> von <strong>${t}</strong> Fragen richtig.`,
    statusLabel: "Status:",
    statuses: { retry: "Wiederholen ❌", bronze: "Bronze 🥉", silver: "Silber 🥈", gold: "Gold 🥇" },
    mentorListHead: "Mentor-Hinweise zu deinen Fehlern:",
    noMistakes: "Perfekte Runde – keine Fehler.",
    repeatBtn: "Kurs wiederholen",
    nextBtn: (idx) => idx < 4 ? "Weiter zum nächsten Kurs →" : "Zur Prüfungsvorbereitung →",
    goldHint: "Jeder Kurs ist erst vollständig, wenn du <strong>Gold</strong> geschafft hast. Bei vier Kursen ergeben viermal Gold deine Qualifikation von <strong>36 Punkten</strong>. Nur dann schaltest du deine Abschlussprüfung frei.",
  };

  // ---------- 3) Status-Funktion ----------
  function statusFrom(score) {
    if (score <= 5) return T.statuses.retry;
    if (score <= 7) return T.statuses.bronze;
    if (score <= 9) return T.statuses.silver;
    return T.statuses.gold;
  }

  // ---------- 4) Mentor-Hinweise ----------
  function buildMistakeList() {
    try {
      const data = (window.block03_course && (window.block03_course[lang] || window.block03_course.de)) || null;
      const questions = data?.questions || [];
      const answers = Array.isArray(window.__answers) ? window.__answers : [];
      const items = [];

      for (let i = 0; i < Math.min(questions.length, answers.length); i++) {
        const q = questions[i];
        const choice = answers[i];
        if (!q || choice == null) continue;
        const opt = q.a?.[choice];
        if (!opt?.correct) {
          const text = q.mentor?.wrong || q.mentor || "";
          items.push(`<li style="margin:.35rem 0;"><strong>Q${i + 1}.</strong> ${text}</li>`);
        }
      }
      if (!items.length) return `<p style="color:#9ca3af">${T.noMistakes}</p>`;
      return `<ul style="text-align:left;color:#e5e7eb;line-height:1.6;margin:.6rem 0 0 1.1rem;">${items.join("")}</ul>`;
    } catch (_) { return ""; }
  }

  // ---------- 5) Fix: exakte Sichtfeld-Position ----------
  const quizRoot = document.getElementById("quiz-root") || document.body;
  let fixedTop = null;

  const keepExactView = () => {
    if (fixedTop === null) fixedTop = quizRoot.getBoundingClientRect().top + window.scrollY;
    const currentTop = quizRoot.getBoundingClientRect().top + window.scrollY;
    if (Math.abs(currentTop - fixedTop) > 3) {
      window.scrollTo({ top: fixedTop, behavior: "instant" });
    }
  };

  const observer = new MutationObserver(keepExactView);
  observer.observe(quizRoot, { childList: true, subtree: true });

  // ---------- 6) Ergebnisanzeige ----------
  window.showResult = function showResult(triggeredByUser) {
    if (triggeredByUser !== true) return;

    const first = localStorage.getItem("fsa_firstName") || "";
    const last  = localStorage.getItem("fsa_lastName")  || "";
    const full  = (first + " " + last).trim() || T.you;

    const score = Number(window.correctCount || 0);
    const total = Number(window.totalQuestions || 10);
    const percent = Math.max(0, Math.min(100, Math.round((score / total) * 100)));
    const color = score <= 5 ? "#ef4444" : score <= 7 ? "#cd7f32" : score <= 9 ? "#93c5fd" : "#d4af37";
    const status = statusFrom(score);

    localStorage.setItem(`fsa_${ctx.key}_score`, String(score));
    localStorage.setItem(`fsa_${ctx.key}_status`, status);
    if (/Gold/i.test(status)) localStorage.setItem(`fsa_${ctx.key}_passed`, "true");
    else localStorage.removeItem(`fsa_${ctx.key}_passed`);

    const mistakes = buildMistakeList();

    quizRoot.innerHTML = `
      <section class="card" style="margin:1.2cm auto 0;max-width:920px;border-color:${color}">
        <h2 style="color:${color};margin:0 0 .4rem 0">${T.resultTitle}</h2>
        <p style="margin:.2rem 0 .8rem 0;color:#94a3b8">${full}</p>

        <div style="height:12px;background:rgba(255,255,255,.08);border-radius:8px;overflow:hidden;margin:.4rem 0 1rem 0;">
          <div style="height:100%;width:${percent}%;background:${color};transition:width .6s ease;"></div>
        </div>

        <p style="margin:.2rem 0 0 0">${T.points(score, total)}</p>
        <p style="margin:.2rem 0 .8rem 0">${T.statusLabel} <strong style="color:${color}">${status}</strong></p>

        <div style="margin:1rem 0;padding:1rem 1.2rem;background:rgba(255,255,255,.05);border-left:4px solid ${color};border-radius:8px;">
          <strong style="display:block;margin-bottom:.35rem">${T.mentorListHead}</strong>
          ${mistakes}
        </div>

        <div style="margin:1rem 0;padding:.85rem 1rem;border:1px dashed ${color};border-radius:10px;color:#e5e7eb;">
          ${T.goldHint}
        </div>

        <div style="display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1.2rem">
          ${
            /Gold/i.test(status)
              ? `<button id="nextCourseBtn" class="btn" style="background:linear-gradient(90deg,#3b82f6,#d4af37);color:#fff;border:0;border-radius:8px;padding:.7rem 1.2rem;font-weight:700;cursor:pointer;">
                   ${T.nextBtn(ctx.idx)}
                 </button>`
              : ``
          }
          <button id="restartBtn" class="btn" style="background:rgba(0,0,0,.6);color:#d4af37;border:1px solid rgba(212,175,55,.45);border-radius:8px;padding:.7rem 1.2rem;font-weight:600;cursor:pointer;">
            🔄 ${T.repeatBtn}
          </button>
        </div>
      </section>
    `;

    on($("#restartBtn"), "click", () => {
      ["score", "status", "passed"].forEach(k => localStorage.removeItem(`fsa_${ctx.key}_${k}`));
      try { window.__answers = []; } catch(_) {}
      location.reload();
    });

    if (/Gold/i.test(status)) {
      on($("#nextCourseBtn"), "click", () => {
        window.location.href = `${ctx.next}?nocache=${Date.now()}`;
      });
    }

    keepExactView();
  };

  console.log("✅ block-04-engine.js geladen: pixelgenauer Sichtfeld-Fix aktiv.");
})();
