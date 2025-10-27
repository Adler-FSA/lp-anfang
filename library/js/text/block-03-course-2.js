// ░░ Baustein 03 (Kurs 2) – Sicherheit & Selbstverwahrung – DE/EN, autonom ░░
// Identische Logik/Optik wie block-03-course.js (Kurs 1). Nur Inhalte (Texte) sind neu.
// Zentrierter Titel, Slideshow, Fortschrittsbalken mit Farbwechsel, Auswertung nur der Fehler.

// ───────────────────────────────────────────────────────────────────────────────
// 1) Kursdaten (DE/EN)
// ───────────────────────────────────────────────────────────────────────────────

window.block03_course_2 = {
  de: {
    title: "🛡️ Grundkurs 2 – Sicherheit & Selbstverwahrung",
    btn: { next: "Nächste Frage", result: "Zum Ergebnis", again: "Nochmal ansehen" },
    labels: { q: "Frage", of: "von", done: "✅ Kurs abgeschlossen" },
    reviewTitle: "Auswertung – Deine Lernpunkte",
    reviewEmpty: "Stark – keine Fehler! Du hast die Sicherheitsprinzipien verstanden.",
    questions: [
      {
        q: "Warum sollte eine Seed Phrase niemals digital gespeichert werden?",
        a: [
          { text: "Weil sie sonst nicht wiedergefunden werden kann.", correct: false },
          { text: "Weil Börsen den Zugriff sonst verweigern.", correct: false },
          { text: "Weil jedes digitale Gerät gehackt oder kopiert werden kann – und damit auch deine Werte.", correct: true }
        ],
        mentor: {
          correct: "Gute Entscheidung – du denkst präventiv. Digitale Speicher sind angreifbar; offline bleibt deine Seed außerhalb der Reichweite von Malware.",
          wrong:   "Das greift zu kurz. Alles Digitale ist kopierbar und angreifbar; eine Seed gehört ausschließlich offline, sonst riskierst du den Totalverlust."
        }
      },
      {
        q: "Was unterscheidet eine Passphrase von der Seed Phrase?",
        a: [
          { text: "Die Passphrase ergänzt die Seed Phrase und bietet zusätzlichen Schutz, ähnlich wie eine zweite Tür vor dem Tresor.", correct: true },
          { text: "Beide sind identisch und tauschbar.", correct: false },
          { text: "Die Passphrase ist nur bei zentralen Börsen notwendig.", correct: false }
        ],
        mentor: {
          correct: "Genau – eine zusätzliche Schicht schützt vor Missbrauch. Selbst mit Seed bleibt ohne Passphrase der Zugang versperrt.",
          wrong:   "Nicht ganz. Die Passphrase ist kein Ersatz, sondern ein Zusatzschutz – wie eine zweite Schlüsselstufe für deine Wallet."
        }
      },
      {
        q: "Warum ist ein Hardware-Wallet oft sicherer als eine App-Wallet am Smartphone?",
        a: [
          { text: "Weil es mehr Funktionen und größere Displays hat.", correct: false },
          { text: "Weil die privaten Schlüssel offline gespeichert und niemals mit dem Internet verbunden werden.", correct: true },
          { text: "Weil es kostenpflichtig ist und daher seriöser wirkt.", correct: false }
        ],
        mentor: {
          correct: "Richtig – offline ist der Schlüssel unerreichbar für Remote-Angriffe. Das trennt Signatur und Netzwerk sauber.",
          wrong:   "Der Preis oder Komfort ist nicht der Punkt. Entscheidend ist die echte Offline-Verwahrung der privaten Schlüssel."
        }
      },
      {
        q: "Was bedeutet „Not your keys, not your coins“ konkret für Börsennutzer?",
        a: [
          { text: "Dass du bei einer zentralen Börse immer die vollen Eigentumsrechte behältst.", correct: false },
          { text: "Dass du deine Coins verlierst, wenn du sie nicht innerhalb von 24 Stunden abziehst.", correct: false },
          { text: "Dass du ohne eigene private Schlüssel nur ein Anspruchsrecht gegen die Börse hast – nicht das Eigentum selbst.", correct: true }
        ],
        mentor: {
          correct: "Exakt – auf CEX hast du nur einen Anspruch, kein unmittelbares Eigentum. Schlüssel bedeuten Souveränität.",
          wrong:   "Das verkennt den Kern. Ohne eigene Schlüssel besitzt du keine Coins, sondern nur ein Konto bei einem Dienstleister."
        }
      },
      {
        q: "Warum reicht ein Screenshot der Seed Phrase nicht als Backup?",
        a: [
          { text: "Weil Screenshots oft automatisch in Clouds hochgeladen werden und damit öffentlich zugänglich sein können.", correct: true },
          { text: "Weil die Wallet den Screenshot nicht lesen kann.", correct: false },
          { text: "Weil Screenshots immer unscharf werden.", correct: false }
        ],
        mentor: {
          correct: "Genau – automatische Backups in Cloud/Foto-Mediatheken sind ein Risiko. Papier oder Stahl, nicht Pixel.",
          wrong:   "Das ist ein Trugschluss. Das Problem ist nicht die Lesbarkeit, sondern das heimliche Synchronisieren in unsichere Clouds."
        }
      },
      {
        q: "Wann sollte man eine neue Wallet erstellen?",
        a: [
          { text: "Wenn die alte lange nicht mehr benutzt wurde.", correct: false },
          { text: "Wenn man den Verdacht hat, dass jemand Zugriff auf die Seed Phrase erlangt hat.", correct: true },
          { text: "Wenn man eine neue App-Version installiert.", correct: false }
        ],
        mentor: {
          correct: "Richtig – bei Verdacht sofort migrieren. Je früher du umziehst, desto geringer das Fenster für Angriffe.",
          wrong:   "Das ist gefährlich. Bei jedem Verdacht musst du handeln und Werte in eine frische, sichere Wallet verschieben."
        }
      },
      {
        q: "Was sollte man tun, wenn man seine Seed Phrase verloren hat?",
        a: [
          { text: "Sofort eine neue Wallet erstellen und Werte übertragen, solange Zugriff noch besteht.", correct: true },
          { text: "Sich an den technischen Support der Börse wenden, um eine Kopie zu erhalten.", correct: false },
          { text: "Warten, bis die Blockchain einen Reset durchführt.", correct: false }
        ],
        mentor: {
          correct: "Genau – handeln, solange du signieren kannst. Transferiere alles und dokumentiere sauber dein neues Backup.",
          wrong:   "Darauf kann niemand helfen. Es gibt keine Kopie vom Support und keinen Reset; ohne Seed ist der Zugriff verloren."
        }
      },
      {
        q: "Was zeichnet eine dezentrale Börse (DEX) im Vergleich zu einer zentralen Börse (CEX) aus?",
        a: [
          { text: "Auf einer DEX behältst du die Kontrolle über deine Schlüssel und handelst direkt aus deiner Wallet.", correct: true },
          { text: "Auf einer DEX werden die Daten auf Servern der Börse gespeichert.", correct: false },
          { text: "Eine DEX braucht keine Blockchain.", correct: false }
        ],
        mentor: {
          correct: "Richtig – Selbstverwahrung auch beim Handel. Du unterschreibst lokal; die DEX verwahrt nichts für dich.",
          wrong:   "Das verdreht es. DEX heißt: on-chain und mit deinen Schlüsseln – nicht zentral gespeicherte Konten."
        }
      },
      {
        q: "Warum ist es ratsam, mehrere Wallets für verschiedene Zwecke zu nutzen?",
        a: [
          { text: "Weil man so Verluste besser verstecken kann.", correct: false },
          { text: "Weil Risikotrennung Sicherheit erhöht und man nicht alles auf einer Adresse liegen hat.", correct: true },
          { text: "Weil jede Wallet Zinsen bringt.", correct: false }
        ],
        mentor: {
          correct: "Gute Praxis – trenne langfristige Werte, Alltagsnutzung und Experimente. So begrenzt du Schaden im Ernstfall.",
          wrong:   "Das ist ein Irrweg. Mehrere Wallets dienen der Risikotrennung, nicht dem Verschleiern oder Zins-Trick."
        }
      },
      {
        q: "Was sollte man tun, wenn eine Börse plötzlich Auszahlungen stoppt?",
        a: [
          { text: "Ruhe bewahren, aber zukünftig auf eigene Verwahrung setzen und nicht mehr alles auf CEX lagern.", correct: true },
          { text: "Sofort ein neues Konto eröffnen und Geld überweisen.", correct: false },
          { text: "Nichts, solche Pausen sind üblich und ungefährlich.", correct: false }
        ],
        mentor: {
          correct: "Richtig – Stress rausnehmen, aber Konsequenzen ziehen. Selbstverwahrung reduziert Abhängigkeit von Dritten.",
          wrong:   "Das ist riskant. Auszahlungssperren sind Warnsignale – verlagere künftig in eigene Verwahrung."
        }
      }
    ]
  },

  en: {
    title: "🛡️ Course 2 – Security & Self-Custody",
    btn: { next: "Next question", result: "See results", again: "View again" },
    labels: { q: "Question", of: "of", done: "✅ Course completed" },
    reviewTitle: "Evaluation – Your learning points",
    reviewEmpty: "Great — no mistakes. You’ve understood the security basics.",
    questions: [
      {
        q: "Why should a seed phrase never be stored digitally?",
        a: [
          { text: "Because you might not find it later.", correct: false },
          { text: "Because exchanges would otherwise deny access.", correct: false },
          { text: "Because any digital device can be hacked or copied — including your funds.", correct: true }
        ],
        mentor: {
          correct: "Smart move — you think ahead. Digital storage is attackable; offline storage keeps your seed beyond malware reach.",
          wrong:   "Not quite. Anything digital can be copied or compromised; keep your seed strictly offline or you risk total loss."
        }
      },
      {
        q: "What’s the difference between a passphrase and the seed phrase?",
        a: [
          { text: "The passphrase adds a second layer of protection on top of the seed, like a second door in front of the vault.", correct: true },
          { text: "They are identical and interchangeable.", correct: false },
          { text: "A passphrase is only needed on centralized exchanges.", correct: false }
        ],
        mentor: {
          correct: "Exactly — an extra layer blocks misuse. Even with the seed, access is locked without the passphrase.",
          wrong:   "Incorrect. A passphrase doesn’t replace the seed; it enhances it — a second key tier for your wallet."
        }
      },
      {
        q: "Why is a hardware wallet often safer than a phone app wallet?",
        a: [
          { text: "Because it has more features and a larger display.", correct: false },
          { text: "Because private keys stay offline and never touch the internet.", correct: true },
          { text: "Because it’s paid, thus more reputable.", correct: false }
        ],
        mentor: {
          correct: "Right — offline keys prevent remote attacks. It cleanly separates signing from the network.",
          wrong:   "Price or comfort isn’t the point. True security comes from keeping private keys offline."
        }
      },
      {
        q: "What does “Not your keys, not your coins” mean for exchange users?",
        a: [
          { text: "That you retain full ownership on a centralized exchange.", correct: false },
          { text: "That you’ll lose your coins if you don’t withdraw within 24 hours.", correct: false },
          { text: "That without your own private keys you have a claim on the exchange — not ownership.", correct: true }
        ],
        mentor: {
          correct: "Exactly — on a CEX you hold a claim, not direct ownership. Keys are sovereignty.",
          wrong:   "That misses the point. Without your own keys, you don’t own coins — you only have an account with a provider."
        }
      },
      {
        q: "Why isn’t a screenshot of the seed phrase a safe backup?",
        a: [
          { text: "Because screenshots are often auto-synced to clouds and might become accessible.", correct: true },
          { text: "Because the wallet can’t read screenshots.", correct: false },
          { text: "Because screenshots are always blurry.", correct: false }
        ],
        mentor: {
          correct: "Exactly — auto cloud backups are a risk. Use paper or steel, not pixels.",
          wrong:   "That’s not the issue. The problem is silent syncing to insecure cloud storage."
        }
      },
      {
        q: "When should you create a new wallet?",
        a: [
          { text: "When the old one hasn’t been used for a while.", correct: false },
          { text: "Whenever you suspect the seed phrase may have been exposed.", correct: true },
          { text: "When you install a new app version.", correct: false }
        ],
        mentor: {
          correct: "Right — migrate immediately on suspicion. The earlier you move, the smaller the attack window.",
          wrong:   "Dangerous. If exposure is suspected, move funds into a fresh wallet without delay."
        }
      },
      {
        q: "What should you do if you lose your seed phrase?",
        a: [
          { text: "Create a new wallet at once and transfer while you still have access.", correct: true },
          { text: "Contact exchange support to get a copy.", correct: false },
          { text: "Wait until the blockchain resets.", correct: false }
        ],
        mentor: {
          correct: "Exactly — act while you can still sign transactions. Move everything and set up a proper new backup.",
          wrong:   "No one can help here. There’s no copy from support and no reset; without the seed, access is gone."
        }
      },
      {
        q: "What sets a DEX apart from a CEX?",
        a: [
          { text: "On a DEX you keep your keys and trade directly from your wallet.", correct: true },
          { text: "On a DEX your data is stored on the exchange’s servers.", correct: false },
          { text: "A DEX doesn’t need a blockchain.", correct: false }
        ],
        mentor: {
          correct: "Right — self-custody even while trading. You sign locally; the DEX custodies nothing for you.",
          wrong:   "That reverses it. DEX is on-chain with your keys — not centrally stored accounts."
        }
      },
      {
        q: "Why use multiple wallets for different purposes?",
        a: [
          { text: "To hide losses more easily.", correct: false },
          { text: "Risk separation adds safety; you don’t keep everything on one address.", correct: true },
          { text: "Because each wallet pays interest.", correct: false }
        ],
        mentor: {
          correct: "Good practice — separate long-term holdings, daily use, and experiments. That limits damage if something goes wrong.",
          wrong:   "That’s misguided. Multiple wallets are for risk separation, not for hiding or yield tricks."
        }
      },
      {
        q: "What should you do if an exchange suddenly halts withdrawals?",
        a: [
          { text: "Stay calm, but move toward self-custody going forward — don’t store everything on CEX.", correct: true },
          { text: "Open a new account immediately and wire more money.", correct: false },
          { text: "Nothing; pauses are normal and harmless.", correct: false }
        ],
        mentor: {
          correct: "Right — keep your cool, but change your setup. Self-custody reduces dependency on third parties.",
          wrong:   "Risky view. Withdrawal halts are warning signs — shift to your own custody in the future."
        }
      }
    ]
  }
};

// ───────────────────────────────────────────────────────────────────────────────
// 2) Renderer (identische Struktur wie Kurs 1, nur hier lokal enthalten)
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
    const data = window.block03_course_2[lang] || window.block03_course_2.de;
    const L = labelsByLang(data);
    const root = document.getElementById("quiz-root");
    if(!root) return;

    // Container (eins-zu-eins wie im Basis-Baustein)
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

    // Basis-Stile (gleich wie Kurs 1)
    injectStylesOnce();

    // Elemente
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

    // State
    let idx = 0;
    let picked = null;
    let wrongs = []; // {i, q, pickText, mentorWrong}
    let gradIndex = 0;

    // Fragen (Antworten je Frage gemischt)
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

      // Antworten rendern
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

      // Fortschritt
      updateProgress(i);

      // Farbverlauf Schritt
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
        // Schluss
        bar.style.width = "100%";
        qText.textContent = data.labels.done;
        answersBox.innerHTML = "";
        nextBtn.disabled = true;
      }
    });

    // Ergebnis: Auswertung sichtbar, Inhalte erst beim Klick laden
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

    // Live-Sprachwechsel unterstützen
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

  // Autostart
  document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    // Wenn Kurs 2 explizit geladen werden soll, zeichnen wir in #quiz-root
    render(lang);
  });

})();
