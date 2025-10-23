// ░░ Block 03 – Fragen & Mentor-Engine (final, ohne Wiederholungen, fixierte Ansicht) ░░
(function () {
  // ---------- 0) Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn, { passive: true });

  // Sichtfeld-Fixierung (verhindert Springen)
  const quizRoot = document.getElementById("quiz-root") || document.body;
  const observer = new MutationObserver(() => {
    const rect = quizRoot.getBoundingClientRect();
    if (rect.top < 60) window.scrollBy(0, rect.top - 60);
  });
  observer.observe(quizRoot, { childList: true, subtree: true });

  // ---------- 1) Kurs-Kontext ----------
  const path = (location.pathname || "").toLowerCase();
  const ctx =
    path.includes("grundkurs-sicherheit") ? { key: "course2", idx: 2 } :
    path.includes("grundkurs-einkommen")  ? { key: "course3", idx: 3 } :
    path.includes("grundkurs-network")    ? { key: "course4", idx: 4 } :
    { key: "course1", idx: 1 };

  const lang = localStorage.getItem("fsa_lang") || "de";

  // ---------- 2) Fragenpool ----------
  const block03_course = {
    de: {
      title: "Dein Wissenstest",
      intro: "Beantworte die 10 Fragen und prüfe dein Wissen. Lies die Mentor-Tipps bei Fehlern genau – sie helfen dir, Gold zu erreichen.",
      questions: [
        {
          q: "Was bedeutet 'Dezentrale Finanzen' (DeFi)?",
          a: [
            { text: "Banken übernehmen die Kontrolle.", correct: false },
            { text: "Finanzsystem ohne zentrale Autorität.", correct: true },
            { text: "Nur für Kryptowährungen relevant.", correct: false }
          ],
          mentor: "DeFi nutzt Smart Contracts statt Banken – Kontrolle liegt bei dir."
        },
        {
          q: "Was beschreibt ein Smart Contract?",
          a: [
            { text: "Einen intelligenten Papiervertrag.", correct: false },
            { text: "Selbst ausführenden Code auf der Blockchain.", correct: true },
            { text: "Einen Algorithmus zur Preisvorhersage.", correct: false }
          ],
          mentor: "Smart Contracts führen Regeln automatisch aus, ohne Mittelsmann."
        },
        {
          q: "Was schützt am besten vor Verlust deiner Coins?",
          a: [
            { text: "Ein Screenshot deiner Wallet.", correct: false },
            { text: "Private Keys offline sichern.", correct: true },
            { text: "Vertrauen in die Börse.", correct: false }
          ],
          mentor: "Offline-Speicherung – z. B. Hardware-Wallet – ist sicherster Schutz."
        },
        {
          q: "Wie erkennst du ein Pyramidensystem?",
          a: [
            { text: "Echte Produkte, reale Nutzung.", correct: false },
            { text: "Umsatz basiert auf echten Werten.", correct: false },
            { text: "Einnahmen nur durch neue Mitglieder.", correct: true }
          ],
          mentor: "Wenn nur neue Mitglieder Geld bringen, ist Vorsicht geboten."
        },
        {
          q: "Was ist die Grundidee von FSA?",
          a: [
            { text: "Schnelles Geld durch Spekulation.", correct: false },
            { text: "Finanzielle Bildung & Souveränität.", correct: true },
            { text: "Abhängigkeit von Mentoren.", correct: false }
          ],
          mentor: "FSA bedeutet Selbstbestimmung durch Wissen und Verantwortung."
        }
      ]
    },
    en: {
      title: "Your Knowledge Check",
      intro: "Answer 10 questions to test your knowledge. Read the mentor tips carefully – they help you reach Gold.",
      questions: [
        {
          q: "What does 'Decentralized Finance' (DeFi) mean?",
          a: [
            { text: "Banks control everything.", correct: false },
            { text: "A financial system without central authority.", correct: true },
            { text: "Only about cryptocurrencies.", correct: false }
          ],
          mentor: "DeFi uses smart contracts instead of banks – control stays with you."
        },
        {
          q: "What is a Smart Contract?",
          a: [
            { text: "An intelligent paper agreement.", correct: false },
            { text: "Self-executing code on the blockchain.", correct: true },
            { text: "An algorithm to predict prices.", correct: false }
          ],
          mentor: "Smart contracts execute automatically without middlemen."
        },
        {
          q: "What protects your coins best?",
          a: [
            { text: "A screenshot of your wallet.", correct: false },
            { text: "Store private keys offline.", correct: true },
            { text: "Trust in the exchange.", correct: false }
          ],
          mentor: "Offline storage – like hardware wallets – offers highest protection."
        },
        {
          q: "How can you recognize a pyramid scheme?",
          a: [
            { text: "Real products, real users.", correct: false },
            { text: "Revenue based on actual value creation.", correct: false },
            { text: "Profits only from new members.", correct: true }
          ],
          mentor: "If only new members create profit, it’s likely a pyramid scheme."
        },
        {
          q: "What’s the main idea of FSA?",
          a: [
            { text: "Quick money through speculation.", correct: false },
            { text: "Financial education & sovereignty.", correct: true },
            { text: "Dependence on mentors.", correct: false }
          ],
          mentor: "FSA stands for independence through knowledge and responsibility."
        }
      ]
    }
  };

  const data = block03_course[lang];
  window.block03_course = block03_course;

  // ---------- 3) Render-Funktion ----------
  const mount = $("#quiz-root") || document.body;
  mount.innerHTML = `
    <section class="quiz-card">
      <h2>${data.title}</h2>
      <p>${data.intro}</p>
      <div id="quiz-container"></div>
      <div id="progress-bar">
        <div id="progress-fill"></div>
      </div>
    </section>
  `;

  const container = $("#quiz-container");
  const progressFill = $("#progress-fill");
  let current = 0;
  let correctCount = 0;
  const answers = [];

  function renderQuestion() {
    const q = data.questions[current];
    if (!q) return showSummary();
    container.innerHTML = `
      <div class="question-block">
        <p class="question"><strong>${current + 1}.</strong> ${q.q}</p>
        ${q.a.map((opt, i) => `
          <button class="answer-btn" data-i="${i}">
            ${opt.text}
          </button>
        `).join("")}
      </div>
    `;
    progressFill.style.width = `${(current / data.questions.length) * 100}%`;
    quizRoot.scrollIntoView({ behavior: "instant", block: "center" });
  }

  function showSummary() {
    progressFill.style.width = "100%";
    let wrongList = data.questions
      .map((q, i) => {
        const ans = q.a[answers[i]];
        return !ans?.correct
          ? `<li>${q.mentor}</li>`
          : "";
      })
      .filter(Boolean)
      .join("");

    if (!wrongList) wrongList = `<li>${lang === "de" ? "Perfekte Runde – keine Fehler!" : "Perfect round – no mistakes!"}</li>`;

    container.innerHTML = `
      <div class="result-block">
        <h3>${lang === "de" ? "Auswertung" : "Result"}</h3>
        <p>${lang === "de" ? "Du hast" : "You got"} <strong>${correctCount}</strong> / ${data.questions.length} ${lang === "de" ? "richtig beantwortet." : "correct."}</p>
        <ul>${wrongList}</ul>
      </div>
    `;
    window.correctCount = correctCount;
    window.totalQuestions = data.questions.length;
  }

  on(container, "click", e => {
    const btn = e.target.closest(".answer-btn");
    if (!btn) return;
    const i = Number(btn.dataset.i);
    const q = data.questions[current];
    answers[current] = i;
    if (q.a[i].correct) correctCount++;
    current++;
    renderQuestion();
  });

  // ---------- 4) Styles ----------
  const style = document.createElement("style");
  style.textContent = `
    .quiz-card {
      max-width: 900px;
      margin: 1rem auto;
      padding: 1.2rem;
      background: rgba(255,255,255,0.05);
      border-radius: 12px;
      color: #e5e7eb;
      text-align: left;
    }
    .answer-btn {
      display: block;
      width: 100%;
      margin: .4rem 0;
      padding: .6rem .9rem;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(212,175,55,0.35);
      border-radius: 8px;
      color: #e5e7eb;
      cursor: pointer;
      transition: all .25s ease;
    }
    .answer-btn:hover {
      background: rgba(212,175,55,0.2);
      border-color: rgba(212,175,55,0.6);
    }
    #progress-bar {
      width: 100%;
      height: 8px;
      background: rgba(255,255,255,0.1);
      border-radius: 6px;
      margin-top: 1rem;
      overflow: hidden;
    }
    #progress-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg,#3b82f6,#d4af37);
      transition: width .4s ease;
    }
    @media (max-width: 420px) {
      .quiz-card { padding: .8rem; font-size: .95rem; }
    }
  `;
  document.head.appendChild(style);

  // ---------- 5) Start ----------
  renderQuestion();
})();
