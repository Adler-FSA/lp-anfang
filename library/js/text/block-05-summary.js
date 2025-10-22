// ░░ Baustein 05 – Gesamtauswertung & Prüfungsfreischaltung (v2.1) ░░
// - Zeigt Ergebnisse aller 4 Grundkurse (Basis–Network)
// - Kein Sprungverhalten (Scrollfix integriert)
// - Bronze/Silber/Gold-Mentorlogik + Hauptprüfung ab 36 Punkten
// - Keine Wiederholungszähler, keine automatischen Resets

(function(){
  document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    const container = document.getElementById("quiz-root") || document.body;

    // Scroll stabil halten
    function freezeScrollPosition(fn) {
      const y = window.scrollY;
      const h = document.body.scrollHeight;
      fn();
      const newH = document.body.scrollHeight;
      const diff = newH - h;
      if (diff < 0) window.scrollTo({ top: y + diff, behavior: "instant" });
      else window.scrollTo({ top: y, behavior: "instant" });
    }

    const courses = [
      {key:"course1", name_de:"Grundkurs 1 – Basis",      name_en:"Course 1 – Foundation", next:"grundkurs-sicherheit.html"},
      {key:"course2", name_de:"Grundkurs 2 – Sicherheit", name_en:"Course 2 – Security",   next:"grundkurs-einkommen.html"},
      {key:"course3", name_de:"Grundkurs 3 – Einkommen",  name_en:"Course 3 – Income",     next:"grundkurs-network.html"},
      {key:"course4", name_de:"Grundkurs 4 – Network",    name_en:"Course 4 – Network",    next:"grundkurs-pruefung-vorbereitung.html"}
    ];

    let totalScore = 0;
    let lowestStatus = "gold";
    const statusRank = {repeat:0, bronze:1, silver:2, gold:3};

    const list = courses.map(c => {
      const score  = Number(localStorage.getItem(`fsa_${c.key}_score`) || 0);
      const status = (localStorage.getItem(`fsa_${c.key}_status`) || "—").trim();
      totalScore += score;

      const sNorm = status.toLowerCase();
      if (statusRank[sNorm] !== undefined && statusRank[sNorm] < statusRank[lowestStatus]) {
        lowestStatus = sNorm;
      }

      return `<li><strong>${lang==="de"?c.name_de:c.name_en}:</strong> ${score}/10 – <span>${status}</span></li>`;
    }).join("");

    const allPassed = courses.every(c => {
      const s = (localStorage.getItem(`fsa_${c.key}_status`) || "").toLowerCase();
      return /(bronze|silber|silver|gold)/.test(s);
    });

    const eligible = allPassed && totalScore >= 36 && lowestStatus !== "repeat";

    const color = eligible ? "#d4af37" :
      lowestStatus==="silver" ? "#93c5fd" :
      lowestStatus==="bronze" ? "#cd7f32" : "#94a3b8";

    // Mentortext
    const mentor = lang==="de" ? {
      gold:   "Exzellente Leistung – du bist bereit für die Hauptprüfung!",
      silver: "Stark – du bist fast Gold – ein letzter Feinschliff!",
      bronze: "Solides Fundament – arbeite dich jetzt zu Silber oder Gold hoch!",
      repeat: "Nicht entmutigen lassen – Übung bringt Souveränität."
    } : {
      gold:   "Excellent – you are ready for the final exam!",
      silver: "Strong – you’re almost gold – just refine a bit more!",
      bronze: "Solid base – now aim for silver or gold!",
      repeat: "Don’t be discouraged – practice brings sovereignty."
    };

    const btnLabel = eligible
      ? (lang==="de" ? "Zur Hauptprüfung →" : "Go to final exam →")
      : (lang==="de" ? "Weiter trainieren"   : "Keep training");

    const btnAction = eligible
      ? () => { window.location.href = "grundkurs-pruefung.html?nocache=" + Date.now(); }
      : () => {
          // bei Nicht-Bestehen → nächsten Kurs öffnen, sonst Basis
          const next = courses.find(c => {
            const s = (localStorage.getItem(`fsa_${c.key}_status`) || "").toLowerCase();
            return s==="bronze" || s==="silver" || s==="repeat";
          })?.next || "grundkurs-basis.html";
          window.location.href = next + "?nocache=" + Date.now();
        };

    // Ruhiges Rendering
    freezeScrollPosition(() => {
      container.innerHTML = `
        <div style="max-width:860px;margin:1.5cm auto;padding:2rem;
          border:1px solid ${color};border-radius:12px;
          background:rgba(17,24,39,0.75);text-align:center;">
          <h2 style="color:${color};margin-bottom:1rem;">
            ${lang==="de" ? "Dein Fortschritt in der Akademie" : "Your Progress in the Academy"}
          </h2>
          <ul style="text-align:left;display:inline-block;color:#e5e7eb;line-height:1.8;">
            ${list}
          </ul>
          <p style="margin-top:1rem;">
            ${lang==="de"
              ? `Gesamtpunkte: <strong>${totalScore}/40</strong>`
              : `Total points: <strong>${totalScore}/40</strong>`}
          </p>
          <blockquote style="
            margin:1rem auto 1.4rem auto;
            max-width:680px;
            background:rgba(255,255,255,0.05);
            border-left:4px solid ${color};
            border-radius:6px;
            padding:1rem 1.2rem;
            font-style:italic;
            color:#e5e7eb;">
            🧭 ${mentor[lowestStatus] || mentor.repeat}
          </blockquote>
          <button id="examBtn" style="
            background:rgba(0,0,0,0.7);
            border:1px solid ${color};
            color:${color};
            padding:.8rem 1.6rem;
            border-radius:6px;
            cursor:pointer;
            transition:all .3s ease;">
            ${btnLabel}
          </button>
        </div>`;
    });

    document.getElementById("examBtn")?.addEventListener("click", btnAction);
  });
})();
