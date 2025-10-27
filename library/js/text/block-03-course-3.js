// ░░ Baustein 03 (Kurs 3) – Einkommen & Chancen – DE/EN, autonom ░░
// Identische Logik/Optik wie block-03-course-2.js (Kurs 2). Nur Inhalte (Texte) sind neu.
// Zentrierter Titel, Slideshow, Fortschrittsbalken mit Farbwechsel, Auswertung nur der Fehler.

// ───────────────────────────────────────────────────────────────────────────────
// 1) Kursdaten (DE/EN)
// ───────────────────────────────────────────────────────────────────────────────

window.block03_course_3 = {
  de: {
    title: "💡 Grundkurs 3 – Einkommen & Chancen",
    btn: { next: "Nächste Frage", result: "Zum Ergebnis", again: "Weiter" },
    labels: { q: "Frage", of: "von", done: "✅ Kurs abgeschlossen" },
    reviewTitle: "Auswertung – Deine Lernpunkte",
    reviewEmpty: "Stark – keine Fehler! Du bewertest Chancen realistisch und handelst mit Plan.",
    questions: [
      {
        q: "Warum ist „schnell reich werden“ der sicherste Weg, Geld zu verlieren?",
        a: [
          { text: "Weil kurzfristige Gier rationale Entscheidungen ersetzt und dich anfällig für Manipulation macht.", correct: true },
          { text: "Weil Reichtum nur durch staatliche Förderung entsteht.", correct: false },
          { text: "Weil Gewinne ohne Risiko gesetzlich verboten sind.", correct: false }
        ],
        mentor: {
          correct: "Sehr gut — du bleibst wachsam. Gier verzerrt Urteilsfähigkeit; Geduld schützt Kapital und Nerven.",
          wrong:   "Das verkennt die Dynamik. Gier macht manipulierbar — wer Tempo jagt, verliert meist Übersicht und Geld."
        }
      },
      {
        q: "Woran erkennt man ein seriöses Krypto-Projekt?",
        a: [
          { text: "Daran, dass Influencer es stark bewerben.", correct: false },
          { text: "Daran, dass es eine extrem hohe Rendite verspricht.", correct: false },
          { text: "An Transparenz, offenem Team, nachvollziehbarer Technologie und realem Nutzen.", correct: true }
        ],
        mentor: {
          correct: "Richtig — Substanz vor Show. Offenheit, reale Anwendung und prüfbare Fakten schlagen Marketing.",
          wrong:   "Hype ersetzt keine Prüfung. Achte auf Team, Code, Nutzen und Nachvollziehbarkeit statt Versprechen."
        }
      },
      {
        q: "Warum ist „passives Einkommen“ kein Zauberwort?",
        a: [
          { text: "Weil es immer steuerfrei bleibt.", correct: false },
          { text: "Weil es nur funktioniert, wenn man versteht, wie der Ertrag entsteht und das Risiko trägt.", correct: true },
          { text: "Weil es automatisch wächst, egal was man tut.", correct: false }
        ],
        mentor: {
          correct: "Exakt — Erträge haben Ursachen und Risiken. Wer versteht, bleibt handlungsfähig und steuerbar.",
          wrong:   "Es gibt kein Einkommen ohne Verantwortung. Verstehe die Quelle und das Risiko, sonst zahlst du Lehrgeld."
        }
      },
      {
        q: "Was unterscheidet Investieren von Spekulieren?",
        a: [
          { text: "Investieren basiert auf Analyse, Spekulieren auf Hoffnung.", correct: true },
          { text: "Beide sind identisch, nur unterschiedlich benannt.", correct: false },
          { text: "Spekulieren ist immer sicherer, weil es kurzfristig ist.", correct: false }
        ],
        mentor: {
          correct: "Genau — Analyse und Prozess schlagen Gefühl. Ein Plan macht dich konsistent.",
          wrong:   "Ohne Analyse ist es Glücksspiel. Investieren braucht Daten, Ziele und Disziplin."
        }
      },
      {
        q: "Was bedeutet „Risikostreuung“ praktisch?",
        a: [
          { text: "Alles Geld in ein einziges starkes Projekt legen.", correct: false },
          { text: "Zufällig mehrere Coins kaufen, ohne Plan.", correct: false },
          { text: "Kapital auf verschiedene Anlageformen verteilen, um Ausfälle abzufangen.", correct: true }
        ],
        mentor: {
          correct: "Perfekt — Streuung begrenzt Einzelschäden. So bleibt dein System robust.",
          wrong:   "Ohne Streuung trifft dich jeder Ausfall voll. Teile Kapital bewusst auf, nicht zufällig."
        }
      },
      {
        q: "Wie erkennt man einen typischen Scam (Betrug) im Kryptobereich?",
        a: [
          { text: "Wenn ein Projekt zu Transparenz und Geduld aufruft.", correct: false },
          { text: "Wenn unrealistische Versprechen, anonyme Gründer oder fehlende Nachweise auftauchen.", correct: true },
          { text: "Wenn es von großen Medien positiv erwähnt wird.", correct: false }
        ],
        mentor: {
          correct: "Gut erkannt — je größer das Versprechen, desto genauer die Prüfung. Seriös heißt überprüfbar.",
          wrong:   "Vorsicht bei Anonymität, Wunder-Rendite und fehlenden Belegen — das sind klassische Warnzeichen."
        }
      },
      {
        q: "Warum ist Liquiditätsbereitstellung (Liquidity Providing) mit Risiko verbunden?",
        a: [
          { text: "Weil die Kurse der Coins schwanken und der eigene Anteil dadurch an Wert verlieren kann.", correct: true },
          { text: "Weil der Anbieter garantiert Verluste ausgleicht.", correct: false },
          { text: "Weil Liquidität nur bei Börsen ohne Nutzer entsteht.", correct: false }
        ],
        mentor: {
          correct: "Richtig — Volatilität betrifft auch LPs. Ertrag kommt mit Preisrisiko und Impermanent Loss.",
          wrong:   "Es gibt keine Garantien. Wer Liquidität stellt, trägt Markt- und Protokollrisiken mit."
        }
      },
      {
        q: "Was ist ein gesundes Ziel beim langfristigen Vermögensaufbau?",
        a: [
          { text: "Monatliche Verdopplung des Kapitals.", correct: false },
          { text: "Stetiges, realistisches Wachstum mit Fokus auf Substanz und Lernfortschritt.", correct: true },
          { text: "Möglichst viele Coins gleichzeitig besitzen.", correct: false }
        ],
        mentor: {
          correct: "So ist es — solide Prozesse schlagen schnelle Sprünge. Konstanz baut Substanz.",
          wrong:   "Überzogene Ziele machen blind. Realistische Schritte halten dich im Spiel."
        }
      },
      {
        q: "Wie sollte man auf Markt-Hypes reagieren?",
        a: [
          { text: "Mit sofortigem Kauf, um nichts zu verpassen.", correct: false },
          { text: "Mit Ruhe, Analyse und klaren Einstiegspunkten statt Emotion.", correct: true },
          { text: "Mit Rückzug aus allen Märkten.", correct: false }
        ],
        mentor: {
          correct: "Perfekt — Hype ist laut, Analyse leise. Ruhe spart Geld.",
          wrong:   "FOMO ist teuer. Definiere Setups und Zeiten, statt impulsiv hinterherzulaufen."
        }
      },
      {
        q: "Was unterscheidet erfolgreiche Investoren von Glücksrittern?",
        a: [
          { text: "Ein klarer Plan, Disziplin und die Bereitschaft, Fehler zu reflektieren.", correct: true },
          { text: "Ein Geheimtipp, der nur in Telegram-Gruppen geteilt wird.", correct: false },
          { text: "Die Anzahl der Trades pro Tag.", correct: false }
        ],
        mentor: {
          correct: "Richtig — Erfolg entsteht aus Gewohnheiten. Plan, Review, Disziplin.",
          wrong:   "Ohne Strategie bleibt Gewinn Zufall. Reflektion macht besser, nicht Frequenz."
        }
      }
    ]
  },

  en: {
    title: "💡 Basic Course 3 – Income & Opportunities",
    btn: { next: "Next question", result: "See results", again: "Next" },
    labels: { q: "Question", of: "of", done: "✅ Course completed" },
    reviewTitle: "Evaluation – Your learning points",
    reviewEmpty: "Great — no mistakes. You assess opportunities realistically and act with a plan.",
    questions: [
      {
        q: "Why is 'getting rich quick' the surest way to lose money?",
        a: [
          { text: "Because short-term greed replaces reason and makes you easy to manipulate.", correct: true },
          { text: "Because wealth only comes from government programs.", correct: false },
          { text: "Because profits without risk are illegal.", correct: false }
        ],
        mentor: {
          correct: "Well done — you stay alert. Greed distorts judgment; patience protects capital and focus.",
          wrong:   "That misses how it works. Chasing speed invites manipulation — you lose clarity and often money."
        }
      },
      {
        q: "How can you recognize a legitimate crypto project?",
        a: [
          { text: "If influencers promote it heavily.", correct: false },
          { text: "If it promises extremely high returns.", correct: false },
          { text: "Through transparency, visible team, verifiable tech, and real utility.", correct: true }
        ],
        mentor: {
          correct: "Right — substance over show. Openness and real use-cases beat marketing.",
          wrong:   "Hype isn’t due diligence. Look for team, code, utility, and proof — not promises."
        }
      },
      {
        q: "Why isn’t 'passive income' a magic word?",
        a: [
          { text: "Because it’s always tax-free.", correct: false },
          { text: "Because it works only if you understand the source of returns and accept the risk.", correct: true },
          { text: "Because it grows automatically no matter what you do.", correct: false }
        ],
        mentor: {
          correct: "Exactly — returns have causes and risks. Understanding keeps you in control.",
          wrong:   "There’s no income without responsibility. Know the source and the risk, or you’ll pay tuition."
        }
      },
      {
        q: "What separates investing from speculating?",
        a: [
          { text: "Investing relies on analysis; speculation relies on hope.", correct: true },
          { text: "They’re the same, just different words.", correct: false },
          { text: "Speculating is safer because it’s short-term.", correct: false }
        ],
        mentor: {
          correct: "Exactly — process beats emotion. A plan makes you consistent.",
          wrong:   "Without analysis, it’s gambling. Investing needs data, goals, and discipline."
        }
      },
      {
        q: "What does diversification mean in practice?",
        a: [
          { text: "Putting all funds into one strong project.", correct: false },
          { text: "Randomly buying several coins without a plan.", correct: false },
          { text: "Spreading capital across different assets to cushion potential losses.", correct: true }
        ],
        mentor: {
          correct: "Spot on — diversification limits single-point failure. It keeps your system resilient.",
          wrong:   "No diversification means one mistake hits full force. Allocate intentionally, not randomly."
        }
      },
      {
        q: "How do you spot a typical crypto scam?",
        a: [
          { text: "If a project promotes transparency and patience.", correct: false },
          { text: "If you see unrealistic promises, anonymous founders, or missing proof.", correct: true },
          { text: "If mainstream media mention it positively.", correct: false }
        ],
        mentor: {
          correct: "Good eye — the bigger the promise, the tighter the review. Legit means verifiable.",
          wrong:   "Beware of anonymity, miracle yields, and missing evidence — classic red flags."
        }
      },
      {
        q: "Why is providing liquidity risky?",
        a: [
          { text: "Because coin prices fluctuate, which can reduce the value of your share.", correct: true },
          { text: "Because the platform guarantees losses.", correct: false },
          { text: "Because liquidity exists only on exchanges without users.", correct: false }
        ],
        mentor: {
          correct: "Right — volatility affects LPs too. Yield comes with price risk and impermanent loss.",
          wrong:   "There are no guarantees. As an LP, you participate in market and protocol risk."
        }
      },
      {
        q: "What’s a healthy target for long-term wealth building?",
        a: [
          { text: "Doubling your capital every month.", correct: false },
          { text: "Consistent, realistic growth focused on substance and learning.", correct: true },
          { text: "Owning as many coins as possible.", correct: false }
        ],
        mentor: {
          correct: "Yes — steady processes beat flashy jumps. Consistency builds substance.",
          wrong:   "Overblown targets blind you. Realistic steps keep you in the game."
        }
      },
      {
        q: "How should you respond to market hype?",
        a: [
          { text: "Buy immediately to avoid missing out.", correct: false },
          { text: "Stay calm, analyze, and define clear entries instead of reacting emotionally.", correct: true },
          { text: "Exit all markets entirely.", correct: false }
        ],
        mentor: {
          correct: "Perfect — hype is loud, analysis is quiet. Calm saves money.",
          wrong:   "FOMO is expensive. Define setups and timing rather than chasing."
        }
      },
      {
        q: "What separates successful investors from gamblers?",
        a: [
          { text: "A clear plan, discipline, and willingness to reflect on mistakes.", correct: true },
          { text: "A secret tip shared only in private groups.", correct: false },
          { text: "The number of trades per day.", correct: false }
        ],
        mentor: {
          correct: "Right — success is built on habits. Plan, review, discipline.",
          wrong:   "Without a strategy, gains are luck. Reflection improves you — not trade count."
        }
      }
    ]
  }
};

// ───────────────────────────────────────────────────────────────────────────────
// 2) Renderer (identisch zu Kurs 2, lokal enthalten)
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
    const data = window.block03_course_3[lang] || window.block03_course_3.de;
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

  document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    render(lang);
  });
})();
