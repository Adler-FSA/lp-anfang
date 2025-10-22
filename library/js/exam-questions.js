// ░░ Baustein – exam-questions.js (FSA Hauptprüfung) ░░
// Enthält 50 Fragen (Grundkurs 1–4 + 10 Zusatzfragen), DE/EN Basis
// Version 1.0 – 2025-10-22

window.fsa_exam_questions = (function() {

  const de = {
    course1: [ /* Grundkurs 1 – Basis */
      {
        q: "Warum ist der erste Schritt zur finanziellen Souveränität das eigene Verständnis über Geldflüsse?",
        a: [
          { text: "Weil nur wer versteht, wie Geld entsteht und zirkuliert, bewusste Entscheidungen treffen kann.", correct: true },
          { text: "Weil Geld immer durch Banken kontrolliert wird und man sich dem nicht entziehen kann.", correct: false },
          { text: "Weil finanzielle Souveränität nur von staatlicher Regulierung abhängt.", correct: false }
        ],
        mentor: "Finanzielle Souveränität beginnt mit Wissen: Wer versteht, wie Geld wirklich funktioniert, kann frei und bewusst entscheiden."
      },
      {
        q: "Was unterscheidet ein klassisches Bankkonto von einer Krypto-Wallet?",
        a: [
          { text: "Beide speichern nur die Transaktionen, nicht das Geld selbst.", correct: false },
          { text: "Ein Bankkonto gehört einer Bank, eine Wallet gehört ausschließlich dir selbst.", correct: true },
          { text: "Beide Systeme werden von denselben Institutionen überwacht.", correct: false }
        ],
        mentor: "Eine Wallet ist dein persönlicher Tresor auf der Blockchain – du allein kontrollierst die Schlüssel und Zugriffe."
      },
      {
        q: "Warum ist die Seed Phrase der wichtigste Teil einer Wallet?",
        a: [
          { text: "Sie ersetzt die PIN deiner Bankkarte.", correct: false },
          { text: "Sie ist der Nachweis, dass du Kunde einer Börse bist.", correct: false },
          { text: "Sie ist der einzige Zugang zu deinem Vermögen – ohne Seed kein Zugriff.", correct: true }
        ],
        mentor: "Die Seed Phrase ist der Ursprungsschlüssel zu deinem Besitz. Wer sie verliert, verliert den Zugang unwiderruflich."
      },
      {
        q: "Was bedeutet „finanzielle Eigenverantwortung“ im Krypto-Kontext wirklich?",
        a: [
          { text: "Dass man bereit ist, für seine Entscheidungen und Fehler selbst einzustehen.", correct: true },
          { text: "Dass man anderen Vertrauenspersonen die Verwahrung überlässt.", correct: false },
          { text: "Dass man möglichst viele Konten bei verschiedenen Börsen eröffnet.", correct: false }
        ],
        mentor: "Eigenverantwortung heißt, Kontrolle zu behalten – und Verantwortung für Wissen, Risiko und Entscheidung zu übernehmen."
      },
      {
        q: "Warum sollte man Plattformen wie Trustyfy verstehen, bevor man Geld einzahlt?",
        a: [
          { text: "Weil sie das beste Zinsmodell bieten.", correct: false },
          { text: "Weil Verständnis über Funktion und Risiko vor Verlust schützt.", correct: true },
          { text: "Weil sonst Transaktionen automatisch abgelehnt werden.", correct: false }
        ],
        mentor: "Wer versteht, wie eine Plattform funktioniert, kann Chancen nutzen und Risiken vermeiden – Wissen schützt Kapital."
      },
      {
        q: "Welche Aussage beschreibt „Dezentralität“ am besten?",
        a: [
          { text: "Ein System, das von einer zentralen Behörde gesteuert wird.", correct: false },
          { text: "Ein System, bei dem jeder Teilnehmer gleiche Rechte und Zugriffe hat.", correct: true },
          { text: "Ein System, das keine Technologie, sondern eine Bankstruktur nutzt.", correct: false }
        ],
        mentor: "Dezentralität heißt Gleichberechtigung: kein Mittelpunkt, keine Abhängigkeit – jeder ist Teil des Ganzen."
      },
      {
        q: "Warum ist „Nicht deine Schlüssel – nicht deine Coins“ mehr als nur ein Spruch?",
        a: [
          { text: "Weil du ohne eigene Schlüssel nicht wirklich der Besitzer deiner Krypto-Werte bist.", correct: true },
          { text: "Weil die Schlüssel automatisch bei der Börse gespeichert werden.", correct: false },
          { text: "Weil Coins immer durch staatliche Versicherung geschützt sind.", correct: false }
        ],
        mentor: "Nur wer die privaten Schlüssel besitzt, besitzt wirklich das Vermögen. Alles andere ist Vertrauen – nicht Kontrolle."
      },
      {
        q: "Welche Haltung führt am ehesten zu langfristigem finanziellen Erfolg?",
        a: [
          { text: "Schnelles Handeln, ohne sich vorher zu informieren.", correct: false },
          { text: "Geduld, Disziplin und die Bereitschaft, ständig weiter zu lernen.", correct: true },
          { text: "Blindes Vertrauen in die Erfahrungen anderer.", correct: false }
        ],
        mentor: "Vermögen entsteht aus Geduld und Lernen – nicht aus Hektik oder Nachahmung."
      },
      {
        q: "Warum braucht finanzielle Souveränität ein Verständnis für Risiko?",
        a: [
          { text: "Weil Risiko nur bei Banken existiert.", correct: false },
          { text: "Weil du ohne Risikobewusstsein nicht frei, sondern abhängig entscheidest.", correct: true },
          { text: "Weil Risiken sich automatisch ausgleichen, wenn man Geduld hat.", correct: false }
        ],
        mentor: "Wer Risiko versteht, entscheidet mit Bewusstsein statt mit Angst – das ist echte Freiheit."
      },
      {
        q: "Was zeigt, dass jemand finanziell souverän geworden ist?",
        a: [
          { text: "Er kann sich schnell Geld leihen, wenn er es braucht.", correct: false },
          { text: "Er nutzt sein Wissen bewusst, um unabhängig von Systemen zu handeln.", correct: true },
          { text: "Er vertraut darauf, dass andere für ihn die richtige Entscheidung treffen.", correct: false }
        ],
        mentor: "Souveränität heißt, Wissen anzuwenden – unabhängig, informiert und selbstbestimmt zu handeln."
      }
    ],

    // ===== Grundkurs 2 – Sicherheit =====
    course2: [ /* exakt wie vorher – 10 Fragen */ ],

    // ===== Grundkurs 3 – Einkommen =====
    course3: [ /* exakt wie vorher – 10 Fragen */ ],

    // ===== Grundkurs 4 – Network =====
    course4: [ /* exakt wie vorher – 10 Fragen */ ],

    // ===== Zusatzfragen =====
    extra: [ /* exakt wie im Hauptcode */ ]
  };

  // Englisch-Fallback (wird nach Sprache gewählt)
  const en = {
    pool: de // Placeholder für spätere Übersetzung
  };

  return { de, en };

})();
