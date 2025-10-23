// ░░ Baustein 03 – Kursinhalt (DE/EN) – Zukunftssicherer Aufbau mit Punktelogik & getrenntem Mentor-Feedback ░░
// Verknüpft mit Engine für Score, Bronze/Silber/Gold und personalisierte Auswertung.

const block03_course = {
  de: {
    courseLevel: 1,
    title: "🧭 Grundkurs 1 – Finanzielle Souveränität (Basis)",
    questions: [
      {
        q: "Warum ist der erste Schritt zur finanziellen Souveränität das eigene Verständnis über Geldflüsse?",
        a: [
          { text: "Weil nur wer versteht, wie Geld entsteht und zirkuliert, bewusste Entscheidungen treffen kann.", correct: true },
          { text: "Weil Geld immer durch Banken kontrolliert wird und man sich dem nicht entziehen kann.", correct: false },
          { text: "Weil finanzielle Souveränität nur von staatlicher Regulierung abhängt.", correct: false }
        ],
        mentor: {
          correct: "Genau – Wissen über Geldflüsse ist die Grundlage bewusster Entscheidungen.",
          wrong: "Finanzielle Souveränität beginnt mit Wissen, nicht mit Kontrolle – erst verstehen, dann entscheiden."
        },
        points: 1
      },
      {
        q: "Was unterscheidet ein klassisches Bankkonto von einer Krypto-Wallet?",
        a: [
          { text: "Ein Bankkonto gehört einer Bank, eine Wallet gehört ausschließlich dir selbst.", correct: true },
          { text: "Beide speichern nur die Transaktionen, nicht das Geld selbst.", correct: false },
          { text: "Beide Systeme werden von denselben Institutionen überwacht.", correct: false }
        ],
        mentor: {
          correct: "Richtig – eine Wallet ist dein persönlicher Tresor auf der Blockchain.",
          wrong: "Eine Wallet gehört dir – keine Bank, kein Vermittler, keine Fremdaufsicht."
        },
        points: 1
      },
      {
        q: "Warum ist die Seed Phrase der wichtigste Teil einer Wallet?",
        a: [
          { text: "Sie ist der einzige Zugang zu deinem Vermögen – ohne Seed kein Zugriff.", correct: true },
          { text: "Sie ersetzt die PIN deiner Bankkarte.", correct: false },
          { text: "Sie ist der Nachweis, dass du Kunde einer Börse bist.", correct: false }
        ],
        mentor: {
          correct: "Perfekt – wer die Seed besitzt, besitzt den Zugang zu allem.",
          wrong: "Die Seed Phrase ist der Ursprungsschlüssel – ohne sie ist der Zugang unwiderruflich verloren."
        },
        points: 1
      },
      {
        q: "Was bedeutet „finanzielle Eigenverantwortung“ im Krypto-Kontext?",
        a: [
          { text: "Dass man bereit ist, für seine Entscheidungen und Fehler selbst einzustehen.", correct: true },
          { text: "Dass man anderen Vertrauenspersonen die Verwahrung überlässt.", correct: false },
          { text: "Dass man möglichst viele Konten bei verschiedenen Börsen eröffnet.", correct: false }
        ],
        mentor: {
          correct: "Ja – Eigenverantwortung bedeutet Kontrolle über Entscheidungen und Konsequenzen.",
          wrong: "Verantwortung kann man nicht delegieren – sie beginnt bei Wissen und endet bei Umsetzung."
        },
        points: 1
      },
      {
        q: "Warum sollte man Plattformen wie Trustyfy verstehen, bevor man Geld einzahlt?",
        a: [
          { text: "Weil Verständnis über Funktion und Risiko vor Verlust schützt.", correct: true },
          { text: "Weil sie das beste Zinsmodell bieten.", correct: false },
          { text: "Weil sonst Transaktionen automatisch abgelehnt werden.", correct: false }
        ],
        mentor: {
          correct: "Richtig – wer versteht, wie Systeme funktionieren, schützt Kapital und Ruhe.",
          wrong: "Wissen schützt mehr als jede Versicherung – erst verstehen, dann investieren."
        },
        points: 1
      },
      {
        q: "Welche Aussage beschreibt „Dezentralität“ am besten?",
        a: [
          { text: "Ein System, bei dem jeder Teilnehmer gleiche Rechte und Zugriffe hat.", correct: true },
          { text: "Ein System, das von einer zentralen Behörde gesteuert wird.", correct: false },
          { text: "Ein System, das keine Technologie, sondern eine Bankstruktur nutzt.", correct: false }
        ],
        mentor: {
          correct: "Genau – Dezentralität heißt Gleichberechtigung, kein Mittelpunkt, keine Abhängigkeit.",
          wrong: "Dezentral bedeutet: niemand steht über dem anderen – jeder ist Teil des Ganzen."
        },
        points: 1
      },
      {
        q: "Warum ist „Nicht deine Schlüssel – nicht deine Coins“ mehr als ein Spruch?",
        a: [
          { text: "Weil du ohne eigene Schlüssel nicht wirklich der Besitzer deiner Krypto-Werte bist.", correct: true },
          { text: "Weil die Schlüssel automatisch bei der Börse gespeichert werden.", correct: false },
          { text: "Weil Coins immer durch staatliche Versicherung geschützt sind.", correct: false }
        ],
        mentor: {
          correct: "Exakt – nur wer die Schlüssel hat, besitzt wirklich das Vermögen.",
          wrong: "Vertrauen ersetzt keine Kontrolle – ohne Schlüssel keine Unabhängigkeit."
        },
        points: 1
      },
      {
        q: "Welche Haltung führt am ehesten zu langfristigem finanziellem Erfolg?",
        a: [
          { text: "Geduld, Disziplin und die Bereitschaft, ständig weiter zu lernen.", correct: true },
          { text: "Schnelles Handeln ohne Vorwissen.", correct: false },
          { text: "Blindes Vertrauen in die Erfahrungen anderer.", correct: false }
        ],
        mentor: {
          correct: "Genau – Vermögen wächst aus Geduld, nicht aus Tempo.",
          wrong: "Erfolg ist ein Lernprozess – kein Sprint, sondern Ausdauer und Fokus."
        },
        points: 1
      },
      {
        q: "Warum braucht finanzielle Souveränität ein Verständnis für Risiko?",
        a: [
          { text: "Weil du ohne Risikobewusstsein nicht frei, sondern abhängig entscheidest.", correct: true },
          { text: "Weil Risiko nur bei Banken existiert.", correct: false },
          { text: "Weil Risiken sich automatisch ausgleichen, wenn man Geduld hat.", correct: false }
        ],
        mentor: {
          correct: "Sehr gut – wer Risiko versteht, entscheidet aus Stärke statt Angst.",
          wrong: "Risiko zu verstehen bedeutet, es zu beherrschen – nicht zu vermeiden."
        },
        points: 1
      },
      {
        q: "Was zeigt, dass jemand finanziell souverän geworden ist?",
        a: [
          { text: "Er nutzt sein Wissen bewusst, um unabhängig von Systemen zu handeln.", correct: true },
          { text: "Er kann schnell Geld leihen, wenn er es braucht.", correct: false },
          { text: "Er vertraut darauf, dass andere für ihn die richtige Entscheidung treffen.", correct: false }
        ],
        mentor: {
          correct: "Genau – Souveränität zeigt sich in eigenständigem Handeln.",
          wrong: "Souverän ist, wer Wissen anwendet – nicht, wer wartet, dass andere handeln."
        },
        points: 1
      }
    ]
  },

  // ===== English version =====
  en: {
    courseLevel: 1,
    title: "🧭 Basic Course 1 – Financial Sovereignty (Foundation)",
    questions: [
      {
        q: "Why is the first step toward financial sovereignty understanding money flows?",
        a: [
          { text: "Because only those who understand how money is created and circulates can make conscious decisions.", correct: true },
          { text: "Because money is always controlled by banks and you cannot escape it.", correct: false },
          { text: "Because financial sovereignty only depends on government regulation.", correct: false }
        ],
        mentor: {
          correct: "Exactly – understanding money flow is the foundation of control.",
          wrong: "Sovereignty starts with knowledge, not control – learn first, decide second."
        },
        points: 1
      },
      {
        q: "What differentiates a traditional bank account from a crypto wallet?",
        a: [
          { text: "A bank account belongs to a bank; a wallet belongs solely to you.", correct: true },
          { text: "Both store only transactions, not the money itself.", correct: false },
          { text: "Both systems are monitored by the same institutions.", correct: false }
        ],
        mentor: {
          correct: "Right – your wallet is your private vault on the blockchain.",
          wrong: "A wallet means self-custody – no bank, no middleman, no supervision."
        },
        points: 1
      },
      {
        q: "Why is the seed phrase the most important part of a wallet?",
        a: [
          { text: "It is the only access to your funds – without the seed, no access.", correct: true },
          { text: "It replaces the PIN of your bank card.", correct: false },
          { text: "It proves you are a customer of an exchange.", correct: false }
        ],
        mentor: {
          correct: "Perfect – whoever holds the seed holds the access.",
          wrong: "The seed phrase is your origin key – lose it, lose access permanently."
        },
        points: 1
      },
      {
        q: "What does 'financial responsibility' truly mean in the crypto context?",
        a: [
          { text: "Taking full responsibility for your own decisions and outcomes.", correct: true },
          { text: "Letting others hold your assets in custody.", correct: false },
          { text: "Opening as many exchange accounts as possible.", correct: false }
        ],
        mentor: {
          correct: "Yes – responsibility means control over your actions and their results.",
          wrong: "Responsibility cannot be delegated – it begins with awareness and ends with action."
        },
        points: 1
      },
      {
        q: "Why should you understand platforms like Trustyfy before depositing money?",
        a: [
          { text: "Because understanding function and risk protects from loss.", correct: true },
          { text: "Because they offer the best interest model.", correct: false },
          { text: "Because otherwise transactions are automatically declined.", correct: false }
        ],
        mentor: {
          correct: "Correct – knowing how systems work protects both assets and mindset.",
          wrong: "Knowledge is stronger than insurance – understand first, invest later."
        },
        points: 1
      },
      {
        q: "Which statement best describes 'decentralization'?",
        a: [
          { text: "A system where every participant has equal rights and access.", correct: true },
          { text: "A system controlled by a central authority.", correct: false },
          { text: "A system that uses no technology but a bank structure.", correct: false }
        ],
        mentor: {
          correct: "Exactly – decentralization means equality, no center, no dependence.",
          wrong: "Decentralization means no one above another – everyone is part of the whole."
        },
        points: 1
      },
      {
        q: "Why is 'Not your keys, not your coins' more than a slogan?",
        a: [
          { text: "Because without your own keys, you’re not truly the owner of your crypto assets.", correct: true },
          { text: "Because keys are automatically stored at the exchange.", correct: false },
          { text: "Because coins are always protected by state insurance.", correct: false }
        ],
        mentor: {
          correct: "Exactly – only those with the keys truly own the wealth.",
          wrong: "Trust is not control – without keys, independence is lost."
        },
        points: 1
      },
      {
        q: "Which mindset most likely leads to long-term financial success?",
        a: [
          { text: "Patience, discipline, and a willingness to keep learning.", correct: true },
          { text: "Acting fast without prior knowledge.", correct: false },
          { text: "Blind trust in the experience of others.", correct: false }
        ],
        mentor: {
          correct: "Exactly – wealth grows through patience, not haste.",
          wrong: "Success is a process of learning – endurance and focus win."
        },
        points: 1
      },
      {
        q: "Why does financial sovereignty require understanding of risk?",
        a: [
          { text: "Because without risk awareness, you decide dependently, not freely.", correct: true },
          { text: "Because risk only exists in banks.", correct: false },
          { text: "Because risks automatically balance over time.", correct: false }
        ],
        mentor: {
          correct: "Right – understanding risk turns fear into awareness.",
          wrong: "Risk comprehension means control, not avoidance."
        },
        points: 1
      },
      {
        q: "What shows that someone has achieved financial sovereignty?",
        a: [
          { text: "They use their knowledge consciously to act independently of systems.", correct: true },
          { text: "They can easily borrow money when needed.", correct: false },
          { text: "They trust others to make the right decisions for them.", correct: false }
        ],
        mentor: {
          correct: "Exactly – sovereignty reveals itself in self-driven action.",
          wrong: "Sovereignty means applying knowledge, not waiting for others to decide."
        },
        points: 1
      }
    ]
  }
};
