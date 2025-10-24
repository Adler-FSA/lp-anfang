// ░░ Baustein 03 – Kursinhalt (DE/EN) – Grundkurs 1: Finanzielle Souveränität (Basis) ░░
// Verknüpft mit Engine für Score, Bronze/Silber/Gold und personalisierte Auswertung.
// © FSA Akademie

(function () {
  const courseDE = {
    title: "🧭 Grundkurs 1 – Finanzielle Souveränität (Basis)",
    questions: [
      {
        q: "Warum ist der erste Schritt zur finanziellen Souveränität das eigene Verständnis über Geldflüsse?",
        a: [
          { text: "Weil nur wer versteht, wie Geld entsteht und zirkuliert, bewusste Entscheidungen treffen kann.", correct: true },
          { text: "Weil Geld immer durch Banken kontrolliert wird und man sich dem nicht entziehen kann.", correct: false },
          { text: "Weil finanzielle Souveränität nur von staatlicher Regulierung abhängt.", correct: false }
        ],
        mentor: "Verstehen, wie Geld fließt, ist die Grundlage für jede echte Entscheidung."
      },
      {
        q: "Was unterscheidet ein klassisches Bankkonto von einer Krypto-Wallet?",
        a: [
          { text: "Beide speichern nur die Transaktionen, nicht das Geld selbst.", correct: false },
          { text: "Ein Bankkonto gehört einer Bank, eine Wallet gehört ausschließlich dir selbst.", correct: true },
          { text: "Beide Systeme werden von denselben Institutionen überwacht.", correct: false }
        ],
        mentor: "Deine Wallet bedeutet: kein Mittelsmann, kein Dazwischen. Nur du und dein Schlüssel."
      },
      {
        q: "Warum ist die Seed Phrase der wichtigste Teil einer Wallet?",
        a: [
          { text: "Sie ersetzt die PIN deiner Bankkarte.", correct: false },
          { text: "Sie ist der Nachweis, dass du Kunde einer Börse bist.", correct: false },
          { text: "Sie ist der einzige Zugang zu deinem Vermögen – ohne Seed kein Zugriff.", correct: true }
        ],
        mentor: "Dein Seed ist dein Eigentumsnachweis. Verlierst du ihn, verlierst du die Kontrolle."
      },
      {
        q: "Was bedeutet „finanzielle Eigenverantwortung“ im Krypto-Kontext wirklich?",
        a: [
          { text: "Dass man bereit ist, für seine Entscheidungen und Fehler selbst einzustehen.", correct: true },
          { text: "Dass man anderen Vertrauenspersonen die Verwahrung überlässt.", correct: false },
          { text: "Dass man möglichst viele Konten bei verschiedenen Börsen eröffnet.", correct: false }
        ],
        mentor: "Souveränität beginnt, wenn du Verantwortung übernimmst – auch für Fehler."
      },
      {
        q: "Warum sollte man Plattformen wie Trustyfy verstehen, bevor man Geld einzahlt?",
        a: [
          { text: "Weil sie das beste Zinsmodell bieten.", correct: false },
          { text: "Weil Verständnis über Funktion und Risiko vor Verlust schützt.", correct: true },
          { text: "Weil sonst Transaktionen automatisch abgelehnt werden.", correct: false }
        ],
        mentor: "Verstehen schützt. Unwissenheit kostet."
      },
      {
        q: "Welche Aussage beschreibt „Dezentralität“ am besten?",
        a: [
          { text: "Ein System, das von einer zentralen Behörde gesteuert wird.", correct: false },
          { text: "Ein System, bei dem jeder Teilnehmer gleiche Rechte und Zugriffe hat.", correct: true },
          { text: "Ein System, das keine Technologie, sondern eine Bankstruktur nutzt.", correct: false }
        ],
        mentor: "Dezentralität ist Teilhabe – nicht Kontrolle von oben."
      },
      {
        q: "Warum ist „Nicht deine Schlüssel – nicht deine Coins“ mehr als nur ein Spruch?",
        a: [
          { text: "Weil du ohne eigene Schlüssel nicht wirklich der Besitzer deiner Krypto-Werte bist.", correct: true },
          { text: "Weil die Schlüssel automatisch bei der Börse gespeichert werden.", correct: false },
          { text: "Weil Coins immer durch staatliche Versicherung geschützt sind.", correct: false }
        ],
        mentor: "Besitz ohne Schlüssel ist nur Vertrauen, kein Eigentum."
      },
      {
        q: "Welche Haltung führt am ehesten zu langfristigem finanziellen Erfolg?",
        a: [
          { text: "Schnelles Handeln, ohne sich vorher zu informieren.", correct: false },
          { text: "Geduld, Disziplin und die Bereitschaft, ständig weiter zu lernen.", correct: true },
          { text: "Blindes Vertrauen in die Erfahrungen anderer.", correct: false }
        ],
        mentor: "Langfristige Ruhe schlägt kurzfristige Euphorie."
      },
      {
        q: "Warum braucht finanzielle Souveränität ein Verständnis für Risiko?",
        a: [
          { text: "Weil Risiko nur bei Banken existiert.", correct: false },
          { text: "Weil du ohne Risikobewusstsein nicht frei, sondern abhängig entscheidest.", correct: true },
          { text: "Weil Risiken sich automatisch ausgleichen, wenn man Geduld hat.", correct: false }
        ],
        mentor: "Risiko zu verstehen heißt, seine Grenzen zu kennen – nicht sie zu vermeiden."
      },
      {
        q: "Was zeigt, dass jemand finanziell souverän geworden ist?",
        a: [
          { text: "Er kann sich schnell Geld leihen, wenn er es braucht.", correct: false },
          { text: "Er nutzt sein Wissen bewusst, um unabhängig von Systemen zu handeln.", correct: true },
          { text: "Er vertraut darauf, dass andere für ihn die richtige Entscheidung treffen.", correct: false }
        ],
        mentor: "Souverän ist, wer unabhängig entscheiden kann – und es tut."
      }
    ]
  };

  const courseEN = {
    title: "🧭 Course 1 – Financial Sovereignty (Basics)",
    questions: [
      {
        q: "Why is understanding money flows the first step to financial sovereignty?",
        a: [
          { text: "Because only those who understand how money is created and circulates can make conscious decisions.", correct: true },
          { text: "Because money is always controlled by banks and cannot be avoided.", correct: false },
          { text: "Because financial sovereignty depends solely on government regulation.", correct: false }
        ],
        mentor: "Understanding how money moves is the foundation of every real decision."
      },
      {
        q: "What distinguishes a traditional bank account from a crypto wallet?",
        a: [
          { text: "Both store only transactions, not the money itself.", correct: false },
          { text: "A bank account belongs to a bank; a wallet belongs only to you.", correct: true },
          { text: "Both systems are monitored by the same institutions.", correct: false }
        ],
        mentor: "Your wallet means no middlemen. No permission needed—only your key."
      },
      {
        q: "Why is the seed phrase the most important part of a wallet?",
        a: [
          { text: "It replaces your card PIN.", correct: false },
          { text: "It proves you’re a customer of an exchange.", correct: false },
          { text: "It’s the only access to your assets – no seed, no access.", correct: true }
        ],
        mentor: "Your seed is your proof of ownership. Lose it, lose control."
      },
      {
        q: "What does financial self-responsibility really mean in the crypto context?",
        a: [
          { text: "Being willing to take responsibility for your own actions and mistakes.", correct: true },
          { text: "Letting trusted third parties hold your assets.", correct: false },
          { text: "Opening as many accounts on different exchanges as possible.", correct: false }
        ],
        mentor: "Sovereignty starts when you take responsibility—even for mistakes."
      },
      {
        q: "Why should you understand platforms like Trustyfy before depositing money?",
        a: [
          { text: "Because they offer the best interest rates.", correct: false },
          { text: "Because understanding function and risk protects against loss.", correct: true },
          { text: "Because transactions are otherwise rejected automatically.", correct: false }
        ],
        mentor: "Understanding protects. Ignorance costs."
      },
      {
        q: "Which statement best describes decentralization?",
        a: [
          { text: "A system controlled by a central authority.", correct: false },
          { text: "A system where every participant has equal rights and access.", correct: true },
          { text: "A system based on traditional banking structure.", correct: false }
        ],
        mentor: "Decentralization means participation—not hierarchy."
      },
      {
        q: "Why is 'Not your keys, not your coins' more than a slogan?",
        a: [
          { text: "Because without your own keys, you don’t truly own your crypto assets.", correct: true },
          { text: "Because keys are automatically stored by the exchange.", correct: false },
          { text: "Because coins are insured by the government.", correct: false }
        ],
        mentor: "Ownership without keys is just trust, not control."
      },
      {
        q: "Which mindset leads to long-term financial success?",
        a: [
          { text: "Acting fast without learning first.", correct: false },
          { text: "Patience, discipline, and continuous learning.", correct: true },
          { text: "Blindly trusting others’ experiences.", correct: false }
        ],
        mentor: "Calm consistency beats quick excitement."
      },
      {
        q: "Why does financial sovereignty require an understanding of risk?",
        a: [
          { text: "Because risk exists only in banks.", correct: false },
          { text: "Because without awareness of risk you don’t decide freely but dependently.", correct: true },
          { text: "Because risks balance themselves out automatically with time.", correct: false }
        ],
        mentor: "To understand risk is to know your limits—not to avoid them."
      },
      {
        q: "What shows that someone has achieved financial sovereignty?",
        a: [
          { text: "They can quickly borrow money when needed.", correct: false },
          { text: "They use their knowledge consciously to act independently of systems.", correct: true },
          { text: "They trust others to make the right decisions for them.", correct: false }
        ],
        mentor: "Sovereign is the one who decides independently—and does so consciously."
      }
    ]
  };

  window.block03_course = { de: courseDE, en: courseEN };
  console.log("📚 block-03-course.js geladen – Grundkurs Basis (DE/EN)");
})();
