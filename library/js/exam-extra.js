// ░░ exam-extra.js – 10 Zusatzfragen für die Hauptprüfung (DE/EN) ░░
// Wird automatisch von exam-questions.js eingesammelt, wenn vorhanden.

window.fsa_exam_extra = {
  de: [
    {
      q: "Warum gehört ein dokumentierter Notfallplan (Wiederherstellungs-Ablauf) zur echten Souveränität?",
      a: [
        { text: "Weil damit im Ernstfall klar ist, wer, wie und womit wiederherstellt.", correct: true },
        { text: "Weil Behörden das sonst nicht anerkennen.", correct: false },
        { text: "Weil ein Plan die Rendite automatisch erhöht.", correct: false }
      ],
      mentor: "Souverän ist, wer vorbereitet ist – nicht wer hofft. Klare Schritte, klare Zuständigkeiten, klare Medien."
    },
    {
      q: "Wozu dient eine Auszahlungs-Whitelist auf zentralen Börsen (CEX)?",
      a: [
        { text: "Abflüsse sind nur zu vorab freigegebenen Adressen möglich.", correct: true },
        { text: "Einzahlungen werden dadurch schneller gutgeschrieben.", correct: false },
        { text: "Sie ist nur eine kosmetische UI-Funktion ohne Sicherheitsnutzen.", correct: false }
      ],
      mentor: "Whitelist = Schadensbegrenzung bei Account-Kompromittierung. Nicht perfekt, aber besser als nichts."
    },
    {
      q: "Warum ist regelmäßiges Rebalancing sinnvoll?",
      a: [
        { text: "Um Ziel-Allokationen wiederherzustellen und Risiko zu steuern.", correct: true },
        { text: "Um mehr Trades zu haben – Aktivität bringt automatisch Gewinn.", correct: false },
        { text: "Weil Kurse dadurch steigen.", correct: false }
      ],
      mentor: "Rebalancing steuert Risiko, nicht die Zukunft. Regeln schlagen Bauchgefühl."
    },
    {
      q: "Weshalb testet man neue Prozesse zuerst mit Kleinbeträgen?",
      a: [
        { text: "Weil Fehler mit kleinem Einsatz günstig sind.", correct: true },
        { text: "Weil Blockchains kleine Beträge bevorzugen.", correct: false },
        { text: "Weil große Beträge langsamer übertragen werden.", correct: false }
      ],
      mentor: "Erst üben, dann skalieren. Routine schützt Kapital."
    },
    {
      q: "Woran erkennst du Herdentrieb (FOMO) bei dir selbst?",
      a: [
        { text: "Ich kaufe, weil alle kaufen – nicht wegen meiner Analyse.", correct: true },
        { text: "Ich kaufe, weil der Chart grün ist – das reicht als Grundlage.", correct: false },
        { text: "Ich kaufe, weil der Coin ‚billig‘ wirkt.", correct: false }
      ],
      mentor: "Eigenes Denken ist die Mauer gegen FOMO. Ein Plan vor dem Klick."
    },
    {
      q: "Warum ist Multi-Sig besonders in Teams nützlich?",
      a: [
        { text: "Transaktionen benötigen mehrere Unterschriften.", correct: true },
        { text: "Sie macht Transaktionen kostenlos.", correct: false },
        { text: "Sie ersetzt Backups vollständig.", correct: false }
      ],
      mentor: "Geteilte Verantwortung = weniger Single-Point-of-Failure. Prozesse trotzdem üben."
    },
    {
      q: "Was bedeutet „Private-Key-Exposure“ praktisch?",
      a: [
        { text: "Der private Schlüssel wurde Dritten bekannt – Werte müssen migriert werden.", correct: true },
        { text: "Die Adresse ist öffentlich bekannt.", correct: false },
        { text: "Die Seed hat 11 statt 12 Wörter.", correct: false }
      ],
      mentor: "Exposure = Zeit läuft. Sofort neue Wallet, Werte umziehen, alte stilllegen."
    },
    {
      q: "Warum gehört Steuer-Dokumentation zur Souveränität?",
      a: [
        { text: "Weil Nachvollziehbarkeit rechtliche Sicherheit schafft.", correct: true },
        { text: "Weil sonst Wallets automatisch gesperrt werden.", correct: false },
        { text: "Weil Gewinne dann garantiert sind.", correct: false }
      ],
      mentor: "Ordnung ist Freiheit – auch gegenüber Behörden und dir selbst."
    },
    {
      q: "Was ist beim Verwahren von Stablecoins zu bedenken?",
      a: [
        { text: "Emittenten-/Collateral-Risiko und Smart-Contract-Risiko.", correct: true },
        { text: "Stablecoins sind risikolos.", correct: false },
        { text: "Stablecoins steigen langfristig im Wert.", correct: false }
      ],
      mentor: "Stabil ≠ risikolos. Prüfe Mechanik, Emittent, Sicherheiten, Chain-Risiken."
    },
    {
      q: "Warum ist „Keep it simple“ oft überlegen?",
      a: [
        { text: "Komplexität erzeugt mehr Fehlerstellen.", correct: true },
        { text: "Einfachheit ist nur für Anfänger wichtig.", correct: false },
        { text: "Komplexe Setups liefern automatisch mehr Rendite.", correct: false }
      ],
      mentor: "Klarer Prozess, klare Entscheidung, klare Auswertung – so wächst Können."
    }
  ],

  // Sinnnahes EN-Pendant (keine 1:1-Übersetzung, aber gleiche Aussage)
  en: [
    {
      q: "Why is a documented emergency recovery plan part of real sovereignty?",
      a: [
        { text: "Because in a crisis everyone knows who restores what, how, and with which media.", correct: true },
        { text: "Because authorities otherwise won’t accept your funds.", correct: false },
        { text: "Because a plan automatically boosts returns.", correct: false }
      ],
      mentor: "Prepared beats hopeful. Clear steps, roles, and storage."
    },
    {
      q: "What’s the purpose of a CEX withdrawal whitelist?",
      a: [
        { text: "Outflows are limited to pre-approved addresses.", correct: true },
        { text: "Deposits become faster.", correct: false },
        { text: "It’s merely a cosmetic UI feature.", correct: false }
      ],
      mentor: "It limits damage if your account gets compromised."
    },
    {
      q: "Why does regular rebalancing make sense?",
      a: [
        { text: "To restore target allocation and manage risk.", correct: true },
        { text: "To trade more – activity creates profits.", correct: false },
        { text: "Because prices rise when you rebalance.", correct: false }
      ],
      mentor: "Risk control > feelings. Let rules drive timing."
    },
    {
      q: "Why test new processes with small amounts first?",
      a: [
        { text: "Because mistakes are cheaper with tiny stakes.", correct: true },
        { text: "Because blockchains prefer small transfers.", correct: false },
        { text: "Because large transfers are always slower.", correct: false }
      ],
      mentor: "Practice, then scale. Skill protects capital."
    },
    {
      q: "How do you spot herd behavior (FOMO) in yourself?",
      a: [
        { text: "I buy because others buy – not because of my analysis.", correct: true },
        { text: "I buy because the chart is green. That’s enough.", correct: false },
        { text: "I buy because the coin looks cheap.", correct: false }
      ],
      mentor: "A plan before the click. Independent thinking beats FOMO."
    },
    {
      q: "Why is multi-sig useful for teams?",
      a: [
        { text: "Transactions require multiple signatures.", correct: true },
        { text: "It makes transactions free.", correct: false },
        { text: "It fully replaces backups.", correct: false }
      ],
      mentor: "Shared responsibility = fewer single points of failure."
    },
    {
      q: "What does private key exposure mean in practice?",
      a: [
        { text: "Your private key became known to others – migrate funds immediately.", correct: true },
        { text: "Your address is public.", correct: false },
        { text: "Your seed has 11 instead of 12 words.", correct: false }
      ],
      mentor: "Exposure = clock is ticking. New wallet, move funds, retire the old."
    },
    {
      q: "Why is tax documentation part of sovereignty?",
      a: [
        { text: "Traceability gives legal certainty.", correct: true },
        { text: "Otherwise wallets get blocked automatically.", correct: false },
        { text: "It guarantees profits.", correct: false }
      ],
      mentor: "Order is freedom – also with authorities."
    },
    {
      q: "What should you consider when holding stablecoins?",
      a: [
        { text: "Issuer/collateral and smart-contract risk.", correct: true },
        { text: "They’re risk-free.", correct: false },
        { text: "They always appreciate.", correct: false }
      ],
      mentor: "Stable ≠ risk-free. Understand the mechanism and issuer."
    },
    {
      q: "Why does “Keep it simple” usually win?",
      a: [
        { text: "Complexity creates more failure points.", correct: true },
        { text: "Simplicity is only for beginners.", correct: false },
        { text: "Complex setups automatically yield more.", correct: false }
      ],
      mentor: "Clear process, clear decisions, clear reviews. That’s mastery."
    }
  ]
};
