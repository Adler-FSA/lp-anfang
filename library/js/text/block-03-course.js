// ░░ Baustein 03 (Kurs 1) – Finanzielle Souveränität (Basis) – DE/EN, autonom ░░
// Identische Logik/Optik wie Kurs 2/3/4: eigener Renderer, Fortschrittsbalken mit Farbverlauf,
// Auswertung nur der falschen Antworten als Slideshow, zentrierter Kurstitel, Live-Sprachwechsel.

window.block03_course_1 = {
  de: {
    title: "🧭 Grundkurs 1 – Finanzielle Souveränität (Basis)",
    btn: { next: "Nächste Frage", result: "Zum Ergebnis", again: "Weiter" },
    labels: { q: "Frage", of: "von", done: "✅ Kurs abgeschlossen" },
    reviewTitle: "Auswertung – Deine Lernpunkte",
    reviewEmpty: "Stark – keine Fehler! Du denkst eigenständig, kennst Risiken und bleibst souverän.",
    questions: [
      {
        q: "Warum ist der erste Schritt zur finanziellen Souveränität das eigene Verständnis über Geldflüsse?",
        a: [
          { text: "Weil nur wer versteht, wie Geld entsteht und zirkuliert, bewusste Entscheidungen treffen kann.", correct: true },
          { text: "Weil Geld immer durch Banken kontrolliert wird und man sich dem nicht entziehen kann.", correct: false },
          { text: "Weil finanzielle Souveränität nur von staatlicher Regulierung abhängt.", correct: false }
        ],
        mentor: {
          correct: "Genau – wer die Geldflüsse versteht, handelt bewusst statt reaktiv. Wissen ist dein Hebel.",
          wrong:   "Ohne Verständnis bleibst du abhängig von Fremdurteilen. Erst die Flüsse durchschauen, dann entscheiden."
        }
      },
      {
        q: "Was unterscheidet ein klassisches Bankkonto von einer Krypto-Wallet?",
        a: [
          { text: "Beide speichern nur die Transaktionen, nicht das Geld selbst.", correct: false },
          { text: "Ein Bankkonto gehört einer Bank, eine Wallet gehört ausschließlich dir selbst.", correct: true },
          { text: "Beide Systeme werden von denselben Institutionen überwacht.", correct: false }
        ],
        mentor: {
          correct: "Richtig – bei der Wallet kontrollierst du die Schlüssel selbst. Selbstverwahrung statt Fremdbesitz.",
          wrong:   "Ein Konto ist ein Versprechen einer Bank. Eine Wallet ist dein eigener Tresor – mit eigener Verantwortung."
        }
      },
      {
        q: "Warum ist die Seed Phrase der wichtigste Teil einer Wallet?",
        a: [
          { text: "Sie ersetzt die PIN deiner Bankkarte.", correct: false },
          { text: "Sie ist der Nachweis, dass du Kunde einer Börse bist.", correct: false },
          { text: "Sie ist der einzige Zugang zu deinem Vermögen – ohne Seed kein Zugriff.", correct: true }
        ],
        mentor: {
          correct: "Perfekt – wer die Seed hat, hat die Kontrolle. Ohne Seed ist der Zugang unwiederbringlich verloren.",
          wrong:   "Die Seed ist der Ursprungsschlüssel. Geht sie verloren oder wird kopiert, ist das Vermögen gefährdet."
        }
      },
      {
        q: "Was bedeutet „finanzielle Eigenverantwortung“ im Krypto-Kontext wirklich?",
        a: [
          { text: "Dass man bereit ist, für seine Entscheidungen und Fehler selbst einzustehen.", correct: true },
          { text: "Dass man anderen Vertrauenspersonen die Verwahrung überlässt.", correct: false },
          { text: "Dass man möglichst viele Konten bei verschiedenen Börsen eröffnet.", correct: false }
        ],
        mentor: {
          correct: "Exakt – Verantwortung ist der Preis der Freiheit. Du triffst die Entscheidungen und trägst die Folgen.",
          wrong:   "Delegierte Verantwortung ist keine Souveränität. Wissen, entscheiden, tragen – in dieser Reihenfolge."
        }
      },
      {
        q: "Warum sollte man Plattformen wie Trustyfy verstehen, bevor man Geld einzahlt?",
        a: [
          { text: "Weil sie das beste Zinsmodell bieten.", correct: false },
          { text: "Weil Verständnis über Funktion und Risiko vor Verlust schützt.", correct: true },
          { text: "Weil sonst Transaktionen automatisch abgelehnt werden.", correct: false }
        ],
        mentor: {
          correct: "Richtig – Systeme prüfen spart Geld und Nerven. Erst Funktion & Risiken klären, dann handeln.",
          wrong:   "Blindes Einzahlen ist teuer. Verstehe Gebühren, Mechanik und Auszahlungsregeln – Wissen schützt."
        }
      },
      {
        q: "Welche Aussage beschreibt „Dezentralität“ am besten?",
        a: [
          { text: "Ein System, das von einer zentralen Behörde gesteuert wird.", correct: false },
          { text: "Ein System, bei dem jeder Teilnehmer gleiche Rechte und Zugriffe hat.", correct: true },
          { text: "Ein System, das keine Technologie, sondern eine Bankstruktur nutzt.", correct: false }
        ],
        mentor: {
          correct: "Genau – gleiches Recht, gleiche Regeln, kein Mittelpunkt. Abhängigkeiten werden reduziert.",
          wrong:   "Dezentral heißt: Keine einzelne Instanz entscheidet über alle. Das senkt Machtkonzentration."
        }
      },
      {
        q: "Warum ist „Nicht deine Schlüssel – nicht deine Coins“ mehr als nur ein Spruch?",
        a: [
          { text: "Weil du ohne eigene Schlüssel nicht wirklich der Besitzer deiner Krypto-Werte bist.", correct: true },
          { text: "Weil die Schlüssel automatisch bei der Börse gespeichert werden.", correct: false },
          { text: "Weil Coins immer durch staatliche Versicherung geschützt sind.", correct: false }
        ],
        mentor: {
          correct: "Exakt – Eigentum folgt dem Schlüssel, nicht dem Kontoauszug. Selbstverwahrung = echte Kontrolle.",
          wrong:   "Liegen die Schlüssel woanders, liegt auch die Macht woanders. Ohne Schlüssel keine Unabhängigkeit."
        }
      },
      {
        q: "Welche Haltung führt am ehesten zu langfristigem finanziellen Erfolg?",
        a: [
          { text: "Schnelles Handeln, ohne sich vorher zu informieren.", correct: false },
          { text: "Geduld, Disziplin und die Bereitschaft, ständig weiter zu lernen.", correct: true },
          { text: "Blindes Vertrauen in die Erfahrungen anderer.", correct: false }
        ],
        mentor: {
          correct: "Sehr gut – Substanz schlägt Tempo. Lernen, Routinen, Geduld: das sind die Zinseszins-Motoren.",
          wrong:   "Hektik ist teuer. Ohne Lernkurve und Plan wird Kapital zum Spielball der Märkte."
        }
      },
      {
        q: "Warum braucht finanzielle Souveränität ein Verständnis für Risiko?",
        a: [
          { text: "Weil Risiko nur bei Banken existiert.", correct: false },
          { text: "Weil du ohne Risikobewusstsein nicht frei, sondern abhängig entscheidest.", correct: true },
          { text: "Weil Risiken sich automatisch ausgleichen, wenn man Geduld hat.", correct: false }
        ],
        mentor: {
          correct: "Richtig – Risiko verstehen heißt steuern können. So entscheidest du aus Stärke statt aus Angst.",
          wrong:   "Risiko verschwindet nicht durch Ignorieren. Wer es versteht, wird planbar statt getrieben."
        }
      },
      {
        q: "Was zeigt, dass jemand finanziell souverän geworden ist?",
        a: [
          { text: "Er kann sich schnell Geld leihen, wenn er es braucht.", correct: false },
          { text: "Er nutzt sein Wissen bewusst, um unabhängig von Systemen zu handeln.", correct: true },
          { text: "Er vertraut darauf, dass andere für ihn die richtige Entscheidung treffen.", correct: false }
        ],
        mentor: {
          correct: "Perfekt – angewandtes Wissen, selbstbestimmtes Handeln. Das ist gelebte Souveränität.",
          wrong:   "Abhängigkeit ist bequem, aber teuer. Souveränität zeigt sich in eigenem, fundiertem Tun."
        }
      }
    ]
  },

  en: {
    title: "🧭 Basic Course 1 – Financial Sovereignty (Foundation)",
    btn: { next: "Next question", result: "See results", again: "Next" },
    labels: { q: "Question", of: "of", done: "✅ Course completed" },
    reviewTitle: "Evaluation – Your learning points",
    reviewEmpty: "Great — no mistakes! You think independently, understand risk and stay sovereign.",
    questions: [
      {
        q: "Why is understanding money flows the first step to financial sovereignty?",
        a: [
          { text: "Because only those who understand how money is created and circulates can decide consciously.", correct: true },
          { text: "Because money is always controlled by banks and you can’t escape it.", correct: false },
          { text: "Because sovereignty only depends on regulation.", correct: false }
        ],
        mentor: {
          correct: "Exactly — understanding turns reactions into deliberate choices. Knowledge is your lever.",
          wrong:   "Without clarity on flows you rely on others’ opinions. Understand first, then decide."
        }
      },
      {
        q: "What differentiates a bank account from a crypto wallet?",
        a: [
          { text: "Both only store transactions, not the money itself.", correct: false },
          { text: "A bank account belongs to a bank; a wallet belongs solely to you.", correct: true },
          { text: "Both are monitored by the same institutions.", correct: false }
        ],
        mentor: {
          correct: "Right — self-custody of keys means you control the assets. Not the bank.",
          wrong:   "A bank account is a promise. A wallet is your own vault — with your responsibility."
        }
      },
      {
        q: "Why is the seed phrase the most important part of a wallet?",
        a: [
          { text: "It replaces your card PIN.", correct: false },
          { text: "It proves you’re a customer of an exchange.", correct: false },
          { text: "It’s the only way to access funds — lose it, lose access.", correct: true }
        ],
        mentor: {
          correct: "Perfect — whoever holds the seed controls the funds. No seed, no recovery.",
          wrong:   "The seed is the origin key. If lost or copied, your wealth is at risk."
        }
      },
      {
        q: "What does true ‘financial responsibility’ mean in crypto?",
        a: [
          { text: "Owning decisions and outcomes yourself.", correct: true },
          { text: "Letting trusted others hold your assets.", correct: false },
          { text: "Opening many exchange accounts.", correct: false }
        ],
        mentor: {
          correct: "Exactly — responsibility is the price of freedom. You decide and you carry it.",
          wrong:   "Delegated responsibility isn’t sovereignty. Learn, decide, own — in that order."
        }
      },
      {
        q: "Why understand platforms like Trustyfy before depositing?",
        a: [
          { text: "Because they offer the best interest model.", correct: false },
          { text: "Because understanding function and risk protects from loss.", correct: true },
          { text: "Because otherwise transactions get auto-declined.", correct: false }
        ],
        mentor: {
          correct: "Right — review systems first. Clarity about fees, mechanics and withdrawal rules saves money.",
          wrong:   "Depositing blind is expensive. Know the how and the risk before you commit."
        }
      },
      {
        q: "Which statement best describes ‘decentralization’?",
        a: [
          { text: "A system controlled by a central authority.", correct: false },
          { text: "A system where each participant has equal rights and access.", correct: true },
          { text: "A non-tech bank structure.", correct: false }
        ],
        mentor: {
          correct: "Exactly — equal rules, no single center. Less dependency, more resilience.",
          wrong:   "Decentralized means no one entity rules everyone else. Less power concentration."
        }
      },
      {
        q: "Why is ‘Not your keys, not your coins’ more than a slogan?",
        a: [
          { text: "Without your own keys you aren’t the true owner of your assets.", correct: true },
          { text: "Keys are automatically stored at the exchange.", correct: false },
          { text: "Coins are always insured by the state.", correct: false }
        ],
        mentor: {
          correct: "Exactly — ownership follows the key, not the account statement.",
          wrong:   "If someone else holds the keys, they hold the power. No keys, no independence."
        }
      },
      {
        q: "Which mindset best supports long-term success?",
        a: [
          { text: "Acting fast without prior knowledge.", correct: false },
          { text: "Patience, discipline, and continuous learning.", correct: true },
          { text: "Blind trust in other people’s experience.", correct: false }
        ],
        mentor: {
          correct: "Good — substance beats speed. Learning, routines and patience compound.",
          wrong:   "Haste is costly. Without a learning curve and plan you’re tossed by markets."
        }
      },
      {
        q: "Why does sovereignty require understanding risk?",
        a: [
          { text: "Because risk exists only in banks.", correct: false },
          { text: "Because without risk awareness you decide dependently, not freely.", correct: true },
          { text: "Because risks cancel out automatically over time.", correct: false }
        ],
        mentor: {
          correct: "Right — understanding risk lets you steer. You choose from strength, not fear.",
          wrong:   "Risk doesn’t vanish by ignoring it. Know it, then manage it."
        }
      },
      {
        q: "What shows someone has become financially sovereign?",
        a: [
          { text: "They can quickly borrow when needed.", correct: false },
          { text: "They use knowledge to act independently of systems.", correct: true },
          { text: "They trust others to decide for them.", correct: false }
        ],
        mentor: {
          correct: "Exactly — applied knowledge, self-directed action. That’s sovereignty.",
          wrong:   "Dependence feels easy but costs control. Sovereignty is doing your own informed work."
        }
      }
    ]
  }
};

// ───────────────────────────────────────────────────────────────────────────────
// Renderer (gleich wie Kurs 2/3/4, lokal enthalten)
// ───────────────────────────────────────────────────────────────────────────────
(function(){
  const GRADIENTS = [
    "linear-gradient(90deg,#d4af37,#22c55e)",
    "linear-gradient(90deg,#22c55e,#3b82f6)",
    "linear-gradient(90deg,#3b82f6,#8b5cf6)",
    "linear-gradient(90deg,#8b5cf6,#ef4444)",
    "linear-gradient(90deg,#ef4444,#d4af37)"
  ];

  const labelsByLang = (t) => ({
    next: t.btn.next, result: t.btn.result, again: t.btn.again,
    q: t.labels.q, of: t.labels.of, done: t.labels.done
  });

  function shuffle(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }

  function render(lang){
    const data = (window.block03_course_1 && (window.block03_course_1[lang] || window.block03_course_1.de)) || null;
    if(!data) return;
    const L = labelsByLang(data);
    const root = document.getElementById("quiz-root");
    if(!root) return;

    root.innerHTML = `
      <section id="quiz-block" class="card" style="padding:1.4rem;">
        <div id="quiz-header">
          <div id="quiz-progress"><div id="quiz-progress-bar"></div></div>
          <div id="quiz-question-info">
            <span id="quiz-question-number"></span>
            <span id="quiz-question-total"></span>
          </div>
          <h2 id="quiz-course-title" style="
            text-align:center; color:var(--gold);
            font-size:clamp(1.3rem,2.2vw,1.8rem); margin:.2rem 0 .8rem 0;
          ">${data.title}</h2>
          <h3 id="quiz-question-text" style="margin-top:.2rem;"></h3>
        </div>

        <div id="quiz-answers"></div>

        <div id="quiz-footer" style="display:flex;justify-content:space-between;gap:.6rem;margin-top:1rem;">
          <button id="quiz-result-btn" disabled>${L.result}</button>
          <button id="quiz-next-btn" disabled>${L.next}</button>
        </div>
      </section>

      <section id="mentor-review" class="card" style="padding:1.2rem;">
        <h3 style="text-align:center;color:var(--gold);margin:.2rem 0 1rem 0;">${data.reviewTitle}</h3>
        <div id="review-stage" style="display:none;">
          <div id="review-content"></div>
          <div style="text-align:right;margin-top:1rem;">
            <button id="review-next">${L.again}</button>
          </div>
        </div>
        <p id="review-empty" style="display:none;color:var(--muted);text-align:center;">${data.reviewEmpty}</p>
      </section>
    `;

    injectStylesOnce();

    const qNum = root.querySelector("#quiz-question-number");
    const qTotal = root.querySelector("#quiz-question-total");
    const qText = root.querySelector("#quiz-question-text");
    const answersBox = root.querySelector("#quiz-answers");
    const nextBtn = root.querySelector("#quiz-next-btn");
    const resultBtn = root.querySelector("#quiz-result-btn");
    const bar = root.querySelector("#quiz-progress-bar");

    const reviewStage = document.getElementById("review-stage");
    const reviewContent = document.getElementById("review-content");
    const reviewEmpty = document.getElementById("review-empty");
    const reviewNext = document.getElementById("review-next");

    const total = data.questions.length;
    qTotal.textContent = ` / ${total}`;

    let idx = 0;
    let picked = null;
    let wrongs = [];
    let gradIndex = 0;

    const questions = data.questions.map(q => ({
      q: q.q,
      a: shuffle(q.a),
      mentor: q.mentor
    }));

    function load(i){
      const current = questions[i];
      qNum.textContent = `${data.labels.q} ${i+1}`;
      qText.textContent = current.q;

      answersBox.innerHTML = "";
      picked = null;
      nextBtn.disabled = true;

      const labels = ["A","B","C"];
      current.a.forEach((ans, k) => {
        const el = document.createElement("div");
        el.className = "quiz-answer";
        el.tabIndex = 0;
        el.setAttribute("role","button");
        el.dataset.correct = !!ans.correct;

        const chip = document.createElement("span");
        chip.className = "quiz-label";
        chip.textContent = labels[k];

        const txt = document.createElement("span");
        txt.textContent = ans.text;

        el.appendChild(chip);
        el.appendChild(txt);
        answersBox.appendChild(el);

        el.addEventListener("click", () => {
          answersBox.querySelectorAll(".quiz-answer").forEach(n => n.classList.remove("selected"));
          el.classList.add("selected");
          picked = { correct: ans.correct, text: ans.text };
          nextBtn.disabled = false;
          resultBtn.disabled = false;
        });
      });

      updateProgress(i);
      bar.style.background = GRADIENTS[gradIndex % GRADIENTS.length];
      gradIndex++;
    }

    function updateProgress(i){
      const percent = (i / total) * 100;
      bar.style.width = `${percent}%`;
    }

    nextBtn.addEventListener("click", () => {
      if(!picked) return;
      const cur = questions[idx];

      if(!picked.correct){
        wrongs.push({
          i: idx+1,
          q: cur.q,
          pickText: picked.text,
          mentor: cur.mentor.wrong
        });
      }

      idx++;
      if(idx < total){
        load(idx);
      }else{
        bar.style.width = "100%";
        qText.textContent = data.labels.done;
        answersBox.innerHTML = "";
        nextBtn.disabled = true;
      }
    });

    resultBtn.addEventListener("click", () => {
      reviewStage.style.display = "block";
      if(wrongs.length === 0){
        reviewEmpty.style.display = "block";
        reviewContent.innerHTML = "";
        reviewNext.style.display = "none";
        return;
      }
      reviewEmpty.style.display = "none";
      reviewNext.style.display = "inline-block";
      buildReviewSlideshow(wrongs, reviewContent, reviewNext);
    });

    load(idx);

    // Live-Sprachwechsel
    document.addEventListener("fsa:lang-change", (e) => {
      const code = e && e.detail ? e.detail : (localStorage.getItem("fsa_lang")||"de");
      render(code);
    });
    window.addEventListener("storage", (e) => {
      if(e.key === "fsa_lang") render(e.newValue || "de");
    });
  }

  function buildReviewSlideshow(items, mount, btn){
    let r = 0;
    function paint(k){
      const it = items[k];
      mount.innerHTML = `
        <div class="review-card">
          <div class="review-qindex">#${it.i}</div>
          <div class="review-q">${escapeHtml(it.q)}</div>
          <div class="review-picked">
            <div class="tag">Falsche Antwort</div>
            <div class="txt">${escapeHtml(it.pickText)}</div>
          </div>
          <div class="review-mentor">${escapeHtml(it.mentor)}</div>
        </div>
      `;
    }
    paint(r);
    btn.onclick = () => {
      r = (r+1) % items.length;
      paint(r);
    };
  }

  function escapeHtml(s){
    return String(s)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;")
      .replace(/>/g,"&gt;").replace(/"/g,"&quot;")
      .replace(/'/g,"&#39;");
  }

  let stylesInjected = false;
  function injectStylesOnce(){
    if(stylesInjected) return;
    stylesInjected = true;
    const css = `
      #quiz-block {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 10px;
        color: #e5e7eb;
        box-shadow: 0 0 15px rgba(212,175,55,0.25);
      }
      #quiz-progress {
        background: #1e293b; height:6px; width:100%;
        border-radius:4px; margin-bottom:1rem; overflow:hidden;
      }
      #quiz-progress-bar { width:0%; height:100%; transition: width .3s ease; }
      #quiz-question-info {
        display:flex; justify-content:space-between;
        font-size:.9rem; color:#d4af37; margin-bottom:.3rem;
      }
      #quiz-question-text {
        font-size:1.05rem; font-weight:600; margin:.4rem 0 .8rem 0;
      }
      .quiz-answer {
        display:flex; align-items:center; gap:.6rem;
        background:#1e293b; border:1px solid transparent;
        padding:.75rem 1rem; border-radius:8px; cursor:pointer;
        margin-bottom:.75rem; transition: all .2s ease;
      }
      .quiz-answer:hover { border-color:#d4af37; }
      .quiz-answer.selected { border-color:#d4af37; background:#0b0f14; }
      .quiz-label {
        width:24px; height:24px; border-radius:50%;
        background:#d4af37; color:#0f172a; font-weight:700;
        display:inline-flex; align-items:center; justify-content:center;
      }
      #quiz-footer button {
        background:#2563eb; color:#fff; border:none;
        padding:.65rem 1.2rem; font-size:.95rem; border-radius:8px;
        cursor:pointer; transition: background .2s ease;
      }
      #quiz-footer button:hover:enabled { background:#1d4ed8; }
      #quiz-footer button:disabled { background:#475569; cursor:not-allowed; }

      /* Review */
      #mentor-review { border:1px solid var(--line); }
      .review-card { border:1px solid rgba(212,175,55,.25); border-radius:10px; padding:1rem; }
      .review-qindex { color:#d4af37; font-weight:700; margin-bottom:.25rem; }
      .review-q { font-weight:600; margin-bottom:.6rem; }
      .review-picked { background:rgba(239,68,68,.08); border:1px solid rgba(239,68,68,.35);
        border-radius:8px; padding:.6rem .8rem; margin-bottom:.6rem; }
      .review-picked .tag { font-size:.8rem; color:#ef4444; margin-bottom:.25rem; }
      .review-picked .txt { color:#e5e7eb; }
      .review-mentor { color:#a3a3a3; line-height:1.55; }
      #review-next {
        background:#334155; color:#fff; border:none; padding:.6rem 1rem;
        border-radius:8px; cursor:pointer;
      }

      @media (max-width: 420px) {
        #quiz-footer { flex-direction: column; }
        #quiz-footer button { width:100%; }
      }
    `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }

  // Autostart – unabhängig vom Template-Loader
  document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    render(lang);
  });
})();
