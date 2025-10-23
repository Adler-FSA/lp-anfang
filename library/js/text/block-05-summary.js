// ░░ Baustein 05 – Abschlussübersicht (Final Exam Unlock) – FSA Style ░░
// Voraussetzung: Alle vier Kurse (Basis, Sicherheit, Einkommen, Network) = Gold
// Speicherstruktur: localStorage.fsa_course1_status ... fsa_course4_status
// Keine externen JSON, reine Local-Prüfung.

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";

  const texts = {
    de: {
      title: "🎓 Abschlussprüfung – Dein Weg zum Zertifikat",
      locked: "Du hast noch nicht alle vier Kurse mit 🥇 Gold abgeschlossen.<br>Erreiche 4 × Gold (36 Punkte), um die Prüfung freizuschalten.",
      unlocked: "Herzlichen Glückwunsch! Du hast alle vier Kurse mit 🥇 Gold abgeschlossen.<br>Du kannst jetzt deine Abschlussprüfung starten.",
      button: "Zur Abschlussprüfung",
    },
    en: {
      title: "🎓 Final Exam – Your Path to the Certificate",
      locked: "You haven’t completed all four courses with 🥇 Gold yet.<br>Earn 4 × Gold (36 points) to unlock the exam.",
      unlocked: "Congratulations! You’ve completed all four courses with 🥇 Gold.<br>You can now start your final exam.",
      button: "Go to Final Exam",
    }
  }[lang];

  // Kurs-Status abrufen
  const statusKeys = ["fsa_course1_status", "fsa_course2_status", "fsa_course3_status", "fsa_course4_status"];
  const goldCount = statusKeys.filter(k => (localStorage.getItem(k) || "").toLowerCase() === "gold").length;
  const allGold = goldCount === statusKeys.length;

  // Container aufbauen
  const wrap = document.createElement("div");
  wrap.className = "final-summary";

  const h2 = document.createElement("h2");
  h2.innerHTML = texts.title;
  wrap.appendChild(h2);

  const info = document.createElement("p");
  info.className = allGold ? "unlocked" : "locked";
  info.innerHTML = allGold ? texts.unlocked : texts.locked;
  wrap.appendChild(info);

  const btn = document.createElement("a");
  btn.className = "exam-btn";
  btn.textContent = texts.button;
  btn.href = allGold ? "/lp-anfang/grundkurs-pruefung.html" : "#";
  btn.style.pointerEvents = allGold ? "auto" : "none";
  btn.style.opacity = allGold ? "1" : "0.4";
  wrap.appendChild(btn);

  document.body.appendChild(wrap);

  // Stil
  const style = document.createElement("style");
  style.textContent = `
    .final-summary {
      text-align: center;
      padding: 2.5rem 1rem 3rem;
      background: rgba(0,0,0,0.55);
      border-top: 1px solid rgba(212,175,55,0.3);
      border-bottom: 1px solid rgba(212,175,55,0.3);
      color: #e5e7eb;
      font-family: system-ui, sans-serif;
      backdrop-filter: blur(6px);
      box-shadow: 0 0 10px rgba(212,175,55,0.15);
    }
    .final-summary h2 {
      color: #d4af37;
      margin-bottom: 1rem;
      font-size: 1.4rem;
    }
    .final-summary p {
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }
    .final-summary .exam-btn {
      display: inline-block;
      padding: 0.8rem 1.6rem;
      background: rgba(212,175,55,0.25);
      color: #fff;
      border: 1px solid rgba(212,175,55,0.6);
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .final-summary .exam-btn:hover {
      background: rgba(212,175,55,0.35);
      border-color: rgba(212,175,55,0.9);
      box-shadow: 0 0 10px rgba(212,175,55,0.6);
      transform: translateY(-2px);
    }
    .final-summary p.locked { color: #aaa; }
    .final-summary p.unlocked { color: #d4af37; }

    @media (max-width: 480px) {
      .final-summary h2 { font-size: 1.2rem; }
      .final-summary .exam-btn { font-size: 0.95rem; padding: 0.7rem 1.4rem; }
    }
  `;
  document.head.appendChild(style);
});
