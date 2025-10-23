// ░░ block-04-engine.js – Finale Version (FSA Grundkurs-Auswertung) ░░
// • Kein Wiederholungszähler, kein "Kurs wiederholen"
// • Stabiler Fragenblock ohne Sprung oder Scrollversatz
// • Mentor-Feedback, Gold-Hinweis, DE/EN-Auswertung
// • Fortschrittsspeicherung + Navigation zum nächsten Kurs
// • Sanftes Scrollen ohne Schwarzblitz beim Wechsel

(function () {
  // ---------- Hilfsfunktionen ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn, { passive: true });

  // ---------- Sichtfeldanker ----------
  const quizRoot = document.getElementById("quiz-root") || document.body;
  const keepView = () => {
    const rect = quizRoot.getBoundingClientRect();
    if (rect.top < 60 || rect.top > 200) {
      quizRoot.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollBy(0, -40);
    }
  };
  const obs = new MutationObserver(() => keepView());
  obs.observe(quizRoot, { childList: true, subtree: true });

  // ---------- Kurs-Kontext ----------
  function detectCtx() {
    const p = (location.pathname || "").toLowerCase();
    if (p.includes("grundkurs-basis")) return { key: "course1", idx: 1, next: "grundkurs-sicherheit.html" };
    if (p.includes("grundkurs-sicherheit")) return { key: "course2", idx: 2, next: "grundkurs-einkommen.html" };
    if (p.includes("grundkurs-einkommen")) return { key: "course3", idx: 3, next: "grundkurs-network.html" };
    if (p.includes("grundkurs-network")) return { key: "course4", idx: 4, next: "grundkurs-pruefung-vorbereitung.html" };
    return { key: "course1", idx: 1, next: "grundkurs-sicherheit.html" };
  }
  const ctx = detectCtx();

  // ---------- Sprache ----------
  const lang = localStorage.getItem("fsa_lang") || "de";
  const T = (lang === "en") ? {
    title: "Course Evaluation",
    you: "Participant",
    points: (s, t) => `You answered <strong>${s}</strong> of <strong>${t}</strong> questions correctly.`,
    status: "Status:",
    statuses: { retry: "Repeat ❌", bronze: "Bronze 🥉", silver: "Silver 🥈", gold: "Gold 🥇" },
    mentorHead: "Mentor feedback on incorrect answers:",
    noMistakes: "Perfect round – no mistakes.",
    nextBtn: (idx) => idx < 4 ? "Continue to next course →" : "Go to exam preparation →",
    goldHint: "Each course is only complete when you reach <strong>Gold</strong>. Four times Gold = 36 points = access to your final exam."
  } : {
    title: "Kursauswertung",
    you: "Teilnehmer",
    points: (s, t) => `Du hast <strong>${s}</strong> von <strong>${t}</strong> Fragen richtig beantwortet.`,
    status: "Status:",
    statuses: { retry: "Wiederholen ❌", bronze: "Bronze 🥉", silver: "Silber 🥈", gold: "Gold 🥇" },
    mentorHead: "Mentor-Hinweise zu falschen Antworten:",
    noMistakes: "Perfekte Runde – keine Fehler.",
    nextBtn: (idx) => idx < 4 ? "Weiter zum nächsten Kurs →" : "Zur Prüfungsvorbereitung →",
    goldHint: "Jeder Kurs ist erst vollständig, wenn du <strong>Gold</strong> geschafft hast. Viermal Gold = <strong>36 Punkte</strong> = Zugang zur Abschlussprüfung."
  };

  // ---------- Status aus Score ----------
  function getStatus(score) {
    if (score <= 5) return T.statuses.retry;
    if (score <= 7) return T.statuses.bronze;
    if (score <= 9) return T.statuses.silver;
    return T.statuses.gold;
  }

  // ---------- Mentor-Feedback ----------
  function buildMentorList() {
    try {
      const data = (window.block03_course && (window.block03_course[lang] || window.block03_course.de)) || {};
      const q = data.questions || [];
      const a = Array.isArray(window.__answers) ? window.__answers : [];
      const list = [];
      for (let i = 0; i < q.length; i++) {
        const choice = a[i];
        if (choice == null) continue;
        const correct = q[i].a.findIndex(o => o.correct);
        if (choice !== correct) {
          const t = q[i].mentor?.wrong || q[i].mentor || "";
          list.push(`<li><strong>Q${i + 1}.</strong> ${t}</li>`);
        }
      }
      if (!list.length) return `<p style="color:#9ca3af">${T.noMistakes}</p>`;
      return `<ul style="margin:.5rem 0 0 1rem;line-height:1.6;color:#e5e7eb;">${list.join("")}</ul>`;
    } catch {
      return "";
    }
  }

  // ---------- Anzeige-Funktion ----------
  window.showResult = function (triggered) {
    if (!triggered) return;

    const f = localStorage.getItem("fsa_firstName") || "";
    const l = localStorage.getItem("fsa_lastName") || "";
    const name = (f + " " + l).trim() || T.you;

    const score = Number(window.correctCount || 0);
    const total = Number(window.totalQuestions || 10);
    const percent = Math.round((score / total) * 100);
    const color = score <= 5 ? "#ef4444" : score <= 7 ? "#cd7f32" : score <= 9 ? "#60a5fa" : "#d4af37";
    const status = getStatus(score);
    const isGold = /Gold/i.test(status);

    localStorage.setItem(`fsa_${ctx.key}_score`, score);
    localStorage.setItem(`fsa_${ctx.key}_status`, status);
    if (isGold) localStorage.setItem(`fsa_${ctx.key}_passed`, "true");

    const mistakes = buildMentorList();
    const mount = quizRoot;

    mount.innerHTML = `
      <section class="card" style="margin:1.2cm auto;max-width:920px;border-color:${color}">
        <h2 style="color:${color};margin:0 0 .4rem 0">${T.title}</h2>
        <p style="color:#94a3b8;margin:0 0 1rem 0">${name}</p>
        <div style="height:12px;background:rgba(255,255,255,.08);border-radius:8px;overflow:hidden;margin-bottom:.8rem;">
          <div style="height:100%;width:${percent}%;background:${color};transition:width .6s;"></div>
        </div>
        <p>${T.points(score, total)}</p>
        <p>${T.status} <strong style="color:${color}">${status}</strong></p>
        <div style="margin:1rem 0;padding:1rem;background:rgba(255,255,255,.05);border-left:4px solid ${color};border-radius:8px;">
          <strong>${T.mentorHead}</strong>${mistakes}
        </div>
        <div style="margin:1rem 0;padding:.9rem 1rem;border:1px dashed ${color};border-radius:10px;color:#e5e7eb;">
          ${T.goldHint}
        </div>
        <div style="display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1rem">
          ${isGold ? `<button id="nextCourseBtn" class="btn" style="background:linear-gradient(90deg,#3b82f6,#d4af37);color:#fff;border:0;border-radius:8px;padding:.7rem 1.2rem;font-weight:700;cursor:pointer;">${T.nextBtn(ctx.idx)}</button>` : ""}
        </div>
      </section>
    `;

    if (isGold) {
      on($("#nextCourseBtn"), "click", () => {
        window.location.href = `${ctx.next}?nocache=${Date.now()}`;
      });
    }

    // Sicht fixieren
    mount.scrollIntoView({ behavior: "smooth", block: "start" });
    window.scrollBy(0, -40);
  };

  console.log("✅ block-04-engine.js (final): ohne Wiederholungszähler, stabiler Fragenblock aktiv");
})();
