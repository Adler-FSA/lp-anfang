// library/js/text-social-01.js
// Zielgruppe 1 – Firmen & Geschäftsführer
// Verdrahtung für: lang-switcher.js (event: fsa:lang-change)
// Anzeige: einfacher einspaltiger Renderer, mobil lesbar
// Keine Kürzungen. DE = voll, EN = sinngemäße, professionelle Fassung.

(function () {
  // 1. Alle Inhalte in beiden Sprachen
  const SOCIAL_CONTENT = {
    de: {
      title: "📊 Zielgruppe 1 – Firmen & Geschäftsführer",
      subtitle: "Thema: Dezentrale Finanzstrukturen – Kontrolle, Effizienz, Vertrauen",
      blocks: [
        {
          type: "section",
          heading: "🧩 1. WhatsApp / Facebook / Telegram – Textvorlagen",
          items: [
            {
              title: "Vorlage 1 – „Die Zukunft der Zusammenarbeit“",
              body: [
                "Viele Unternehmen spüren, wie abhängig ihre Abläufe von Banken, Plattformen und zentralen Servern geworden sind.",
                "Ein einziger technischer oder regulatorischer Eingriff – und Prozesse stehen still.",
                "Immer mehr Firmen ergänzen ihre klassische Struktur deshalb um ein dezentrales Finanz-Setup: eigene Wallets, klare Freigabewege, transparente Partnerprozesse.",
                "Dezentral bedeutet nicht Chaos – es bedeutet Stabilität, Nachvollziehbarkeit und echte Datensouveränität.",
                "➡️ Ich arbeite selbst mit so einem Setup und kann Ihnen zeigen, wie der Aufbau grundsätzlich funktioniert – unabhängig davon, für welche Anbieter Sie sich später entscheiden.",
                "👉 Lassen Sie uns kurz abstimmen, wann ich Ihnen den Ansatz in 15 Minuten zeigen darf."
              ]
            },
            {
              title: "Vorlage 2 – „Vertrauen als neue Währung“",
              body: [
                "Im Geschäftsleben entscheidet Vertrauen schneller als jede Kalkulation.",
                "Doch in einer Zeit, in der Cyberangriffe, Kontosperren und Systemausfälle zunehmen, braucht Vertrauen eine technische Grundlage.",
                "Ein dezentrales Konto- und Wallet-Setup macht Abläufe nachvollziehbar: jede Transaktion, jede Vereinbarung, jeder Partnerprozess bleibt prüfbar und geschützt.",
                "➡️ Wenn Sie überlegen, wie Sie Ihr Unternehmen krisenfest und unabhängiger aufstellen, lohnt sich ein Blick auf diese Art von Struktur.",
                "👉 Vereinbaren Sie einen Gesprächstermin, dann zeige ich Ihnen, wie ich das in meiner eigenen Praxis gelöst habe."
              ]
            },
            {
              title: "Vorlage 3 – „Kontrolle zurück ins eigene Haus holen“",
              body: [
                "Viele Firmen wissen nicht, wie viel Kontrolle sie längst abgegeben haben – an Banken, Payment-Provider und Plattformen.",
                "Mit einer dezentralen Architektur holen Sie Entscheidungsrechte zurück: eigene Unternehmens-Wallets, definierte Freigaben, weniger stille Sperren, weniger Fremdserver.",
                "➡️ Gern zeige ich Ihnen, wie Unternehmen damit rechtssicher und handlungsfähig bleiben – zehn Minuten reichen für den Überblick.",
                "👉 Lassen Sie uns einen kurzen Einblick vereinbaren – unverbindlich, aber mit Substanz."
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "💌 2. E-Mail-Vorlagen (Kontaktaufnahme)",
          items: [
            {
              title: "E-Mail 1 – „Sicherheit und Vertrauen neu gedacht“",
              body: [
                "Betreff: Wie Dezentralität Geschäftsrisiken reduziert",
                "",
                "Sehr geehrte Frau / sehr geehrter Herr [Nachname],",
                "Digitalisierung bringt Effizienz – aber auch Abhängigkeit.",
                "Bankrichtlinien, Datenschutzgesetze und zentrale Schnittstellen machen Unternehmen verwundbar.",
                "In meinen Projekten arbeite ich deshalb mit einer zusätzlichen, dezentralen Finanzstruktur: eigene Wallets, klare Freigaben, volle Transparenz – ohne weitere Zwischenstationen.",
                "Ich zeige Ihnen gern, warum immer mehr Unternehmen diesen Weg zumindest als Ergänzung prüfen – und wie das in der Praxis aussieht.",
                "👉 Lassen Sie uns einen 15-Minuten-Termin vereinbaren, um die Möglichkeiten für Ihr Unternehmen durchzugehen – produktneutral, anhand eines Beispiel-Setups.",
                "Mit freundlichen Grüßen",
                "[Ihr Name]"
              ]
            },
            {
              title: "E-Mail 2 – „Vom Vertrauen zur Unabhängigkeit“",
              body: [
                "Betreff: Kontrolle ist kein Misstrauen – sie ist Schutz",
                "",
                "Sehr geehrte Frau / sehr geehrter Herr [Nachname],",
                "neue EU-Vorgaben und Compliance-Richtlinien führen dazu, dass Unternehmen immer weniger direkt entscheiden können.",
                "Mit einer dezentralen Struktur für Zahlungs- und Werteströme holen Sie sich ein Stück Hoheit zurück – jede Zahlung, jeder Datenfluss, jede Freigabe liegt wieder näher an Ihrem eigenen Haus.",
                "Keine einzelne Bank und keine Plattform entscheidet allein über Ihre Handlungsfähigkeit.",
                "Wenn Sie möchten, erläutere ich Ihnen in 15 Minuten, wie so ein Aufbau grundsätzlich funktioniert – losgelöst von bestimmten Produkten.",
                "👉 Antworten Sie mir kurz mit Ihrem Wunschtermin – ich passe mich gern an.",
                "Freundliche Grüße",
                "[Ihr Name]"
              ]
            },
            {
              title: "E-Mail 3 – „Digitale Partnerschaft statt Plattformabhängigkeit“",
              body: [
                "Betreff: Wie Sie Ihr Unternehmen vor Fremdzugriff schützen",
                "",
                "Sehr geehrte Frau / sehr geehrter Herr [Nachname],",
                "fast alle Geschäftsprozesse laufen über fremde Systeme – bis eine Schnittstelle ausfällt oder Regeln geändert werden.",
                "Mit einer dezentralen Konto- und Wallet-Struktur schaffen Sie unabhängige Bahnen: eigene Konten, eigene Freigaben, volle Nachvollziehbarkeit – mit weniger Abhängigkeit von einzelnen zentralen Anbietern.",
                "So bleiben Sie handlungsfähig und rechtssicher – auch in Krisenzeiten.",
                "Gern zeige ich Ihnen Beispiele aus der Praxis und mein eigenes Setup als Orientierung.",
                "👉 Buchen Sie hier einen Kurztermin, dann gehen wir die Optionen gemeinsam durch.",
                "Beste Grüße",
                "[Ihr Name]"
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "📞 3. Telefon-Leitfäden (inkl. 🔹 Interne Anleitung)",
          items: [
            {
              title: "Leitfaden 1 – Kontrolle zurückgewinnen",
              body: [
                "🔹 Interne Anleitung:",
                "Ziel: Neugier wecken → kurzer 15-Minuten-Termin.",
                "Gesprächsrichtung: Druck von außen (EU, Banken, Plattformen) sichtbar machen, dann eine dezentrale Finanzstruktur als Möglichkeit zur Rückgewinnung von Kontrolle positionieren.",
                "Einwandbehandlung: „Wir haben IT/Compliance“ → dezentrale Setups ergänzen, sie ersetzen nicht die bestehende Infrastruktur.",
                "Ergebnis: Terminvereinbarung oder Demo-Link zu einem Beispiel-Setup.",
                "",
                "Skript:",
                "„Guten Tag [Name], viele Unternehmer spüren, wie die Spielräume enger werden – EU-Regulierungen, Bankrichtlinien, digitale Abhängigkeiten.",
                "Ich arbeite deshalb mit einer zusätzlichen, dezentralen Struktur für Zahlungs- und Werteströme.",
                "Damit bleiben Daten- und Zahlungswege nachvollziehbar, ohne dass eine einzelne Instanz alles sperren kann.",
                "Lassen Sie uns das gemeinsam durchgehen – ich zeige Ihnen in 15 Minuten, wie so ein Setup aussehen kann und welche Fragen Sie intern klären sollten.“"
              ]
            },
            {
              title: "Leitfaden 2 – Schutz vor Eingriffen",
              body: [
                "🔹 Interne Anleitung:",
                "Ziel: Bewusstsein für Abhängigkeiten wecken → Termin für Beratung.",
                "Gesprächsführung: Mit aktuellen Risiken beginnen (digitale Zentralwährung, Kontoüberwachung, Compliance-Sperren), dann eine dezentrale Architektur als souveräne Ergänzung vorstellen.",
                "Einwandbehandlung: „Ist das legal?“ → Ja, die Struktur kann rechtskonform, prüfbar und mit sauberer Buchhaltung umgesetzt werden.",
                "Ergebnis: Einladung zu 15-Minuten-Call.",
                "",
                "Skript:",
                "„Herr / Frau [Name], Sie kennen die aktuellen Themen: digitale Zentralwährungen, Konto-Überwachung, Compliance-Sperren.",
                "Was passiert, wenn der Zugang plötzlich blockiert wird?",
                "Mit einer dezentralen Wertestruktur lagern Sie einen Teil der Vermögenswerte in eine eigene, technisch abgesicherte Umgebung aus – kein einzelner Server, keine Behörde und kein Algorithmus entscheidet allein.",
                "Buchhaltung und Nachweis bleiben erhalten, aber Sie behalten mehr Hoheit über die Zugänge.",
                "Ich lade Sie zu einem kurzen Termin ein – wir sehen uns an, wie so etwas in Ihrem Kontext aussehen könnte.“"
              ]
            },
            {
              title: "Leitfaden 3 – Unabhängigkeit als Zukunftsstrategie",
              body: [
                "🔹 Interne Anleitung:",
                "Ziel: Strategisches Denken anstoßen → 30-Minuten-Gespräch.",
                "Gesprächsführung: Fragen nach Sicherheitsgefühl, dann Alternativen durch dezentrale Architektur aufzeigen.",
                "Einwandbehandlung: „Zu kompliziert.“ → Einstieg auch als Pilot möglich, ohne die bestehende IT sofort anzufassen.",
                "Ergebnis: Folgetermin mit Beispiel-Demo oder Praxisfall.",
                "",
                "Skript:",
                "„Darf ich Sie direkt fragen, [Name]? Wie sicher fühlen Sie sich, wenn Ihr Geschäftsvermögen fast komplett auf zentralen Systemen liegt?",
                "Eine ergänzende, dezentrale Infrastruktur macht Sie weniger störanfällig: eigene Freigaben, klare Verantwortlichkeiten, weniger Fremdzugriff.",
                "Sie entscheiden, wer wann was sehen oder ausführen darf.",
                "Lassen Sie uns das konkret prüfen – ich zeige Ihnen die Vorgehensweise und Beispiele aus der Praxis, die Sie mit Ihren eigenen Dienstleistern adaptieren können.“"
              ]
            },
            {
              title: "Leitfaden 4 – Vertrauen schützen statt riskieren",
              body: [
                "🔹 Interne Anleitung:",
                "Ziel: Thema „Vertrauen“ mit Sicherheitsaspekt verbinden → Demo.",
                "Gesprächsführung: Auf Abhängigkeit von Plattformen hinweisen, dann zeigen, wie eine dezentrale Struktur Vertrauen technisch untermauert.",
                "Einwandbehandlung: „Wir haben Verträge.“ → Papier reicht nicht mehr – digitale, nachweisbare Transaktionen schützen besser.",
                "Ergebnis: 15-Minuten-Live-Überblick.",
                "",
                "Skript:",
                "„Viele Unternehmen vertrauen auf Plattformen – bis eine Regeländerung alles stoppt.",
                "Vertrauen ohne technische Kontrolle ist kein Schutz mehr.",
                "Mit einer dezentralen Finanzarchitektur machen Sie Vereinbarungen nachvollziehbar: Jede Freigabe ist protokolliert, jede Transaktion zuordenbar, ohne dass ein Dritter dazwischen sitzt.",
                "So bleiben Partnerschaften belastbar, auch wenn sich Rahmenbedingungen ändern.",
                "Lassen Sie uns einen Zeitpunkt finden, an dem ich Ihnen die Struktur live zeige – 15 Minuten genügen.“"
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "🔗 4. Share-Snippets",
          items: [
            {
              title: "Snippet 1",
              body: [
                "„Zentrale Systeme schaffen Abhängigkeit – dezentrale Strukturen schaffen Handlungsspielraum. Wer heute ergänzt, bleibt morgen souveräner. 👉 Kurzgespräch anfordern.“"
              ]
            },
            {
              title: "Snippet 2",
              body: [
                "„Wenn Vertrauen zur Schwachstelle wird, braucht es Technik, die schützt. Dezentrale Finanz-Setups machen Unternehmen weniger angreifbar. 👉 Termin vereinbaren und Prinzip kennenlernen.“"
              ]
            },
            {
              title: "Snippet 3",
              body: [
                "„Wer heute vorsorgt, bleibt morgen souverän – dezentrale Prozesse, gesicherte Werte, klar geregelte Zugriffe. 👉 Mehr erfahren im Kurzgespräch.“"
              ]
            }
          ]
        }
      ]
    },

    // 2. Englische Fassung – sinngemäß, produktneutral
    en: {
      title: "📊 Target Group 1 – Companies & Executives",
      subtitle: "Topic: Decentralized financial structures – control, efficiency, trust",
      blocks: [
        {
          type: "section",
          heading: "🧩 1. WhatsApp / Facebook / Telegram – message templates",
          items: [
            {
              title: "Template 1 – “The future of collaboration”",
              body: [
                "Many companies feel how dependent their operations have become on banks, platforms and centralized servers.",
                "A single technical or regulatory intervention can bring processes to a halt.",
                "That’s why more and more firms add a decentralized financial setup on top of their classic banking stack: own wallets, clear approval flows, transparent partner processes.",
                "Decentralized does not mean chaos – it means stability, auditability and real data sovereignty.",
                "➡️ I use such a setup myself and can walk you through the basic architecture – independent of which providers you choose later.",
                "👉 Let’s schedule 15 minutes so I can show you the concept."
              ]
            },
            {
              title: "Template 2 – “Trust as the new currency”",
              body: [
                "In business, trust often decides faster than any spreadsheet.",
                "But in times of cyber attacks, frozen accounts and system outages, trust needs a technical foundation.",
                "A decentralized account and wallet structure keeps processes transparent: every transaction, every agreement and every partner flow stays verifiable and protected.",
                "➡️ If you are thinking about making your company more resilient and independent, this type of setup is worth a look.",
                "👉 Book a short call and I’ll show you how I implemented it in my own work – without pushing any specific product."
              ]
            },
            {
              title: "Template 3 – “Bringing control back in-house”",
              body: [
                "Many companies don’t realize how much control they already handed over – to banks, payment providers and platforms.",
                "With a decentralized architecture you pull part of that control back: company wallets, defined approvals, fewer silent blocks and fewer external servers.",
                "➡️ I’m happy to show you how businesses stay compliant and manoeuvrable with this approach – 10 minutes are enough for a first overview.",
                "👉 Let’s schedule a brief walk-through – no obligation, but concrete."
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "💌 2. E-mail templates",
          items: [
            {
              title: "Email 1 – “Rethinking security and trust”",
              body: [
                "Subject: How decentralization reduces business risks",
                "",
                "Dear Ms / Mr [Last name],",
                "Digitalization increases efficiency – but also dependency.",
                "Bank policies, data protection rules and centralized APIs make companies vulnerable.",
                "In my projects I therefore use an additional, decentralized financial structure: own wallets, clear approvals, full transparency – with fewer intermediaries.",
                "I’d be happy to show you why more and more companies are exploring this path and how it works in practice.",
                "👉 Let’s set up a 15-minute call to look at the options for your company – based on a neutral example setup.",
                "Best regards,",
                "[Your name]"
              ]
            },
            {
              title: "Email 2 – “From trust to independence”",
              body: [
                "Subject: Control is not mistrust – it is protection",
                "",
                "Dear Ms / Mr [Last name],",
                "New EU requirements and compliance rules are shrinking the room for manoeuvre.",
                "A decentralized structure for payments and assets can give you part of that sovereignty back – every payment, every data flow and every approval stays closer to your own house.",
                "No single bank or platform decides alone about your ability to act.",
                "If you like, I can explain in 15 minutes how such a setup works in principle – independent of specific vendors.",
                "👉 Just reply with a time that suits you and I’ll adapt.",
                "Best regards,",
                "[Your name]"
              ]
            },
            {
              title: "Email 3 – “Digital partnership instead of platform dependency”",
              body: [
                "Subject: How to protect your company against external access",
                "",
                "Dear Ms / Mr [Last name],",
                "Most business processes run on external systems – until an interface fails or rules change.",
                "With a decentralized account and wallet structure you build independent rails: own accounts, own approvals, full traceability – with less dependency on single centralized providers.",
                "This helps you stay operational and compliant – even in times of crisis.",
                "I’d be glad to share practical examples and my own setup as a reference.",
                "👉 Book a short call and we’ll go through the options together.",
                "Best regards,",
                "[Your name]"
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "📞 3. Phone scripts (incl. internal guidance)",
          items: [
            {
              title: "Script 1 – Regaining control",
              body: [
                "🔹 Internal guidance:",
                "Goal: create curiosity → 15-minute call.",
                "Direction: make external pressure (EU, banks, platforms) visible, then position a decentralized financial structure as a way to regain control.",
                "Objections: “We have IT/compliance.” → decentralized setups complement, they don’t replace existing infrastructure.",
                "Result: call scheduled or link to a sample walkthrough.",
                "",
                "Script:",
                "“Good morning [Name], many executives feel their room for manoeuvre getting smaller – EU regulation, bank policies, digital dependencies.",
                "That is why I work with an additional decentralized structure for payments and assets.",
                "This keeps data and payment flows transparent without a single party being able to shut everything down.",
                "Let’s go through this together – I can show you in 15 minutes what such a setup can look like and which questions you should clarify internally.”"
              ]
            },
            {
              title: "Script 2 – Protection against interventions",
              body: [
                "🔹 Internal guidance:",
                "Goal: raise awareness of dependencies → schedule advisory call.",
                "Flow: start with current risks (digital central bank money, account monitoring, compliance-based blocks), then present a decentralized architecture as a sovereign complement.",
                "Objection: “Is this legal?” → yes, it can be implemented in a compliant, auditable way together with proper accounting.",
                "Result: 15-minute info call.",
                "",
                "Script:",
                "“Mr / Ms [Name], you’ve seen the recent developments: digital currencies, account monitoring, compliance-based account freezes.",
                "What happens if access is suddenly blocked?",
                "With a decentralized asset structure you move part of your assets into your own technically secured environment – no single server, authority or algorithm decides alone.",
                "Accounting and audit trail remain intact, but you keep more sovereignty over access.",
                "I’d like to invite you to a short call – we can look at how such an approach could work in your context.”"
              ]
            },
            {
              title: "Script 3 – Independence as a strategy",
              body: [
                "🔹 Internal guidance:",
                "Goal: make it a strategic topic → 30-minute conversation.",
                "Flow: ask about their current feeling of security, then show decentralized architecture as an option.",
                "Objection: “Sounds complex.” → you can start with a pilot without touching the existing IT stack right away.",
                "Result: follow-up with demo or case study.",
                "",
                "Script:",
                "“May I ask you directly, [Name]? How secure do you feel when your business assets sit almost entirely on centralized systems?",
                "An additional decentralized infrastructure makes you less fragile: own approvals, clear responsibilities, less external access.",
                "You define who can see or execute what.",
                "Let’s review this in concrete terms – I’ll show you the steps and real-world examples that you can adapt with your own providers.”"
              ]
            },
            {
              title: "Script 4 – Protecting trust instead of risking it",
              body: [
                "🔹 Internal guidance:",
                "Goal: link ‘trust’ with ‘technical proof’ → demo.",
                "Flow: point to platform dependency, then show how a decentralized structure technically underpins trust.",
                "Objection: “We have contracts.” → paper is no longer enough; verifiable digital transactions offer better protection.",
                "Result: 15-minute live overview.",
                "",
                "Script:",
                "“Many companies rely on platforms – until a rule change stops everything.",
                "Trust without technical control is no longer real protection.",
                "With a decentralized financial architecture you make agreements verifiable: every approval is logged, every transaction attributable, without a third party in the middle.",
                "This keeps partnerships robust, even when conditions change.",
                "Let’s find a time when I can show you the structure live – 15 minutes is enough.”"
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "🔗 4. Share snippets",
          items: [
            {
              title: "Snippet 1",
              body: [
                "“Centralized systems create dependency – decentralized structures create room to manoeuvre. Those who add them today stay more sovereign tomorrow. 👉 Request a short call.”"
              ]
            },
            {
              title: "Snippet 2",
              body: [
                "“When trust becomes the weak spot, you need tech that protects. Decentralized financial setups make companies harder to attack. 👉 Book a call and learn the principle.”"
              ]
            },
            {
              title: "Snippet 3",
              body: [
                "“Preparing today keeps you sovereign tomorrow – decentralized processes, secured assets, clearly defined access. 👉 Learn more in a brief session.”"
              ]
            }
          ]
        }
      ]
    }
  };

  // 3. Renderer
  function renderSocial01(lang) {
    const data = SOCIAL_CONTENT[lang] || SOCIAL_CONTENT["de"];
    const host =
      document.getElementById("socialContent") ||
      document.querySelector("[data-social-content='01']") ||
      createHost();

    host.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "social-wrap";

    const h1 = document.createElement("h1");
    h1.textContent = data.title;
    wrap.appendChild(h1);

    const p = document.createElement("p");
    p.className = "social-subtitle";
    p.textContent = data.subtitle;
    wrap.appendChild(p);

    data.blocks.forEach(block => {
      const section = document.createElement("section");
      section.className = "social-section";

      const h2 = document.createElement("h2");
      h2.textContent = block.heading;
      section.appendChild(h2);

      (block.items || []).forEach(item => {
        const card = document.createElement("article");
        card.className = "social-card";

        const h3 = document.createElement("h3");
        h3.textContent = item.title;
        card.appendChild(h3);

        (item.body || []).forEach(line => {
          const pLine = document.createElement("p");
          pLine.textContent = line;
          card.appendChild(pLine);
        });

        section.appendChild(card);
      });

      wrap.appendChild(section);
    });

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "social-close-btn";
    closeBtn.textContent = lang === "de" ? "Schließen" : "Close";
    closeBtn.addEventListener("click", () => {
      host.innerHTML = "";
      host.style.display = "none";
      document.dispatchEvent(new CustomEvent("social:closed", { detail: "01" }));
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

  // 4. Styles direkt mitliefern (clean, mobil, wie gefordert)
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
      font-size: 0.85rem;
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
      .social-card {
        border-radius: 10px;
      }
      .social-card p {
        font-size: 0.8rem;
      }
    }
  `;
  document.head.appendChild(style);

  // 5. Helper-Funktion global
  window.renderSocial01 = function (lang) {
    renderSocial01(lang || (localStorage.getItem("fsa_lang") || "de"));
  };

  // 6. Auf Sprachwechsel reagieren
  document.addEventListener("fsa:lang-change", (ev) => {
    const lang = ev.detail || "de";
    const host = document.getElementById("socialContent");
    if (host && host.innerHTML.trim() !== "") {
      renderSocial01(lang);
    }
  });

  // 7. Optional: wenn die Seite gleich beim Klick ruft
  document.addEventListener("social:open-01", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    renderSocial01(lang);
  });

  // Bereit für social.html (neue Logik)
  window.FSA_SOCIAL_01 = SOCIAL_CONTENT;
})();
