<!-- Datei: /library/js/text/block-04-engine.js -->
<script>
// ░░ Baustein 04 – Kursauswertung & Fortschritt (final, DE/EN) ░░
// - Kein Auto-Trigger beim Laden
// - Keine Repeat-Zähler; nur Score/Status speichern
// - Weiter-Button nur bei GOLD -> nächster Kurs, sonst neutraler Neustart-Button (ohne Wort "Wiederholen")
// - Mentor-Feedback zu falschen Antworten (aus block03_course)
// - Keine erzwungene Scrollbewegung (Anti-Sprung-Patch bleibt extern zuständig)

(function () {
  // ---------- Utilities ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn, { passive: true });

  // ---------- Kurs-Kontext aus URL ----------
  function detectCourseCtx() {
    const p = (location.pathname || "").toLowerCase();
    if (p.includes("grundkurs-basis"))      return { key: "course1", idx: 1, next: "grundkurs-sicherheit.html", name_de:"Grundkurs 1 – Basis", name_en:"Course 1 – Foundation" };
    if (p.includes("grundkurs-sicherheit")) return { key: "course2", idx: 2, next: "grundkurs-einkommen.html",  name_de:"Grundkurs 2 – Sicherheit", name_en:"Course 2 – Security" };
    if (p.includes("grundkurs-einkommen"))  return { key: "course3", idx: 3, next: "grundkurs-network.html",    name_de:"Grundkurs 3 – Einkommen", name_en:"Course 3 – Income" };
    if (p.includes("grundkurs-network"))    return { key: "course4", idx: 4, next: "grundkurs-pruefung-vorbereitung.html", name_de:"Grundkurs 4 – Network", name_en:"Course 4 – Network" };
    return { key: "course1", idx: 1, next: "grundkurs-sicherheit.html", name_de:"Grundkurs 1 – Basis", name_en:"Course 1 – Foundation" };
  }
  const ctx = detectCourseCtx();

  // ---------- i18n Texte (ausformuliert nach Vorgabe) ----------
  function i18n(lang) {
    const de = {
      you: "Teilnehmer",
      title: "Kursauswertung – Dein aktueller Fortschritt",
      intro: "Dieser Kurs ist abgeschlossen. Du siehst hier, wie viele Fragen du richtig beantwortet hast – und welche Themen du noch einmal vertiefen solltest. Fehler sind kein Versagen, sondern ein Signal: Sie zeigen, wo dein Verständnis noch wachsen darf.",
      points: (s, t) => `Du hast <strong>${s}</strong> von <strong>${t}</strong> Fragen richtig beantwortet.`,
      statusLabel: "Aktueller Status:",
      statuses: { train: "Weiter trainieren", bronze: "Bronze 🥉", silver: "Silber 🥈", gold: "Gold 🥇" },
      mentorHead: "Mentor-Hinweise zu deinen Fehlern:",
      noMistakes: "Perfekte Runde – keine Fehler.",
      // Status-Hinweise
      msg_bronze: "Du hast ein gutes Fundament gelegt, aber dir fehlt noch Klarheit in wichtigen Punkten. Sieh dir die Mentor-Hinweise genau an – sie zeigen dir, wo dein Denken noch von alten Mustern geprägt ist. Vertiefe diese Bereiche, bevor du weitergehst.",
      msg_silver: "Du bist auf dem richtigen Weg. Einige Themen hast du verstanden, doch dein Wissen ist noch nicht vollständig verankert. Wiederhole gezielt die Fragen, die du falsch beantwortet hast, und lies die Mentor-Texte dazu aufmerksam. Aus Wissen entsteht Sicherheit – und Sicherheit führt zu Souveränität.",
      msg_gold:   "Stark – du hast alle Fragen richtig beantwortet und den Kurs vollständig gemeistert. Damit hast du dir einen von vier Gold-Statuspunkten gesichert. Wenn du in allen vier Kursen Gold erreichst, entsteht daraus deine Qualifikation mit 36 Punkten. Erst dann schaltest du deine Abschlussprüfung frei. Bleib dran – das ist der Weg zur echten finanziellen Souveränität.",
      goldHint: 'Jeder Kurs ist erst vollständig, wenn du <strong>Gold</strong> geschafft hast. Bei vier Kursen ergeben viermal Gold deine Qualifikation von <strong>36 Punkten</strong>. Nur dann schaltest du deine Abschlussprüfung frei.',
      // Buttons
      btn_next: (idx) => idx < 4 ? "Weiter zum nächsten Kurs →" : "Zur Prüfungsvorbereitung →",
      btn_restart: "Kurs neu starten",
      // Kursnamen
      courseName: ctx.name_de,
    };

    const en = {
      you: "Participant",
      title: "Course Evaluation – Your Current Progress",
      intro: "This course is completed. Here you can see how many questions you answered correctly – and which topics need deeper reflection. Mistakes are not failure; they are feedback. They show you where your understanding still has room to grow.",
      points: (s, t) => `You answered <strong>${s}</strong> out of <strong>${t}</strong> correctly.`,
      statusLabel: "Current status:",
      statuses: { train: "Keep training", bronze: "Bronze 🥉", silver: "Silver 🥈", gold: "Gold 🥇" },
      mentorHead: "Mentor feedback on your mistakes:",
      noMistakes: "Perfect round — no mistakes.",
      // Status notes
      msg_bronze: "You’ve built a foundation, but key concepts still need clarity. Read the mentor’s notes carefully — they reveal where old patterns still influence your thinking. Strengthen these points before moving on.",
      msg_silver: "You’re on the right track. You’ve grasped several ideas, but your understanding isn’t fully anchored yet. Review the questions you missed and take time with the mentor’s feedback. Knowledge creates confidence — and confidence builds sovereignty.",
      msg_gold:   "Excellent — you’ve answered all questions correctly and fully mastered this course. You’ve earned one of four Gold achievements. Earning Gold in all four courses equals 36 points, unlocking your final exam. Keep going — this is your path to real financial sovereignty.",
      goldHint: 'A course is only complete when you’ve reached <strong>Gold</strong>. Four times Gold equals <strong>36 points</strong> — your qualification for the final exam.',
      // Buttons
      btn_next: (idx) => idx < 4 ? "Continue to next course →" : "Go to exam prep →",
      btn_restart: "Start course again",
      courseName: ctx.name_en,
    };

    return lang === "en" ? en : de;
  }

  // ---------- Status aus Score ----------
  function statusFrom(score, T) {
    if (score <= 5) return T.statuses.train;   // keine "Wiederholen"-Wortwahl
    if (score <= 7) return T.statuses.bronze;
    if (score <= 9) return T.statuses.silver;
    return T.statuses.gold;
  }

  // ---------- Mentor-Fehlerliste aus Kursdaten ----------
  function buildMistakeList(lang) {
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
        const isCorrect = !!opt?.correct;
        if (!isCorrect) {
          // Mentor-Text für falsche Antwort
          const wrongText = (q.mentor && (q.mentor.wrong || q.mentor)) || "";
          items.push(
            `<li style="margin:.35rem 0;">
              <strong>Q${i + 1}.</strong> ${wrongText}
            </li>`
          );
        }
      }

      if (!items.length) return "NO_MISTAKES";
      return `<ul style="text-align:left;color:#e5e7eb;line-height:1.6;margin:.6rem 0 0 1.1rem;">${items.join("")}</ul>`;
    } catch (_) {
      return ""; // Fallback
    }
  }

  // ---------- Öffentliche Abschluss-Funktion ----------
  window.showResult = function showResult(triggeredByUser) {
    if (triggeredByUser !== true) return;

    const lang = localStorage.getItem("fsa_lang") || "de";
    const T = i18n(lang);

    const first = localStorage.getItem("fsa_firstName") || "";
    const last  = localStorage.getItem("fsa_lastName")  || "";
    const full  = (first + " " + last).trim() || T.you;

    const score = Number(window.correctCount || 0);
    const total = Number(window.totalQuestions || 10);
    const percent = Math.max(0, Math.min(100, Math.round((score / total) * 100)));
    const color  = score <= 5 ? "#ef4444" : score <= 7 ? "#cd7f32" : score <= 9 ? "#93c5fd" : "#d4af37";
    const status = statusFrom(score, T);

    // Fortschritt speichern (nur Score/Status/Passed-Flag)
    localStorage.setItem(`fsa_${ctx.key}_score`, String(score));
    localStorage.setItem(`fsa_${ctx.key}_status`, status);
    if (/Gold/i.test(status)) {
      localStorage.setItem(`fsa_${ctx.key}_passed`, "true");
    } else {
      localStorage.removeItem(`fsa_${ctx.key}_passed`);
    }

    const mistakesHTML = buildMistakeList(lang);
    const hasMistakes = (mistakesHTML !== "NO_MISTAKES" && mistakesHTML !== "");

    // Status-spezifischer Mentor-Kommentar
    let statusMsg = "";
    if (/Gold/i.test(status))      statusMsg = T.msg_gold;
    else if (/Silber|Silver/i.test(status)) statusMsg = T.msg_silver;
    else if (/Bronze/i.test(status))         statusMsg = T.msg_bronze;
    else statusMsg = ""; // Trainingsstatus: keine extra Wall-of-Text

    // Render in #quiz-root (ersetzt Fragen-UI)
    const mount = document.getElementById("quiz-root") || document.body;
    mount.innerHTML = `
      <section class="card" style="margin:1.2cm auto 0;max-width:920px;border:1px solid ${color};border-radius:12px;background:rgba(17,24,39,0.78);">
        <h2 style="color:${color};margin:.2rem 0 .4rem 0">${T.title}</h2>
        <p style="color:#94a3b8;margin:0 0 1rem 0;">${full} · ${T.courseName}</p>

        <p style="margin:.2rem 0 .6rem 0">${T.intro}</p>

        <div style="height:12px;background:rgba(255,255,255,.08);border-radius:8px;overflow:hidden;margin:.6rem 0 1rem 0;">
          <div style="height:100%;width:${percent}%;background:${color};transition:width .6s ease;"></div>
        </div>

        <p style="margin:.2rem 0 0 0">${T.points(score, total)}</p>
        <p style="margin:.2rem 0 .8rem 0">${T.statusLabel} <strong style="color:${color}">${status}</strong></p>

        <div style="margin:1rem 0;padding:1rem 1.2rem;background:rgba(255,255,255,.05);border-left:4px solid ${color};border-radius:8px;">
          <strong style="display:block;margin-bottom:.35rem">${T.mentorHead}</strong>
          ${hasMistakes ? mistakesHTML : `<p style="color:#9ca3af">${T.noMistakes}</p>`}
        </div>

        <div style="margin:1rem 0;padding:.85rem 1rem;border:1px dashed ${color};border-radius:10px;color:#e5e7eb;">
          ${T.goldHint}
        </div>

        ${statusMsg ? `<blockquote style="font-style:italic;color:#e5e7eb;background:rgba(255,255,255,0.04);
            border-left:4px solid ${color};padding:1rem 1.2rem;border-radius:8px;margin:1rem 0;">
            ${statusMsg}
          </blockquote>` : ""}

        <div style="display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1.2rem">
          ${
            /Gold/i.test(status)
              ? `<button id="nextCourseBtn" class="btn"
                    style="background:linear-gradient(90deg,#3b82f6,#d4af37);color:#fff;border:0;border-radius:8px;padding:.7rem 1.2rem;font-weight:700;cursor:pointer;">
                   ${T.btn_next(ctx.idx)}
                 </button>`
              : ""
          }
          <button id="restartBtn" class="btn"
            style="background:rgba(0,0,0,.6);color:#d4af37;border:1px solid rgba(212,175,55,.45);border-radius:8px;padding:.7rem 1.2rem;font-weight:600;cursor:pointer;">
            🔄 ${T.btn_restart}
          </button>
        </div>
      </section>
    `;

    on($("#restartBtn"), "click", () => {
  // Nur Daten des AKTUELLEN Kurses löschen (hier: course1/Basis)
  const prefix = `fsa_${ctx.key}_`; // ctx.key == "course1" auf /grundkurs-basis.html
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith(prefix)) localStorage.removeItem(k);
    // Altlasten vorsichtshalber mit entsorgen:
    if (k.includes("repeat") && k.includes(ctx.key)) localStorage.removeItem(k);
  });

  // Antwortenpuffer der Runde verwerfen
  try { window.__answers = []; } catch (_) {}

  // Frischer Reload ohne Cache (verhindert alten Zustand)
  const url = new URL(location.href);
  url.searchParams.set("nocache", Date.now().toString());
  location.replace(url.toString());
});

    if (/Gold/i.test(status)) {
      on($("#nextCourseBtn"), "click", () => {
        window.location.href = `${ctx.next}?nocache=${Date.now()}`;
      });
    }

    // Keine Scroll-Erzwingung hier, damit der Anti-Sprung-Patch die Kontrolle behält.
  };

  console.log("✅ block-04-engine.js aktiv: finale Auswertung ohne Wiederholungszähler & ohne 'Wiederholen'-Wort.");
})();
</script>
