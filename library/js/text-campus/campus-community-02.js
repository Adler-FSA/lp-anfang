// /lp-anfang/library/js/text-campus/campus-community-02.js
// FSA Community – Zielgruppe 2 – Angestellte & Berufstätige (Neue Perspektive Treff)
// Aufbau 1:1 wie campus-community-01.js / social-01.js
// Funktion: wird von pages/community.html über Event "community:open-02" oder direkt über Renderer aufgerufen
// Sprache: DE vollständig (1:1 Vorgabe), EN sinngemäß
// UI: eigener Host #socialContent, gleicher Style wie Social/Community
// Events: fsa:lang-change -> neu rendern, wenn offen
// Close: feuert "community:closed" mit detail "02"

(function () {
  // ============================================================
  // 1) DATEN – DE (1:1) + EN (sinngemäß)
  // ============================================================
  const COMMUNITY_CONTENT = {
    de: {
      title: "📘 Zielgruppe 2 – Angestellte & Berufstätige",
      subtitle:
        "Neue Sicherheit in Zeiten von Wandel, KI & Inflation – der „Neue Perspektive Treff“ zeigt, wie du Arbeit, Geld und Souveränität neu denken kannst.",
      blocks: [
        {
          type: "section",
          heading: "💬 1. WhatsApp / Facebook / Telegram – Textvorlagen",
          items: [
            {
              title: "Vorlage 1 – „Arbeiten heißt nicht ausgeliefert sein“",
              body: [
                "Du arbeitest viel, aber fragst dich manchmal, wofür eigentlich?",
                "Beim FSA-Treff für Angestellte reden wir offen darüber, wie man mehr Kontrolle über Zeit, Geld und Zukunft bekommt – ohne politische Parolen, ohne Verkauf.",
                "➡️ Willst du wissen, wie du finanzielle Sicherheit neu denken kannst? Ich lade dich gern ein."
              ]
            },
            {
              title: "Vorlage 2 – „Neue Sicht auf Arbeit und Wert“",
              body: [
                "Viele merken, dass Löhne stehen bleiben und Preise steigen.",
                "Beim FSA-Treff zeigen wir, wie du Verständnis über Geld und digitale Sicherheit aufbaust – und warum das dein größtes Karriere-Upgrade sein kann.",
                "➡️ 15 Minuten reichen, um eine neue Perspektive zu sehen."
              ]
            },
            {
              title: "Vorlage 3 – „Selbstvertrauen statt Job-Angst“",
              body: [
                "Viele fürchten um ihre Zukunft – KI, Automatisierung, Rente.",
                "Beim FSA-Treff lernen wir, wie man Wissen in Sicherheit verwandelt und Einkommen stabil hält.",
                "➡️ Komm vorbei, hör zu, und geh mit mehr Klarheit nach Hause."
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "💌 2. E-Mail-Vorlagen (Kontaktaufnahme)",
          items: [
            {
              title: "E-Mail 1 – „Ein Abend, der Klarheit schafft“",
              body: [
                "Betreff: Einladung zum FSA-Treff „Neue Perspektive“",
                "",
                "Hallo [Name],",
                "wir leben in Zeiten des Wandels – viel Arbeit, wenig Sicherheit.",
                "Der FSA-Treff zeigt in einfacher Sprache, wie man wieder Verständnis über das eigene Einkommen und seine Wirkung bekommt.",
                "Kein Verkauf, keine Theorie, sondern Erfahrung und Austausch.",
                "Ich würde mich freuen, dich beim nächsten Treffen zu sehen.",
                "Viele Grüße – [Dein Name]"
              ]
            },
            {
              title: "E-Mail 2 – „Mehr Sicherheit durch Verstehen“",
              body: [
                "Betreff: Einladung zum FSA-Treff für Berufstätige",
                "",
                "Hallo [Name],",
                "unsere Treffen sind offen für alle, die mehr aus ihrem Gehalt und ihrer Zeit machen wollen.",
                "Wir sprechen über Geldflüsse, digitale Freiheit und den Wert von Selbstbestimmung.",
                "FSA & Trustyfy zeigen gemeinsam, wie man sich unabhängig absichert – auch ohne große Vorkenntnisse.",
                "Bist du neugierig? Ich halte dir einen Platz frei.",
                "Herzliche Grüße – [Dein Name]"
              ]
            },
            {
              title: "E-Mail 3 – „Veränderung beginnt im Kopf“",
              body: [
                "Betreff: Neue Wege zu mehr finanzieller Ruhe",
                "",
                "Hallo [Name],",
                "es muss nicht immer eine Karriereänderung sein – oft reicht eine neue Sichtweise auf das, was du bereits tust.",
                "Der FSA-Treff hilft, Verständnis für Geld, Wert und Verantwortung aufzubauen.",
                "Kein Druck, kein Produkt – nur Austausch.",
                "Ich lade dich ein, beim nächsten Treffen dabei zu sein.",
                "Viele Grüße – [Dein Name]"
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "📞 3. Telefon-Leitfäden (inkl. 🔹 Interne Anleitung)",
          items: [
            {
              title: "Leitfaden 1 – Vom Funktionieren zum Verstehen",
              body: [
                "🔹 Interne Anleitung:",
                "Ziel: Menschen aus dem „Hamsterrad-Gefühl“ holen und zeigen, dass es Alternativen gibt.",
                "Ton: ruhig, freundlich, nicht belehrend.",
                "Mehrwert: Klarheit über System und Handlungsspielräume gewinnen.",
                "",
                "Skript:",
                "„Hallo [Name], viele Menschen funktionieren nur noch – Arbeit, Rechnungen, Wiederholung.",
                "Beim „Neue Perspektive Treff“ reden wir darüber, wie man Geld und Sicherheit versteht – nicht nur verdient.",
                "Die FSA-Akademie erklärt, was im Hintergrund passiert, und Trustyfy zeigt, wie du dein Einkommen unabhängiger machst.",
                "Keine Theorie, keine Fachwörter – nur Klartext.",
                "Ich lade dich ein, dir das einmal anzuhören – der Austausch hilft vielen schon nach dem ersten Abend.“"
              ]
            },
            {
              title: "Leitfaden 2 – Angst durch Wissen ersetzen",
              body: [
                "🔹 Interne Anleitung:",
                "Ziel: Zukunftsangst ernst nehmen, nicht wegmoderieren.",
                "Fokus: KI, Inflation, Gesetze – aber lösungsorientiert.",
                "Mehrwert: Gefühl von Kontrolle und Sicherheit zurückgeben.",
                "",
                "Skript:",
                "„Viele Menschen spüren, dass sich etwas ändert – KI, Inflation, neue Regeln.",
                "Aber niemand sagt, wie man sich vorbereitet.",
                "Beim FSA-Treff zeigen wir, wie man Verständnis aufbaut und Schritt für Schritt finanziell selbstbestimmter wird.",
                "Trustyfy macht es technisch einfach, die FSA-Akademie erklärt den Rest.",
                "Ein Abend, und du gehst mit neuer Ruhe nach Hause.",
                "Hast du Lust, dir das einmal anzusehen?“"
              ]
            },
            {
              title: "Leitfaden 3 – Von der Pflicht zur Möglichkeit",
              body: [
                "🔹 Interne Anleitung:",
                "Ziel: Alltag anerkennen, Motivation wecken.",
                "Fokus: „Du arbeitest sowieso – dann nutz es für deine Sicherheit.“",
                "Mehrwert: Neue Sicht auf Arbeit – vom Überleben zur Gestaltung.",
                "",
                "Skript:",
                "„[Name], du verbringst viel Zeit im Job – aber wann ging es das letzte Mal um deine eigene Zukunft?",
                "Viele fühlen sich vom System abhängig, aber die FSA-Treffen zeigen, dass es Alternativen gibt.",
                "Wissen verändert nicht nur die Einstellung, sondern auch die Möglichkeiten.",
                "Ich würde dir das gern zeigen – vielleicht ist es genau der Impuls, den du gerade brauchst.",
                "Wir treffen uns regelmäßig, du kannst einfach dazukommen.“"
              ]
            },
            {
              title: "Leitfaden 4 – Veränderung durch Gemeinschaft",
              body: [
                "🔹 Interne Anleitung:",
                "Ziel: Regelmäßigkeit + soziale Sicherheit betonen.",
                "Mehrwert: „Du bist nicht allein mit deinen Fragen.“",
                "",
                "Skript:",
                "„Unsere Treffen finden regelmäßig statt – meist alle zwei Wochen.",
                "Viele kommen nach dem ersten Abend wieder, weil sie merken: Es tut gut, nicht allein zu sein mit den eigenen Fragen.",
                "FSA liefert Verständnis, Trustyfy liefert Stabilität, die Gruppe liefert Mut.",
                "Wenn du willst, bist du beim nächsten Treff dabei – ich schick dir den Termin.“"
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
                "„Verstehen ist die neue Sicherheit – FSA zeigt den Weg.“"
              ]
            },
            {
              title: "Snippet 2",
              body: [
                "„Angst verliert Macht, wenn du sie verstehst.“"
              ]
            },
            {
              title: "Snippet 3",
              body: [
                "„Neue Perspektive – neues Selbstvertrauen.“"
              ]
            },
            {
              title: "Snippet 4",
              body: [
                "„FSA & Trustyfy – deine Werkzeuge für ein sicheres Morgen.“"
              ]
            }
          ]
        }
      ]
    },

    // ============================================================
    // EN – sinngemäß für dieselbe Struktur
    // ============================================================
    en: {
      title: "📘 Target Group 2 – Employees & Professionals",
      subtitle:
        "More stability in times of change, AI & inflation – the “New Perspective Meetup” shows how to rethink work, money and sovereignty.",
      blocks: [
        {
          type: "section",
          heading: "💬 1. WhatsApp / Facebook / Telegram – message templates",
          items: [
            {
              title: "Template 1 – “Working doesn’t mean being exposed”",
              body: [
                "You work a lot but sometimes wonder what it’s all for?",
                "At the FSA meetup for employees we talk openly about how to gain more control over time, income and future – no politics, no sales.",
                "➡️ Want to see how to rethink financial safety? I can invite you."
              ]
            },
            {
              title: "Template 2 – “A new view on work and value”",
              body: [
                "Many people feel wages stay the same while prices rise.",
                "At the FSA meetup we show how to build understanding about money and digital safety – and why that can be your biggest career upgrade.",
                "➡️ 15 minutes are enough to see a new perspective."
              ]
            },
            {
              title: "Template 3 – “Confidence instead of job anxiety”",
              body: [
                "People are worried – AI, automation, pension systems.",
                "At the FSA meetup we learn how to turn knowledge into protection and keep income stable.",
                "➡️ Join, listen, and leave with more clarity."
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "💌 2. Email templates",
          items: [
            {
              title: "Email 1 – “An evening that brings clarity”",
              body: [
                "Subject: Invitation to the FSA “New Perspective” meetup",
                "",
                "Hi [Name],",
                "we live in times of change – a lot of work, not a lot of security.",
                "The FSA meetup explains in simple words how to regain understanding of your income and what it really does.",
                "No selling, no theory – just experience and exchange.",
                "I’d be happy to see you at the next meeting.",
                "Best, [Your name]"
              ]
            },
            {
              title: "Email 2 – “More safety through understanding”",
              body: [
                "Subject: FSA meetup for professionals",
                "",
                "Hi [Name],",
                "our meetups are open to anyone who wants to get more out of their salary and time.",
                "We talk about money flows, digital freedom and the value of self-determination.",
                "FSA & Trustyfy together show how to secure yourself independently – even without much prior knowledge.",
                "Curious? I’ll keep a seat for you.",
                "Kind regards, [Your name]"
              ]
            },
            {
              title: "Email 3 – “Change starts in the mind”",
              body: [
                "Subject: New ways to more financial peace",
                "",
                "Hi [Name],",
                "it doesn’t always have to be a career change – often a new view on what you already do is enough.",
                "The FSA meetup helps build understanding for money, value and responsibility.",
                "No pressure, no product – just exchange.",
                "You’re invited to join the next meeting.",
                "Best, [Your name]"
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "📞 3. Phone scripts (incl. internal guidance)",
          items: [
            {
              title: "Script 1 – From functioning to understanding",
              body: [
                "🔹 Internal guidance:",
                "Goal: take people out of the feeling of “just running” and show alternatives.",
                "Tone: calm, friendly, never lecturing.",
                "Value: gain clarity about the system and one’s own options.",
                "",
                "Script:",
                "“Hi [Name], a lot of people are just running – work, bills, repeat.",
                "In our “New Perspective” meetup we talk about how to actually understand money and safety – not just earn it.",
                "The FSA Academy explains what’s happening in the background, and Trustyfy shows how to make your income more independent.",
                "No theory, no buzzwords – just plain talk.",
                "I’d like to invite you – for many people one evening was already enough to calm things down.”"
              ]
            },
            {
              title: "Script 2 – Replacing fear with knowledge",
              body: [
                "🔹 Internal guidance:",
                "Goal: acknowledge fears (AI, inflation, laws) and offer action.",
                "Value: give back a feeling of control.",
                "",
                "Script:",
                "“Many people feel things are changing – AI, inflation, new rules.",
                "But nobody tells them how to prepare.",
                "At the FSA meetup we show how to build understanding and become more financially self-determined step by step.",
                "Trustyfy makes the technical part easy, the FSA Academy explains the rest.",
                "After one evening people often leave with more peace.",
                "Would you like to join the next one?”"
              ]
            },
            {
              title: "Script 3 – From duty to possibility",
              body: [
                "🔹 Internal guidance:",
                "Goal: recognise their everyday life, then motivate.",
                "Value: a new angle on work – from “have to” to “can shape it”.",
                "",
                "Script:",
                "“[Name], you spend a lot of time at work – but when was the last time it was about your own future?",
                "Many people feel dependent on the system, but the FSA meetups show there are alternatives.",
                "Knowledge doesn’t just change your mindset – it changes your options.",
                "I can show you – maybe it’s exactly the impulse you need right now.",
                "We meet regularly, you can just jump in.”"
              ]
            },
            {
              title: "Script 4 – Change through community",
              body: [
                "🔹 Internal guidance:",
                "Goal: highlight the value of recurring exchange.",
                "Value: social safety instead of isolation.",
                "",
                "Script:",
                "“Our meetups take place regularly – usually every two weeks.",
                "Many come back after the first evening, because it simply feels good not to be alone with your questions.",
                "FSA provides understanding, Trustyfy provides stability, the group provides courage.",
                "If you want, I’ll send you the date for the next meetup.”"
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
                "“Understanding is the new security – FSA shows the way.”"
              ]
            },
            {
              title: "Snippet 2",
              body: [
                "“Fear loses power once you understand it.”"
              ]
            },
            {
              title: "Snippet 3",
              body: [
                "“New perspective – new confidence.”"
              ]
            },
            {
              title: "Snippet 4",
              body: [
                "“FSA & Trustyfy – your tools for a safer tomorrow.”"
              ]
            }
          ]
        }
      ]
    }
  };

  // ============================================================
  // 2) RENDERER
  // ============================================================
  function renderCommunity02(lang) {
    const data = COMMUNITY_CONTENT[lang] || COMMUNITY_CONTENT["de"];

    // Host holen oder anlegen
    const host =
      document.getElementById("socialContent") ||
      document.querySelector("[data-social-content='02']") ||
      createHost();

    // leeren
    host.innerHTML = "";

    // Wrapper
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

    // Abschnitte
    (data.blocks || []).forEach((block) => {
      const section = document.createElement("section");
      section.className = "social-section";

      const h2 = document.createElement("h2");
      h2.textContent = block.heading;
      section.appendChild(h2);

      (block.items || []).forEach((item) => {
        const card = document.createElement("article");
        card.className = "social-card";

        const h3 = document.createElement("h3");
        h3.textContent = item.title;
        card.appendChild(h3);

        (item.body || []).forEach((line) => {
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
      document.dispatchEvent(
        new CustomEvent("community:closed", { detail: "02" })
      );
    });
    wrap.appendChild(closeBtn);

    host.appendChild(wrap);
    host.style.display = "block";
  }

  // ============================================================
  // 3) HOST erstellen
  // ============================================================
  function createHost() {
    const host = document.createElement("div");
    host.id = "socialContent";
    document.body.appendChild(host);
    return host;
  }

  // ============================================================
  // 4) STYLES – identisch zu community-01 / social
  // ============================================================
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
      font-size: 1.02rem;
      margin-bottom: .65rem;
      color: #f3f4f6;
      border-bottom: 1px solid rgba(212,175,55,0.28);
      padding-bottom: .35rem;
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
      font-size: 0.95rem;
      color: #fff;
    }
    .social-card p {
      margin: 0 0 0.4rem;
      font-size: 0.84rem;
      color: #e2e8f0;
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
        padding: 1rem .65rem 1.3rem;
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

  // ============================================================
  // 5) GLOBAL VERFÜGBAR MACHEN + EVENTS
  // ============================================================
  window.FSA_COMMUNITY_02 = COMMUNITY_CONTENT;

  // Helper für manuelles Rendern
  window.renderCommunity02 = function (lang) {
    const current = lang || localStorage.getItem("fsa_lang") || "de";
    renderCommunity02(current);
  };

  // Event aus community.html (Card 2)
  document.addEventListener("community:open-02", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    renderCommunity02(lang);
  });

  // Sprache live umschalten – aber nur, wenn gerade offen
  document.addEventListener("fsa:lang-change", (ev) => {
    const host = document.getElementById("socialContent");
    if (host && host.innerHTML.trim() !== "") {
      const lang = ev.detail || "de";
      renderCommunity02(lang);
    }
  });
})();
