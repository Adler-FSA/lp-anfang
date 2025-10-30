// library/js/text-social-01.js
// Zielgruppe 1 – Firmen & Geschäftsführer
// Verdratung für: lang-switcher.js (event: fsa:lang-change)
// Anzeige: einfacher einspaltiger Renderer, mobil lesbar
// Keine Kürzungen. DE = 1:1 aus Vorgabe. EN = sinngemäße, professionelle Fassung.

(function () {
  // 1. Alle Inhalte in beiden Sprachen
  const SOCIAL_CONTENT = {
    de: {
      title: "📊 Zielgruppe 1 – Firmen & Geschäftsführer",
      subtitle: "Thema: Dezentrale Zukunft mit Trustyfy – Kontrolle, Effizienz, Vertrauen",
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
                "Trustyfy zeigt, dass Kontrolle auch ohne Zwischeninstanzen möglich ist: direkte Freigaben, transparente Strukturen, sichere Partnernetzwerke.",
                "Dezentral bedeutet nicht Chaos – es bedeutet Stabilität, Nachvollziehbarkeit und echte Datensouveränität.",
                "➡️ Ich nutze es selbst, um Unternehmensprozesse resilienter zu machen. Wenn Sie möchten, zeige ich Ihnen, wie das funktioniert.",
                "👉 Lassen Sie uns kurz abstimmen, wann ich Ihnen die Lösung in 15 Minuten zeigen darf."
              ]
            },
            {
              title: "Vorlage 2 – „Vertrauen als neue Währung“",
              body: [
                "Im Geschäftsleben entscheidet Vertrauen schneller als jede Kalkulation.",
                "Doch in einer Zeit, in der Cyberangriffe, Kontosperren und Systemausfälle zunehmen, braucht Vertrauen eine technische Grundlage.",
                "Trustyfy bildet Vertrauen digital ab – jede Transaktion, jede Vereinbarung, jeder Partnerprozess ist transparent und geschützt.",
                "➡️ Wenn Sie überlegen, wie Sie Ihr Unternehmen krisenfest und unabhängig aufstellen, lohnt sich ein Blick auf diese Lösung.",
                "👉 Vereinbaren Sie einen Gesprächstermin, um zu sehen, wie Trustyfy Vertrauen mess- und überprüfbar macht."
              ]
            },
            {
              title: "Vorlage 3 – „Kontrolle zurück ins eigene Haus holen“",
              body: [
                "Viele Firmen wissen nicht, wie viel Kontrolle sie längst abgegeben haben – an Banken, Payment-Provider und Plattformen.",
                "Trustyfy bringt sie zurück: dezentrale Zahlungsfreigaben, eigene Unternehmens-Wallets, keine stillen Sperren, keine fremden Server.",
                "➡️ Ich zeige Ihnen gern, wie Unternehmen damit rechtssicher und unangreifbar werden – zehn Minuten reichen für den Überblick.",
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
                "Trustyfy schließt diese Lücke: sichere Prozesse, direkte Abrechnung, volle Transparenz – ohne Dritte.",
                "Ich zeige Ihnen gern, warum immer mehr Unternehmen diesen Weg gehen – und wie das in der Praxis aussieht.",
                "👉 Lassen Sie uns einen 15-Minuten-Termin vereinbaren, um die Möglichkeiten für Ihr Unternehmen durchzugehen.",
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
                "Trustyfy gibt Ihnen diese Hoheit zurück – jede Zahlung, jeder Datenfluss, jede Freigabe liegt unter Ihrer Kontrolle.",
                "Keine Bank kann blockieren, keine Plattform dazwischen greifen.",
                "Wenn Sie möchten, erläutere ich Ihnen in 15 Minuten, wie Sie das konkret umsetzen können.",
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
                "Trustyfy ermöglicht unabhängige Strukturen: eigene Konten, eigene Freigaben, volle Nachvollziehbarkeit – ohne Abhängigkeit von zentralen Anbietern.",
                "So bleiben Sie handlungsfähig und rechtssicher – auch in Krisenzeiten.",
                "Gern zeige ich Ihnen Beispiele aus der Praxis.",
                "👉 Buchen Sie hier einen Kurztermin für den Einblick in unsere Lösung.",
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
                "Gesprächsrichtung: Druck von außen (EU, Banken, Plattformen) sichtbar machen, dann Trustyfy als Lösung zur Rückgewinnung von Kontrolle positionieren.",
                "Einwandbehandlung: „Wir haben IT/Compliance“ → Trustyfy ergänzt, nicht ersetzt.",
                "Ergebnis: Terminvereinbarung oder Demo-Link.",
                "",
                "Skript:",
                "„Guten Tag [Name], viele Unternehmer spüren, wie die Spielräume enger werden – EU-Regulierungen, Bankrichtlinien, digitale Abhängigkeiten.",
                "Trustyfy bietet die Möglichkeit, Kontrolle über eigene Daten- und Zahlungsstrukturen zurückzugewinnen.",
                "Keine dritte Instanz kann sperren oder zugreifen. Alles läuft dezentral und revisionssicher.",
                "Lassen Sie uns das gemeinsam durchgehen – ich zeige Ihnen in 15 Minuten, wie Sie Ihre Systeme absichern können.“"
              ]
            },
            {
              title: "Leitfaden 2 – Schutz vor Eingriffen",
              body: [
                "🔹 Interne Anleitung:",
                "Ziel: Bewusstsein für Abhängigkeiten wecken → Termin für Beratung.",
                "Gesprächsführung: Mit aktuellen Risiken beginnen (digitale Zentralwährung, Kontoüberwachung, Compliance-Sperren), dann Lösung Trustyfy als souveräne Alternative vorstellen.",
                "Einwandbehandlung: „Ist das legal?“ → Ja, rechtskonform und auditierbar.",
                "Ergebnis: Einladung zu 15-Minuten-Call.",
                "",
                "Skript:",
                "„Herr / Frau [Name], Sie kennen die aktuellen Themen: digitale Zentralwährungen, Konto-Überwachung, Compliance-Sperren.",
                "Was passiert, wenn der Zugang plötzlich blockiert wird?",
                "Mit Trustyfy lagern Sie Vermögenswerte in eine eigene dezentrale Struktur – kein Server, keine Behörde, kein Algorithmus kann eingreifen.",
                "Buchhaltung und Nachweis bleiben erhalten, aber Sie behalten die volle Hoheit.",
                "Ich lade Sie zu einem kurzen Termin ein – wir sehen uns an, wie Sie Ihr Unternehmen vor Fremdzugriff schützen können.“"
              ]
            },
            {
              title: "Leitfaden 3 – Unabhängigkeit als Zukunftsstrategie",
              body: [
                "🔹 Interne Anleitung:",
                "Ziel: Strategisches Denken anstoßen → 30-Minuten-Gespräch.",
                "Gesprächsführung: Fragen nach Sicherheitsgefühl, dann Aufzeigen von Alternativen durch dezentrale Architektur.",
                "Einwandbehandlung: „Zu kompliziert.“ → Pilot möglich, kein Eingriff in bestehende IT.",
                "Ergebnis: Folgetermin mit Demo oder Praxisbeispiel.",
                "",
                "Skript:",
                "„Darf ich Sie direkt fragen, [Name]? Wie sicher fühlen Sie sich, wenn Ihr Geschäftsvermögen auf zentralen Systemen liegt?",
                "Trustyfy macht aus Abhängigkeit eine Stärke: Dezentrale Infrastruktur, eigene Freigaben, kein Zugriff von außen.",
                "Sie entscheiden, wer wann was sehen oder ausführen darf.",
                "Lassen Sie uns das konkret prüfen – ich zeige Ihnen die Vorgehensweise und Beispiele aus der Praxis.“"
              ]
            },
            {
              title: "Leitfaden 4 – Vertrauen schützen statt riskieren",
              body: [
                "🔹 Interne Anleitung:",
                "Ziel: Thema „Vertrauen“ mit Sicherheitsaspekt verbinden → Demo.",
                "Gesprächsführung: Auf Abhängigkeit von Plattformen hinweisen, dann zeigen, wie Trustyfy Vertrauen technisch nachweisbar macht.",
                "Einwandbehandlung: „Wir haben Verträge.“ → Papier reicht nicht mehr – digitale Nachweise schützen besser.",
                "Ergebnis: 15-Minuten-Live-Demo.",
                "",
                "Skript:",
                "„Viele Unternehmen vertrauen auf Plattformen – bis eine Regeländerung alles stoppt.",
                "Vertrauen ohne Kontrolle ist kein Schutz mehr.",
                "Trustyfy macht Vertrauen messbar: Jede Transaktion ist authentifiziert, jede Freigabe protokolliert, keine fremde Instanz dazwischen.",
                "So bleiben Partnerschaften sicher, ohne Abhängigkeit.",
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
                "„Zentrale Systeme schaffen Abhängigkeit – Dezentralität schafft Freiheit. Mit Trustyfy bleibt Kontrolle im eigenen Haus. 👉 Jetzt Gespräch anfordern.“"
              ]
            },
            {
              title: "Snippet 2",
              body: [
                "„Wenn Vertrauen zur Schwachstelle wird, braucht es Technik, die schützt. Trustyfy macht Unternehmen unangreifbar. 👉 Termin vereinbaren und Verfahren kennenlernen.“"
              ]
            },
            {
              title: "Snippet 3",
              body: [
                "„Wer heute vorsorgt, bleibt morgen souverän – dezentrale Prozesse, sichere Werte, volle Kontrolle. 👉 Mehr erfahren im Kurzgespräch.“"
              ]
            }
          ]
        }
      ]
    },

    // 2. Englische Fassung – sinngemäß, nicht 1:1 wörtlich
    en: {
      title: "📊 Target Group 1 – Companies & Executives",
      subtitle: "Topic: A decentralized future with Trustyfy – control, efficiency, trust",
      blocks: [
        {
          type: "section",
          heading: "🧩 1. WhatsApp / Facebook / Telegram – message templates",
          items: [
            {
              title: "Template 1 – “The future of collaboration”",
              body: [
                "Many companies feel how dependent their operations have become on banks, platforms and centralized servers.",
                "One single technical or regulatory interruption – and operations stop.",
                "Trustyfy proves that control is possible without intermediaries: direct approvals, transparent structures, secure partner networks.",
                "Decentralized does not mean chaos – it means stability, auditability and real data sovereignty.",
                "➡️ I’m using it myself to make business processes more resilient. If you want, I can walk you through it.",
                "👉 Let’s schedule 15 minutes so I can show you the setup."
              ]
            },
            {
              title: "Template 2 – “Trust as the new currency”",
              body: [
                "In business, trust often decides faster than any calculation.",
                "But in times of cyber attacks, frozen accounts and system outages, trust needs a technical foundation.",
                "Trustyfy maps trust digitally – every transaction, every agreement, every partner process is transparent and protected.",
                "➡️ If you want to make your company more crisis-proof and independent, this is worth a look.",
                "👉 Book a short call to see how Trustyfy makes trust measurable."
              ]
            },
            {
              title: "Template 3 – “Bringing control back in-house”",
              body: [
                "Many companies don’t even realize how much control they already handed over – to banks, payment providers and platforms.",
                "Trustyfy brings it back: decentralized payment approvals, company wallets, no silent blocks, no external servers.",
                "➡️ I can show you how companies become compliant and hard to attack – 10 minutes are enough for the overview.",
                "👉 Let’s do a short walk-through – no obligation, real substance."
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
                "Trustyfy closes that gap: secure processes, direct settlement, full transparency – without third parties.",
                "I’d be happy to show you why more and more companies are moving in this direction – and how it looks in practice.",
                "👉 Let’s set up a 15-minute call to go through the options for your company.",
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
                "new EU requirements and compliance rules are limiting the room for maneuver.",
                "Trustyfy gives you that sovereignty back – every payment, every data flow, every approval stays in your control.",
                "No bank can block, no platform can interfere.",
                "If you like, I can explain in 15 minutes how to set this up.",
                "👉 Just reply with a time that suits you.",
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
                "Most business processes run on other people’s systems – until an interface fails or rules change.",
                "Trustyfy enables independent structures: own accounts, own approvals, full traceability – without dependency on centralized providers.",
                "That way you stay operational and compliant – even in crises.",
                "Happy to show you real cases.",
                "👉 Book a short call and I’ll show you the setup.",
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
                "Direction: make external pressure (EU, banks, platforms) visible, then position Trustyfy as control restoration.",
                "Objections: “We have compliance/IT.” → Trustyfy complements, it does not replace.",
                "Result: call scheduled or demo link.",
                "",
                "Script:",
                "“Good morning [Name], many executives feel their room for maneuver is getting smaller – EU regulation, bank policies, digital dependencies.",
                "Trustyfy gives you back control over your own data and payment structures.",
                "No third party can block or access. Everything runs decentralized and auditable.",
                "Let’s go through it together – I can show you in 15 minutes how to secure your systems.”"
              ]
            },
            {
              title: "Script 2 – Protection against interventions",
              body: [
                "🔹 Internal guidance:",
                "Goal: raise awareness of dependencies → schedule advisory call.",
                "Flow: start with current risks (digital currencies, account monitoring, compliance blocks), then present Trustyfy as sovereign alternative.",
                "Objection: “Is this legal?” → yes, compliant and auditable.",
                "Result: 15-minute info call.",
                "",
                "Script:",
                "“Mr / Ms [Name], you’ve seen the current developments: digital currencies, account monitoring, compliance-based blocks.",
                "What happens if access is suddenly blocked?",
                "With Trustyfy you store assets in your own decentralized structure – no server, no authority, no algorithm can interfere.",
                "Accounting and audit trail remain, but you keep full sovereignty.",
                "I’d like to invite you to a short call – we can look at how to protect your company from external access.”"
              ]
            },
            {
              title: "Script 3 – Independence as a strategy",
              body: [
                "🔹 Internal guidance:",
                "Goal: make it a strategic topic → 30-minute talk.",
                "Flow: ask about current feeling of security, then show decentralized architecture as option.",
                "Objection: “Sounds complex.” → can start with pilot, no need to touch existing IT.",
                "Result: follow-up with demo.",
                "",
                "Script:",
                "“May I ask you directly, [Name]? How secure do you feel when your business assets sit on centralized systems?",
                "Trustyfy turns that dependency into a strength: decentralized infrastructure, own approvals, no external access.",
                "You define who can see or execute what.",
                "Let’s review this in concrete terms – I’ll show you the steps and real examples.”"
              ]
            },
            {
              title: "Script 4 – Protecting trust instead of risking it",
              body: [
                "🔹 Internal guidance:",
                "Goal: link ‘trust’ with ‘technical proof’ → demo.",
                "Flow: point to platform dependency, then show how Trustyfy makes trust verifiable.",
                "Objection: “We have contracts.” → paper is no longer enough, verifiable digital transactions are better.",
                "Result: 15-minute live demo.",
                "",
                "Script:",
                "“Many companies rely on platforms – until a rule change stops everything.",
                "Trust without control is no longer protection.",
                "Trustyfy makes trust measurable: every transaction authenticated, every approval logged, no foreign instance in between.",
                "This keeps partnerships secure, without dependency.",
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
                "“Centralized systems create dependency – decentralization creates freedom. With Trustyfy, control stays in your company. 👉 Request a call.”"
              ]
            },
            {
              title: "Snippet 2",
              body: [
                "“When trust becomes the weak spot, you need tech that protects. Trustyfy makes companies hard to attack. 👉 Book a call and see the flow.”"
              ]
            },
            {
              title: "Snippet 3",
              body: [
                "“Those who prepare today stay sovereign tomorrow – decentralized processes, secured assets, full control. 👉 Learn more in a short session.”"
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

  // 5. Initial render (nimmt gespeicherte Sprache aus lang-switcher)
  const savedLang = localStorage.getItem("fsa_lang") || "de";
  // Standard: nicht sofort zeigen – erst wenn Seite es will -> Event
  // Aber wir machen eine Helper-Funktion global:
  window.renderSocial01 = function (lang) {
    renderSocial01(lang || (localStorage.getItem("fsa_lang") || "de"));
  };

  // 6. Auf Sprachwechsel reagieren
  document.addEventListener("fsa:lang-change", (ev) => {
    const lang = ev.detail || "de";
    // nur aktualisieren, wenn gerade offen
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

})();
