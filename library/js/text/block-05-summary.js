/*!
 * FSA Akademie – block-05-summary.js (v3.1.0)
 * ------------------------------------------
 * Gesamtauswertung & Qualifikationsübersicht (bereinigt)
 * - Bronze/Silber/Gold-Logik (0–5 / 6–7 / 8–9 / 10)
 * - Fortschritt + Gesamtstatus
 * - Prüfungspasswort "Souverän" ab 36 Punkten
 * - Keine Wiederholungszähler mehr
 */

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  const firstName = localStorage.getItem("fsa_firstName") || "";
  const lastName  = localStorage.getItem("fsa_lastName")  || "";
  const fullName  = `${firstName} ${lastName}`.trim() || (lang === "de" ? "Teilnehmer" : "Participant");

  const text = {
    de: {
      title: "🏁 Gesamtauswertung",
      totalScore: "Gesamtpunkte:",
      status: "Qualifikationsstatus:",
      nextExam: "Zur Prüfung weiter ➜",
      nextCourse: n => `Weiter zu Grundkurs ${n} ➜`,
      reset: "🔄 Neustart",
      resetConfirm: "Alle Fortschritte und Namen wirklich löschen? Dies startet den Kurs komplett neu.",
      final: {
        repeat: ["Wiederholen ❌", "Bleib dran. Jeder, der durchhält, meistert die Prüfung am Ende."],
        bronze: ["Bronze 🥉", "Ein solider Anfang! Du bist auf dem richtigen Weg – dranbleiben lohnt sich."],
        silver: ["Silber 🥈", "Sehr gut! Dein Wissen wird stabil – du bist fast am Ziel."],
        gold:   ["Gold 🥇", "Exzellent! Du hast bewiesen, dass du das Prinzip wirklich verstanden hast."]
      },
      passwordLabel: "Prüfungspasswort:",
      passwordValue: "Souverän"
    },
    en: {
      title: "🏁 Final Summary",
      totalScore: "Total Score:",
      status: "Qualification Status:",
      nextExam: "Continue to Exam ➜",
      nextCourse: n => `Continue to Course ${n} ➜`,
      reset: "🔄 Reset",
      resetConfirm: "Really delete all progress and names? This will fully restart the course.",
      final: {
        repeat: ["Repeat ❌", "Keep going. Everyone who perseveres will master the exam in the end."],
        bronze: ["Bronze 🥉", "A solid start! You’re on the right path – stay consistent."],
        silver: ["Silver 🥈", "Very good! Your knowledge is becoming solid – you’re almost there."],
        gold:   ["Gold 🥇", "Excellent! You’ve shown you truly understand the principles."]
      },
      passwordLabel: "Exam password:",
      passwordValue: "Sovereign"
    }
  }[lang];

  // ───────────────────────────────────────────────
  // Kurs-Infos & Punkte laden
  // ───────────────────────────────────────────────
  const courses = [
    { key: "course1", title: lang === "de" ? "Grundkurs 1 – Basis" : "Course 1 – Foundation" },
    { key: "course2", title: lang === "de" ? "Grundkurs 2 – Sicherheit" : "Course 2 – Security" },
    { key: "course3", title: lang === "de" ? "Grundkurs 3 – Einkommen" : "Course 3 – Income" },
    { key: "course4", title: lang === "de" ? "Grundkurs 4 – Netzwerk" : "Course 4 – Network" }
  ];

  let totalScore = 0, totalQuestions = 0;
  let listHTML = "";

  courses.forEach(c => {
    const score   = parseInt(localStorage.getItem(`fsa_${c.key}_score`) || "0", 10);
    const status  = localStorage.getItem(`fsa_${c.key}_status`) || "—";
    totalScore += score;
    totalQuestions += 10;
    listHTML += `<li>${c.title}: <strong>${score}/10</strong> – ${status}</li>`;
  });

  // ───────────────────────────────────────────────
  // Gesamtstatus + Mentor-Ton
  // ───────────────────────────────────────────────
  const percent = totalQuestions ? Math.round((totalScore / totalQuestions) * 100) : 0;
  let finalStatus, mentorText;
  if (percent < 60) [finalStatus, mentorText] = text.final.repeat;
  else if (percent < 75) [finalStatus, mentorText] = text.final.bronze;
  else if (percent < 90) [finalStatus, mentorText] = text.final.silver;
  else [finalStatus, mentorText] = text.final.gold;

  const showPassword = totalScore >= 36;

  // ───────────────────────────────────────────────
  // DOM Aufbau
  // ───────────────────────────────────────────────
  const wrap = document.createElement("main");
  wrap.className = "fsa-summary";
  wrap.innerHTML = `
    <h1>FSA Akademie</h1>
    <h2>${text.title}</h2>
    <p class="username">${fullName}</p>
    <div class="bar"><div class="fill" style="width:${percent}%;"></div></div>
    <ul>${listHTML}</ul>
    <p><strong>${text.totalScore}</strong> ${totalScore} / ${totalQuestions}</p>
    <p><strong>${text.status}</strong> ${finalStatus}</p>
    <blockquote>🧭 ${mentorText}</blockquote>
    ${showPassword ? `<div class="password-block"><p><strong>${text.passwordLabel}</strong> <span class="pw">${text.passwordValue}</span></p></div>` : ""}
    <div class="actions">
      <button id="next">${text.nextExam}</button>
      <button id="reset">${text.reset}</button>
    </div>
  `;
  document.body.appendChild(wrap);

  // ───────────────────────────────────────────────
  // Stil (mobil + desktop)
  // ───────────────────────────────────────────────
  const css = document.createElement("style");
  css.textContent = `
    .fsa-summary{max-width:900px;margin:2cm auto;padding:2rem;
      background:rgba(15,20,30,0.85);border:1px solid rgba(212,175,55,0.4);
      border-radius:16px;box-shadow:0 0 25px rgba(212,175,55,0.15);
      color:#e5e7eb;font-family:system-ui,sans-serif;text-align:center}
    .fsa-summary h1{color:#d4af37;margin-bottom:.3rem;font-size:1.6rem;letter-spacing:.05em}
    .fsa-summary h2{color:#fff;margin-bottom:.8rem;font-size:1.3rem}
    .username{color:#9ca3af;margin-bottom:1rem}
    .bar{height:10px;background:rgba(255,255,255,.1);border-radius:6px;margin:1rem auto 1.5rem;overflow:hidden;max-width:400px}
    .fill{height:100%;background:linear-gradient(90deg,#3b82f6,#d4af37);transition:width .5s ease}
    ul{text-align:left;display:inline-block;margin:0 auto 1rem;padding:0;list-style:none}
    li{margin:.4rem 0;color:#d1d5db}
    blockquote{margin-top:1rem;color:#d4af37;font-style:italic;background:rgba(255,255,255,0.05);
      padding:.9rem 1.2rem;border-left:4px solid rgba(212,175,55,0.5);border-radius:6px}
    .password-block{margin-top:1.2rem;background:rgba(255,255,255,0.05);
      padding:.8rem 1rem;border-radius:8px;display:inline-block}
    .password-block .pw{color:#d4af37;font-weight:700;margin-left:.4rem}
    .actions{display:flex;justify-content:center;gap:1rem;margin-top:2rem;flex-wrap:wrap}
    #next{background:linear-gradient(90deg,#3b82f6,#d4af37);color:white;border:none;
      border-radius:6px;padding:.8rem 1.6rem;font-weight:600;cursor:pointer;transition:opacity .3s ease}
    #next:hover{opacity:.85}
    #reset{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);
      color:#e5e7eb;border-radius:6px;padding:.8rem 1.6rem;font-weight:500;cursor:pointer;
      transition:background .3s ease}
    #reset:hover{background:rgba(255,255,255,.2)}
    @media(max-width:640px){
      .fsa-summary{padding:1.2rem;margin:1cm .4cm}
      .actions{flex-direction:column}
      #next,#reset{width:100%}
    }
  `;
  document.head.appendChild(css);

  // ───────────────────────────────────────────────
  // Weiterleitung & Reset
  // ───────────────────────────────────────────────
  const next = document.getElementById("next");
  const reset = document.getElementById("reset");

  next.addEventListener("click", () => {
    if (totalScore >= 36) location.href = "pruefung.html?nocache=" + Date.now();
    else location.href = "grundkurs-basis.html?nocache=" + Date.now();
  });

  reset.addEventListener("click", () => {
    if (!confirm(text.resetConfirm)) return;
    ["firstName","lastName"].forEach(n => localStorage.removeItem(`fsa_${n}`));
    for (let i = 1; i <= 4; i++) {
      ["score","status","results","passed"].forEach(k =>
        localStorage.removeItem(`fsa_course${i}_${k}`)
      );
    }
    localStorage.removeItem("fsa_allCoursesDone");
    location.href = "grundkurs-basis.html?nocache=" + Date.now();
  });

  console.log("✅ block-05-summary.js v3.1.0 aktiv – bereinigt, ohne Wiederholungslogik.");
});
