// /lp-anfang/library/js/text-campus/campus-community-01.js
// ======================================================================
// FSA / Community – Set 01: Firmen & Geschäftsführer (Unternehmer-Treff)
// Vollversion DE + EN
// gleicher Renderer wie bei den Social-Dateien
// verdrahtet auf: community.html + lang-switcher.js
// Events: community:open-01  -> öffnen
//         fsa:lang-change    -> neu rendern, wenn offen
//         community:closed   -> beim Schließen feuern
// ======================================================================

(function () {
  // --------------------------------------------------------------------
  // 1) DATEN – DE immer 1:1 aus deiner Vorlage
  // --------------------------------------------------------------------
  const COMMUNITY_CONTENT = {
    // ░░ DEUTSCH ░░
    de: {
      title: "📊 Zielgruppe 1 – Firmen & Geschäftsführer (Unternehmer-Treff)",
      subtitle:
        "In einer Welt, die sich digitalisiert und beschleunigt, braucht echte Führung wieder persönliche Begegnung. Der Unternehmer-Treff bringt Gleichgesinnte zusammen – für Austausch, Kooperation und Weitblick. Die FSA-Akademie vermittelt das Verständnis, Trustyfy liefert die Struktur für stabile, dezentrale Werte.",
      blocks: [
        // ─────────────────────────────────────────────
        // 1. Messenger-Vorlagen
        // ─────────────────────────────────────────────
        {
          type: "section",
          heading: "🧩 1. WhatsApp / Facebook / Telegram – Textvorlagen",
          items: [
            {
              title: "Vorlage 1 – „Vernetzen statt isolieren“",
              body: [
                "Viele Unternehmer kämpfen allein mit denselben Fragen – Mitarbeiter, Cashflow, Wandel.",
                "Beim FSA-Unternehmer-Treff triffst du Menschen, die offen über Lösungen sprechen.",
                "Kein Pitch, kein Druck – nur ehrlicher Austausch über finanzielle Souveränität und digitale Sicherheit.",
                "➡️ Willst du teilnehmen? Ich schick dir den Terminplan."
              ]
            },
            {
              title: "Vorlage 2 – „Klarheit durch Dialog“",
              body: [
                "Strategie entsteht selten im stillen Kämmerlein.",
                "Unsere Treffen bringen Perspektiven zusammen – von Geschäftsführung bis Start-up.",
                "FSA zeigt, wie dezentrale Systeme Stabilität schaffen – Trustyfy zeigt, wie man sie praktisch nutzt.",
                "➡️ Wenn du Lust auf Impulse statt Vorträge hast, komm vorbei."
              ]
            },
            {
              title: "Vorlage 3 – „Zukunft selbst bauen“",
              body: [
                "Krisen, KI, neue Märkte – wer heute führt, braucht Verständnis statt Parolen.",
                "Beim Unternehmer-Treff lernst du, wie Wissen und Technik Unabhängigkeit schaffen.",
                "➡️ Schreib mir kurz, ich reserviere dir einen Platz."
              ]
            }
          ]
        },

        // ─────────────────────────────────────────────
        // 2. E-Mail-Vorlagen
        // ─────────────────────────────────────────────
        {
          type: "section",
          heading: "💌 2. E-Mail-Vorlagen (Kontaktaufnahme)",
          items: [
            {
              title: "E-Mail 1 – „Ein Abend, der Perspektiven verändert“",
              body: [
                "Betreff: Einladung zum FSA-Unternehmer-Treff",
                "Sehr geehrter [Name],",
                "unser monatlicher FSA-Unternehmer-Treff bietet die Gelegenheit, aktuelle Themen – Finanzen, Digitalisierung, Verantwortung – in vertrauensvollem Rahmen zu besprechen.",
                "Kein Vortrag, sondern offener Austausch unter Entscheidern.",
                "Ich lade Sie herzlich ein, Teil dieses Netzwerks zu werden.",
                "Mit besten Grüßen – [Ihr Name]"
              ]
            },
            {
              title: "E-Mail 2 – „Strategie im Wandel“",
              body: [
                "Betreff: Vertrauen statt Unsicherheit – FSA & Trustyfy",
                "Hallo [Name],",
                "die Märkte ändern sich, aber Prinzipien bleiben: Verständnis, Transparenz, Sicherheit.",
                "FSA & Trustyfy verbinden diese Dreiheit.",
                "Beim nächsten Unternehmer-Treff zeigen wir konkrete Wege zur digitalen Selbstbestimmung.",
                "Ich freue mich, wenn Sie dabei sind."
              ]
            },
            {
              title: "E-Mail 3 – „Gemeinsam stärker“",
              body: [
                "Betreff: Einladung zum Erfahrungsaustausch unter Unternehmern",
                "Hallo [Name],",
                "die FSA-Community bietet eine neue Form von Netzwerk – keine Visitenkartensammlung, sondern gegenseitiges Wissen teilen.",
                "Ich würde mich freuen, Sie beim nächsten Treff zu begrüßen.",
                "Viele Grüße [Ihr Name]"
              ]
            }
          ]
        },

        // ─────────────────────────────────────────────
        // 3. Telefon-Leitfäden
        // ─────────────────────────────────────────────
        {
          type: "section",
          heading: "📞 3. Telefon-Leitfäden (inkl. 🔹 Interne Anleitung & Mehrwert)",
          items: [
            {
              title: "Leitfaden 1 – Vom Wettbewerb zur Kooperation",
              body: [
                "🔹 Interne Anleitung:",
                "Gespräch auf Augenhöhe; gemeinsame Herausforderungen (Team, Liquidität, Wandel) benennen.",
                "Mehrwert klar machen: Zugang zu Entscheidern, die lösungsorientiert denken.",
                "",
                "Skript:",
                "„Guten Tag [Name], ich weiß, wie eng der Alltag als Unternehmer geworden ist – viele arbeiten härter, aber die Unsicherheit bleibt.",
                "Wir haben in der FSA-Community ein Unternehmer-Treffen ins Leben gerufen, das nicht auf Verkauf, sondern auf Kooperation ausgelegt ist.",
                "Dort sprechen Geschäftsführer ehrlich über Strategien, wie man Kosten senkt, Teams stärkt und Risiken besser steuert.",
                "Es geht nicht um Theorien, sondern um praxisnahe Erfahrungen.",
                "Wenn Sie mögen, lade ich Sie gern zu einem der nächsten Abende ein – eine Stunde echter Austausch mit Leuten, die dieselben Fragen bewegen.“"
              ]
            },
            {
              title: "Leitfaden 2 – Digitale Verantwortung und Sicherheit",
              body: [
                "🔹 Interne Anleitung:",
                "Ziel: zeigen, dass Digitalisierung und Regulierung direkten Einfluss auf das Geschäft haben.",
                "Mehrwert: Kontrolle über eigene Finanz- und Datenströme erhalten.",
                "",
                "Skript:",
                "„Hallo [Name], viele Unternehmen digitalisieren, aber kaum jemand prüft, wie sicher die Systeme wirklich sind.",
                "Die meisten Abläufe laufen über Plattformen, die uns gar nicht gehören – und genau da liegt das Risiko.",
                "Beim FSA-Unternehmer-Treff zeigen wir, wie man finanzielle und digitale Verantwortung zurück ins eigene Haus holt.",
                "Die FSA-Akademie liefert das Verständnis, Trustyfy die praktische Umsetzung.",
                "Wer jetzt handelt, sichert sich Vorteile, bevor neue Regeln kommen.",
                "Wäre das ein Thema für Sie?“"
              ]
            },
            {
              title: "Leitfaden 3 – Vom Unternehmer zum Mentor",
              body: [
                "🔹 Interne Anleitung:",
                "Erfahrene Unternehmer motivieren, Wissen weiterzugeben.",
                "Mehrwert: Reputation, Recruiting-Effekte und neue Kooperationen durch Sichtbarkeit.",
                "",
                "Skript:",
                "„Hallo [Name], Sie führen Ihr Unternehmen erfolgreich – genau diese Erfahrung brauchen andere in unserer Community.",
                "Beim Unternehmer-Treff teilen erfahrene Geschäftsführer ihre Sicht, damit Neueinsteiger Fehler vermeiden und Chancen früher sehen.",
                "Es geht nicht um Coaching oder Verkauf, sondern um Verantwortung und Voraussicht.",
                "Viele sagen nach dem ersten Abend: ‚Ich habe selbst mehr gelernt, als ich weitergegeben habe.‘",
                "Wäre das etwas, worauf Sie Lust hätten?“"
              ]
            },
            {
              title: "Leitfaden 4 – Nachhaltige Partnerschaft und Wachstum",
              body: [
                "🔹 Interne Anleitung:",
                "Regelmäßigkeit und Verbindlichkeit betonen.",
                "Mehrwert: planbares Netzwerk, Markteinblicke, Kooperationschancen.",
                "",
                "Skript:",
                "„Guten Tag [Name], der FSA-Unternehmer-Treff ist kein Einmal-Event – wir treffen uns alle 14 Tage, jeweils mit einem aktuellen Schwerpunkt.",
                "Das Schöne ist: Aus den Gesprächen entstehen echte Partnerschaften – vom Austausch über Mitarbeiterführung bis zu neuen Projekten.",
                "Vertrauen wächst nur durch Regelmäßigkeit.",
                "Ich lade Sie ein, beim nächsten Treff dabei zu sein – eine Stunde, die sich lohnt.“"
              ]
            }
          ]
        },

        // ─────────────────────────────────────────────
        // 4. Share-Snippets
        // ─────────────────────────────────────────────
        {
          type: "section",
          heading: "🔗 4. Share-Snippets",
          items: [
            {
              title: "Snippet 1",
              body: ["„Echte Führung beginnt mit Verstehen – nicht mit Kontrolle.“"]
            },
            {
              title: "Snippet 2",
              body: ["„Unternehmer treffen sich – nicht um zu verkaufen, sondern um zu verstehen.“"]
            },
            {
              title: "Snippet 3",
              body: ["„Freiheit im Business bedeutet: Wissen teilen, nicht verstecken.“"]
            },
            {
              title: "Snippet 4",
              body: ["„FSA & Trustyfy – die Brücke zwischen Idee und Sicherheit.“"]
            }
          ]
        }
      ]
    },

    // ░░ ENGLISH ░░
    en: {
      title: "📊 Target Group 1 – Companies & Executives (Entrepreneurs’ Meetup)",
      subtitle:
        "In a world that accelerates and digitizes, real leadership needs personal connection again. The Entrepreneurs’ Meetup brings together like-minded people – for exchange, cooperation and foresight. FSA provides the understanding, Trustyfy provides the structure for stable, decentralized value.",
      blocks: [
        {
          type: "section",
          heading: "🧩 1. WhatsApp / Facebook / Telegram – message templates",
          items: [
            {
              title: "Template 1 – “Connect instead of isolate”",
              body: [
                "Many entrepreneurs face the same questions – team, cashflow, constant change.",
                "At the FSA Entrepreneurs’ Meetup you meet people who talk openly about real solutions.",
                "No pitch, no pressure – just honest exchange about financial sovereignty and digital safety.",
                "➡️ Want to join? I’ll send you the schedule."
              ]
            },
            {
              title: "Template 2 – “Clarity through dialogue”",
              body: [
                "Strategy rarely grows in isolation.",
                "Our meetings bring together perspectives – from established CEOs to young founders.",
                "FSA shows how decentralized systems create stability – Trustyfy shows how to implement them.",
                "➡️ If you prefer impulses over lectures, this format is for you."
              ]
            },
            {
              title: "Template 3 – “Build the future yourself”",
              body: [
                "Crises, AI, new markets – leaders need understanding, not slogans.",
                "At the meetup you’ll see how knowledge + tech = independence.",
                "➡️ Text me and I’ll reserve your seat."
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "💌 2. Email templates",
          items: [
            {
              title: "Email 1 – “An evening that changes perspectives”",
              body: [
                "Subject: Invitation to the FSA Entrepreneurs’ Meetup",
                "Dear [Name],",
                "our monthly FSA meetup offers a trusted space to talk about finance, digitization and responsibility.",
                "No lecture – but open dialogue between decision-makers.",
                "You are warmly invited to join this circle.",
                "Best regards – [Your Name]"
              ]
            },
            {
              title: "Email 2 – “Strategy in motion”",
              body: [
                "Subject: Trust instead of uncertainty – FSA & Trustyfy",
                "Hi [Name],",
                "markets change – principles don’t: understanding, transparency, security.",
                "FSA & Trustyfy combine these three.",
                "At the next meetup we’ll show concrete ways to reach digital self-sovereignty.",
                "Would be great to have you join."
              ]
            },
            {
              title: "Email 3 – “Stronger together”",
              body: [
                "Subject: Invitation to an entrepreneurs’ exchange",
                "Hi [Name],",
                "the FSA Community is not a business-card event – it’s a space to share insight.",
                "I’d be happy to welcome you at the next meetup.",
                "Kind regards, [Your Name]"
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "📞 3. Phone scripts (with 🔹 internal guidance)",
          items: [
            {
              title: "Script 1 – From competition to cooperation",
              body: [
                "🔹 Internal guidance:",
                "Peer-level talk, name shared challenges (team, liquidity, change).",
                "Value: access to solution-oriented decision-makers.",
                "",
                "Script:",
                "“Hello [Name], I know how tight the day-to-day for entrepreneurs has become – lots of work, but uncertainty stays.",
                "We started an FSA Entrepreneurs’ Meetup that’s not about selling – it’s about cooperating.",
                "Leaders speak openly about what works: cutting costs, strengthening teams, managing risk.",
                "It’s practical, not theoretical.",
                "If you like, I can invite you to one of the next evenings – one hour of real exchange.”"
              ]
            },
            {
              title: "Script 2 – Digital responsibility & security",
              body: [
                "🔹 Internal guidance:",
                "Show that digitization + regulation impact business directly.",
                "Value: keep control over money and data flows.",
                "",
                "Script:",
                "“Hi [Name], many companies digitize – but very few check how secure their setup really is.",
                "Most processes run on platforms we don’t own – that’s where the risk sits.",
                "At the meetup we show how to bring financial and digital responsibility back into your own structure.",
                "FSA explains the ‘why’, Trustyfy shows the ‘how’.",
                "Acting now means being prepared before new rules arrive.",
                "Would that be relevant to you?”"
              ]
            },
            {
              title: "Script 3 – From entrepreneur to mentor",
              body: [
                "🔹 Internal guidance:",
                "Motivate experienced founders to give back.",
                "Value: reputation, visibility, easier recruiting, cooperation.",
                "",
                "Script:",
                "“Hi [Name], you already run your company successfully – that’s exactly the kind of experience people in our community are looking for.",
                "At the meetup, experienced leaders share their view so newcomers can avoid mistakes and spot chances earlier.",
                "It’s not coaching, not selling – it’s responsibility.",
                "Many tell us after the first evening: ‘I learned more than I gave.’",
                "Would you like to be part of that?”"
              ]
            },
            {
              title: "Script 4 – Sustainable partnerships & growth",
              body: [
                "🔹 Internal guidance:",
                "Emphasize cadence and reliability.",
                "Value: predictable network, market insights, cooperation leads.",
                "",
                "Script:",
                "“Good morning [Name], the FSA Entrepreneurs’ Meetup is not a one-off event – we meet every two weeks with a relevant focus.",
                "From these talks, real partnerships emerge – from leadership exchange to joint projects.",
                "Trust grows with regular contact.",
                "Join the next session – it’s one hour well spent.”"
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "🔗 4. Share snippets",
          items: [
            { title: "Snippet 1", body: ["“Real leadership starts with understanding – not with control.”"] },
            { title: "Snippet 2", body: ["“Entrepreneurs meet – not to sell, but to understand.”"] },
            { title: "Snippet 3", body: ["“Freedom in business means sharing knowledge, not hiding it.”"] },
            { title: "Snippet 4", body: ["“FSA & Trustyfy – the bridge between idea and security.”"] }
          ]
        }
      ]
    }
  };

  // --------------------------------------------------------------------
  // 2) RENDERER – 1:1 wie bei Social
  // --------------------------------------------------------------------
  function renderCommunity01(lang) {
    const data = COMMUNITY_CONTENT[lang] || COMMUNITY_CONTENT.de;
    let host =
      document.getElementById("socialContent") ||
      document.querySelector("[data-social-content='01']");
    if (!host) {
      host = createHost();
    }
    host.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "social-wrap";

    // Header
    const h1 = document.createElement("h1");
    h1.textContent = data.title;
    wrap.appendChild(h1);

    const p = document.createElement("p");
    p.className = "social-subtitle";
    p.textContent = data.subtitle;
    wrap.appendChild(p);

    // Sections
    (data.blocks || []).forEach((block, idx) => {
      const section = document.createElement("section");
      section.className = "social-section";

      const h2 = document.createElement("h2");
      h2.textContent =
        block.heading ||
        (lang === "de" ? "Abschnitt " + (idx + 1) : "Section " + (idx + 1));
      section.appendChild(h2);

      (block.items || []).forEach((item) => {
        const card = document.createElement("article");
        card.className = "social-card";

        const h3 = document.createElement("h3");
        h3.textContent = item.title || "";
        card.appendChild(h3);

        (item.body || []).forEach((line) => {
          const pl = document.createElement("p");
          pl.textContent = line;
          card.appendChild(pl);
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
      document.dispatchEvent(
        new CustomEvent("community:closed", { detail: "01" })
      );
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

  // --------------------------------------------------------------------
  // 3) STYLES – exakt wie Social, nur generisch benannt
  // --------------------------------------------------------------------
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
      margin-bottom: 0.4rem;
      color: #fff;
    }
    #socialContent .social-subtitle {
      color: rgba(229,231,235,0.75);
      margin-bottom: 1.3rem;
    }
    .social-section {
      margin-bottom: 1.6rem;
    }
    .social-section h2 {
      font-size: 1.02rem;
      margin-bottom: .65rem;
      color: #f3f4f6;
      border-bottom: 1px solid rgba(212,175,55,.28);
      padding-bottom: .35rem;
    }
    .social-card {
      background: rgba(15,23,42,0.35);
      border: 1px solid rgba(148,163,184,0.18);
      border-radius: 12px;
      padding: .85rem .95rem .7rem;
      margin-bottom: .6rem;
    }
    .social-card h3 {
      margin: 0 0 .35rem;
      font-size: .96rem;
      color: #fff;
    }
    .social-card p {
      margin: 0 0 .4rem;
      font-size: .83rem;
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
      transition: 0.2s ease;
    }
    .social-close-btn:hover {
      background: rgba(212,175,55,0.35);
      box-shadow: 0 0 14px rgba(212,175,55,0.4);
    }
    @media (max-width: 720px) {
      #socialContent {
        padding: 1rem .6rem 1.3rem;
        border-radius: 0;
        width: 100%;
      }
      .social-card {
        border-radius: 10px;
      }
      .social-card p {
        font-size: .8rem;
      }
    }
  `;
  document.head.appendChild(style);

  // --------------------------------------------------------------------
  // 4) EXPORT + EVENTS
  // --------------------------------------------------------------------
  // global machen, damit community.html darauf zugreifen kann
  window.FSA_COMMUNITY_01 = COMMUNITY_CONTENT;

  // Helper nach außen
  window.renderCommunity01 = function (lang) {
    renderCommunity01(lang || localStorage.getItem("fsa_lang") || "de");
  };

  // auf Sprachwechsel reagieren – aber nur wenn gerade offen
  document.addEventListener("fsa:lang-change", (ev) => {
    const host = document.getElementById("socialContent");
    if (host && host.innerHTML.trim() !== "") {
      renderCommunity01(ev.detail || "de");
    }
  });

  // Event von außen: community:open-01
  document.addEventListener("community:open-01", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    renderCommunity01(lang);
  });

  // Auto-Render, wenn die Seite direkt geladen wird und wir KEIN anderes Set sehen
  // (wie social.html – dort ist Set 1 auch direkt offen)
  window.addEventListener("load", () => {
    const host = document.getElementById("socialContent");
    if (host && host.innerHTML.trim() === "") {
      const lang = localStorage.getItem("fsa_lang") || "de";
      renderCommunity01(lang);
    }
  });
})();
