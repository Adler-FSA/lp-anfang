<script>
// ░░ Baustein 03 – Kurs-Engine (v2.4) ░░
// • Fragenblock steht über der Auswertung
// • Kein Repeat-Zähler, keine Auto-Weiterleitungen
// • Fix: kein "Springen" beim Weiterklicken (Scroll-Position wird gehalten)
// • Gold ⇒ Weiter zum nächsten Kurs, sonst "Kurs wiederholen"
// • Hinweis: „Jeder Kurs ist erst vollständig mit Gold… 4×Gold ⇒ 36 Punkte ⇒ Prüfung“

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    const T = {
      de: {
        qLabel: "Frage",
        next: "Weiter",
        finish: "Kurs abschließen",
        selectWarn: "Bitte eine Antwort wählen.",
        right: "Richtig",
        wrong: "Deine Antwort",
        correct: "Korrekt ist",
        resultTitle: "Kursauswertung",
        you: "Teilnehmer",
        scoreLine: (c, t) => `Du hast <strong>${c}</strong> von <strong>${t}</strong> Fragen richtig.`,
        index: (p) => `Wissensindex: <strong>${p}%</strong>`,
        status: "Status",
        statuses: { retry: "Wiederholen ❌", bronze: "Bronze 🥉", silver: "Silber 🥈", gold: "Gold 🥇" },
        motivate: {
          retry: "Bleib dran – Fehler sind Rohstoff für Klarheit.",
          bronze: "Bronze ist nicht Silber – hol dir dein Silber.",
          silver: "Silber ist nicht Gold – geh den letzten Schritt.",
          gold: "Exzellent – Prinzip verstanden. 🦅"
        },
        goldRule:
          "Jeder Kurs ist erst vollständig, wenn du den Status <strong>Gold</strong> erreicht hast. Bei 4 Kursen entstehen so bei viermal Gold deine Qualifikation mit <strong>36 Punkten</strong>. Nur dann erhältst du Zugang zu deiner Abschlussprüfung.",
        btnRepeat: "Kurs wiederholen",
        btnNextCourse: "Weiter zum nächsten Kurs →",
      },
      en: {
        qLabel: "Question",
        next: "Next",
        finish: "Finish course",
        selectWarn: "Please select an answer.",
        right: "Right",
        wrong: "Your answer",
        correct: "Correct is",
        resultTitle: "Course Evaluation",
        you: "Participant",
        scoreLine: (c, t) => `You answered <strong>${c}</strong> out of <strong>${t}</strong> correctly.`,
        index: (p) => `Knowledge index: <strong>${p}%</strong>`,
        status: "Status",
        statuses: { retry: "Repeat ❌", bronze: "Bronze 🥉", silver: "Silver 🥈", gold: "Gold 🥇" },
        motivate: {
          retry: "Keep going — mistakes refine your clarity.",
          bronze: "Bronze isn’t Silver — go earn your Silver.",
          silver: "Silver isn’t Gold — take the final step.",
          gold: "Excellent — principle internalized. 🦅"
        },
        goldRule:
          "Each course is complete only with a <strong>Gold</strong> status. Across four courses, four times Gold equals your qualification with <strong>36 points</strong>. Only then do you unlock your final exam.",
        btnRepeat: "Retake course",
        btnNextCourse: "Continue to next course →",
      }
    }[lang];

    // Kurs-Kontext aus URL ableiten
    const path = (location.pathname || "").toLowerCase();
    const ctx = (function detect() {
      if (path.includes("grundkurs-basis")) return { key: "course1", idx: 1, next: "grundkurs-sicherheit.html" };
      if (path.includes("grundkurs-sicherheit")) return { key: "course2", idx: 2, next: "grundkurs-einkommen.html" };
      if (path.includes("grundkurs-einkommen")) return { key: "course3", idx: 3, next: "grundkurs-network.html" };
      if (path.includes("grundkurs-network")) return { key: "course4", idx: 4, next: "grundkurs-pruefung-vorbereitung.html" };
      return { key: "course1", idx: 1, next: "grundkurs-sicherheit.html" };
    })();

    // Fragen aus block-03-course.js
    if (!window.block03_course) {
      console.warn("⚠️ block-03-course.js fehlt.");
      return;
    }
    const data = window.block03_course[lang] || window.block03_course.de;
    const questions = Array.isArray(data?.questions) ? data.questions : [];
    if (!questions.length) {
      console.warn("⚠️ Keine Fragen vorhanden.");
      return;
    }

    // Mount-Container vorbereiten: QA über Result
    const root = document.getElementById("quiz-root") || document.body;
    if (!document.getElementById("course-qa")) {
      const qa = document.createElement("section");
      qa.id = "course-qa";
      qa.className = "card";
      qa.style.marginTop = "1.2cm";
      root.appendChild(qa);
    }
    if (!document.getElementById("course-result")) {
      const res = document.createElement("section");
      res.id = "course-result";
      res.className = "card";
      res.style.marginTop = "1cm";
      root.appendChild(res);
    }
    const qaBox = document.getElementById("course-qa");
    const resultBox = document.getElementById("course-result");
    resultBox.innerHTML = ""; // Auswertung erst nach Abschluss

    // Zustand
    let idx = 0;
    let correct = 0;
    const answers = [];

    // Scroll-Fix: Position halten zwischen Renders
    function preserveScroll(renderFn) {
      const y = window.scrollY;
      renderFn();
      // minimal verzögert, damit Layout steht
      setTimeout(() => window.scrollTo({ top: y, left: 0, behavior: "instant" || "auto" }), 0);
    }

    function renderQuestion() {
      const q = questions[idx];
      const pct = Math.round((idx / questions.length) * 100);
      qaBox.innerHTML = `
        <h2 style="color:var(--gold);margin:0 0 .6rem 0;">${data.title || ""}</h2>

        <div class="progressbar" style="height:10px;background:rgba(255,255,255,.12);border-radius:6px;overflow:hidden;margin:.6rem 0 1rem;">
          <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,#3b82f6,#d4af37);"></div>
        </div>

        <p class="q-title" style="font-size:1.06rem;margin:.4rem 0 1rem;">
          ${T.qLabel} ${idx + 1} / ${questions.length}
        </p>

        <h3 style="margin:.2rem 0 .8rem 0;color:#e5e7eb;">${q.q}</h3>

        <ul class="answers" style="list-style:none;margin:0;padding:0;display:grid;gap:.6rem;">
          ${q.a
            .map(
              (opt, i) => `
            <li>
              <label style="display:flex;gap:.6rem;align-items:flex-start;border:1px solid rgba(255,255,255,.12);
                             border-radius:10px;padding:.7rem .9rem;background:rgba(255,255,255,.04);cursor:pointer;">
                <input type="radio" name="ans" value="${i}" style="margin-top:.25rem">
                <span>${opt.text}</span>
              </label>
            </li>`
            )
            .join("")}
        </ul>

        <p class="mentor" style="margin:.8rem 0 0;color:#cbd5e1;font-style:italic">
          🧭 ${q?.mentor?.wrong || ""}
        </p>

        <div class="btn-row" style="display:flex;flex-wrap:wrap;gap:.8rem;margin-top:1rem">
          <button class="btn" id="nextBtn"
            style="background:linear-gradient(90deg,#3b82f6,#d4af37);color:#fff;border:none;border-radius:8px;
                   padding:.7rem 1.2rem;font-weight:700;cursor:pointer;">
            ${idx === questions.length - 1 ? T.finish : T.next}
          </button>
        </div>
      `;

      // Button-Handler
      qaBox.querySelector("#nextBtn")?.addEventListener("click", () => {
        const sel = qaBox.querySelector("input[name='ans']:checked");
        if (!sel) {
          alert(T.selectWarn);
          return;
        }
        const chosen = parseInt(sel.value, 10);
        const item = questions[idx];
        const isCorrect = !!item.a[chosen].correct;
        if (isCorrect) correct++;

        const correctOpt = item.a.find((x) => x.correct) || { text: "" };
        answers.push({
          q: item.q,
          chosenText: item.a[chosen]?.text || "",
          correctText: correctOpt.text,
          isCorrect,
          mentorTip: isCorrect ? (item.mentor?.correct || "") : (item.mentor?.wrong || "")
        });

        // weiter ohne Springen
        preserveScroll(() => {
          if (idx < questions.length - 1) {
            idx++;
            renderQuestion();
          } else {
            renderResult();
          }
        });
      });
    }

    function renderResult() {
      // Status und Farbe
      let status = T.statuses.retry;
      if (correct >= 10) status = T.statuses.gold;
      else if (correct >= 8) status = T.statuses.silver;
      else if (correct >= 6) status = T.statuses.bronze;

      const percent = Math.round((correct / questions.length) * 100);
      const color =
        correct < 6 ? "#ef4444" : correct < 8 ? "#cd7f32" : correct < 10 ? "#93c5fd" : "#d4af37";

      // Speichern
      localStorage.setItem(`fsa_${ctx.key}_score`, String(correct));
      localStorage.setItem(`fsa_${ctx.key}_status`, status);
      if (/gold/i.test(status)) localStorage.setItem(`fsa_${ctx.key}_passed`, "true");

      // Feedback (nur falsche)
      const wrong = answers.filter(a => !a.isCorrect);
      const feedback = wrong.map((r, i) => `
          <div class="fb-item" style="border-top:1px solid rgba(212,175,55,.2);padding:.8rem 0">
            <p><strong>${T.qLabel} ${i + 1}:</strong> ${r.q}</p>
            <p><span style="color:#ef4444;font-weight:600">${T.wrong}:</span> ${r.chosenText}</p>
            <p><span style="color:#10b981;font-weight:600">${T.correct}:</span> ${r.correctText}</p>
            <p class="mentor" style="color:#cbd5e1;font-style:italic">🧭 ${r.mentorTip}</p>
          </div>
      `).join("");

      // Render Ergebnis
      resultBox.innerHTML = `
        <h2 style="color:${color};margin:0 0 .6rem 0;">${T.resultTitle}</h2>

        <div class="bar" style="height:14px;background:#1e293b;border-radius:8px;overflow:hidden;margin:.6rem 0 1rem">
          <div style="height:100%;width:${percent}%;background:${color};transition:width .8s ease"></div>
        </div>

        <p>${T.scoreLine(correct, questions.length)}</p>
        <p>${T.index(percent)}</p>
        <p>${T.status}: <strong style="color:${color}">${status}</strong></p>

        <blockquote style="margin:1rem 0;padding:1rem 1.2rem;background:rgba(255,255,255,.05);
          border-left:4px solid ${color};border-radius:6px;color:#e5e7eb;">
          🧭 ${
            correct < 6 ? T.motivate.retry
            : correct < 8 ? T.motivate.bronze
            : correct < 10 ? T.motivate.silver
            : T.motivate.gold
          }
        </blockquote>

        <p style="margin:1rem 0 1.2rem;color:#d1d5db">${T.goldRule}</p>

        <div class="btn-row" style="display:flex;flex-wrap:wrap;gap:.8rem;margin-top:1rem">
          <button id="repeatBtn" class="btn"
            style="background:rgba(0,0,0,.7);color:#d4af37;border:1px solid rgba(212,175,55,.6);
                   border-radius:8px;padding:.7rem 1.2rem;font-weight:600;cursor:pointer;">
            ${T.btnRepeat}
          </button>
          ${
            /gold/i.test(status)
              ? `<button id="nextBtn" class="btn"
                   style="background:linear-gradient(90deg,#3b82f6,#d4af37);color:#fff;border:none;
                          border-radius:8px;padding:.7rem 1.2rem;font-weight:700;cursor:pointer;">
                   ${T.btnNextCourse}
                 </button>`
              : ""
          }
        </div>

        ${wrong.length ? `<div class="feedback" style="margin-top:1rem;text-align:left">${feedback}</div>` : ""}
      `;

      // Buttons
      document.getElementById("repeatBtn")?.addEventListener("click", () => {
        // Nur Kursdaten löschen (kein Name, keine Sprache)
        ["score","status","passed"].forEach(k => localStorage.removeItem(`fsa_${ctx.key}_${k}`));
        // zurück zur ersten Frage – ohne „Springen“
        idx = 0;
        correct = 0;
        answers.length = 0;
        preserveScroll(renderQuestion);
        // Auswertung einklappen
        resultBox.innerHTML = "";
      });
      document.getElementById("nextBtn")?.addEventListener("click", () => {
        window.location.href = ctx.next + "?nocache=" + Date.now();
      });
    }

    // Start
    preserveScroll(renderQuestion);
  });
})();
</script>
