// /lp-anfang/library/js/text-campus/campus-community-03.js
// FSA Community – Zielgruppe 3 – Freunde, Familie & Bekannte (Sicherheits-Treff)
// 1:1 wie community-01 / community-02 aufgebaut
// Events: "community:open-03" öffnet dieses Set
// "fsa:lang-change" rendert neu, wenn offen
// Close feuert "community:closed" mit detail "03"

(function () {
  // ============================================================
  // 1) DATEN – DE (1:1 Vorgabe, Trustyfy neutralisiert) + EN (sinngemäß)
  // ============================================================
  const COMMUNITY_CONTENT = {
    de: {
      title: "💛 Zielgruppe 3 – Freunde, Familie & Bekannte",
      subtitle:
        "Sicherheit beginnt im nahen Umfeld – beim ehrlichen Gespräch. Der Sicherheits-Treff hilft, gemeinsam Verantwortung zu übernehmen.",
      blocks: [
        {
          type: "section",
          heading: "💬 1. WhatsApp / Facebook / Telegram – Textvorlagen",
          items: [
            {
              title: "Vorlage 1 – „Gemeinsam sicherer“",
              body: [
                "Viele reden über Sicherheit – aber kaum jemand versteht, was sie bedeutet.",
                "Beim FSA-Sicherheits-Treff tauschen wir Wissen, Erfahrungen und Lösungen aus, um einander zu stärken.",
                "➡️ Willst du wissen, wie du dein Geld und deine Daten besser schützt? Komm vorbei."
              ]
            },
            {
              title: "Vorlage 2 – „Familie & Verantwortung“",
              body: [
                "Sicherheit fängt zuhause an.",
                "Unsere Treffen zeigen, wie man finanzielle Stabilität für sich und die Familie schafft – nicht durch Angst, sondern durch Verständnis.",
                "FSA erklärt, dezentrale Lösungen sichern ab.",
                "➡️ Ich lade dich ein, dabei zu sein."
              ]
            },
            {
              title: "Vorlage 3 – „Freunde mit Weitblick“",
              body: [
                "Im Freundeskreis reden wir über alles – nur nicht über Geld und Sicherheit.",
                "Das ändern wir. Beim FSA-Treff lernen wir gemeinsam, wie wir unser Leben stabiler machen können – unabhängig von Banken oder Stimmungen.",
                "➡️ Ein Abend, der mehr bringt als jede Diskussion im Netz."
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "💌 2. E-Mail-Vorlagen (Kontaktaufnahme)",
          items: [
            {
              title: "E-Mail 1 – „Sicherheit beginnt im Gespräch“",
              body: [
                "Betreff: Einladung zum FSA-Sicherheits-Treff",
                "",
                "Hallo [Name],",
                "wir leben in einer Zeit, in der Sicherheit nicht mehr selbstverständlich ist.",
                "Beim FSA-Treff lernen wir, was das in der Praxis bedeutet – für uns, unsere Familien und unsere Freunde.",
                "Es geht nicht um Theorien, sondern um Verständnis und Vertrauen.",
                "Ich würde mich freuen, dich beim nächsten Abend zu sehen.",
                "Viele Grüße",
                "[Dein Name]"
              ]
            },
            {
              title: "E-Mail 2 – „Gemeinsam stärker“",
              body: [
                "Betreff: FSA-Treff für Sicherheit und Verständnis",
                "",
                "Hallo [Name],",
                "Sicherheit ist kein Zufall – sie entsteht, wenn Menschen zusammenkommen und Wissen teilen.",
                "Beim FSA-Sicherheits-Treff zeigen wir, wie du dein Geld und deine Daten selbst verstehst und absicherst.",
                "Vertraulich, respektvoll und praxisnah.",
                "Ich lade dich herzlich ein.",
                "Liebe Grüße",
                "[Dein Name]"
              ]
            },
            {
              title: "E-Mail 3 – „Von Sorge zu Selbstvertrauen“",
              body: [
                "Betreff: Einladung zum FSA-Sicherheits-Abend",
                "",
                "Hallo [Name],",
                "viele Menschen spüren, dass sich die Welt ändert – finanziell und digital.",
                "Beim FSA-Treff lernen wir, wie man Ruhe behält und Verantwortung übernimmt.",
                "FSA liefert Verständnis, dezentrale Systeme liefern die Technik dazu.",
                "Ich würde mich freuen, dich dabei zu haben.",
                "Herzliche Grüße",
                "[Dein Name]"
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "📞 3. Telefon-Leitfäden (inkl. 🔹 Interne Anleitung)",
          items: [
            {
              title: "Leitfaden 1 – Vom Reden zum Handeln",
              body: [
                "🔹 Interne Anleitung:",
                "Ebene Familie / Freunde / Bekannte, ruhiger Ton, null Verkaufsdruck.",
                "Mehrwert betonen: „Wir verstehen es gemeinsam, dann kann es jeder in seiner Familie erklären.“",
                "",
                "Skript:",
                "„Hallo [Name], wir reden so oft über Probleme – aber selten darüber, wie wir sie lösen können.",
                "Beim FSA-Sicherheits-Treff geht es darum, dass wir einander helfen, die Dinge besser zu verstehen: Geld, Sicherheit, digitale Abhängigkeit.",
                "FSA zeigt die Zusammenhänge, dezentrale Strukturen machen sie praktisch.",
                "Ein Abend bringt mehr Klarheit als viele Diskussionen im Alltag.",
                "Wenn du willst, komm einfach dazu – der Rahmen ist locker.“"
              ]
            },
            {
              title: "Leitfaden 2 – Sicherheit für alle Generationen",
              body: [
                "🔹 Interne Anleitung:",
                "Einstieg über Familie, Kinder, Eltern – etwas Emotionales.",
                "Ziel: „Du kannst das weitergeben.“",
                "",
                "Skript:",
                "„[Name], ich hab mich in letzter Zeit viel gefragt, wie wir unsere Familien wirklich absichern können – nicht nur mit Versicherungen, sondern mit Verständnis.",
                "Beim FSA-Treff lernen wir, was hinter dem System steckt und wie man sein Geld und seine Werte selbst versteht und schützt.",
                "Das Schöne: Man nimmt etwas mit, was man weitergeben kann – an Kinder, an Eltern oder an Freunde.",
                "Wenn du magst, komm zum nächsten Abend, dann zeig ich dir, wie das läuft.“"
              ]
            },
            {
              title: "Leitfaden 3 – Vertrauen statt Verwirrung",
              body: [
                "🔹 Interne Anleitung:",
                "Ziel: Orientierung geben, wenn Leute „den Nachrichten“ nicht mehr trauen.",
                "Fokus: „Wir holen uns Wissen zurück.“",
                "",
                "Skript:",
                "„Viele wissen nicht mehr, wem man trauen kann – Banken, Politik, Medien.",
                "Beim FSA-Sicherheits-Treff finden wir eine Antwort: Wir schaffen unser eigenes Verständnis, unabhängig von Dritten.",
                "FSA liefert das Wissen, dezentrale Lösungen liefern die Technik.",
                "Das gibt Sicherheit, die bleibt.",
                "Hast du Lust, dir das einmal in Ruhe anzuhören?“"
              ]
            },
            {
              title: "Leitfaden 4 – Von Gesprächen zu Gemeinschaft",
              body: [
                "🔹 Interne Anleitung:",
                "Regelmäßigkeit betonen: 1× im Monat oder alle 4 Wochen.",
                "Mehrwert: Zugehörigkeit, nicht allein sein mit seinen Fragen.",
                "",
                "Skript:",
                "„Unsere Sicherheits-Treffen finden regelmäßig statt – meist einmal im Monat.",
                "Viele kommen immer wieder, weil es guttut, nicht allein zu sein mit den Fragen der Zeit.",
                "Wir lernen voneinander und bauen Vertrauen auf, statt uns verunsichern zu lassen.",
                "Ich lade dich ein, beim nächsten Abend dabei zu sein – ich schick dir den Termin.“"
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
                "„Sicherheit entsteht durch Verständnis – nicht durch Angst.“"
              ]
            },
            {
              title: "Snippet 2",
              body: [
                "„Gemeinsam denken, gemeinsam schützen.“"
              ]
            },
            {
              title: "Snippet 3",
              body: [
                "„FSA & dezentrale Lösungen – weil Vertrauen das beste System ist.“"
              ]
            },
            {
              title: "Snippet 4",
              body: [
                "„Ein Gespräch kann der Anfang von Sicherheit sein.“"
              ]
            }
          ]
        }
      ]
    },

    // ================== EN ==================
    en: {
      title: "💛 Target Group 3 – Friends, Family & Close Network",
      subtitle:
        "Real safety starts in your circle – honest conversations, shared responsibility. The “Security Meetup” helps people protect what matters.",
      blocks: [
        {
          type: "section",
          heading: "💬 1. WhatsApp / Facebook / Telegram – message templates",
          items: [
            {
              title: "Template 1 – “Safer together”",
              body: [
                "A lot of people talk about safety – but very few really understand it.",
                "In the FSA security meetup we share knowledge, experience and solutions to make each other stronger.",
                "➡️ Want to see how to protect your money and your data better? Join us."
              ]
            },
            {
              title: "Template 2 – “Family & responsibility”",
              body: [
                "Safety starts at home.",
                "Our meetups show how to build financial stability for yourself and your family – not through fear, but through understanding.",
                "FSA explains, decentralized solutions protect.",
                "➡️ I’d like to invite you to be part of it."
              ]
            },
            {
              title: "Template 3 – “Friends with foresight”",
              body: [
                "We talk about everything with friends – except money and safety.",
                "We change that. At the FSA meetup we learn together how to make life more stable – independent of banks or moods.",
                "➡️ One evening that’s better than any discussion online."
              ]
            }
          ]
        },
        {
          type: "section",
          heading: "💌 2. Email templates",
          items: [
            {
              title: "Email 1 – “Safety starts with a conversation”",
              body: [
                "Subject: Invitation to the FSA Security Meetup",
                "",
                "Hi [Name],",
                "we live in a time where safety is no longer guaranteed.",
                "At the FSA meetup we learn what that means in practice – for us, for our families and for our friends.",
                "It’s not about theories – it’s about understanding and trust.",
                "I’d be happy to see you at the next session.",
                "Best,",
                "[Your name]"
              ]
            },
            {
              title: "Email 2 – “Stronger together”",
              body: [
                "Subject: FSA meetup for safety & understanding",
                "",
                "Hi [Name],",
                "safety doesn’t happen by accident – it happens when people share knowledge.",
                "At the FSA security meetup we show how to understand and protect your money and your data yourself.",
                "Confidential, respectful, practical.",
                "You’re warmly invited.",
                "Best regards,",
                "[Your name]"
              ]
            },
            {
              title: "Email 3 – “From worry to confidence”",
              body: [
                "Subject: Join the FSA security evening",
                "",
                "Hi [Name],",
                "many people sense that things are changing – financially and digitally.",
                "At the FSA meetup we learn how to stay calm and take responsibility.",
                "FSA provides the understanding, decentralized systems provide the technical shield.",
                "I’d love to have you there.",
                "Best,",
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
              title: "Script 1 – From talking to doing",
              body: [
                "🔹 Internal guidance:",
                "Target: family, friends, close contacts; soft tone, zero sales.",
                "Value: create safety and understanding inside the private circle.",
                "",
                "Script:",
                "“Hi [Name], we often talk about problems – but rarely about how to actually solve them.",
                "In the FSA security meetup we help each other understand the important things: money, safety, digital dependency.",
                "FSA shows the logic, a decentralized setup makes it practical.",
                "One evening brings more clarity than a week of random discussions.",
                "If you like, just join the next one – it’s a very relaxed format.”"
              ]
            },
            {
              title: "Script 2 – Safety for all generations",
              body: [
                "🔹 Internal guidance:",
                "Start with family, kids, parents – emotional hook.",
                "Value: something you can pass on.",
                "",
                "Script:",
                "“[Name], lately I’ve been thinking a lot about how we can really protect our families – not just with insurance, but with understanding.",
                "In the FSA meetup we learn how the system works and how to protect money and values ourselves.",
                "The good part: you can pass it on – to your kids, to your parents, to friends.",
                "If you want, join the next evening, I’ll show you how it works.”"
              ]
            },
            {
              title: "Script 3 – Trust instead of confusion",
              body: [
                "🔹 Internal guidance:",
                "Goal: give orientation when people don’t trust media/banks/politics.",
                "",
                "Script:",
                "“Many people no longer know who to trust – banks, politics, media.",
                "In the FSA security meetup we build our own understanding – independent of third parties.",
                "FSA provides the knowledge, decentralized solutions provide the tech.",
                "That creates safety that lasts.",
                "Want to listen in on the next session?”"
              ]
            },
            {
              title: "Script 4 – From conversations to community",
              body: [
                "🔹 Internal guidance:",
                "Stress the rhythm: once a month.",
                "Value: belonging, not being alone with worries.",
                "",
                "Script:",
                "“Our security meetups take place regularly – usually once a month.",
                "Many people come back because it feels good not to be alone with today’s questions.",
                "We learn from each other and build trust instead of getting confused.",
                "You’re very welcome to join the next one – I’ll send you the date.”"
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
                "“Safety is created by understanding – not by fear.”"
              ]
            },
            {
              title: "Snippet 2",
              body: [
                "“Think together, protect together.”"
              ]
            },
            {
              title: "Snippet 3",
              body: [
                "“FSA & decentralized solutions – because trust is the best system.”"
              ]
            },
            {
              title: "Snippet 4",
              body: [
                "“One conversation can be the start of safety.”"
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
  function renderCommunity03(lang) {
    const data = COMMUNITY_CONTENT[lang] || COMMUNITY_CONTENT["de"];

    const host =
      document.getElementById("socialContent") ||
      document.querySelector("[data-social-content='03']") ||
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

    // Close
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "social-close-btn";
    closeBtn.textContent = lang === "de" ? "Schließen" : "Close";
    closeBtn.addEventListener("click", () => {
      host.innerHTML = "";
      host.style.display = "none";
      document.dispatchEvent(
        new CustomEvent("community:closed", { detail: "03" })
      );
    });
    wrap.appendChild(closeBtn);

    host.appendChild(wrap);
    host.style.display = "block";
  }

  // ============================================================
  // 3) HOST
  // ============================================================
  function createHost() {
    const host = document.createElement("div");
    host.id = "socialContent";
    document.body.appendChild(host);
    return host;
  }

  // ============================================================
  // 4) STYLES – wie 01/02/Social
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
  // 5) GLOBAL + EVENTS
  // ============================================================
  window.FSA_COMMUNITY_03 = COMMUNITY_CONTENT;

  // manueller Aufruf
  window.renderCommunity03 = function (lang) {
    renderCommunity03(lang || localStorage.getItem("fsa_lang") || "de");
  };

  // Card 3 klickt in community.html
  document.addEventListener("community:open-03", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    renderCommunity03(lang);
  });

  // Sprache ändern, wenn offen
  document.addEventListener("fsa:lang-change", (ev) => {
    const host = document.getElementById("socialContent");
    if (host && host.innerHTML.trim() !== "") {
      const lang = ev.detail || "de";
      renderCommunity03(lang);
    }
  });
})();
