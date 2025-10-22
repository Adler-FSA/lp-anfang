// ░░ Baustein – block-05-summary.js (DE/EN) ░░
// Gesamtauswertung + Mentor-Feedback + Navigation
// - Keine Repeat-Zähler mehr
// - Lokaler Neustart (nur Kursdaten, nicht alle!)
// - Korrekte Weiterleitung zur Prüfungs-Vorbereitung
// - Zweisprachige Oberfläche (DE/EN)
// Version 1.4 – 22.10.2025

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";

  const T = {
    de: {
      title: "🏁 Gesamtauswertung",
      you: "Teilnehmer",
      totalLabel: "Gesamtpunkte:",
      qualLabel: "Qualifikationsstatus:",
      c1: "Grundkurs 1 – Basis",
      c2: "Grundkurs 2 – Sicherheit",
      c3: "Grundkurs 3 – Einkommen",
      c4: "Grundkurs 4 – Netzwerk",
      toExam: "Zur Prüfung weiter →",
      restart: "Neustart",
      restartConfirm: "Willst du diesen Kurs wirklich neu starten? Dein Fortschritt wird gelöscht.",
      statuses: {
        repeat: "Wiederholen ❌",
        bronze: "Bronze 🥉",
        silver: "Silber 🥈",
        gold:   "Gold 🥇"
      },
      mentorMsg(points){
        if(points < 25) return "Bleib dran. Jeder, der durchhält, meistert die Prüfung am Ende.";
        if(points < 35) return "Bronze ist nicht Silber – wiederhole gezielt und hol dir dein Silber!";
        if(points < 40) return "Silber ist nicht Gold – du bist fast da, geh den letzten Schritt!";
        return "Exzellent! Du hast 100 % Wissen aufgebaut – Mentor-Niveau erreicht 🦅";
      }
    },
    en: {
      title: "🏁 Final Summary",
      you: "Participant",
      totalLabel: "Total points:",
      qualLabel: "Qualification status:",
      c1: "Course 1 – Foundation",
      c2: "Course 2 – Security",
      c3: "Course 3 – Income",
      c4: "Course 4 – Network",
      toExam: "Continue to exam →",
      restart: "Restart",
      restartConfirm: "Do you really want to restart this course? Your progress will be deleted.",
      statuses: {
        repeat: "Repeat ❌",
        bronze: "Bronze 🥉",
        silver: "Silver 🥈",
        gold:   "Gold 🥇"
      },
      mentorMsg(points){
        if(points < 25) return "Keep going. Everyone who persists will master the exam in the end.";
        if(points < 35) return "Bronze isn’t Silver — repeat with focus and earn your Silver!";
        if(points < 40) return "Silver isn’t Gold — you’re almost there, take the final step!";
        return "Excellent! You’ve reached 100 % knowledge — mentor level 🦅";
      }
    }
  }[lang];

  // Teilnehmername
  const first = localStorage.getItem("fsa_firstName") || "";
  const last  = localStorage.getItem("fsa_lastName") || "";
  const fullName = (first + " " + last).trim() || T.you;

  // Kurs-Scores laden (0–10 je Kurs)
  const scores = {
    c1: parseInt(localStorage.getItem("fsa_course1_score") || "0", 10),
    c2: parseInt(localStorage.getItem("fsa_course2_score") || "0", 10),
    c3: parseInt(localStorage.getItem("fsa_course3_score") || "0", 10),
    c4: parseInt(localStorage.getItem("fsa_course4_score") || "0", 10),
  };
  const total = scores.c1 + scores.c2 + scores.c3 + scores.c4;

  // Status bestimmen
  let status;
  if (total < 25) status = T.statuses.repeat;
  else if (total < 35) status = T.statuses.bronze;
  else if (total < 40) status = T.statuses.silver;
  else status = T.statuses.gold;

  const percent = Math.round((total/40)*100);
  const barColor = total<25 ? "#ef4444" : total<35 ? "#cd7f32" : total<40 ? "#93c5fd" : "#d4af37";

  // Container wählen
  const mount = document.querySelector("#quiz-root") || document.querySelector("main") || document.body;

  // Renderbereich erzeugen
  const wrap = document.createElement("section");
  wrap.className = "card";
  wrap.style.marginTop = "2cm";
  wrap.innerHTML = `
    <h1 style="color:#d4af37;margin:0 0 .6rem 0;">FSA Akademie – ${T.title}</h1>
    <p style="color:#9ca3af;margin:.2rem 0 1rem 0;">${fullName}</p>

    <div style="height:10px;background:rgba(255,255,255,.12);border-radius:6px;overflow:hidden;margin:.6rem 0 1rem;">
      <div style="height:100%;width:${percent}%;background:${barColor};transition:width .6s ease;"></div>
    </div>

    <ul style="list-style:none;padding:0;margin:.6rem 0 1rem;color:#d1d5db;text-align:left">
      <li>${T.c1}: <strong>${scores.c1}/10</strong></li>
      <li>${T.c2}: <strong>${scores.c2}/10</strong></li>
      <li>${T.c3}: <strong>${scores.c3}/10</strong></li>
      <li>${T.c4}: <strong>${scores.c4}/10</strong></li>
    </ul>

    <p><strong>${T.totalLabel}</strong> ${total} / 40</p>
    <p><strong>${T.qualLabel}</strong> <span style="color:${barColor};font-weight:700">${status}</span></p>

    <blockquote style="margin:1.2rem 0;padding:1rem 1.2rem;background:rgba(255,255,255,.05);
      border-left:4px solid #d4af37;border-radius:6px;color:#e5e7eb;">
      🧭 ${T.mentorMsg(total)}
    </blockquote>

    <div class="btn-row" style="display:flex;flex-wrap:wrap;gap:.8rem;margin-top:1.2rem">
      <button id="toExamBtn" class="btn primary"
        style="background:linear-gradient(90deg,#3b82f6,#d4af37);color:#fff;border:none;border-radius:8px;
        padding:.7rem 1.4rem;font-weight:700;cursor:pointer;">
        ${T.toExam}
      </button>
      <button id="restartBtn" class="btn"
        style="background:rgba(0,0,0,.6);color:#d4af37;border:1px solid rgba(212,175,55,.35);
        border-radius:8px;padding:.7rem 1.4rem;font-weight:600;cursor:pointer;">
        🔄 ${T.restart}
      </button>
    </div>
  `;
  mount.appendChild(wrap);

  // ░░ Aktionen ░░
  // Prüfung
  document.getElementById("toExamBtn")?.addEventListener("click", () => {
    window.location.href = "grundkurs-pruefung-vorbereitung.html?nocache=" + Date.now();
  });

  // Neustart – nur aktueller Kurs
  document.getElementById("restartBtn")?.addEventListener("click", () => {
    if (!confirm(T.restartConfirm)) return;

    // Aktuellen Kurs aus Dateinamen oder URL bestimmen
    const courseMatch = window.location.pathname.match(/grundkurs-(basis|sicherheit|einkommen|network)/i);
    let courseNum = "1";
    if (courseMatch) {
      const name = courseMatch[1].toLowerCase();
      if (name.includes("sicherheit")) courseNum = "2";
      else if (name.includes("einkommen")) courseNum = "3";
      else if (name.includes("network")) courseNum = "4";
    }

    const keys = ["score","status","results","passed"];
    keys.forEach(k => localStorage.removeItem(`fsa_course${courseNum}_${k}`));

    location.reload();
  });
});
