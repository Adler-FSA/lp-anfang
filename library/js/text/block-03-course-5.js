// ░░ Baustein 03 (Kurs 5) – 🎯 Prüfung – Finanzielle Souveränität – DE/EN, autonom ░░
// Identische UI/Engine wie Kurs 1–4, aber mit pro-Antwort-Erklärung (jede falsche Option hat eigene Erklärung).
// Fortschrittsbalken Farbverlauf, Fehler-Slideshow, zentrierter Kurstitel, Live-Sprachwechsel, Autostart.

window.block03_course_5 = {
  de: {
    title: "🎯 Prüfung – Finanzielle Souveränität",
    btn: { next: "Nächste Frage", result: "Zum Ergebnis", again: "Weiter" },
    labels: { q: "Frage", of: "von", done: "✅ Prüfung abgeschlossen" },
    reviewTitle: "Auswertung – Deine Lernpunkte",
    reviewEmpty: "Stark – keine Fehler! Du unterscheidest Systeme, verstehst Verwahrung und handelst souverän.",
    questions: [
      {
        q: "Was trennt zentral (CEX) und dezentral (DEX) im Kern?",
        a: [
          {
            text: "Bei CEX verwahrt der Anbieter, bei DEX verwahrst du selbst (Schlüssel bleiben bei dir).",
            correct: true,
            explain: "Genau. CEX = Konto/Passwort, Verwahrung extern. DEX = Wallet/Signatur, Verwahrung bei dir. Dieses Detail – wer die Schlüssel hält – entscheidet über Kontrolle und Abhängigkeit."
          },
          {
            text: "Beide speichern Coins lokal auf deinem Handy.",
            correct: false,
            explain: "Missverständlich: CEX führt nur Kontobuchungen in seinem System. Deine Coins liegen nicht lokal. DEX-Transaktionen passieren on-chain und sind nicht an dein Handy „gespeichert“."
          },
          {
            text: "DEX sind immer schneller und günstiger als CEX.",
            correct: false,
            explain: "Nicht zwingend. Kosten und Geschwindigkeit hängen von Netzwerk, Auslastung und Route ab. Der Kernunterschied ist die Verwahrung, nicht Tempo oder Fees."
          }
        ]
      },
      {
        q: "„Wenn du dich einloggst statt zu signieren, bist du im zentralen System“ – was bedeutet das praktisch?",
        a: [
          {
            text: "Login heißt: Konto beim Anbieter, Schlüssel nicht bei dir.",
            correct: true,
            explain: "Richtig. Login = E-Mail/Passwort → Fremdverwahrung. Signatur = du autorisierst on-chain mit deinem Schlüssel. Das markiert deine Souveränität."
          },
          {
            text: "Signieren ist nur auf CEX nötig.",
            correct: false,
            explain: "Umgekehrt: Signieren brauchst du auf DEX/Wallet-Ebene. Auf CEX autorisierst du Aktionen im Betreiber-System, nicht on-chain."
          },
          {
            text: "Der Satz ist nur eine Faustregel ohne Bedeutung.",
            correct: false,
            explain: "Er ist sehr praktisch: Er hilft dir, den Modus zu erkennen. Login → zentral. Signatur → dezentral. Daran hängt deine Verantwortlichkeit."
          }
        ]
      },
      {
        q: "Welcher Vorteil spricht oft für CEX im Alltag?",
        a: [
          {
            text: "Bequeme FIAT-Einzahlungen (SEPA/Karte) und App-Komfort.",
            correct: true,
            explain: "Ja. On-/Off-Ramp, Support und fertige Oberflächen sind CEX-Stärken. Dafür tauschst du jedoch Verwahrung und Daten (KYC) gegen Bequemlichkeit."
          },
          {
            text: "Grundsätzlich keine Identitätsprüfung (KYC).",
            correct: false,
            explain: "Realität: KYC ist bei CEX Standard. Ohne Identitätsprüfung gibt es selten vollen Funktionsumfang (Limits, Auszahlungen)."
          },
          {
            text: "Eine Sicherheitsgarantie für deine Coins.",
            correct: false,
            explain: "Eine Garantie gibt es nicht. Gegenparteirisiko bleibt: fällt der Anbieter aus, friert ein oder ändert Regeln, verlierst du Kontrolle."
          }
        ]
      },
      {
        q: "Was ist das Hauptrisiko bei Nutzung zentraler Plattformen?",
        a: [
          {
            text: "Gegenparteirisiko, weil dein Vermögen in Fremdverwahrung liegt.",
            correct: true,
            explain: "Exakt. Solange der Anbieter den Schlüssel hält, entscheidet er über Zugriff. Prüfe Auszahlungswege ins eigene Wallet, halte nicht mehr als nötig auf CEX."
          },
          {
            text: "Dass die Blockchain ohne Gebühren funktioniert.",
            correct: false,
            explain: "Gebührenfreiheit ist kein CEX-Risiko. Das tatsächliche Risiko ist Abhängigkeit vom Betreiber (Ausfall, Sperrung, Regeländerung)."
          },
          {
            text: "Dass du nie wieder Gas-Fees zahlen musst.",
            correct: false,
            explain: "Gas-Fees sind ein on-chain Thema. Das Risiko auf CEX ist die Verwahrung, nicht das Gebührenmodell der Blockchain."
          }
        ]
      },
      {
        q: "Was beschreibt eine DEX am besten?",
        a: [
          {
            text: "Wallet-Verbindung und Signaturen statt Accounts und Passwörter.",
            correct: true,
            explain: "Richtig. Du handelst mit Smart Contracts direkt aus deiner Wallet. Keine Kundendatenbank – dafür Eigenverantwortung und klare On-chain-Transparenz."
          },
          {
            text: "Passwort-Resets und Ticket-Support.",
            correct: false,
            explain: "Das ist CEX-Denke. Auf DEX gibt es keinen Betreiber-Support – dein Schutz sind Wissen, Vorsicht und Prozessqualität."
          },
          {
            text: "Verwahrung und Auszahlungen über den Betreiber.",
            correct: false,
            explain: "DEX verwahrt nichts für dich. Der Smart Contract tauscht Tokens gemäß Regeln; Verwahrung bleibt bei dir."
          }
        ]
      },
      {
        q: "Warum ist „dezentral“ nicht automatisch „sicherer“ für dich?",
        a: [
          {
            text: "Weil du Verantwortung und Fehlerrisiko selbst trägst (Adresse, Phishing, Approvals).",
            correct: true,
            explain: "Genau. DEX nimmt dir die Bank ab, nicht die Verantwortung. Kleine Testbeträge, Adressen/Contracts prüfen, minimale Berechtigungen – das sind deine Sicherungsseile."
          },
          {
            text: "Weil DEX keine Smart Contracts nutzt.",
            correct: false,
            explain: "Doch, gerade das: DEX ist Smart-Contract-basiert. Risiken liegen im Umgang damit, nicht in ihrer Abwesenheit."
          },
          {
            text: "Weil DEX eine Bankfreigabe für Transaktionen brauchen.",
            correct: false,
            explain: "Auf DEX autorisiert dein Wallet. Keine Bankfreigabe – du signierst selbst. Das ist Souveränität plus Pflicht zur Sorgfalt."
          }
        ]
      },
      {
        q: "Was ist ein Liquidity Pool?",
        a: [
          {
            text: "Ein gemeinsamer Token-Topf, aus dem DEX-Swaps gespeist werden.",
            correct: true,
            explain: "Richtig. LPs ersetzen Orderbücher. Beachte Risiken wie Impermanent Loss und setze nur, was du verstehst."
          },
          {
            text: "Ein Speicher für Euro-Einzahlungen.",
            correct: false,
            explain: "LPs sind on-chain-Tokenreserven, keine FIAT-Konten. Euro/SEPA ist CEX-Domäne."
          },
          {
          text: "Ein Ordner für Wallet-Backups.",
            correct: false,
            explain: "Backups betreffen deine Seed/Keys, nicht LPs. LPs dienen der Liquidität für Swaps."
          }
        ]
      },
      {
        q: "Was ist eine Fiat-Bridge (On-/Off-Ramp)?",
        a: [
          {
            text: "Ein Dienst, der Bankgeld ins Krypto-Netz bringt (und zurück).",
            correct: true,
            explain: "Genau. Beispiele: SEPA-Einzahlung auf CEX → Auszahlung ins eigene Wallet → on-chain Nutzung. Entscheidend: wie schnell kommst du in Selbstverwahrung?"
          },
          {
            text: "Eine Brücke zwischen zwei Blockchains.",
            correct: false,
            explain: "Das wäre eine Cross-Chain-Bridge. Eine Fiat-Bridge verbindet Euro-Welt und Blockchain."
          },
          {
            text: "Eine Versicherung für Wallets.",
            correct: false,
            explain: "Mit Versicherung hat das nichts zu tun. Es geht um Ein-/Auszahlwege zwischen Bank und Chain."
          }
        ]
      },
      {
        q: "Was bedeutet „non-custodial“ beim Wallet?",
        a: [
          {
            text: "Nur du kontrollierst die privaten Schlüssel – keine Fremdverwahrung.",
            correct: true,
            explain: "Richtig. Non-custodial = Souveränität. Backup, Seed-Sicherheit und Recovery-Routine sind Pflicht, nicht Deko."
          },
          {
            text: "Automatische staatliche Versicherung.",
            correct: false,
            explain: "Das gibt es nicht. Dein Schutz ist dein Prozess, nicht eine pauschale Absicherung."
          },
          {
            text: "Zugriff nur mit KYC-Freigabe.",
            correct: false,
            explain: "Zugriff hast du über deinen Schlüssel, nicht über eine Identitätsfreigabe. KYC ist CEX-Thema."
          }
        ]
      },
      {
        q: "Warum gehört die Seed Phrase niemals digital gespeichert?",
        a: [
          {
            text: "Clouds/Geräte lassen sich kopieren oder kompromittieren – damit auch dein Zugang.",
            correct: true,
            explain: "Exakt. Screenshots, Notizen in der Cloud, Mailbox – alles kopierbar. Halte die Seed offline, redundant und geschützt."
          },
          {
            text: "Screenshots sind technisch oft unscharf.",
            correct: false,
            explain: "Die Schärfe ist egal – das Problem ist Kopierbarkeit und Fremdzugriff, nicht Bildqualität."
          },
          {
            text: "Wallets funktionieren sonst nicht.",
            correct: false,
            explain: "Wallets laufen unabhängig davon. Es geht um dein Risiko, nicht um die Funktionsfähigkeit der App."
          }
        ]
      },
      {
        q: "Wie passt „Nicht deine Schlüssel, nicht deine Coins“ zur Souveränität?",
        a: [
          {
            text: "Ohne Schlüssel hast du nur ein Anspruchsrecht gegen Dritte, kein on-chain Eigentum.",
            correct: true,
            explain: "Richtig. Eigentum folgt dem Schlüssel. Selbstverwahrung ist der Kern – mitsamt Pflicht zu Sorgfalt und Backup."
          },
          {
            text: "Mit Börsen-Schlüsseln bist du Eigentümer.",
            correct: false,
            explain: "Die Börse hält die Schlüssel – und damit die Kontrolle. Dein „Kontostand“ ist ein Eintrag im System des Anbieters."
          },
          {
            text: "Das gilt nur für Stablecoins.",
            correct: false,
            explain: "Es gilt für alle on-chain Vermögenswerte. Der Schlüssel autorisiert – unabhängig vom Token-Typ."
          }
        ]
      },
      {
        q: "Worauf achtest du bei DEX-Nutzung mit Wallet-Connect besonders?",
        a: [
          {
            text: "URL/Contract prüfen, Signaturen lesen, nur nötige Approvals vergeben.",
            correct: true,
            explain: "Ja. Prüfe Adresse/Domain, verifiziere Contract, starte mit kleinen Beträgen, begrenze Berechtigungen. Das senkt Angriffsfläche."
          },
          {
            text: "Möglichst viele DEX parallel verbinden.",
            correct: false,
            explain: "Mehr Verbindungen = mehr Oberfläche für Fehler/Phishing. Fokus und Sorgfalt sind sicherer."
          },
          {
            text: "Stets Max-Approval für alle Token vergeben.",
            correct: false,
            explain: "Unlimitierte Approvals sind bequem, aber riskant. Prinzip: so viel wie nötig, so wenig wie möglich."
          }
        ]
      },
      {
        q: "Woran zeigt sich gelebte finanzielle Souveränität?",
        a: [
          {
            text: "Eigenständige Entscheidungen auf Grundlage von Verständnis und Risikobewusstsein.",
            correct: true,
            explain: "Genau. Lernen → prüfen → handeln. Routinen, kleine Tests, saubere Dokumentation – so wird Unabhängigkeit stabil."
          },
          {
            text: "Am Folgen von Tipps, wenn viele davon reden.",
            correct: false,
            explain: "Herdentrieb ersetzt keine Prüfung. Souveränität bedeutet, dass DU die Gründe verstehst – nicht die Menge."
          },
          {
            text: "An täglichem Wechsel in die neuesten Hypes.",
            correct: false,
            explain: "Hektik ist teuer. Substanz schlägt Tempo. Ein System schützt dich vor Launen des Markts."
          }
        ]
      },
      {
        q: "Welche Praxis hat sich für viele bewährt?",
        a: [
          {
            text: "CEX-Kauf → Auszahlung ins eigene Wallet → Nutzung von DEX für Swaps.",
            correct: true,
            explain: "Richtig. Nutze CEX als Brücke, nicht als Dauer-Tresor. On-chain hast du Transparenz und Kontrolle."
          },
          {
            text: "Alles dauerhaft auf CEX belassen.",
            correct: false,
            explain: "Praktisch, aber abhängig. Ein Betreiber-Event reicht, um Zugriff zu verlieren."
          },
          {
            text: "Nur DEX verwenden, egal ob geprüft oder nicht.",
            correct: false,
            explain: "Prüfung ist Pflicht. DEX ohne Sorgfalt lädt zu Fehlern ein. Balance und Verständnis zählen."
          }
        ]
      },
      {
        q: "Warum gehört Geduld zur Souveränität?",
        a: [
          {
            text: "Weil saubere Prozesse, Backups und Tests Zeit brauchen – Hektik kostet Geld.",
            correct: true,
            explain: "Genau. Ruhe schafft Qualität. Kleine Beträge, Adressen doppelt prüfen, Speicherorte dokumentieren – so vermeidest du teure Fehler."
          },
          {
            text: "Weil langsame Transaktionen gesetzlich vorgeschrieben sind.",
            correct: false,
            explain: "Transaktionsgeschwindigkeit ist technisch, nicht gesetzlich. Deine Ruhe schützt dein Kapital, nicht das Gesetz."
          },
          {
            text: "Weil Gas-Fees nur mit Wartezeit sinken.",
            correct: false,
            explain: "Fees hängen von Netzlast/Routen ab. Geduld hilft dir, Fehler zu vermeiden – nicht nur Gebühren."
          }
        ]
      }
    ]
  },

  // ===== English =====
  en: {
    title: "🎯 Final Test – Financial Sovereignty",
    btn: { next: "Next question", result: "See results", again: "Next" },
    labels: { q: "Question", of: "of", done: "✅ Test completed" },
    reviewTitle: "Evaluation – Your learning points",
    reviewEmpty: "Great — no mistakes! You distinguish systems, understand custody and act with sovereignty.",
    questions: [
      {
        q: "What truly separates centralized (CEX) and decentralized (DEX)?",
        a: [
          {
            text: "CEX holds custody; DEX keeps custody with you (your keys stay with you).",
            correct: true,
            explain: "Exactly. CEX = account/password, external custody. DEX = wallet/signing, self-custody. Who holds the keys decides who’s in control."
          },
          {
            text: "Both store coins locally on your phone.",
            correct: false,
            explain: "Misleading: CEX keeps internal ledger entries; your coins aren’t on your phone. DEX is on-chain; your phone is just the interface."
          },
          {
            text: "DEX are always faster and cheaper.",
            correct: false,
            explain: "Not necessarily. Costs/speed depend on network and route. The core difference is custody, not fees or speed."
          }
        ]
      },
      {
        q: "“If you log in instead of signing, you’re in a centralized system” — what’s the point?",
        a: [
          {
            text: "Login = provider account, keys not with you.",
            correct: true,
            explain: "Right. Login means third-party custody. Signing means your wallet authorizes on-chain. That’s practical sovereignty."
          },
          {
            text: "Signing is only needed on CEX.",
            correct: false,
            explain: "It’s the opposite: signing is needed on DEX/wallet level; CEX actions are within the operator’s system."
          },
          {
            text: "It’s just a catchy phrase without meaning.",
            correct: false,
            explain: "It’s a reliable heuristic: login → centralized; signing → decentralized. Your responsibilities change with it."
          }
        ]
      },
      {
        q: "A common practical advantage of CEX?",
        a: [
          {
            text: "Convenient fiat on/off-ramp (SEPA/card) and app comfort.",
            correct: true,
            explain: "Yes. CEX excel at banking access and support. The trade-off is custody and KYC."
          },
          {
            text: "They never require identity checks.",
            correct: false,
            explain: "KYC is standard on CEX. Without it, features/limits often remain restricted."
          },
          {
            text: "They guarantee absolute safety.",
            correct: false,
            explain: "No provider can guarantee that. Counterparty risk remains whenever you don’t hold the keys."
          }
        ]
      },
      {
        q: "Main risk when using a centralized platform?",
        a: [
          {
            text: "Counterparty risk because assets are custodial.",
            correct: true,
            explain: "Right. If the operator fails or freezes, you lose control. Always verify withdrawal to self-custody."
          },
          {
            text: "That the blockchain suddenly has zero fees.",
            correct: false,
            explain: "Fees aren’t the risk. Custody is. Without keys, someone else decides."
          },
          {
            text: "That you’ll never pay gas again.",
            correct: false,
            explain: "Gas is an on-chain topic. The CEX risk is dependence on a custodian."
          }
        ]
      },
      {
        q: "Which statement best describes a DEX?",
        a: [
          {
            text: "Wallet connection and signing, not accounts and passwords.",
            correct: true,
            explain: "Yes. You trade through smart contracts directly from your wallet. No customer database — full personal responsibility."
          },
          {
            text: "Password resets and ticket support.",
            correct: false,
            explain: "That’s CEX thinking. On a DEX, your best support is careful practice and verification."
          },
          {
            text: "Custody and withdrawals controlled by the operator.",
            correct: false,
            explain: "DEX doesn’t hold your assets. Contracts execute swaps; you keep custody."
          }
        ]
      },
      {
        q: "Why isn’t “decentralized” automatically safer for you?",
        a: [
          {
            text: "Because you carry responsibility and error risk yourself (address, phishing, approvals).",
            correct: true,
            explain: "Exactly. DeFi removes the bank, not responsibility. Start small, verify contracts/URLs, and grant minimal approvals."
          },
          {
            text: "Because DEX have no smart contracts.",
            correct: false,
            explain: "Quite the opposite: DEX rely on contracts. The risk is misuse, not their absence."
          },
          {
            text: "Because DEX require bank approval.",
            correct: false,
            explain: "On DEX you sign from your wallet. No bank approval — that’s the point of self-custody."
          }
        ]
      },
      {
        q: "What is a Liquidity Pool?",
        a: [
          {
            text: "A pooled reserve of tokens powering DEX swaps.",
            correct: true,
            explain: "Right. LPs replace order books. Understand impermanent loss and mechanics before providing liquidity."
          },
          {
            text: "A vault for euro deposits.",
            correct: false,
            explain: "LPs are on-chain token reserves, not fiat accounts. Euros/SEPA are CEX territory."
          },
          {
            text: "A folder for wallet backups.",
            correct: false,
            explain: "Backups concern your seed/keys, not LPs. LPs provide on-chain liquidity."
          }
        ]
      },
      {
        q: "What is a fiat bridge (on/off-ramp)?",
        a: [
          {
            text: "A service moving bank money into/out of crypto.",
            correct: true,
            explain: "Yes. Example: buy on CEX → withdraw to self-custody → use DEX. The key is how fast you regain control."
          },
          {
            text: "A bridge between two blockchains.",
            correct: false,
            explain: "That’s a cross-chain bridge. Fiat bridges connect banking and chains."
          },
          {
            text: "An insurance for wallets.",
            correct: false,
            explain: "Unrelated. It’s about entry/exit pathways between bank and chain."
          }
        ]
      },
      {
        q: "What does “non-custodial” mean for a wallet?",
        a: [
          {
            text: "You alone control the private keys — no third-party custody.",
            correct: true,
            explain: "Exactly. That’s sovereignty. Offline backups and recovery practice are your safety net."
          },
          {
            text: "Automatic government insurance.",
            correct: false,
            explain: "No such guarantee. Your process is your protection."
          },
          {
            text: "Access only after KYC approval.",
            correct: false,
            explain: "Your key grants access. KYC is a CEX requirement, not a wallet rule."
          }
        ]
      },
      {
        q: "Why should the seed phrase never be stored digitally?",
        a: [
          {
            text: "Cloud/devices can be copied or compromised — so can your access.",
            correct: true,
            explain: "Right. Screenshots/notes in the cloud are copyable. Keep seeds offline, redundant and protected."
          },
          {
            text: "Screenshots are usually blurry.",
            correct: false,
            explain: "Sharp or not, the issue is copyability and leakage, not image quality."
          },
          {
            text: "Wallets won’t work otherwise.",
            correct: false,
            explain: "Wallets work regardless. The risk is losing control, not breaking the app."
          }
        ]
      },
      {
        q: "How does “Not your keys, not your coins” relate to sovereignty?",
        a: [
          {
            text: "Without keys you have a claim on someone, not on-chain ownership.",
            correct: true,
            explain: "Exactly. Ownership follows keys. Self-custody is independence — with the duty to secure it."
          },
          {
            text: "Exchange-held keys make you the owner.",
            correct: false,
            explain: "The exchange holds the keys and therefore the power. Your balance is an internal record."
          },
          {
            text: "It applies only to stablecoins.",
            correct: false,
            explain: "It applies to all on-chain assets. Keys authorize — token type is irrelevant."
          }
        ]
      },
      {
        q: "Using DEX with wallet connect — what matters most?",
        a: [
          {
            text: "Verify URL/contract, read approvals, grant the minimum needed.",
            correct: true,
            explain: "Yes. Check domain/contract, start small, keep permissions tight. That reduces attack surface."
          },
          {
            text: "Connect to as many DEX as possible.",
            correct: false,
            explain: "More connections = more surface for errors/phishing. Focus and care win."
          },
          {
            text: "Always grant max approvals to every token.",
            correct: false,
            explain: "Unlimited approvals are convenient but risky. Least-privilege is safer."
          }
        ]
      },
      {
        q: "How does financial sovereignty show up in behavior?",
        a: [
          {
            text: "Independent decisions based on understanding and risk awareness.",
            correct: true,
            explain: "Correct. Learn → verify → act. Small tests, consistent routines, and documentation make you resilient."
          },
          {
            text: "Following tips as soon as many mention them.",
            correct: false,
            explain: "Herds don’t replace judgment. Sovereignty means you understand the reasons — not just the noise."
          },
          {
            text: "Chasing the latest hype every day.",
            correct: false,
            explain: "Haste is costly. Substance beats speed. A system protects you from market mood swings."
          }
        ]
      },
      {
        q: "Which flow works well for many users?",
        a: [
          {
            text: "Buy on CEX → withdraw to your wallet → use DEX for swaps.",
            correct: true,
            explain: "Yes. Use CEX as a bridge, not as a vault. On-chain you regain transparency and control."
          },
          {
            text: "Keep everything on CEX forever.",
            correct: false,
            explain: "Convenient, but dependent. A single operator event can lock you out."
          },
          {
            text: "Use only DEX, no verification needed.",
            correct: false,
            explain: "Verification is essential. Unverified DEX use invites mistakes. Balance and understanding matter."
          }
        ]
      },
      {
        q: "Why is patience part of sovereignty?",
        a: [
          {
            text: "Because clean processes, backups and tests take time — haste is expensive.",
            correct: true,
            explain: "Exactly. Calm builds quality: small test amounts, double-check addresses, document storage. That prevents costly errors."
          },
          {
            text: "Because slow transactions are legally required.",
            correct: false,
            explain: "Speed is technical, not legal. Your calm habits protect capital."
          },
          {
            text: "Because gas fees only drop if you wait.",
            correct: false,
            explain: "Fees depend on network load/routes. Patience helps avoid errors — not just save fees."
          }
        ]
      }
    ]
  }
};

// ───────────────────────────────────────────────────────────────────────────────
// Renderer (identisch zu Kurs 1–4, erweitert: nutzt pro-Antwort-Erklärungen)
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
    const data = (window.block03_course_5 && (window.block03_course_5[lang] || window.block03_course_5.de)) || null;
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

    // Shuffle Antworten je Frage, aber behalte die pro-Antwort-Erklärung (explain) bei
    const questions = data.questions.map(q => ({
      q: q.q,
      a: shuffle(q.a)
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
          picked = { correct: ans.correct, text: ans.text, explain: ans.explain };
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
      if(!picked.correct){
        wrongs.push({
          i: idx+1,
          q: questions[idx].q,
          pickText: picked.text,
          mentor: picked.explain
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
