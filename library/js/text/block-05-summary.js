<script>
// ░░ Baustein 05 – Gesamtauswertung & Prüfungsfreischaltung (v2.1) ░░
// • Anzeige aller 4 Kurs-Scores + Status (ohne Repeat-Zähler)
// • Prüfung NUR wenn: fourGold == true UND totalScore >= 36
// • Klarer DE/EN-Text (4×Gold ⇒ 36 Punkte ⇒ Prüfung)

(function(){
  document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    const T = {
      de: {
        title: "Dein Fortschritt in der Akademie",
        c1: "Grundkurs 1 – Basis",
        c2: "Grundkurs 2 – Sicherheit",
        c3: "Grundkurs 3 – Einkommen",
        c4: "Grundkurs 4 – Network",
        total: (n)=>`Gesamtpunkte: <strong>${n}/40</strong>`,
        locked: "⏳ Noch nicht bereit – trainiere weiter, bis alle vier Kurse Gold erreicht haben.",
        unlocked: "✅ Du hast viermal Gold und 36 Punkte – die Hauptprüfung ist freigeschaltet.",
        rule: "Jeder Kurs ist erst vollständig, wenn du <strong>Gold</strong> erreicht hast. Bei 4 Kursen entstehen so bei viermal Gold deine Qualifikation mit <strong>36 Punkten</strong>. Nur dann erhältst du Zugang zu deiner Abschlussprüfung.",
        toExam: "Zur Hauptprüfung →",
        toFirstCourse: "Zur Kursübersicht →",
        missingGold: "Es fehlt noch mindestens ein Kurs mit Gold."
      },
      en: {
        title: "Your Progress in the Academy",
        c1: "Course 1 – Foundation",
        c2: "Course 2 – Security",
        c3: "Course 3 – Income",
        c4: "Course 4 – Network",
        total: (n)=>`Total points: <strong>${n}/40</strong>`,
        locked: "⏳ Not ready yet — keep training until all four courses are Gold.",
        unlocked: "✅ You have four times Gold and 36 points — the final exam is unlocked.",
        rule: "Each course is complete only with <strong>Gold</strong>. Across four courses, four times Gold equals your qualification with <strong>36 points</strong>. Only then do you unlock your final exam.",
        toExam: "Go to final exam →",
        toFirstCourse: "Go to course overview →",
        missingGold: "At least one course is not Gold yet."
      }
    }[lang];

    const courses = [
      {key:"course1", name:T.c1},
      {key:"course2", name:T.c2},
      {key:"course3", name:T.c3},
      {key:"course4", name:T.c4},
    ];

    let totalScore = 0;
    let fourGold = true;
    const listHTML = courses.map(c => {
      const score  = Number(localStorage.getItem(`fsa_${c.key}_score`) || 0);
      const status = localStorage.getItem(`fsa_${c.key}_status`) || "—";
      totalScore += score;
      if (!/gold/i.test(status)) fourGold = false;
      return `<li><strong>${c.name}:</strong> ${score}/10 – <span>${status}</span></li>`;
    }).join("");

    const eligible = fourGold && totalScore >= 36;
    const color = eligible ? "#d4af37" : "#94a3b8";

    const mount = document.getElementById("quiz-root") || document.body;
    const panel = document.createElement("section");
    panel.className = "card";
    panel.style.marginTop = "1.2cm";
    panel.innerHTML = `
      <div style="max-width:860px;margin:0 auto;text-align:center">
        <h2 style="color:${color};margin:0 0 .8rem 0;">${T.title}</h2>
        <ul style="text-align:left;display:inline-block;color:#e5e7eb;line-height:1.8;margin:.4rem 0 1rem">
          ${listHTML}
        </ul>
        <p>${T.total(totalScore)}</p>
        <p style="margin:.25rem 0 1rem;color:${eligible ? '#e5e7eb' : '#d1d5db'}">
          ${eligible ? T.unlocked : T.locked}
        </p>
        <blockquote style="margin:0 0 1.2rem 0;padding:1rem 1.2rem;background:rgba(255,255,255,.05);
          border-left:4px solid ${color};border-radius:6px;color:#e5e7eb;">
          🧭 ${T.rule}
        </blockquote>
        <div class="btn-row" style="display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap">
          <button id="primaryBtn" class="btn"
            style="background:${eligible?'linear-gradient(90deg,#3b82f6,#d4af37)':'rgba(0,0,0,.7)'};color:${eligible?'#fff':'#d4af37'};
                   border:${eligible?'none':'1px solid rgba(212,175,55,.6)'};border-radius:8px;padding:.7rem 1.2rem;
                   font-weight:700;cursor:pointer;">
            ${eligible ? T.toExam : T.toFirstCourse}
          </button>
        </div>
        ${!eligible ? `<p style="margin-top:.6rem;color:#9ca3af">${T.missingGold}</p>` : ""}
      </div>
    `;
    mount.appendChild(panel);

    document.getElementById("primaryBtn")?.addEventListener("click", () => {
      if (eligible) {
        window.location.href = "grundkurs-pruefung.html?nocache=" + Date.now();
      } else {
        // zurück zu Kursübersicht – du hattest Basis als Start gewählt
        window.location.href = "grundkurs-basis.html?nocache=" + Date.now();
      }
    });
  });
})();
</script>
