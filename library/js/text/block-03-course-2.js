// Kurs 2 – Sicherheit & Selbstverwahrung (DE/EN)
window.block03_course = window.block03_course || {};
window.block03_course.de = {
  title: "🛡️ Grundkurs 2 – Sicherheit & Selbstverwahrung",
  questions: [
    { q:"Warum sollte eine Seed Phrase niemals digital gespeichert werden?",
      a:[{text:"Weil sie sonst nicht wiedergefunden werden kann.",correct:false},
         {text:"Weil Börsen den Zugriff sonst verweigern.",correct:false},
         {text:"Weil jedes digitale Gerät gehackt oder kopiert werden kann – und damit auch deine Werte.",correct:true}],
      mentor:"Offline ist König: Alles Digitale ist kopierbar – damit auch dein Schlüssel."},
    { q:"Was unterscheidet eine Passphrase von der Seed Phrase?",
      a:[{text:"Die Passphrase ergänzt die Seed Phrase und bietet zusätzlichen Schutz.",correct:true},
         {text:"Beide sind identisch und tauschbar.",correct:false},
         {text:"Die Passphrase ist nur bei zentralen Börsen notwendig.",correct:false}],
      mentor:"Passphrase = 2. Tür vorm Tresor. Ohne sie bleibt der geheime Raum verschlossen."},
    { q:"Warum ist ein Hardware-Wallet oft sicherer als eine App-Wallet?",
      a:[{text:"Weil es mehr Funktionen und größere Displays hat.",correct:false},
         {text:"Weil die privaten Schlüssel offline gespeichert werden.",correct:true},
         {text:"Weil es kostenpflichtig ist und seriöser wirkt.",correct:false}],
      mentor:"Trennung ist Schutz: Schlüssel bleiben offline, Transaktionen werden sicher signiert."},
    { q:"„Not your keys, not your coins“ heißt konkret…",
      a:[{text:"…dass du bei CEX volle Eigentumsrechte behältst.",correct:false},
         {text:"…dass du ohne eigene Schlüssel nur ein Anspruchsrecht hast.",correct:true},
         {text:"…dass du Coins nach 24h verlierst.",correct:false}],
      mentor:"Ohne Schlüssel nur Versprechen – mit Schlüsseln echtes Eigentum."},
    { q:"Warum reicht ein Screenshot der Seed Phrase nicht als Backup?",
      a:[{text:"Screenshots landen oft automatisch in Clouds.",correct:true},
         {text:"Wallets können Screenshots nicht lesen.",correct:false},
         {text:"Screenshots sind immer unscharf.",correct:false}],
      mentor:"Cloud-Autoupload = Risiko. Papier/Steel wins."},
    { q:"Wann eine neue Wallet erstellen?",
      a:[{text:"Wenn die alte lange unbenutzt war.",correct:false},
         {text:"Bei Verdacht auf Seed-Leak.",correct:true},
         {text:"Nach App-Update.",correct:false}],
      mentor:"Sobald Zweifel da ist: migrieren & Werte sichern."},
    { q:"Seed Phrase verloren – was tun?",
      a:[{text:"Neue Wallet erstellen & Werte migrieren (solange Zugriff besteht).",correct:true},
         {text:"Support der Börse um Kopie bitten.",correct:false},
         {text:"Auf Blockchain-Reset warten.",correct:false}],
      mentor:"Handeln > Hoffen. Umziehen, solange du noch rein kommst."},
    { q:"Was zeichnet eine DEX aus?",
      a:[{text:"Du handelst direkt aus deiner Wallet.",correct:true},
         {text:"Daten liegen auf Servern der Börse.",correct:false},
         {text:"DEX braucht keine Blockchain.",correct:false}],
      mentor:"Self-custody bleibt bei dir. Kein Intermediär nötig."},
    { q:"Mehrere Wallets nutzen – warum?",
      a:[{text:"Verluste verstecken.",correct:false},
         {text:"Risikotrennung erhöht Sicherheit.",correct:true},
         {text:"Jede Wallet bringt Zinsen.",correct:false}],
      mentor:"Trenne Spielgeld, HODL, Einkommen – Übersicht & Schutz."},
    { q:"CEX stoppt Auszahlungen – was tun?",
      a:[{text:"Ruhe bewahren, künftig stärker auf Eigenverwahrung setzen.",correct:true},
         {text:"Neues Konto eröffnen & Geld hinsenden.",correct:false},
         {text:"Nichts – völlig normal.",correct:false}],
      mentor:"Lernsignal: CEX ist praktisch, aber kein Tresor."
    }
  ]
};

window.block03_course.en = {
  title: "🛡️ Basic Course 2 – Security & Self-Custody",
  questions: [
    { q:"Why never store a seed phrase digitally?",
      a:[{text:"It might get lost.",correct:false},
         {text:"Exchanges would deny access.",correct:false},
         {text:"Any device can be hacked/copied — so can your keys.",correct:true}],
      mentor:"Offline wins. Digital is copyable — including your keys."},
    // ... (gleiches Mapping wie DE, sinngemäß übersetzt)
  ]
};
