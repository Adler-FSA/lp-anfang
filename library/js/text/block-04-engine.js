<script>
/* block-04-engine.js — Kursauswertung (ohne Wiederholung/Reload, ohne Sprung) */
(function(){
  // Kurs-Kontext
  function ctx() {
    const p = (location.pathname||"").toLowerCase();
    if (p.includes("grundkurs-basis")) return {key:"course1", idx:1, next:"grundkurs-sicherheit.html"};
    if (p.includes("grundkurs-sicherheit")) return {key:"course2", idx:2, next:"grundkurs-einkommen.html"};
    if (p.includes("grundkurs-einkommen")) return {key:"course3", idx:3, next:"grundkurs-network.html"};
    if (p.includes("grundkurs-network")) return {key:"course4", idx:4, next:"grundkurs-pruefung-vorbereitung.html"};
    return {key:"course1", idx:1, next:"grundkurs-sicherheit.html"};
  }
  const C = ctx();
  const lang = localStorage.getItem("fsa_lang") || "de";

  const T = lang==="en" ? {
    title: "Course Result",
    you: "Participant",
    points: (s,t)=>`You answered <strong>${s}</strong> of <strong>${t}</strong> correctly.`,
    status: "Status",
    retry: "Repeat ❌", bronze:"Bronze 🥉", silver:"Silver 🥈", gold:"Gold 🥇",
    mentorHead: "Mentor notes for your mistakes:",
    none: "Perfect round — no mistakes.",
    nextBtn:(i)=> i<4 ? "Continue to next course →" : "Go to exam prep →",
    goldHint: "Each course is only complete when you reach <strong>Gold</strong>. With four courses, four times Gold gives you the qualification of <strong>36 points</strong>. Only then do you unlock your final exam."
  } : {
    title: "Kursauswertung",
    you: "Teilnehmer",
    points: (s,t)=>`Du hast <strong>${s}</strong> von <strong>${t}</strong> Fragen richtig.`,
    status: "Status",
    retry: "Wiederholen ❌", bronze:"Bronze 🥉", silver:"Silber 🥈", gold:"Gold 🥇",
    mentorHead: "Mentor-Hinweise zu deinen Fehlern:",
    none: "Perfekte Runde – keine Fehler.",
    nextBtn:(i)=> i<4 ? "Weiter zum nächsten Kurs →" : "Zur Prüfungsvorbereitung →",
    goldHint: "Jeder Kurs ist erst vollständig, wenn du <strong>Gold</strong> geschafft hast. Bei vier Kursen ergeben viermal Gold deine Qualifikation von <strong>36 Punkten</strong>. Nur dann schaltest du deine Abschlussprüfung frei."
  };

  function statusFrom(score){
    if (score <= 5) return T.retry;
    if (score <= 7) return T.bronze;
    if (score <= 9) return T.silver;
    return T.gold;
  }

  function mistakesList() {
    try {
      const data = (window.block03_course && (window.block03_course[lang] || window.block03_course.de)) || null;
      const qs = data?.questions || [];
      const answers = Array.isArray(window.__answers) ? window.__answers : [];
      const out = [];
      for (let i=0;i<qs.length;i++){
        const q = qs[i]; const chosen = answers[i];
        if (chosen==null) continue;
        const ok = !!q.a?.[chosen]?.correct;
        if (!ok) out.push(`<li style="margin:.35rem 0"><strong>Q${i+1}.</strong> ${q.mentor?.wrong || q.mentor || ""}</li>`);
      }
      if (!out.length) return `<p style="color:#9ca3af">${T.none}</p>`;
      return `<ul style="text-align:left;margin:.6rem 0 0 1.1rem;line-height:1.6;color:#e5e7eb">${out.join("")}</ul>`;
    } catch(e){ return ""; }
  }

  // wird von block-03-engine am Ende aufgerufen
  window.showResult = function(triggered){
    if (triggered !== true) return;
    const root = document.getElementById("quiz-root") || document.body;

    const score = Number(window.correctCount||0);
    const total = Number(window.totalQuestions||10);
    const percent = Math.round((score/Math.max(1,total))*100);
    const color = score<=5?"#ef4444":score<=7?"#cd7f32":score<=9?"#93c5fd":"#d4af37";
    const status = statusFrom(score);

    // speichern: nur Score/Status/Passed (kein Wiederholen, kein Counter)
    localStorage.setItem(`fsa_${C.key}_score`, String(score));
    localStorage.setItem(`fsa_${C.key}_status`, status);
    if (/Gold/i.test(status)) localStorage.setItem(`fsa_${C.key}_passed`, "true"); else localStorage.removeItem(`fsa_${C.key}_passed`);

    const first = localStorage.getItem("fsa_firstName")||"";
    const last  = localStorage.getItem("fsa_lastName")||"";
    const full  = (first+" "+last).trim() || T.you;

    const mistakes = mistakesList();

    // Render ohne Sprung: erst Höhe reservieren, dann ersetzen
    const r = root.getBoundingClientRect();
    const anchorTop = window.scrollY + r.top - 48;

    root.innerHTML = `
      <section class="card" style="max-width:920px;margin:0 auto;border-color:${color}">
        <h2 style="color:${color};margin:0 0 .4rem 0">${T.title}</h2>
        <p style="margin:.2rem 0 .8rem 0;color:#94a3b8">${full}</p>

        <div style="height:12px;background:#111827;border-radius:8px;overflow:hidden;margin:.3rem 0 1rem 0">
          <div style="height:100%;width:${percent}%;background:${color};transition:width .7s ease"></div>
        </div>

        <p style="margin:.2rem 0 0 0">${T.points(score,total)}</p>
        <p style="margin:.2rem 0 .8rem 0">${T.status}: <strong style="color:${color}">${status}</strong></p>

        <div style="margin:1rem 0;padding:1rem 1.2rem;background:rgba(255,255,255,.05);border-left:4px solid ${color};border-radius:8px;">
          <strong style="display:block;margin-bottom:.35rem">${T.mentorHead}</strong>
          ${mistakes}
        </div>

        <div style="margin:1rem 0;padding:.85rem 1rem;border:1px dashed ${color};border-radius:10px;color:#e5e7eb;">
          ${T.goldHint}
        </div>

        <div style="display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1.2rem">
          ${
            /Gold/i.test(status)
            ? `<button id="nextBtn" style="background:linear-gradient(90deg,#3b82f6,#d4af37);color:#fff;border:0;border-radius:8px;padding:.7rem 1.2rem;font-weight:700;cursor:pointer;">
                 ${T.nextBtn(C.idx)}
               </button>`
            : ``
          }
        </div>
      </section>
    `;

    // Position halten
    window.scrollTo({ top: anchorTop, behavior: "instant" in window ? "instant" : "auto" });

    document.getElementById("nextBtn")?.addEventListener("click", ()=>{
      window.location.href = `${C.next}?nocache=${Date.now()}`;
    }, {passive:true});
  };
})();
</script>
