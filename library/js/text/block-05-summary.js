// ░░ Baustein 05 – Gesamtauswertung & Prüfungsfreischaltung (v2.0) ░░
// • Zeigt Ergebnisse aller 4 Kurse
// • Hauptprüfung ab 36 Punkten und mind. Bronze in allen Kursen

(function(){
  document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    const container = document.getElementById("quiz-root") || document.body;

    const courses = [
      {key:"course1", name:"Grundkurs 1 – Basis", next:"grundkurs-sicherheit.html"},
      {key:"course2", name:"Grundkurs 2 – Sicherheit", next:"grundkurs-einkommen.html"},
      {key:"course3", name:"Grundkurs 3 – Einkommen", next:"grundkurs-network.html"},
      {key:"course4", name:"Grundkurs 4 – Network", next:"grundkurs-pruefung-vorbereitung.html"}
    ];

    let totalScore = 0;
    const list = courses.map(c => {
      const score = Number(localStorage.getItem(`fsa_${c.key}_score`) || 0);
      const status = localStorage.getItem(`fsa_${c.key}_status`) || "—";
      totalScore += score;
      return `<li><strong>${c.name}:</strong> ${score}/10 – <span>${status}</span></li>`;
    }).join("");

    const allPassed = courses.every(c => {
      const s = localStorage.getItem(`fsa_${c.key}_status`) || "";
      return /Bronze|Silber|Silver|Gold/i.test(s);
    });

    const eligible = allPassed && totalScore >= 36;
    const color = eligible ? "#d4af37" : "#94a3b8";
    const btnLabel = eligible
      ? (lang === "de" ? "Zur Hauptprüfung →" : "Go to final exam →")
      : (lang === "de" ? "Weiter trainieren" : "Keep training");

    const btnAction = eligible
      ? () => { window.location.href = "grundkurs-pruefung.html?nocache=" + Date.now(); }
      : () => { window.location.href = "grundkurs-basis.html?nocache=" + Date.now(); };

    container.innerHTML = `
      <div style="max-width:860px;margin:1.5cm auto;padding:2rem;border:1px solid ${color};
        border-radius:12px;background:rgba(17,24,39,0.75);text-align:center;">
        <h2 style="color:${color};margin-bottom:1rem;">${
          lang === "de" ? "Dein Fortschritt in der Akademie" : "Your Progress in the Academy"
        }</h2>
        <ul style="text-align:left;display:inline-block;color:#e5e7eb;line-height:1.8;">${list}</ul>
        <p style="margin-top:1rem;">${
          lang === "de"
            ? `Gesamtpunkte: <strong>${totalScore}/40</strong>`
            : `Total points: <strong>${totalScore}/40</strong>`
        }</p>
        <p style="margin:.5rem 0 1.2rem;">${
          lang === "de"
            ? (eligible ? "✅ Du bist bereit für die Hauptprüfung!" : "⏳ Noch nicht bereit – übe weiter.")
            : (eligible ? "✅ You’re ready for the final exam!" : "⏳ Not ready yet – keep training.")
        }</p>
        <button id="examBtn" style="background:rgba(0,0,0,0.7);border:1px solid ${color};
          color:${color};padding:.8rem 1.6rem;border-radius:6px;cursor:pointer;">
          ${btnLabel}
        </button>
      </div>`;

    document.getElementById("examBtn")?.addEventListener("click", btnAction);
  });
})();
