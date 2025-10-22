// ░░ Baustein – block-05-summary.js ░░
// Kursauswertung + Status + Navigation zur Prüfung oder Neustart
// Version 1.2 – 2025-10-22 – Fix: lokaler Neustart & korrekter Prüfungslink

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("fsa_lang") || "de";
  const first = localStorage.getItem("fsa_firstName") || "";
  const last  = localStorage.getItem("fsa_lastName") || "";
  const fullName = (first + " " + last).trim() || (lang === "de" ? "Teilnehmer" : "Participant");

  const results = {
    c1: parseInt(localStorage.getItem("fsa_course1_score") || "0", 10),
    c2: parseInt(localStorage.getItem("fsa_course2_score") || "0", 10),
    c3: parseInt(localStorage.getItem("fsa_course3_score") || "0", 10),
    c4: parseInt(localStorage.getItem("fsa_course4_score") || "0", 10),
  };

  const total = results.c1 + results.c2 + results.c3 + results.c4;
  const status =
    total < 25
      ? lang === "de"
        ? "Wiederholen ❌"
        : "Repeat ❌"
      : total < 35
      ? lang === "de"
        ? "Bronze 🥉"
        : "Bronze 🥉"
      : total < 40
      ? lang === "de"
        ? "Silber 🥈"
        : "Silver 🥈"
      : lang === "de"
      ? "Gold 🥇"
      : "Gold 🥇";

  // Mentor-Spruch
  const mentorMsg =
    total < 25
      ? (lang === "de"
          ? "Bleib dran. Jeder, der durchhält, meistert die Prüfung am Ende."
          : "Keep going. Everyone who persists, masters the exam in the end.")
      : total < 35
      ? (lang === "de"
          ? "Bronze ist nicht Silber – wiederhole gezielt und hol dir dein Silber!"
          : "Bronze isn’t Silver – repeat focused and earn your Silver!")
      : total < 40
      ? (lang === "de"
          ? "Silber ist nicht Gold – du bist fast da, geh den letzten Schritt!"
          : "Silver isn’t Gold – you’re almost there, take the final step!")
      : (lang === "de"
          ? "Exzellent! Du hast 100 % Wissen aufgebaut – Mentor-Niveau erreicht 🦅"
          : "Excellent! You’ve reached 100 % knowledge – mentor level 🦅");

  // Container erzeugen
  const root = document.getElementById("quiz-root");
  if (!root) return;
  root.innerHTML = `
    <section class="card" style="margin-top:2cm;">
      <h1>🏁 FSA Akademie – Gesamtauswertung</h1>
      <p><strong>${fullName}</strong></p>
      <div style="height:6px;background:#1e293b;border-radius:4px;overflow:hidden;margin:.8rem 0 1rem;">
        <div style="width:${(total / 40) * 100}%;background:linear-gradient(90deg,#3b82f6,#d4af37);height:100%;"></div>
      </div>
      <p>${lang === "de" ? "Gesamtpunkte:" : "Total points:"} <strong>${total}/40</strong></p>
      <p>${lang === "de" ? "Qualifikationsstatus:" : "Qualification status:"}
        <strong>${status}</strong></p>

      <ul style="text-align:left;margin:1rem 0 1.5rem 1.2rem;">
        <li>Grundkurs 1 – Basis: ${results.c1}/10</li>
        <li>Grundkurs 2 – Sicherheit: ${results.c2}/10</li>
        <li>Grundkurs 3 – Einkommen: ${results.c3}/10</li>
        <li>Grundkurs 4 – Netzwerk: ${results.c4}/10</li>
      </ul>

      <blockquote style="margin:1.4rem 0;padding:1rem 1.2rem;
        background:rgba(255,255,255,.05);border-left:4px solid #d4af37;border-radius:6px;">
        ${mentorMsg}
      </blockquote>

      <div class="btn-row">
        <button class="btn primary" id="toExamBtn">
          ${lang === "de" ? "Zur Prüfung weiter →" : "Continue to exam →"}
        </button>
        <button class="btn" id="restartBtn">
          🔄 ${lang === "de" ? "Neustart" : "Restart"}
        </button>
      </div>
    </section>
  `;

  // ► Button-Aktionen
  document.getElementById("toExamBtn")?.addEventListener("click", () => {
    window.location.href = "grundkurs-pruefung-vorbereitung.html?nocache=" + Date.now();
  });

  document.getElementById("restartBtn")?.addEventListener("click", () => {
    if (
      confirm(
        lang === "de"
          ? "Willst du diesen Kurs wirklich neu starten? Dein Fortschritt wird gelöscht."
          : "Do you really want to restart this course? Your progress will be deleted."
      )
    ) {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("fsa_course_"))
        .forEach((k) => localStorage.removeItem(k));
      location.reload();
    }
  });
});
