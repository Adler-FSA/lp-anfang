// Baustein 03 – Kursinhalt (DE/EN) für grundkurs-basis.html
// Struktur mit "correct: true/false" für spätere Zufallsauswahl & Auswertung

const block03_course = {
  de: {
    title: "🧭 Grundkurs 1 – Finanzielle Souveränität (Basis)",
    questions: [
      {
        q: "Warum ist der erste Schritt zur finanziellen Souveränität das eigene Verständnis über Geldflüsse?",
        a: [
          { text: "Weil nur wer versteht, wie Geld entsteht und zirkuliert, bewusste Entscheidungen treffen kann.", correct: true },
          { text: "Weil Geld immer durch Banken kontrolliert wird und man sich dem nicht entziehen kann.", correct: false },
          { text: "Weil finanzielle Souveränität nur von staatlicher Regulierung abhängt.", correct: false }
        ]
      },
      {
        q: "Was unterscheidet ein klassisches Bankkonto von einer Krypto-Wallet?",
        a: [
          { text: "Beide speichern nur die Transaktionen, nicht das Geld selbst.", correct: false },
          { text: "Ein Bankkonto gehört einer Bank, eine Wallet gehört ausschließlich dir selbst.", correct: true },
          { text: "Beide Systeme werden von denselben Institutionen überwacht.", correct: false }
        ]
      },
      {
        q: "Warum ist die Seed Phrase der wichtigste Teil einer Wallet?",
        a: [
          { text: "Sie ersetzt die PIN deiner Bankkarte.", correct: false },
          { text: "Sie ist der Nachweis, dass du Kunde einer Börse bist.", correct: false },
          { text: "Sie ist der einzige Zugang zu deinem Vermögen – ohne Seed kein Zugriff.", correct: true }
        ]
      },
      {
        q: "Was bedeutet „finanzielle Eigenverantwortung“ im Krypto-Kontext wirklich?",
        a: [
          { text: "Dass man bereit ist, für seine Entscheidungen und Fehler selbst einzustehen.", correct: true },
          { text: "Dass man anderen Vertrauenspersonen die Verwahrung überlässt.", correct: false },
          { text: "Dass man möglichst viele Konten bei verschiedenen Börsen eröffnet.", correct: false }
        ]
      },
      {
        q: "Warum sollte man Plattformen wie Trustyfy verstehen, bevor man Geld einzahlt?",
        a: [
          { text: "Weil sie das beste Zinsmodell bieten.", correct: false },
          { text: "Weil Verständnis über Funktion und Risiko vor Verlust schützt.", correct: true },
          { text: "Weil sonst Transaktionen automatisch abgelehnt werden.", correct: false }
        ]
      },
      {
        q: "Welche Aussage beschreibt „Dezentralität“ am besten?",
        a: [
          { text: "Ein System, das von einer zentralen Behörde gesteuert wird.", correct: false },
          { text: "Ein System, bei dem jeder Teilnehmer gleiche Rechte und Zugriffe hat.", correct: true },
          { text: "Ein System, das keine Technologie, sondern eine Bankstruktur nutzt.", correct: false }
        ]
      },
      {
        q: "Warum ist „Nicht deine Schlüssel – nicht deine Coins“ mehr als nur ein Spruch?",
        a: [
          { text: "Weil du ohne eigene Schlüssel nicht wirklich der Besitzer deiner Krypto-Werte bist.", correct: true },
          { text: "Weil die Schlüssel automatisch bei der Börse gespeichert werden.", correct: false },
          { text: "Weil Coins immer durch staatliche Versicherung geschützt sind.", correct: false }
        ]
      },
      {
        q: "Welche Haltung führt am ehesten zu langfristigem finanziellen Erfolg?",
        a: [
          { text: "Schnelles Handeln, ohne sich vorher zu informieren.", correct: false },
          { text: "Geduld, Disziplin und die Bereitschaft, ständig weiter zu lernen.", correct: true },
          { text: "Blindes Vertrauen in die Erfahrungen anderer.", correct: false }
        ]
      },
      {
        q: "Warum braucht finanzielle Souveränität ein Verständnis für Risiko?",
        a: [
          { text: "Weil Risiko nur bei Banken existiert.", correct: false },
          { text: "Weil du ohne Risikobewusstsein nicht frei, sondern abhängig entscheidest.", correct: true },
          { text: "Weil Risiken sich automatisch ausgleichen, wenn man Geduld hat.", correct: false }
        ]
      },
      {
        q: "Was zeigt, dass jemand finanziell souverän geworden ist?",
        a: [
          { text: "Er kann sich schnell Geld leihen, wenn er es braucht.", correct: false },
          { text: "Er nutzt sein Wissen bewusst, um unabhängig von Systemen zu handeln.", correct: true },
          { text: "Er vertraut darauf, dass andere für ihn die richtige Entscheidung treffen.", correct: false }
        ]
      }
    ]
  },

  en: {
    title: "🧭 Basic Course 1 – Financial Sovereignty (Foundation)",
    questions: [
      {
        q: "Why is the first step toward financial sovereignty understanding money flows?",
        a: [
          { text: "Because only those who understand how money is created and circulates can make conscious decisions.", correct: true },
          { text: "Because money is always controlled by banks and you cannot escape it.", correct: false },
          { text: "Because financial sovereignty only depends on government regulation.", correct: false }
        ]
      },
      {
        q: "What differentiates a traditional bank account from a crypto wallet?",
        a: [
          { text: "Both store only the transactions, not the money itself.", correct: false },
          { text: "A bank account belongs to a bank; a wallet belongs solely to you.", correct: true },
          { text: "Both systems are monitored by the same institutions.", correct: false }
        ]
      },
      {
        q: "Why is the seed phrase the most important part of a wallet?",
        a: [
          { text: "It replaces the PIN of your bank card.", correct: false },
          { text: "It proves you are a customer of an exchange.", correct: false },
          { text: "It is the only access to your funds – without the seed, no access.", correct: true }
        ]
      },
      {
        q: "What does 'financial responsibility' truly mean in the crypto context?",
        a: [
          { text: "Being willing to take full responsibility for your own decisions and mistakes.", correct: true },
          { text: "Letting others hold your assets in custody.", correct: false },
          { text: "Opening as many exchange accounts as possible.", correct: false }
        ]
      },
      {
        q: "Why should you understand platforms like Trustyfy before depositing money?",
        a: [
          { text: "Because they offer the best interest model.", correct: false },
          { text: "Because understanding function and risk protects from loss.", correct: true },
          { text: "Because otherwise transactions are automatically declined.", correct: false }
        ]
      },
      {
        q: "Which statement best describes 'decentralization'?",
        a: [
          { text: "A system controlled by a central authority.", correct: false },
          { text: "A system where every participant has equal rights and access.", correct: true },
          { text: "A system that uses no technology but a bank structure.", correct: false }
        ]
      },
      {
        q: "Why is 'Not your keys, not your coins' more than a slogan?",
        a: [
          { text: "Because without your own keys, you are not truly the owner of your crypto assets.", correct: true },
          { text: "Because the keys are automatically stored at the exchange.", correct: false },
          { text: "Because coins are always protected by state insurance.", correct: false }
        ]
      },
      {
        q: "Which mindset most likely leads to long-term financial success?",
        a: [
          { text: "Acting fast without prior knowledge.", correct: false },
          { text: "Patience, discipline, and the willingness to keep learning.", correct: true },
          { text: "Blind trust in the experience of others.", correct: false }
        ]
      },
      {
        q: "Why does financial sovereignty require an understanding of risk?",
        a: [
          { text: "Because risk only exists in banks.", correct: false },
          { text: "Because without awareness of risk, you decide dependently, not freely.", correct: true },
          { text: "Because risks automatically balance out if you wait long enough.", correct: false }
        ]
      },
      {
        q: "What shows that someone has achieved financial sovereignty?",
        a: [
          { text: "They can easily borrow money when needed.", correct: false },
          { text: "They use their knowledge consciously to act independently of systems.", correct: true },
          { text: "They trust others to make the right decisions for them.", correct: false }
        ]
      }
    ]
  }
};
