/* ░░ Baustein 03 – Grundkurs-Basis: Fragen & Auswertung (ohne Punkte/Medaillen) ░░
   – Rendert zwei Container:
       (1) Fragen-Container (oben)
       (2) Auswertungs-Container (unten, sichtbar aber leer bis "Ergebnis =")
   – Live-Sprachwechsel via 'fsa:lang-change' (library/js/lang-switcher.js)
   – Fortschrittsbalken: sanfter Farbwechsel im FSA-Farbspektrum
   – Antworten werden pro Frage durchmischt (A/B/C wechseln)
   – Für jede falsche Antwort eigener Mentor-Text (DE/EN), für richtig eigener Hinweis
   – Mobil-Hinweis: "Handy quer drehen" bei schmalen Portrait-Displays
   – Doppellade-Schutz für Template-Loader
*/

(function() {
  // ─────────────────────────────────────────────────────────────────────────────
  // Doppellade-Schutz
  // ─────────────────────────────────────────────────────────────────────────────
  if (window.block03_courseLoaded) {
    console.log("ℹ️ block-03-course.js bereits geladen, übersprungen.");
    return;
  }
  window.block03_courseLoaded = true;

  // ─────────────────────────────────────────────────────────────────────────────
  // Sprache ermitteln + Live-Wechsel vorbereiten
  // ─────────────────────────────────────────────────────────────────────────────
  const getLang = () => {
    const stored = localStorage.getItem("fsa_lang");
    if (stored === "de" || stored === "en") return stored;
    // Fallback auf <html lang="…">
    const htmlLang = (document.documentElement.getAttribute("lang") || "de").toLowerCase();
    return htmlLang.startsWith("en") ? "en" : "de";
  };
  let currentLang = getLang();

  // ─────────────────────────────────────────────────────────────────────────────
  // Daten: Kurs-Inhalte (DE/EN) – Fragen + Antworten + Mentortexte pro Antwort
  //  Hinweis: Jede Antwort hat ihren eigenen Mentor-Text (wrong/correct).
  //           Damit sind pro Frage 3 Mentor-Texte je Sprache enthalten.
  //           Die Fragen/Antworten sind exakt wie spezifiziert (unkürzt).
  // ─────────────────────────────────────────────────────────────────────────────
  const block03_course = {
    de: {
      courseLevel: 1,
      title: "Dein erster Grundkurs – Die Basis für finanzielle Souveränität",
      questions: [
        {
          q: "Warum ist der erste Schritt zur finanziellen Souveränität das eigene Verständnis über Geldflüsse?",
          a: [
            {
              text: "Weil nur wer versteht, wie Geld entsteht und zirkuliert, bewusste Entscheidungen treffen kann.",
              correct: true,
              mentor: "Genau. Wer Geldflüsse versteht, erkennt Chancen und Risiken – und entscheidet bewusst statt zufällig."
            },
            {
              text: "Weil Geld immer durch Banken kontrolliert wird und man sich dem nicht entziehen kann.",
              correct: false,
              mentor: "Diese Annahme macht passiv. Eigenes Verständnis schafft Handlungsspielraum – Kontrolle ist nicht absolut."
            },
            {
              text: "Weil finanzielle Souveränität nur von staatlicher Regulierung abhängt.",
              correct: false,
              mentor: "Regeln setzen Rahmen. Souveränität entsteht vor allem durch Wissen, Disziplin und eigene Entscheidungen."
            }
          ]
        },
        {
          q: "Was unterscheidet ein klassisches Bankkonto von einer Krypto-Wallet?",
          a: [
            {
              text: "Ein Bankkonto gehört einer Bank, eine Wallet gehört ausschließlich dir selbst.",
              correct: true,
              mentor: "Richtig. Selbstverwahrung heißt: Du hältst die Schlüssel – du hältst die Kontrolle."
            },
            {
              text: "Beide speichern nur die Transaktionen, nicht das Geld selbst.",
              correct: false,
              mentor: "Vereinfacht – aber irreführend. Der Kernunterschied ist die Verwahrung der Schlüssel, nicht die Buchungslogik."
            },
            {
              text: "Beide Systeme werden von denselben Institutionen überwacht.",
              correct: false,
              mentor: "Nein. Bankkonten sind zentral reguliert; Self-Custody-Wallets unterliegen deiner eigenen Verantwortung."
            }
          ]
        },
        {
          q: "Warum ist die Seed Phrase der wichtigste Teil einer Wallet?",
          a: [
            {
              text: "Sie ist der einzige Zugang zu deinem Vermögen – ohne Seed kein Zugriff.",
              correct: true,
              mentor: "Perfekt. Wer die Seed kontrolliert, kontrolliert das Vermögen. Schütze sie wie einen Tresorschlüssel."
            },
            {
              text: "Sie ersetzt die PIN deiner Bankkarte.",
              correct: false,
              mentor: "Die Seed ist umfassender: Sie rekonstruiert ganze Wallets – nicht nur eine PIN für ein Konto."
            },
            {
              text: "Sie ist der Nachweis, dass du Kunde einer Börse bist.",
              correct: false,
              mentor: "Das verwechselt Wallet mit Börse. Die Seed gehört zur Wallet, nicht zu einem Exchange-Kundennachweis."
            }
          ]
        },
        {
          q: "Was bedeutet „finanzielle Eigenverantwortung“ im Krypto-Kontext?",
          a: [
            {
              text: "Dass man bereit ist, für seine Entscheidungen und Fehler selbst einzustehen.",
              correct: true,
              mentor: "Genau. Verantwortung heißt: lernen, prüfen, entscheiden – und Konsequenzen tragen."
            },
            {
              text: "Dass man anderen Vertrauenspersonen die Verwahrung überlässt.",
              correct: false,
              mentor: "Delegation kann bequem sein – sie ersetzt aber keine Verantwortung und schafft neue Abhängigkeiten."
            },
            {
              text: "Dass man möglichst viele Konten bei verschiedenen Börsen eröffnet.",
              correct: false,
              mentor: "Mehr Konten sind kein Ersatz für Kompetenz. Breite ohne Wissen erhöht eher die Angriffsfläche."
            }
          ]
        },
        {
          q: "Warum sollte man Plattformen wie Trustyfy verstehen, bevor man Geld einzahlt?",
          a: [
            {
              text: "Weil Verständnis über Funktion und Risiko vor Verlust schützt.",
              correct: true,
              mentor: "Richtig. Wer Mechanik und Risiken kennt, schützt Kapital und Nerven."
            },
            {
              text: "Weil sie das beste Zinsmodell bieten.",
              correct: false,
              mentor: "„Beste Zinsen“ ohne Verständnis sind Einladungen zu Fehlentscheidungen. Erst verstehen, dann entscheiden."
            },
            {
              text: "Weil sonst Transaktionen automatisch abgelehnt werden.",
              correct: false,
              mentor: "Nicht automatisch. Ablehnungen haben Gründe – fehlendes Verständnis ist der riskante Teil."
            }
          ]
        },
        {
          q: "Welche Aussage beschreibt „Dezentralität“ am besten?",
          a: [
            {
              text: "Ein System, bei dem jeder Teilnehmer gleiche Rechte und Zugriffe hat.",
              correct: true,
              mentor: "Genau. Keine zentrale Instanz als Nadelöhr – dafür Regeln im Protokoll für alle."
            },
            {
              text: "Ein System, das von einer zentralen Behörde gesteuert wird.",
              correct: false,
              mentor: "Das ist das Gegenteil von Dezentralität – zentral gesteuert heißt abhängig von einer Stelle."
            },
            {
              text: "Ein System, das keine Technologie, sondern eine Bankstruktur nutzt.",
              correct: false,
              mentor: "Dezentralität ist technologisch abgebildet (z. B. Blockchain), nicht klassisch bankbasiert."
            }
          ]
        },
        {
          q: "Warum ist „Nicht deine Schlüssel – nicht deine Coins“ mehr als ein Spruch?",
          a: [
            {
              text: "Weil du ohne eigene Schlüssel nicht wirklich der Besitzer deiner Krypto-Werte bist.",
              correct: true,
              mentor: "Exakt. Schlüssel = Verfügungsmacht. Ohne Schlüssel bist du nur Nutzer, nicht Eigentümer."
            },
            {
              text: "Weil die Schlüssel automatisch bei der Börse gespeichert werden.",
              correct: false,
              mentor: "Das ist Verwahrung durch Dritte – bequem, aber mit Gegenparteirisiko. Self-Custody ist etwas anderes."
            },
            {
              text: "Weil Coins immer durch staatliche Versicherung geschützt sind.",
              correct: false,
              mentor: "Für Krypto gibt es keine pauschale Einlagensicherung. Schutz entsteht primär durch Eigenkontrolle."
            }
          ]
        },
        {
          q: "Welche Haltung führt am ehesten zu langfristigem finanziellem Erfolg?",
          a: [
            {
              text: "Geduld, Disziplin und die Bereitschaft, ständig weiter zu lernen.",
              correct: true,
              mentor: "Genau. Vermögen ist meist Ergebnis von Konsistenz, nicht von Hektik."
            },
            {
              text: "Schnelles Handeln ohne Vorwissen.",
              correct: false,
              mentor: "Tempo ohne Wissen ist Zufall – und der spielt selten zu deinen Gunsten."
            },
            {
              text: "Blindes Vertrauen in die Erfahrungen anderer.",
              correct: false,
              mentor: "Erfahrungen sind Hinweise, kein Autopilot. Prüfen, verstehen, erst dann handeln."
            }
          ]
        },
        {
          q: "Warum braucht finanzielle Souveränität ein Verständnis für Risiko?",
          a: [
            {
              text: "Weil du ohne Risikobewusstsein nicht frei, sondern abhängig entscheidest.",
              correct: true,
              mentor: "Sehr gut. Wer Risiken kennt, entscheidet souverän – nicht getrieben."
            },
            {
              text: "Weil Risiko nur bei Banken existiert.",
              correct: false,
              mentor: "Risiko ist universell – Markt, Technik, Mensch. Es verschwindet nicht durch Etiketten."
            },
            {
              text: "Weil Risiken sich automatisch ausgleichen, wenn man Geduld hat.",
              correct: false,
              mentor: "Zeit heilt nicht jeden Fehler. Fehlannahmen verstetigen Verluste – Verständnis verhindert sie."
            }
          ]
        },
        {
          q: "Was zeigt, dass jemand finanziell souverän geworden ist?",
          a: [
            {
              text: "Er nutzt sein Wissen bewusst, um unabhängig von Systemen zu handeln.",
              correct: true,
              mentor: "Genau. Souveränität ist gelebte Unabhängigkeit – entschieden, begründet, ruhig."
            },
            {
              text: "Er kann schnell Geld leihen, wenn er es braucht.",
              correct: false,
              mentor: "Liquidität leihen ist nicht Souveränität. Echte Stärke ist vorausschauende Planung."
            },
            {
              text: "Er vertraut darauf, dass andere für ihn die richtige Entscheidung treffen.",
              correct: false,
              mentor: "Abhängigkeit bleibt Abhängigkeit – selbst wenn sie bequem ist."
            }
          ]
        }
      ]
    },

    // ===== English version =====
    en: {
      courseLevel: 1,
      title: "Your First Foundation Course – The Basis for Financial Sovereignty",
      questions: [
        {
          q: "Why is the first step toward financial sovereignty understanding money flows?",
          a: [
            {
              text: "Because only those who understand how money is created and circulates can make conscious decisions.",
              correct: true,
              mentor: "Exactly. Understanding flows reveals risk and opportunity, so choices become intentional."
            },
            {
              text: "Because money is always controlled by banks and you cannot escape it.",
              correct: false,
              mentor: "That belief leads to passivity. Knowledge expands your options, even within constraints."
            },
            {
              text: "Because financial sovereignty only depends on government regulation.",
              correct: false,
              mentor: "Rules set the frame; sovereignty comes from knowledge, discipline and personal decisions."
            }
          ]
        },
        {
          q: "What differentiates a traditional bank account from a crypto wallet?",
          a: [
            {
              text: "A bank account belongs to a bank; a wallet belongs solely to you.",
              correct: true,
              mentor: "Right. Self-custody means you hold the keys — you hold the control."
            },
            {
              text: "Both store only transactions, not the money itself.",
              correct: false,
              mentor: "Oversimplified and misleading. The key difference is where the private keys are held."
            },
            {
              text: "Both systems are monitored by the same institutions.",
              correct: false,
              mentor: "No. Bank accounts are centrally regulated; self-custody wallets are your responsibility."
            }
          ]
        },
        {
          q: "Why is the seed phrase the most important part of a wallet?",
          a: [
            {
              text: "It is the only access to your funds — without the seed, no access.",
              correct: true,
              mentor: "Perfect. Whoever holds the seed holds the vault — protect it like a master key."
            },
            {
              text: "It replaces the PIN of your bank card.",
              correct: false,
              mentor: "The seed can recover entire wallets, far beyond a single PIN for one account."
            },
            {
              text: "It proves you are a customer of an exchange.",
              correct: false,
              mentor: "That mixes up wallets and exchanges. The seed belongs to the wallet, not to KYC at an exchange."
            }
          ]
        },
        {
          q: "What does 'financial responsibility' truly mean in the crypto context?",
          a: [
            {
              text: "Taking full responsibility for your own decisions and outcomes.",
              correct: true,
              mentor: "Yes. Learn, verify, decide — and own the consequences."
            },
            {
              text: "Letting others hold your assets in custody.",
              correct: false,
              mentor: "Delegation can be convenient but creates new dependencies and removes control."
            },
            {
              text: "Opening as many exchange accounts as possible.",
              correct: false,
              mentor: "Breadth without understanding increases surface area for mistakes, not sovereignty."
            }
          ]
        },
        {
          q: "Why should you understand platforms like Trustyfy before depositing money?",
          a: [
            {
              text: "Because understanding function and risk protects from loss.",
              correct: true,
              mentor: "Correct. Knowing mechanics and risks protects capital and peace of mind."
            },
            {
              text: "Because they offer the best interest model.",
              correct: false,
              mentor: "“Best rates” without understanding invite mistakes. Understand first, then act."
            },
            {
              text: "Because otherwise transactions are automatically declined.",
              correct: false,
              mentor: "Not automatically. Rejections have reasons — the real risk is acting without understanding."
            }
          ]
        },
        {
          q: "Which statement best describes 'decentralization'?",
          a: [
            {
              text: "A system where every participant has equal rights and access.",
              correct: true,
              mentor: "Exactly. No single choke point; rules are embedded in the protocol for everyone."
            },
            {
              text: "A system controlled by a central authority.",
              correct: false,
              mentor: "That’s centralization — the opposite of decentralization."
            },
            {
              text: "A system that uses no technology but a bank structure.",
              correct: false,
              mentor: "Decentralization is implemented technologically (e.g., blockchains), not via classic bank models."
            }
          ]
        },
        {
          q: "Why is 'Not your keys, not your coins' more than a slogan?",
          a: [
            {
              text: "Because without your own keys, you’re not truly the owner of your crypto assets.",
              correct: true,
              mentor: "Exactly. Keys equal control. Without keys you’re a user, not an owner."
            },
            {
              text: "Because keys are automatically stored at the exchange.",
              correct: false,
              mentor: "That’s third-party custody — convenient but with counterparty risk. Self-custody is different."
            },
            {
              text: "Because coins are always protected by state insurance.",
              correct: false,
              mentor: "There’s no blanket deposit insurance for crypto. Protection comes primarily from self-custody."
            }
          ]
        },
        {
          q: "Which mindset most likely leads to long-term financial success?",
          a: [
            {
              text: "Patience, discipline, and a willingness to keep learning.",
              correct: true,
              mentor: "Exactly. Wealth often follows consistency, not haste."
            },
            {
              text: "Acting fast without prior knowledge.",
              correct: false,
              mentor: "Speed without knowledge is chance — rarely on your side."
            },
            {
              text: "Blind trust in the experience of others.",
              correct: false,
              mentor: "Others’ experience is a hint, not an autopilot. Verify, understand, then act."
            }
          ]
        },
        {
          q: "Why does financial sovereignty require understanding of risk?",
          a: [
            {
              text: "Because without risk awareness, you decide dependently, not freely.",
              correct: true,
              mentor: "Right. Knowing risks turns pressure into calm decisions."
            },
            {
              text: "Because risk only exists in banks.",
              correct: false,
              mentor: "Risk is universal — markets, technology, humans. Labels don’t remove it."
            },
            {
              text: "Because risks automatically balance over time.",
              correct: false,
              mentor: "Time doesn’t fix flawed assumptions. Understanding prevents repeated loss."
            }
          ]
        },
        {
          q: "What shows that someone has achieved financial sovereignty?",
          a: [
            {
              text: "They use their knowledge consciously to act independently of systems.",
              correct: true,
              mentor: "Exactly. Sovereignty is lived independence — deliberate, reasoned, calm."
            },
            {
              text: "They can easily borrow money when needed.",
              correct: false,
              mentor: "Borrowed liquidity isn’t sovereignty. Real strength is anticipation and planning."
            },
            {
              text: "They trust others to make the right decisions for them.",
              correct: false,
              mentor: "Dependency remains dependency — even if it feels comfortable."
            }
          ]
        }
      ]
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Hilfsfunktionen
  // ─────────────────────────────────────────────────────────────────────────────
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // FSA-Farbpfad für Progress (sanfter Übergang)
  const FSA_COLORS = [
    "#d4af37", // Gold
    "#3b82f6", // Blau
    "#22d3ee", // Türkis
    "#10b981", // Grün
    "#8b5cf6", // Violett
    "#d4af37"  // zurück zu Gold
  ];

  const lerp = (a, b, t) => Math.round(a + (b - a) * t);
  const hexToRgb = (hex) => {
    const h = hex.replace("#", "");
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16)
    };
  };
  const rgbToHex = ({r, g, b}) =>
    "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");

  const colorAtStep = (idx, total) => {
    // weicher Übergang entlang der FSA_COLORS je Frage-Index
    const segments = FSA_COLORS.length - 1;
    const t = (idx / Math.max(1, total)); // 0..1
    const pos = t * segments;
    const i = Math.min(segments - 1, Math.floor(pos));
    const localT = pos - i;
    const c1 = hexToRgb(FSA_COLORS[i]);
    const c2 = hexToRgb(FSA_COLORS[i + 1]);
    return rgbToHex({
      r: lerp(c1.r, c2.r, localT),
      g: lerp(c1.g, c2.g, localT),
      b: lerp(c1.b, c2.b, localT)
    });
  };

  // Mischen (Fisher-Yates), gibt auch Mapping zurück
  const shuffleWithMap = (arr) => {
    const a = arr.map((v, i) => ({ v, i })); // kopie mit originalindex
    for (let j = a.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [a[j], a[k]] = [a[k], a[j]];
    }
    return a; // {v: answerObj, i: originalIndex}
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Rendering – Styles
  // ─────────────────────────────────────────────────────────────────────────────
  const style = document.createElement("style");
  style.textContent = `
  /* ===== Grundkurs-Basis – Layout (Container + Auswertung) ===== */
  .fsa-course-wrap {
    max-width: 860px;
    margin: 40px auto 18px;
    padding: 0 16px;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    color: #e5e7eb;
  }
  .fsa-titlebar {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 12px;
  }
  .fsa-titlebar svg { width: 28px; height: 28px; filter: drop-shadow(0 0 6px rgba(212,175,55,0.6)); }
  .fsa-titlebar h2 {
    font-size: 1.2rem; font-weight: 700; margin: 0;
    letter-spacing: 0.2px; color: #e5e7eb;
  }

  .fsa-card {
    background: linear-gradient(180deg, #0f172a 0%, #0b1222 100%);
    border: 1px solid rgba(212,175,55,0.35);
    border-radius: 12px;
    box-shadow:
      0 0 0 1px rgba(212,175,55,0.12) inset,
      0 8px 22px rgba(0,0,0,0.35),
      0 0 18px rgba(212,175,55,0.18);
    padding: 18px;
  }

  .fsa-progress {
    height: 8px; width: 100%; border-radius: 6px;
    background: #1e293b; overflow: hidden; margin-bottom: 12px;
    box-shadow: 0 0 0 1px rgba(212,175,55,0.15) inset;
  }
  .fsa-progress__bar {
    height: 100%; width: 0%;
    background: #d4af37;
    transition: width .45s ease, background-color .6s ease;
  }

  .fsa-qmeta {
    display: flex; justify-content: space-between; align-items: center;
    color: #d4af37; font-size: .92rem; margin: 6px 2px 8px;
  }

  .fsa-question {
    font-size: 1.06rem; font-weight: 600; margin: 8px 2px 12px;
    color: #f3f4f6;
  }

  .fsa-answer {
    display: flex; align-items: center; gap: 10px;
    background: #152238;
    border: 1px solid transparent;
    padding: 12px 14px; border-radius: 10px;
    cursor: pointer; margin-bottom: 10px;
    transition: all .2s ease;
  }
  .fsa-answer:hover { border-color: #d4af37; }
  .fsa-answer.selected { border-color: #d4af37; background: #0b0f14; }

  .fsa-pill {
    min-width: 26px; height: 26px; line-height: 26px;
    border-radius: 50%; text-align: center; font-weight: 700;
    background: #d4af37; color: #0f172a;
    box-shadow: 0 0 10px rgba(212,175,55,0.45);
  }

  .fsa-footer {
    display: flex; justify-content: space-between; align-items: center;
    gap: 10px; margin-top: 12px;
  }

  .fsa-btn {
    border: 0; border-radius: 10px; padding: 12px 16px;
    font-size: 1rem; cursor: pointer;
    background: #1f2937; color: #e5e7eb;
    transition: background .2s ease, opacity .2s ease;
  }
  .fsa-btn[disabled] { opacity: .6; cursor: not-allowed; }
  .fsa-btn--primary { background: #2563eb; color: #fff; }
  .fsa-btn--primary:hover:not([disabled]) { background: #1d4ed8; }
  .fsa-btn--ghost { background: #141b29; }

  /* Auswertung */
  .fsa-results {
    margin-top: 18px;
  }
  .fsa-results__title {
    display: flex; align-items: center; gap: 10px; margin: 0 0 10px 0;
    font-weight: 700; color: #e5e7eb; font-size: 1.02rem;
  }
  .fsa-results__slide {
    margin-top: 10px;
  }
  .fsa-mentor {
    background: #121a2b; border: 1px solid rgba(212,175,55,0.35);
    border-radius: 10px; padding: 12px 14px; margin-top: 10px;
    box-shadow: 0 0 12px rgba(212,175,55,0.12) inset;
  }
  .fsa-muted { color: #9aa5b1; font-size: .95rem; }

  /* Handy-Hinweis */
  .fsa-rotate-hint {
    display: none;
    margin: 8px 0 0; font-size: .92rem; color: #c7cbd3;
    opacity: .9;
  }
  .fsa-rotate-hint.active { display: block; }

  /* Responsiv */
  @media (max-width: 600px) {
    .fsa-titlebar { gap: 10px; }
    .fsa-titlebar h2 { font-size: 1.04rem; }
    .fsa-card { padding: 14px; }
    .fsa-answer { padding: 11px 12px; }
    .fsa-btn { padding: 11px 14px; font-size: .98rem; }
  }
  `;
  document.head.appendChild(style);

  // ─────────────────────────────────────────────────────────────────────────────
  // Rendering – Container + SVG
  // ─────────────────────────────────────────────────────────────────────────────
  const root = document.createElement("section");
  root.className = "fsa-course-wrap";
  root.id = "fsa-course-03";

  // SVG-Kompass (Glow) – inline
  const compassSVG = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="grad-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f5d98b"/>
        <stop offset="100%" stop-color="#d4af37"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="9.5" fill="none" stroke="url(#grad-gold)" stroke-width="1.4"/>
    <path d="M12 5.5 L14.8 12 L12 18.5 L9.2 12 Z" fill="url(#grad-gold)" opacity="0.95"/>
    <circle cx="12" cy="12" r="1.2" fill="#0b0f14" stroke="url(#grad-gold)" stroke-width="1"/>
  </svg>`;

  root.innerHTML = `
    <div class="fsa-titlebar">
      ${compassSVG}
      <h2 class="fsa-title"></h2>
    </div>

    <!-- Fragen-Container -->
    <div class="fsa-card" id="fsa-questions">
      <div class="fsa-progress"><div class="fsa-progress__bar" id="fsa-progress-bar"></div></div>
      <div class="fsa-qmeta">
        <div><span id="fsa-qnum"></span><span id="fsa-qtotal"></span></div>
        <div class="fsa-rotate-hint" id="fsa-rotate-hint"></div>
      </div>
      <div class="fsa-question" id="fsa-question-text"></div>
      <div id="fsa-answers"></div>
      <div class="fsa-footer">
        <button class="fsa-btn fsa-btn--ghost" id="fsa-prev"></button>
        <div style="display:flex; gap:10px;">
          <button class="fsa-btn" id="fsa-result" style="display:none;"></button>
          <button class="fsa-btn fsa-btn--primary" id="fsa-next" disabled></button>
        </div>
      </div>
    </div>

    <!-- Auswertungs-Container (sichtbar, inhalt leer bis Klick) -->
    <div class="fsa-card fsa-results" id="fsa-results">
      <div class="fsa-results__title" id="fsa-results-title"></div>
      <div id="fsa-results-body" class="fsa-results__body"></div>
      <div class="fsa-footer" id="fsa-results-footer" style="display:none;">
        <button class="fsa-btn fsa-btn--primary" id="fsa-results-next"></button>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  // ─────────────────────────────────────────────────────────────────────────────
  // DOM-Refs
  // ─────────────────────────────────────────────────────────────────────────────
  const elTitle = $(".fsa-title", root);
  const elProgress = $("#fsa-progress-bar", root);
  const elQNum = $("#fsa-qnum", root);
  const elQTotal = $("#fsa-qtotal", root);
  const elRotateHint = $("#fsa-rotate-hint", root);
  const elQText = $("#fsa-question-text", root);
  const elAnswers = $("#fsa-answers", root);
  const btnPrev = $("#fsa-prev", root);
  const btnNext = $("#fsa-next", root);
  const btnResult = $("#fsa-result", root);

  const elResTitle = $("#fsa-results-title", root);
  const elResBody = $("#fsa-results-body", root);
  const elResFooter = $("#fsa-results-footer", root);
  const btnResNext = $("#fsa-results-next", root);

  // ─────────────────────────────────────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────────────────────────────────────
  let data = block03_course[currentLang];
  let total = data.questions.length;
  let index = 0;
  let selectedIndexInShuffled = null;
  let shuffledAnswers = []; // [{v:answer, i:originalIndex}, …]
  let wrongPicks = []; // Sammlung für Auswertung [{qIndex, qText, chosenText, mentorText}, …]
  let showingResults = false;
  let resultsPointer = 0;

  // ─────────────────────────────────────────────────────────────────────────────
  // i18n statische Strings
  // ─────────────────────────────────────────────────────────────────────────────
  const I18N = {
    de: {
      prev: "Zurück",
      next: "Nächste Frage",
      q: "Frage ",
      of: " / ",
      resultBtn: "Ergebnis =",
      rotate: "Für bessere Ansicht bitte das Handy quer drehen.",
      resultsTitle: "Mentor-Auswertung",
      noMistakes: "Alle Antworten waren korrekt. Starke Leistung – du hast die Prinzipien verstanden.",
      yourAnswer: "Deine Antwort:",
      mentorSays: "Mentor erklärt:",
      nextMistake: "Weiter",
      done: "Fertig"
    },
    en: {
      prev: "Back",
      next: "Next question",
      q: "Question ",
      of: " / ",
      resultBtn: "Result =",
      rotate: "For a better view, please rotate your phone to landscape.",
      resultsTitle: "Mentor Review",
      noMistakes: "All answers were correct. Strong work — you’ve understood the principles.",
      yourAnswer: "Your answer:",
      mentorSays: "Mentor explains:",
      nextMistake: "Next",
      done: "Done"
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Mobil-Hinweis steuern
  // ─────────────────────────────────────────────────────────────────────────────
  const updateRotateHint = () => {
    const isNarrow = window.innerWidth < 600;
    const isPortrait = window.innerHeight > window.innerWidth;
    elRotateHint.textContent = I18N[currentLang].rotate;
    elRotateHint.classList.toggle("active", isNarrow && isPortrait);
  };
  window.addEventListener("resize", updateRotateHint);
  window.addEventListener("orientationchange", updateRotateHint);

  // ─────────────────────────────────────────────────────────────────────────────
  // Frage laden/rendern
  // ─────────────────────────────────────────────────────────────────────────────
  function loadQuestion(idx) {
    showingResults = false;
    const q = data.questions[idx];

    // Kopf/Titel & Meta
    elTitle.textContent = data.title;
    elQNum.textContent = I18N[currentLang].q + (idx + 1);
    elQTotal.textContent = I18N[currentLang].of + total;

    // Frage
    elQText.textContent = q.q;

    // Antworten durchmischen
    shuffledAnswers = shuffleWithMap(q.a);
    selectedIndexInShuffled = null;
    elAnswers.innerHTML = "";

    // Labels dynamisch erzeugen (A/B/C auf Basis der aktuellen Reihenfolge)
    const ABC = ["A", "B", "C"];
    shuffledAnswers.forEach((entry, j) => {
      const wrap = document.createElement("div");
      wrap.className = "fsa-answer";
      wrap.setAttribute("role", "button");
      wrap.setAttribute("tabindex", "0");

      const pill = document.createElement("span");
      pill.className = "fsa-pill";
      pill.textContent = ABC[j];

      const text = document.createElement("span");
      text.textContent = entry.v.text;

      wrap.appendChild(pill);
      wrap.appendChild(text);

      wrap.addEventListener("click", () => selectAnswer(j));
      wrap.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectAnswer(j);
        }
      });

      elAnswers.appendChild(wrap);
    });

    // Buttons
    btnPrev.textContent = I18N[currentLang].prev;
    btnNext.textContent = I18N[currentLang].next;
    btnResult.textContent = I18N[currentLang].resultBtn;

    btnPrev.disabled = idx === 0;
    btnNext.disabled = true;
    btnResult.style.display = (idx === total - 1) ? "inline-block" : "none";

    // Fortschritt
    updateProgress(idx);

    // Drehhinweis
    updateRotateHint();
  }

  function selectAnswer(j) {
    $$(".fsa-answer", root).forEach(a => a.classList.remove("selected"));
    const nodes = $$(".fsa-answer", root);
    if (nodes[j]) nodes[j].classList.add("selected");
    selectedIndexInShuffled = j;
    btnNext.disabled = false;
  }

  function updateProgress(idx) {
    const pct = (idx / total) * 100;
    elProgress.style.width = `${pct}%`;
    elProgress.style.backgroundColor = colorAtStep(idx, total);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────────────────────────────────────
  btnPrev.addEventListener("click", () => {
    if (index > 0) {
      index--;
      loadQuestion(index);
    }
  });

  btnNext.addEventListener("click", () => {
    if (selectedIndexInShuffled == null) return;
    // Antwort bewerten und ggf. merken
    const picked = shuffledAnswers[selectedIndexInShuffled].v; // {text, correct, mentor}
    const q = data.questions[index];

    if (!picked.correct) {
      wrongPicks.push({
        qIndex: index,
        qText: q.q,
        chosenText: picked.text,
        mentorText: picked.mentor   // passend zur gewählten falschen Antwort
      });
    } else {
      // auch bei richtigem Klick kann später der Mentor-Hinweis sinnvoll sein – hier nicht nötig
    }

    index++;
    if (index < total) {
      loadQuestion(index);
    } else {
      // Ende der Fragen
      elProgress.style.width = "100%";
      elProgress.style.backgroundColor = colorAtStep(total, total);
      btnNext.disabled = true;
      btnPrev.disabled = true;
      // Button "Ergebnis =" ist bereits sichtbar; wir lassen die Auswahl stehen
    }
  });

  // Ergebnis anzeigen
  btnResult.addEventListener("click", () => {
    if (showingResults) return;
    showingResults = true;
    renderResultsIntro();
    resultsPointer = 0;
    if (wrongPicks.length === 0) {
      renderNoMistakes();
    } else {
      renderResultSlide(resultsPointer);
    }
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Auswertung
  // ─────────────────────────────────────────────────────────────────────────────
  function renderResultsIntro() {
    const title = I18N[currentLang].resultsTitle;
    elResTitle.textContent = title;
    elResBody.innerHTML = "";
    elResFooter.style.display = "none";
  }

  function renderNoMistakes() {
    const p = document.createElement("p");
    p.className = "fsa-muted";
    p.textContent = I18N[currentLang].noMistakes;
    elResBody.innerHTML = "";
    elResBody.appendChild(p);
  }

  function renderResultSlide(ptr) {
    const item = wrongPicks[ptr];
    const labels = I18N[currentLang];

    elResBody.innerHTML = `
      <div class="fsa-results__slide">
        <div class="fsa-question">${item.qText}</div>
        <div class="fsa-answer" style="cursor:default;">
          <span class="fsa-pill">✕</span>
          <span><strong>${labels.yourAnswer}</strong> ${item.chosenText}</span>
        </div>
        <div class="fsa-mentor">
          <div style="font-weight:700; margin-bottom:6px;">${labels.mentorSays}</div>
          <div>${item.mentorText}</div>
        </div>
      </div>
    `;

    btnResNext.textContent = (ptr < wrongPicks.length - 1) ? labels.nextMistake : labels.done;
    elResFooter.style.display = "flex";
  }

  btnResNext.addEventListener("click", () => {
    if (resultsPointer < wrongPicks.length - 1) {
      resultsPointer++;
      renderResultSlide(resultsPointer);
    } else {
      // Ende der Auswertungs-Slides
      elResFooter.style.display = "none";
      const p = document.createElement("p");
      p.className = "fsa-muted";
      p.textContent = I18N[currentLang].done;
      elResBody.appendChild(p);
    }
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Sprache live wechseln
  // ─────────────────────────────────────────────────────────────────────────────
  function rerenderForLangChange() {
    data = block03_course[currentLang];
    total = data.questions.length;

    // Titel und statische Labels neu setzen
    elTitle.textContent = data.title;
    btnPrev.textContent = I18N[currentLang].prev;
    btnNext.textContent = I18N[currentLang].next;
    btnResult.textContent = I18N[currentLang].resultBtn;
    elRotateHint.textContent = I18N[currentLang].rotate;

    if (!showingResults) {
      // aktuelle Frage neu rendern (ohne Antworten zu verlieren ist komplex; wir laden sauber neu)
      loadQuestion(index);
    } else {
      // Ergebnisse neu aufbauen
      renderResultsIntro();
      if (wrongPicks.length === 0) {
        renderNoMistakes();
      } else {
        renderResultSlide(resultsPointer);
      }
    }
  }

  document.addEventListener("fsa:lang-change", (e) => {
    const code = (e.detail || "").toLowerCase();
    if (code === "de" || code === "en") {
      currentLang = code;
      rerenderForLangChange();
    }
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Initial laden
  // ─────────────────────────────────────────────────────────────────────────────
  loadQuestion(0);
})();
