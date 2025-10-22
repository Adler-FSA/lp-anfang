// ░░ Baustein – exam-engine.js (FSA Hauptprüfung) ░░
// nutzt window.fsa_exam_questions aus exam-questions.js
// erzeugt UI, Punktelogik & Speicherung in localStorage
// Version 1.1 – 2025-10-22

document.addEventListener("DOMContentLoaded", () => {
  const Q = window.fsa_exam_questions || {};
  const lang = localStorage.getItem("fsa_lang") || "de";

  // Fragen-Pool zusammenstellen
  const pool = []
    .concat(Q[lang]?.course1 || [])
    .concat(Q[lang]?.course2 || [])
    .concat(Q[lang]?.course3 || [])
    .concat(Q[lang]?.course4 || [])
    .concat(Q[lang]?.extra || []);

  if (!pool.length) {
    console.warn("⚠️ Keine Fragen geladen – exam-questions.js fehlt oder leer.");
    return;
  }

  const main = document.getElementById("exam-root");
  const resultRoot = document.getElementById("result-root");
  const intro = document.getElementById("intro");
  const first = localStorage.getItem("fsa_firstName") || "";
  const last  = localStorage.getItem("fsa_lastName") || "";
  const fullName = (first + " " + last).trim();

  const state = {
    idx: 0,
    correct: 0,
    order: shuffle([...Array(pool.length).keys()]),
    answers: []
  };
  const total = pool.length;

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ░░ Frage rendern ░░
  function renderQuestion() {
    const qIndex = state.order[state.idx];
    const item = pool[qIndex];
    const pct = Math.round((state.idx / total) * 100);

    main.innerHTML = `
      <div class="card">
        <div class="progressbar"><div style="width:${pct}%"></div></div>
        <h2>${lang === "de" ? "Frage" : "Question"} ${state.idx + 1} / ${total}</h2>
        <p class="q-title">${item.q}</p>
        <ul class="answers">
          ${item.a.map((opt, i) => `
            <li>
              <label>
                <input type="radio" name="ans" value="${i}">
                <span>${opt.text}</span>
              </label>
            </li>`).join("")}
        </ul>
        <p class="mentor">🧭 ${item.mentor}</p>
        <div class="btn-row">
          <button class="btn" id="prevBtn" ${state.idx === 0 ? "disabled" : ""}>
            ${lang === "de" ? "Zurück" : "Back"}
          </button>
          <button class="btn primary" id="nextBtn">
            ${state.idx === total - 1
              ? (lang === "de" ? "Abschließen" : "Finish")
              : (lang === "de" ? "Weiter" : "Next")}
          </button>
        </div>
      </div>
    `;

    // Navigation
    document.getElementById("prevBtn")?.addEventListener("click", () => {
      if (state.idx > 0) {
        state.idx--;
        renderQuestion();
      }
    });

    document.getElementById("nextBtn")?.addEventListener("click", () => {
      const sel = main.querySelector("input[name='ans']:checked");
      if (!sel) {
        alert(lang === "de" ? "Bitte eine Antwort wählen." : "Please select an answer.");
        return;
      }
      const chosen = parseInt(sel.value, 10);
      const isCorrect = !!item.a[chosen].correct;
      if (isCorrect) state.correct++;

      const correctText = item.a.find(x => x.correct)?.text || "";
      state.answers.push({
        qIndex,
        chosen,
        isCorrect,
        question: item.q,
        chosenText: item.a[chosen].text,
        correctText,
        mentorTip: item.mentor
      });

      if (state.idx < total - 1) {
        state.idx++;
        renderQuestion();
      } else {
        renderResult();
      }
    });
  }

  // ░░ Ergebnis anzeigen ░░
  function renderResult() {
    const points = state.correct * 2;
    const percent = Math.min(100, Math.round((points / 100) * 100));
    const color =
      points < 60 ? "#ef4444"
      : points < 75 ? "#cd7f32"
      : points < 90 ? "#93c5fd"
      : "#d4af37";

    const status =
      points < 60
        ? (lang === "de" ? "Wiederholen ❌" : "Repeat ❌")
      : points < 75
        ? "Bronze 🥉"
      : points < 90
        ? (lang === "de" ? "Silber 🥈" : "Silver 🥈")
      : "Gold 🥇";

    // Ergebnisse speichern
    localStorage.setItem("fsa_exam_points", points);
    localStorage.setItem("fsa_exam_correct", state.correct);
    localStorage.setItem("fsa_exam_total", total);
    localStorage.setItem("fsa_exam_percent", percent);
    localStorage.setItem("fsa_exam_status", status);
    localStorage.setItem("fsa_exam_results", JSON.stringify(state.answers));

    // Feedback nur bei falschen Fragen
    const wrong = state.answers.filter(r => !r.isCorrect);
    const feedback = wrong.map((r, i) => `
      <div class="fb-item">
        <p><strong>${lang === "de" ? "Frage" : "Question"} ${i + 1}:</strong> ${r.question}</p>
        <p><span class="wrong">${lang === "de" ? "Deine Antwort:" : "Your answer:"}</span> ${r.chosenText}</p>
        <p><span class="right">${lang === "de" ? "Richtig:" : "Correct:"}</span> ${r.correctText}</p>
        <p class="mentor">🧭 ${r.mentorTip}</p>
      </div>`).join("");

    resultRoot.innerHTML = `
      <div class="card result-wrap" style="border-color:${color};box-shadow:0 0 25px ${color}22">
        <h2>${lang === "de" ? "Auswertung" : "Result"} ${
          fullName ? `<span class="badge">${fullName}</span>` : ""
        }</h2>
        <p>${lang === "de" ? "Richtige Antworten" : "Correct answers"}:
          <strong>${state.correct}/${total}</strong></p>
        <p>${lang === "de" ? "Punkte" : "Points"}:
          <strong>${points}/100</strong></p>
        <div class="bar"><div style="width:${percent}%; background:${color}"></div></div>
        <p>${lang === "de" ? "Wissensindex" : "Knowledge index"}:
          <strong>${percent}%</strong></p>
        <p>${lang === "de" ? "Status" : "Status"}:
          <strong style="color:${color}">${status}</strong></p>
        <p class="muted">${
          lang === "de"
            ? "Bei 100 Punkten hast du 100 % Wissen aufgebaut – ein echtes Mentor-Niveau."
            : "At 100 points you’ve built 100 % knowledge – true mentor level."
        }</p>
        <div class="btn-row">
          <button class="btn" id="repeatBtn">
            ${lang === "de" ? "Prüfung wiederholen" : "Retake exam"}
          </button>
          <button class="btn primary" id="toPanelBtn">
            ${lang === "de" ? "Zum Qualifikationspanel" : "To qualification panel"}
          </button>
        </div>
        ${wrong.length ? `<div class="feedback">${feedback}</div>` : ""}
      </div>
    `;
    main.innerHTML = "";

    document.getElementById("repeatBtn")?.addEventListener("click", () => location.reload());
    document.getElementById("toPanelBtn")?.addEventListener("click", () => {
      window.location.href = "grundkurs-pruefung-vorbereitung.html?nocache=" + Date.now();
    });
  }

  // ░░ Einstieg ░░
  document.getElementById("startExam")?.addEventListener("click", () => {
    intro.style.display = "none";
    renderQuestion();
  });
  document.getElementById("startExamEn")?.addEventListener("click", () => {
    localStorage.setItem("fsa_lang", "en");
    intro.style.display = "none";
    renderQuestion();
  });
});
