<script>
/* block-03-engine.js — Fragen-Engine (ohne Wiederholungen, ohne Sprünge) */
(function () {
  const lang = localStorage.getItem("fsa_lang") || "de";
  const data = (window.block03_course && (window.block03_course[lang] || window.block03_course.de)) || window.block03_course?.de || {questions:[]};
  const questions = Array.isArray(data.questions) ? data.questions : [];
  const root = document.getElementById("quiz-root");
  if (!root || !questions.length) return;

  // Sichtfeld-Anker: beim ersten Render messen, danach festhalten
  let anchorTop = null;
  function lockToAnchor() {
    if (anchorTop == null) {
      const r = root.getBoundingClientRect();
      anchorTop = window.scrollY + r.top - 48; // 48px Puffer unter Header
    }
    window.scrollTo({ top: anchorTop, behavior: "instant" in window ? "instant" : "auto" });
  }

  // global für Summary/Engine-04
  window.totalQuestions = questions.length;
  window.correctCount = 0;
  window.__answers = [];

  let idx = 0;

  function renderProgress() {
    const pct = Math.max(0, Math.min(100, Math.round(((idx) / questions.length) * 100)));
    return `<div style="height:8px;background:#111827;border-radius:6px;overflow:hidden;margin:0 0 .9rem 0;">
      <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,#60a5fa,#d4af37)"></div>
    </div>`;
  }

  function renderQuestion() {
    const q = questions[idx];
    root.innerHTML = `
      ${renderProgress()}
      <section class="card" style="max-width:900px;margin:0 auto;">
        <h3 style="color:var(--gold);margin:.2rem 0 .6rem 0;">${lang==="de"?"Frage":"Question"} ${idx+1} ${lang==="de"?"von":"of"} ${questions.length}</h3>
        <p style="font-weight:700;color:#e5e7eb;margin:.2rem 0 1rem 0">${q.q}</p>
        <div class="answers" style="display:flex;flex-direction:column;gap:.6rem;">
          ${q.a.map((opt,i)=>`
            <button class="opt" data-i="${i}" style="text-align:left;background:#172033;border:1px solid rgba(212,175,55,.20);border-radius:10px;padding:.85rem 1rem;color:#e5e7eb;cursor:pointer;">
              ${String.fromCharCode(65+i)}. ${opt.text}
            </button>`).join("")}
        </div>
        <div style="margin-top:1rem;display:flex;justify-content:flex-end">
          <button id="skip" style="background:rgba(0,0,0,.55);border:1px solid rgba(212,175,55,.35);color:#e5e7eb;border-radius:8px;padding:.55rem 1rem;cursor:pointer;">
            ${lang==="de"?"Überspringen":"Skip"}
          </button>
        </div>
      </section>
      <div style="height:22px"></div>
      <div style="text-align:center;margin-top:1rem;">
        <a href="index.html" style="display:inline-block;padding:.8rem 1.2rem;border-radius:10px;border:1px solid var(--line);color:#e5e7eb;background:rgba(255,255,255,.03);text-decoration:none;">
          ${lang==="de"?"Zurück zur Startseite":"Back to home"}
        </a>
      </div>
    `;
    lockToAnchor();
    wire();
  }

  function next() {
    idx++;
    if (idx < questions.length) {
      renderQuestion();
    } else {
      // Abschluss: keine Wiederholungen, nur Ergebnis
      if (typeof window.showResult === "function") {
        window.showResult(true);
      }
    }
  }

  function wire() {
    root.querySelectorAll(".opt").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const choice = Number(btn.getAttribute("data-i"));
        const q = questions[idx];
        const isCorrect = !!q.a[choice]?.correct;
        window.__answers[idx] = choice;
        if (isCorrect) window.correctCount++;
        // kein Scrollen, nur nächste Frage
        next();
      }, {passive:true});
    });
    root.querySelector("#skip")?.addEventListener("click", ()=>{
      window.__answers[idx] = null;
      next();
    }, {passive:true});
  }

  // Start
  renderQuestion();
})();
</script>
