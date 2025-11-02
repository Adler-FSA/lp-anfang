// /lp-anfang/library/js/text-campus/campus-community-04.js
// FSA / Trustyfy – Community Set 04
// Zielgruppe 4 – Alleinerziehende, Rentner/Pensionierte, Studenten/Azubis
// Vollversion DE + EN
// Verdrahtet auf: lang-switcher.js  (event: fsa:lang-change)
// Anzeige: eigener Container (#socialContent) + Schließen-Button
// Keine Kürzungen, keine Platzhalter

(function () {
  // ===================== 1) DATENBASIS =====================
  const COMMUNITY_04 = {
    meta: {
      id: "cq4",
      group: "fsa-community",
      title_de: "Zielgruppe 4 – Alleinerziehende, Rentner & Studenten",
      title_en: "Target Group 4 – Single parents, retirees & students",
      topic_de: "Sicherheit, Würde, Bildung, digitale Souveränität",
      topic_en: "Security, dignity, learning, digital sovereignty",
      lastUpdate: "2025-11-02"
    },

    // ===================== DEUTSCH =====================
    de: {
      title: "❤️ Zielgruppe 4 – Alleinerziehende, Rentner & Studenten",
      subtitle: "Drei Lebenssituationen, ein gemeinsamer Druck: Alles wird teurer, alles wird digitaler, alles wird kontrollierter. Diese Stammtische zeigen: Mit FSA (Verstehen) + Trustyfy (Technik) kann man trotzdem souverän bleiben.",
      sections: [
        // ---------- 4A – Alleinerziehende ----------
        {
          label: "4A – Alleinerziehende",
          blocks: [
            {
              heading: "💬 1. WhatsApp / Facebook / Telegram – Textvorlagen",
              body: [
                "Vorlage 1 – „Sicherheit beginnt bei dir“",
                "„Ich weiß, wie es sich anfühlt, wenn man jeden Tag alles allein stemmen muss – Familie, Arbeit, Rechnungen.",
                "Viele sagen, man solle einfach stark bleiben. Aber Stärke heißt, sich rechtzeitig selbst abzusichern.",
                "Im FSA-Stammtisch lernst du, wie du dein Geld und dein Wissen so strukturierst, dass niemand dir etwas sperren oder nehmen kann.",
                "Trustyfy schützt dein Einkommen technisch – die Akademie erklärt das Warum.",
                "➡️ Magst du beim nächsten Treffen reinschauen? Es geht nicht um Verkauf, sondern um Sicherheit.“",
                "",
                "Vorlage 2 – „Von Sorge zu Ruhe“",
                "„Früher dachte ich, Sicherheit kommt von außen – heute weiß ich, sie beginnt bei mir.",
                "Der FSA-Stammtisch ist mein Anker geworden: Dort reden Menschen offen über Geld, Familie und Verantwortung.",
                "Trustyfy sorgt dafür, dass mein Einkommen wirklich mir gehört – keine Bank, kein Dritter, kein Zufall.",
                "➡️ Wenn du wissen willst, wie das geht, komm einfach vorbei oder online dazu.“",
                "",
                "Vorlage 3 – „Klarheit statt Chaos“",
                "„Manchmal wird alles zu viel – und genau dann hilft Struktur.",
                "Im FSA-Stammtisch lernst du, was finanzielle Souveränität praktisch bedeutet – verständlich, menschlich, ehrlich.",
                "Trustyfy ist der technische Part – es schützt dein Einkommen, du bleibst handlungsfähig.",
                "➡️ Ein Abend, ein Gespräch, und du siehst klarer. Ich lade dich ein.“"
              ]
            },
            {
              heading: "💌 2. E-Mail-Vorlagen (Kontaktaufnahme)",
              body: [
                "E-Mail 1 – „Mehr Ruhe durch Selbstbestimmung“",
                "Betreff: Mehr Ruhe – trotz aller Verantwortung",
                "Hallo [Name],",
                "jeder Tag ist voll – Familie, Arbeit, Verpflichtungen. Oft bleibt kein Raum, an sich selbst zu denken.",
                "Ich habe gelernt, dass Sicherheit nicht von Banken oder Gesetzen kommt, sondern von Wissen und Struktur.",
                "Im kostenlosen FSA-Grundkurs und den Stammtischen findest du genau das – echte Aufklärung statt Versprechen.",
                "Trustyfy schützt das, was du aufbaust – dezentral, unabhängig und sicher.",
                "Wenn du magst, schick ich dir den Link oder lade dich zum nächsten Treffen ein.",
                "Herzliche Grüße [Dein Name]",
                "",
                "E-Mail 2 – „Von Überforderung zu Klarheit“",
                "Betreff: Ein Ort, an dem Verantwortung leichter wird",
                "Hallo [Name],",
                "allein für alles zuständig zu sein kostet Kraft.",
                "Der FSA-Stammtisch bietet eine Gemeinschaft, die versteht, was das bedeutet – und Wege zeigt, um wieder Balance zu finden.",
                "Mit Trustyfy behältst du die Kontrolle über dein Geld, egal was Banken oder Systeme ändern.",
                "Es ist kein Risiko, nur Wissen – und das verändert alles.",
                "Melde dich gern, wenn du teilnehmen willst.",
                "Beste Grüße [Dein Name]",
                "",
                "E-Mail 3 – „Souveränität ist lernbar“",
                "Betreff: Schritt für Schritt zu mehr Ruhe und Freiheit",
                "Hallo [Name],",
                "ich weiß, dass du vieles gleichzeitig trägst – und genau darum ist Klarheit so wichtig.",
                "Im FSA-Stammtisch sprechen wir offen über finanzielle Selbstbestimmung, Verantwortung und technische Lösungen.",
                "Trustyfy sorgt dafür, dass dein Einkommen unter deiner Kontrolle bleibt – transparent und sicher.",
                "Es geht um Wissen, nicht um Werbung.",
                "Wenn du magst, bist du herzlich eingeladen.",
                "Liebe Grüße [Dein Name]"
              ]
            },
            {
              heading: "📞 3. Telefon-Leitfäden (inkl. 🔹 Interne Anleitung)",
              body: [
                "Leitfaden 1 – Von Verantwortung zu Selbstbestimmung",
                "🔹 Interne Anleitung: Entlastung ohne Mitleid, Fokus auf Stärke.",
                "„Hallo [Name], ich weiß, wie viel Kraft es kostet, alles allein zu tragen.",
                "Viele leben im Dauerlauf und merken gar nicht, wie abhängig sie vom System sind.",
                "Im FSA-Stammtisch zeigen wir, wie man Schritt für Schritt wieder Raum und Kontrolle zurückbekommt.",
                "Trustyfy sichert das technisch ab – kein Fremdzugriff, kein Stillstand.",
                "Das Gespräch ist kein Verkauf, sondern Hilfe zur Selbsthilfe.",
                "Ich lade dich ein, beim nächsten Treffen dabei zu sein – online oder vor Ort.“",
                "",
                "Leitfaden 2 – Ruhe statt Druck",
                "🔹 Interne Anleitung: Emotionale Ansprache ohne Angst, Thema „Kontrolle zurückholen“.",
                "„Hey [Name], viele von uns leben ständig unter Druck – Job, Familie, Finanzen.",
                "Ich möchte dir zeigen, wie du durch Verständnis und Technik Ruhe in das Chaos bringst.",
                "Im FSA-Treff lernst du, wie Geldflüsse wirklich laufen und wie du sie selbst lenkst.",
                "Trustyfy gibt dir die technische Unabhängigkeit dazu.",
                "Ein kurzes Gespräch reicht – du entscheidest danach selbst, ob es für dich passt.“",
                "",
                "Leitfaden 3 – Klarheit gewinnen, Ruhe finden",
                "🔹 Interne Anleitung: Von Überforderung zu Handlungsfähigkeit führen.",
                "„Hallo [Name], viele denken, Sicherheit sei eine Frage des Einkommens – aber es ist eine Frage des Verstehens.",
                "Wir zeigen, wie du deine Finanzen selbst strukturierst und Absicherung aufbaust, die dir wirklich gehört.",
                "Mit Trustyfy bleibt dein Geld unter deiner Kontrolle – und das fühlt sich ganz anders an.",
                "Der FSA-Stammtisch ist dafür ein guter Startpunkt.",
                "Ich erklär dir gern, wie du mitmachen kannst.“"
              ]
            },
            {
              heading: "🔗 4. Share-Snippets",
              body: [
                "1️⃣ „Sicherheit beginnt mit Verständnis – FSA zeigt den Weg, Trustyfy macht dich unabhängig.“",
                "2️⃣ „Alleinerziehend heißt nicht allein – in der Community findest du Stärke und Wissen.“",
                "3️⃣ „Weniger Sorge, mehr Selbstbestimmung – FSA und Trustyfy zeigen wie.“",
                "4️⃣ „Ruhe kommt, wenn du verstehst – und handelst.“"
              ]
            }
          ]
        },

        // ---------- 4B – Rentner / Pensionierte ----------
        {
          label: "4B – Rentner / Pensionierte",
          blocks: [
            {
              heading: "💬 1. WhatsApp / Facebook / Telegram – Textvorlagen",
              body: [
                "Vorlage 1 – „Würde bewahren heißt Verstehen“",
                "„Viele merken, wie schnell sich alles ändert – Banken, Gesetze, digitale Konten.",
                "Doch Sicherheit heißt nicht, die Kontrolle abzugeben.",
                "Im FSA-Stammtisch lernen wir, wie man finanzielle Selbstbestimmung auch im Alter bewahrt.",
                "Trustyfy ist dafür das Werkzeug: dezentral, ruhig, verständlich.",
                "➡️ Ich zeige Ihnen gern, wie das funktioniert – keine Theorie, sondern Souveränität.“",
                "",
                "Vorlage 2 – „Ruhe durch Selbstverwaltung“",
                "„Viele Rentner haben Angst, dass neue Regeln ihre Ersparnisse einschränken.",
                "Im FSA-Treff erklären wir, wie Sie Ihr Geld selbst verwalten und vor Eingriffen schützen können.",
                "Trustyfy bietet eine einfache Lösung – Sie bleiben Herr über Ihr Eigentum.",
                "➡️ Es geht nicht um Investments, sondern um Freiheit.“",
                "",
                "Vorlage 3 – „Souverän bis zum Schluss“",
                "„Sicherheit bedeutet nicht Abhängigkeit – sondern Selbstbestimmung.",
                "Mit der FSA-Akademie lernen Sie, Systeme zu verstehen und bewusst zu handeln.",
                "Trustyfy sichert Ihre Werte ab – diskret und verlässlich.",
                "➡️ Kommen Sie zum nächsten Stammtisch – wir erklären alles in Ruhe.“"
              ]
            },
            {
              heading: "💌 2. E-Mail-Vorlagen",
              body: [
                "E-Mail 1 – „Sicherheit ohne Abhängigkeit“",
                "Betreff: Wie Sie Ihre Werte auch morgen schützen",
                "Sehr geehrter [Name],",
                "wir leben in Zeiten großer Umbrüche. Banken digitalisieren, Regeln ändern sich – aber Sicherheit muss bleiben.",
                "Im FSA-Stammtisch zeigen wir verständlich, wie Sie Ihr Geld selbst sichern können.",
                "Trustyfy unterstützt dabei technisch – einfach, sicher, dezentral.",
                "Keine Verpflichtung, nur Wissen.",
                "Ich würde mich freuen, Sie beim nächsten Treffen zu begrüßen.",
                "Mit freundlichen Grüßen [Ihr Name]",
                "",
                "E-Mail 2 – „Verstehen statt Vertrauen müssen“",
                "Betreff: Wie man Souveränität behält",
                "Sehr geehrter [Name],",
                "viele Menschen vertrauen blind auf Systeme, die sich ständig ändern.",
                "Im FSA-Treff lernen Sie, diese Zusammenhänge zu verstehen und eigene Wege zu gehen.",
                "Trustyfy gibt Ihnen Werkzeuge an die Hand, um Ihr Geld zu schützen – ohne Bank oder Dritte.",
                "Es lohnt sich, sich zu informieren – denn Wissen ist heute Sicherheit.",
                "Beste Grüße [Ihr Name]",
                "",
                "E-Mail 3 – „In Ruhe vorsorgen“",
                "Betreff: Sicherheit für Ihre Rente – einfach erklärt",
                "Sehr geehrter [Name],",
                "der FSA-Stammtisch vereint Menschen, die vorsorgen wollen – nicht durch Angst, sondern durch Verständnis.",
                "Wir erklären, wie digitale Zentralwährungen funktionieren und was das für Ihre Rente bedeutet.",
                "Trustyfy ist eine praktische Lösung, die Unabhängigkeit wieder möglich macht.",
                "Ich lade Sie herzlich ein, mehr darüber zu erfahren.",
                "Mit besten Grüßen [Ihr Name]"
              ]
            },
            {
              heading: "📞 3. Telefon-Leitfäden (inkl. 🔹 Interne Anleitung)",
              body: [
                "Leitfaden 1 – Souveränität bewahren",
                "🔹 Interne Anleitung: Sicherheit und Würde an erste Stelle stellen.",
                "„Guten Tag [Name], viele merken, wie schnell sich alles ändert – Gesetze, Zinsen, digitale Konten.",
                "Ich möchte Ihnen zeigen, wie Sie Ihre Werte weiterhin selbst verwalten können.",
                "Im FSA-Stammtisch lernen wir, wie Verständnis Ruhe bringt.",
                "Trustyfy sichert diese Ruhe technisch ab – transparent, ohne Abhängigkeit.",
                "Ich lade Sie ein, mitzuhören oder Ihre Fragen direkt im Treffen zu stellen.“",
                "",
                "Leitfaden 2 – Würde bewahren",
                "🔹 Interne Anleitung: Gefühl von Kontrolle vermitteln, nicht Verlust.",
                "„Herr / Frau [Name], Sicherheit heißt heute mehr denn je, selbst zu verstehen, wie Systeme arbeiten.",
                "Wir erklären einfach, wie Sie Ihr Geld vor stillen Eingriffen schützen können.",
                "Trustyfy macht das sichtbar und nachvollziehbar.",
                "Es geht nicht um Panik, sondern um Würde und Vertrauen in die eigene Handlungsfähigkeit.",
                "Ich zeige Ihnen gern, wie einfach das sein kann.“",
                "",
                "Leitfaden 3 – In Ruhe vorsorgen",
                "🔹 Interne Anleitung: Klarheit ohne Überforderung, Sprache ruhig halten.",
                "„Guten Tag [Name], viele fragen sich, was passiert, wenn Zinsen und Regeln plötzlich ändern.",
                "Im FSA-Treff lernen Sie, wie Sie vorsorgen, ohne abhängig zu bleiben.",
                "Trustyfy bietet eine einfach bedienbare Lösung – keine App, die verwirrt, sondern ein Werkzeug, das Freiheit gibt.",
                "Ein kurzer Austausch reicht, um zu verstehen, warum Wissen die beste Vorsorge ist.",
                "Ich lade Sie herzlich ein, beim nächsten Treffen dabei zu sein – online oder persönlich.“"
              ]
            },
            {
              heading: "🔗 4. Share-Snippets",
              body: [
                "1️⃣ „Sicherheit im Alter bedeutet, selbst zu entscheiden – FSA & Trustyfy zeigen, wie.“",
                "2️⃣ „Würde heißt, zu verstehen – nicht zu vertrauen.“",
                "3️⃣ „Freiheit bleibt, wenn Wissen wächst.“",
                "4️⃣ „Digitale Zeiten brauchen menschliche Klarheit – FSA & Trustyfy.“"
              ]
            }
          ]
        },

        // ---------- 4C – Studenten / Azubis ----------
        {
          label: "4C – Studenten / Azubis",
          blocks: [
            {
              heading: "💬 1. WhatsApp / Facebook / Telegram – Textvorlagen",
              body: [
                "Vorlage 1 – „Freiheit fängt beim Wissen an“",
                "„Wir leben digital – aber kaum jemand weiß, wer die Regeln schreibt.",
                "Im FSA-Stammtisch lernst du, wie Geldsysteme wirklich funktionieren und wie du dein eigenes Wallet sicher führst.",
                "Trustyfy macht das praktisch – du kontrollierst, was dir gehört.",
                "➡️ Sei beim nächsten Treffen dabei, online oder vor Ort. Wissen ist das neue Kapital.“",
                "",
                "Vorlage 2 – „Zukunft selbst gestalten“",
                "„Schule lehrt vieles, aber kaum jemand erklärt, wie Geld wirklich fließt.",
                "Der FSA-Stammtisch ist dein Raum für Fragen, Austausch und echtes Verstehen.",
                "Trustyfy zeigt dir, wie du Unabhängigkeit digital leben kannst – sicher und dezentral.",
                "➡️ Wenn du Zukunft willst, die du selbst steuerst, bist du hier richtig.“",
                "",
                "Vorlage 3 – „Freiheit ohne Filter“",
                "„Wir sind ständig online – aber kaum jemand versteht die Mechanik dahinter.",
                "Im FSA-Treff lernst du, Systeme zu durchschauen statt ihnen zu folgen.",
                "Trustyfy macht Sicherheit sichtbar – du entscheidest, wer Zugriff hat.",
                "➡️ Kein Gerede, kein Verkauf – einfach Klarheit.“"
              ]
            },
            {
              heading: "💌 2. E-Mail-Vorlagen",
              body: [
                "E-Mail 1 – „Mehr Zukunft, weniger Abhängigkeit“",
                "Betreff: Wie du finanzielle Freiheit wirklich lernst",
                "Hey [Name],",
                "du studierst, arbeitest, planst dein Leben – aber kaum jemand erklärt, wie Geldsysteme wirklich laufen.",
                "Der FSA-Stammtisch ist ein Ort, wo du genau das lernst – ehrlich, klar, praxisnah.",
                "Trustyfy sorgt dafür, dass du dein Geld selbst verwalten kannst, ohne Bank, ohne Mittelsmann.",
                "Wenn du willst, zeig ich dir, wie einfach das ist.",
                "LG [Dein Name]",
                "",
                "E-Mail 2 – „Freiheit ist Wissen“",
                "Betreff: Warum Verständnis wichtiger ist als Geld",
                "Hey [Name],",
                "viele wollen frei sein, aber kaum jemand versteht, wie Freiheit wirklich funktioniert.",
                "Im FSA-Stammtisch lernst du, Kontrolle über deine Finanzen zu übernehmen – Schritt für Schritt.",
                "Trustyfy ist das Tool dafür – sicher, dezentral, transparent.",
                "Lust, das mal zu erleben? Ich schick dir den Link zum nächsten Treffen.",
                "",
                "E-Mail 3 – „Dein Einstieg in echte Unabhängigkeit“",
                "Betreff: So steuerst du deine Zukunft selbst",
                "Hey [Name],",
                "alles wird digital, aber echte Freiheit kommt vom Verstehen.",
                "Im FSA-Stammtisch zeigen wir, wie du Systeme hinterfragst und selbst steuerst.",
                "Mit Trustyfy lernst du, wie Sicherheit funktioniert, wenn du sie selbst gestaltest.",
                "Es dauert nur ein Treffen, um den Unterschied zu sehen."
              ]
            },
            {
              heading: "📞 3. Telefon-Leitfäden (inkl. 🔹 Interne Anleitung)",
              body: [
                "Leitfaden 1 – Zukunft verstehen",
                "🔹 Interne Anleitung: Ton jung, locker, aber klar.",
                "„Hey [Name], hast du dich schon mal gefragt, wer eigentlich die Kontrolle über dein Geld hat?",
                "Die meisten denken, Banken und Apps sind neutral – sind sie aber nicht.",
                "Im FSA-Treff lernst du, wie das System funktioniert und wie du es für dich nutzt.",
                "Trustyfy zeigt dir, wie du Werte selbst verwaltest, sicher und unabhängig.",
                "Lass uns kurz sprechen, ich erklär’s dir ohne Blabla.“",
                "",
                "Leitfaden 2 – Freiheit praktisch leben",
                "🔹 Interne Anleitung: Locker, aber mit Mehrwert – Motivation statt Moral.",
                "„Hi [Name], viele reden über Unabhängigkeit, aber kaum jemand lebt sie.",
                "Wir im FSA-Stammtisch zeigen dir, wie das praktisch aussieht – Schritt für Schritt, mit echten Tools.",
                "Trustyfy ist dein Startpunkt für finanzielle Eigenständigkeit.",
                "Ein Gespräch lohnt sich, weil du danach weißt, wie du deine Zukunft steuerst.“",
                "",
                "Leitfaden 3 – Sicherheit digital denken",
                "🔹 Interne Anleitung: Technik-Neugier nutzen, nicht überfordern.",
                "„Hey [Name], du bist ständig online – und genau da liegt die Chance.",
                "Im FSA-Stammtisch lernst du, digitale Freiheit mit echtem Schutz zu verbinden.",
                "Trustyfy gibt dir Kontrolle über dein Wallet, dein Geld, dein Wissen.",
                "Ich erklär dir das in 10 Minuten – ehrlich, ohne Fachchinesisch.“"
              ]
            },
            {
              heading: "🔗 4. Share-Snippets",
              body: [
                "1️⃣ „Freiheit ist kein Trend – sie ist Wissen.“",
                "2️⃣ „Versteh das System, bevor es dich steuert.“",
                "3️⃣ „Echte Zukunft ist dezentral – und beginnt im Kopf.“",
                "4️⃣ „Wissen ist die stärkste Währung – nutz sie.“"
              ]
            }
          ]
        }
      ]
    },

    // ===================== ENGLISH =====================
    en: {
      title: "❤️ Target Group 4 – Single parents, retirees & students",
      subtitle: "Three life situations, one shared pressure: everything gets more expensive, more digital and more controlled. These community meetups explain: with FSA (understanding) + Trustyfy (tech) you can still stay sovereign.",
      sections: [
        {
          label: "4A – Single parents",
          blocks: [
            {
              heading: "💬 1. WhatsApp / Facebook / Telegram – messages",
              body: [
                "Template 1 – “Security starts with you”",
                "“I know what it feels like when you carry everything alone – kids, job, bills.",
                "People say: just stay strong. But real strength is to protect yourself early.",
                "In the FSA meetup you learn how to structure your money and knowledge so no bank or platform can block you.",
                "Trustyfy protects your income on the technical level – the academy explains the why.",
                "➡️ Want to join the next session? It’s not selling, it’s safety.”",
                "",
                "Template 2 – “From worry to calm”",
                "“I used to think security comes from outside – today I know it starts with me.",
                "The FSA meetup became my anchor: people talk openly about money, family and responsibility.",
                "Trustyfy makes sure my income really belongs to me – no bank, no third party, no surprise.",
                "➡️ If you want to know how it works, join in – on site or online.”",
                "",
                "Template 3 – “Clarity instead of chaos”",
                "“Sometimes everything is too much – and that’s when structure helps.",
                "In the FSA meetup you learn what financial sovereignty means in practice – clear, human, honest.",
                "Trustyfy is the tech part – it shields your income so you can act.",
                "➡️ One evening, one talk – and you see clearer. You’re invited.”"
              ]
            },
            {
              heading: "💌 2. E-mails",
              body: [
                "Email 1 – “More calm through self-determination”",
                "Subject: More calm – even with all the responsibility",
                "Hi [Name],",
                "days are full – family, work, duties. Often there’s no space to think about yourself.",
                "I learned that safety does not come from banks or laws but from knowledge and structure.",
                "In the free FSA course and in the meetups you get exactly that – real clarity, no promises.",
                "Trustyfy protects what you build – decentralized, independent, secure.",
                "If you like I can send you the link or invite you to the next meetup.",
                "Warm regards [Your name]",
                "",
                "Email 2 – “From overload to clarity”",
                "Subject: A place where responsibility gets lighter",
                "Hi [Name],",
                "doing everything alone is exhausting.",
                "The FSA meetup is a group that understands that – and shows steps back to balance.",
                "With Trustyfy you stay in control of your money no matter what banks or systems change.",
                "No risk – just knowledge, and that changes everything.",
                "Let me know if you want to join.",
                "Best, [Your name]",
                "",
                "Email 3 – “Sovereignty can be learned”",
                "Subject: Step by step to more calm and freedom",
                "Hi [Name],",
                "I know you carry a lot – that is exactly why clarity matters.",
                "In the FSA meetup we talk openly about financial self-determination, responsibility and technical solutions.",
                "Trustyfy keeps your income under your control – transparent and safe.",
                "It’s about knowledge, not advertising.",
                "You’re very welcome to join.",
                "Best, [Your name]"
              ]
            },
            {
              heading: "📞 3. Phone scripts (incl. internal guidance)",
              body: [
                "Script 1 – From responsibility to self-determination",
                "🔹 Internal guidance: empower, don’t pity; focus on strength.",
                "“Hi [Name], I know how much energy it takes to carry everything alone.",
                "Many live in permanent rush and don’t see how dependent they are on the system.",
                "In the FSA meetup we show how to get space and control back – step by step.",
                "Trustyfy locks it in technically – no foreign access, no freeze.",
                "It’s not selling, it’s help to help yourself.",
                "Join the next meetup – online or in person.”",
                "",
                "Script 2 – Calm instead of pressure",
                "🔹 Internal guidance: emotional but not fear-based.",
                "“Hey [Name], a lot of us live under permanent pressure – job, family, money.",
                "I want to show you how understanding + tech brings calm into that chaos.",
                "In the FSA meetup you learn how money flows really work and how you control them.",
                "Trustyfy gives you the technical independence.",
                "A short call is enough – you decide afterwards.”",
                "",
                "Script 3 – Gain clarity, find calm",
                "🔹 Internal guidance: lead from overwhelm to capability.",
                "“Hi [Name], many think safety is about income – but it’s about understanding.",
                "We show how to structure your finances and build protection that truly belongs to you.",
                "With Trustyfy your money stays in your control – and that feels different.",
                "The FSA meetup is a good starting point.",
                "I can explain how to join.”"
              ]
            },
            {
              heading: "🔗 4. Share snippets",
              body: [
                "1️⃣ “Security starts with understanding – FSA shows it, Trustyfy makes it independent.”",
                "2️⃣ “Single parent does not mean alone – the community gives strength and knowledge.”",
                "3️⃣ “Less worry, more sovereignty – FSA & Trustyfy show how.”",
                "4️⃣ “Calm comes when you understand – and act.”"
              ]
            }
          ]
        },

        {
          label: "4B – Retirees / pensioners",
          blocks: [
            {
              heading: "💬 1. WhatsApp / Facebook / Telegram – messages",
              body: [
                "Template 1 – “Dignity means understanding”",
                "“A lot is changing fast – banks, rules, digital money.",
                "But safety does not mean giving control away.",
                "In the FSA meetup we show how to keep financial self-determination in later life.",
                "Trustyfy is the tool for that: decentralized, calm, understandable.",
                "➡️ I can walk you through it – no theory, just sovereignty.”",
                "",
                "Template 2 – “Calm through self-administration”",
                "“Many retirees fear that new rules will limit their savings.",
                "In the FSA meetup we explain how to manage your money yourself and protect it from interventions.",
                "Trustyfy offers a simple solution – you stay in charge.",
                "➡️ It’s not about investments – it’s about freedom.”",
                "",
                "Template 3 – “Sovereign to the end”",
                "“Safety is not dependency – it is conscious control.",
                "With the FSA academy you understand the system and take decisions yourself.",
                "Trustyfy secures your values – discreet and reliable.",
                "➡️ Join the next meetup – we explain it in peace.”"
              ]
            },
            {
              heading: "💌 2. E-mails",
              body: [
                "Email 1 – “Security without dependency”",
                "Subject: How to protect your values tomorrow as well",
                "Dear [Name],",
                "we live in times of change. Banks go digital, rules change – but safety should stay.",
                "In the FSA meetup we explain in simple words how to secure money yourself.",
                "Trustyfy supports technically – simple, safe, decentralized.",
                "No obligation, just knowledge.",
                "I’d be happy to welcome you to the next meetup.",
                "Kind regards [Your name]",
                "",
                "Email 2 – “Understanding instead of blind trust”",
                "Subject: How to keep sovereignty",
                "Dear [Name],",
                "many people trust systems that change all the time.",
                "In the FSA meetup you learn to understand these changes and choose your own path.",
                "Trustyfy gives you tools to protect your money – without a bank or third party.",
                "It’s worth getting informed – knowledge is safety today.",
                "Best regards [Your name]",
                "",
                "Email 3 – “Preparing in peace”",
                "Subject: Easy safety for your pension",
                "Dear [Name],",
                "the FSA meetup brings together people who want to prepare – not through fear, but through understanding.",
                "We explain how digital currencies work and what that means for your retirement money.",
                "Trustyfy is a practical way to stay independent.",
                "You’re warmly invited to learn more.",
                "Kind regards [Your name]"
              ]
            },
            {
              heading: "📞 3. Phone scripts (incl. internal guidance)",
              body: [
                "Script 1 – Keeping sovereignty",
                "🔹 Internal guidance: put dignity and safety first.",
                "“Good day [Name], a lot is changing – rules, interest rates, digital accounts.",
                "I’d like to show you how to stay in control of your values.",
                "In the FSA meetup we show how understanding creates calm.",
                "Trustyfy locks that calm in – transparent, no dependency.",
                "I invite you to listen in or ask your questions directly.”",
                "",
                "Script 2 – Keep your dignity",
                "🔹 Internal guidance: convey control, not loss.",
                "“Mr/Ms [Name], safety today means understanding how systems work.",
                "We explain how to protect money from silent interventions.",
                "Trustyfy makes it visible and traceable.",
                "It’s not about panic – it’s about dignity and the ability to act.",
                "I can show you how easy it is.”",
                "",
                "Script 3 – Prepare in peace",
                "🔹 Internal guidance: clarity without overwhelming.",
                "“Good day [Name], many people ask what happens if rules or rates suddenly change.",
                "In the FSA meetup we show how to prepare without being dependent.",
                "Trustyfy is easy to use – not a confusing app, but a tool for freedom.",
                "Let’s talk briefly – then you know why knowledge is the best preparation.",
                "You’re welcome to join the next meetup.”"
              ]
            },
            {
              heading: "🔗 4. Share snippets",
              body: [
                "1️⃣ “Security in retirement means deciding yourself – FSA & Trustyfy show how.”",
                "2️⃣ “Dignity means understanding – not just trusting.”",
                "3️⃣ “Freedom stays when knowledge grows.”",
                "4️⃣ “Digital times need human clarity – FSA & Trustyfy.”"
              ]
            }
          ]
        },

        {
          label: "4C – Students / trainees",
          blocks: [
            {
              heading: "💬 1. WhatsApp / Facebook / Telegram – messages",
              body: [
                "Template 1 – “Freedom starts with knowledge”",
                "“We live digital – but hardly anyone knows who sets the rules.",
                "In the FSA meetup you learn how money systems work and how to run your own wallet securely.",
                "Trustyfy makes it practical – you control what’s yours.",
                "➡️ Join the next meetup, online or on site. Knowledge is the new capital.”",
                "",
                "Template 2 – “Shape your own future”",
                "“School teaches a lot but almost never how money actually flows.",
                "The FSA meetup is your space for questions and real understanding.",
                "Trustyfy shows how to live digital independence – safe and decentralized.",
                "➡️ If you want a future you control yourself, this is your place.”",
                "",
                "Template 3 – “Freedom without filters”",
                "“We are always online – but hardly anyone understands the mechanics.",
                "In the meetup you learn to see through systems instead of following them.",
                "Trustyfy makes security visible – you decide who gets access.",
                "➡️ No hype, no sales – just clarity.”"
              ]
            },
            {
              heading: "💌 2. E-mails",
              body: [
                "Email 1 – “More future, less dependency”",
                "Subject: How to actually learn financial freedom",
                "Hey [Name],",
                "you study, work, plan your life – but nobody explains how money systems really run.",
                "The FSA meetup is where you learn exactly that – honest, clear, hands-on.",
                "Trustyfy makes sure you can manage your money yourself – no bank, no middleman.",
                "If you want, I’ll show you how easy it is.",
                "Best, [Your name]",
                "",
                "Email 2 – “Freedom is knowledge”",
                "Subject: Why understanding matters more than money",
                "Hey [Name],",
                "many want to be free but rarely understand how freedom actually works.",
                "In the FSA meetup you learn to take control over your finances – step by step.",
                "Trustyfy is the tool – secure, decentralized, transparent.",
                "If you’re curious, I’ll send you the link.",
                "",
                "Email 3 – “Your entry into real independence”",
                "Subject: This is how you steer your future",
                "Hey [Name],",
                "everything becomes digital, but real freedom comes from understanding.",
                "In the meetup we show how to question systems and steer yourself.",
                "With Trustyfy you learn how to build your own secure setup.",
                "It takes only one session to see the difference."
              ]
            },
            {
              heading: "📞 3. Phone scripts (incl. internal guidance)",
              body: [
                "Script 1 – Understand the future",
                "🔹 Internal guidance: young tone, curious, straight.",
                "“Hey [Name], ever asked who actually controls your money?",
                "Most people think banks and apps are neutral – they’re not.",
                "In the FSA meetup you learn how the system works and how to use it for yourself.",
                "Trustyfy shows you how to self-custody values – secure and independent.",
                "Let’s talk for 10 minutes – no jargon.”",
                "",
                "Script 2 – Live freedom practically",
                "🔹 Internal guidance: motivation over morality.",
                "“Hi [Name], lots of people talk about independence but don’t live it.",
                "We show what it looks like in real life – step by step, with real tools.",
                "Trustyfy is your starting point for financial independence.",
                "A short call is worth it – after that you know how to steer your future.”",
                "",
                "Script 3 – Think security digital",
                "🔹 Internal guidance: use tech interest, don’t overload.",
                "“Hey [Name], you’re online all the time – that’s the opportunity.",
                "In the FSA meetup you learn to connect digital freedom with real protection.",
                "Trustyfy gives you control over wallet, money and knowledge.",
                "I can explain it in 10 minutes – clear and simple.”"
              ]
            },
            {
              heading: "🔗 4. Share snippets",
              body: [
                "1️⃣ “Freedom is not a trend – it is knowledge.”",
                "2️⃣ “Understand the system before it runs you.”",
                "3️⃣ “Real future is decentralized – and starts in your head.”",
                "4️⃣ “Knowledge is the strongest currency – use it.”"
              ]
            }
          ]
        }
      ]
    }
  };

  // ===================== 2) RENDERER =====================
  function renderCommunity04(lang) {
    const data = COMMUNITY_04[lang] || COMMUNITY_04.de;
    const host =
      document.getElementById("socialContent") ||
      document.querySelector("[data-community-content='04']") ||
      createHost();

    host.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "social-wrap";

    // Kopf
    const h1 = document.createElement("h1");
    h1.textContent = data.title;
    wrap.appendChild(h1);

    const p = document.createElement("p");
    p.className = "social-subtitle";
    p.textContent = data.subtitle;
    wrap.appendChild(p);

    // Alle drei Untergruppen (4A/4B/4C)
    (data.sections || []).forEach((section, sIdx) => {
      const sec = document.createElement("section");
      sec.className = "social-section";

      const h2 = document.createElement("h2");
      h2.textContent = section.label || (lang === "de" ? "Bereich " : "Section ") + (sIdx + 1);
      sec.appendChild(h2);

      (section.blocks || []).forEach((blk) => {
        const card = document.createElement("article");
        card.className = "social-card";

        if (blk.heading) {
          const h3 = document.createElement("h3");
          h3.textContent = blk.heading;
          card.appendChild(h3);
        }

        (blk.body || []).forEach((line) => {
          const pLine = document.createElement("p");
          pLine.textContent = line;
          card.appendChild(pLine);
        });

        sec.appendChild(card);
      });

      wrap.appendChild(sec);
    });

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "social-close-btn";
    closeBtn.textContent = lang === "de" ? "Schließen" : "Close";
    closeBtn.addEventListener("click", () => {
      host.innerHTML = "";
      host.style.display = "none";
      document.dispatchEvent(new CustomEvent("community:closed", { detail: "04" }));
    });
    wrap.appendChild(closeBtn);

    host.appendChild(wrap);
    host.style.display = "block";
  }

  function createHost() {
    const host = document.createElement("div");
    host.id = "socialContent";
    document.body.appendChild(host);
    return host;
  }

  // ===================== 3) Styles – wie bei Social =====================
  const style = document.createElement("style");
  style.textContent = `
  #socialContent {
    position: relative;
    width: min(1100px, 100%);
    margin: 0 auto;
    padding: clamp(1.2rem, 2.3vw, 2.4rem);
    background: rgba(7, 11, 17, 0.95);
    color: #e5e7eb;
    line-height: 1.55;
    border: 1px solid rgba(212,175,55,0.25);
    border-radius: 16px;
    backdrop-filter: blur(6px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.35);
    z-index: 30;
  }
  #socialContent h1 {
    font-size: clamp(1.35rem, 3.2vw, 1.8rem);
    margin-bottom: 0.25rem;
    color: #fff;
  }
  #socialContent .social-subtitle {
    color: rgba(229,231,235,0.75);
    margin-bottom: 1.4rem;
  }
  .social-section {
    margin-bottom: 1.8rem;
  }
  .social-section h2 {
    font-size: 1.05rem;
    margin-bottom: 0.75rem;
    color: #f3f4f6;
    border-bottom: 1px solid rgba(212,175,55,0.28);
    padding-bottom: 0.3rem;
  }
  .social-card {
    background: rgba(15, 23, 42, 0.35);
    border: 1px solid rgba(148, 163, 184, 0.18);
    border-radius: 12px;
    padding: 0.9rem 1rem 0.85rem;
    margin-bottom: 0.75rem;
  }
  .social-card h3 {
    margin: 0 0 0.35rem;
    font-size: 0.98rem;
    color: #fff;
  }
  .social-card p {
    margin: 0 0 0.45rem;
    font-size: 0.84rem;
    color: #e2e8f0;
  }
  .social-card p:last-child {
    margin-bottom: 0;
  }
  .social-close-btn {
    margin-top: 1rem;
    background: rgba(212,175,55,0.15);
    border: 1px solid rgba(212,175,55,0.5);
    color: #fff;
    padding: 0.5rem 1.3rem;
    border-radius: 999px;
    cursor: pointer;
    transition: 0.25s ease;
  }
  .social-close-btn:hover {
    background: rgba(212,175,55,0.35);
    box-shadow: 0 0 14px rgba(212,175,55,0.4);
  }
  @media (max-width: 720px) {
    #socialContent {
      padding: 1rem 0.65rem 1.3rem;
      border-radius: 0;
      width: 100%;
    }
    .social-card { border-radius: 10px; }
    .social-card p { font-size: 0.8rem; }
  }
  `;
  document.head.appendChild(style);

  // ===================== 4) GLOBAL EXPORT + EVENTS =====================
  window.FSA_COMMUNITY_04 = COMMUNITY_04;

  // Helfer für manuelles Öffnen aus community.html
  window.renderCommunity04 = function (lang) {
    renderCommunity04(lang || (localStorage.getItem("fsa_lang") || "de"));
  };

  // auf Sprachwechsel reagieren
  document.addEventListener("fsa:lang-change", (ev) => {
    const lang = ev.detail || "de";
    const host = document.getElementById("socialContent");
    if (host && host.innerHTML.trim() !== "") {
      renderCommunity04(lang);
    }
  });

  // falls community.html beim Klick Event feuert
  document.addEventListener("community:open-04", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    renderCommunity04(lang);
  });
})();
