// /lp-anfang/library/js/text-campus/campus-social-04.js
// ======================================================================
// FSA / Trustyfy – Social Set 04
// Zielgruppe 4 – Alleinerziehende, Rentner/Pensionierte, Studenten/Azubis
// Vollversion DE + EN
// Verdrahtet auf: lang-switcher.js  (event: fsa:lang-change)
// Anzeige: eigener Container (#socialContent) + Schließen-Button
// Keine Kürzungen, keine Platzhalter
// ======================================================================

(function () {
  // --------------------------------------------------------------------
  // 1) DATENBASIS – 1:1 wie von dir geliefert
  // --------------------------------------------------------------------
  const CAMPUS_SOCIAL_04 = {
    meta: {
      id: "tg4",
      group: "trustyfy-fsa",
      version: "1.0.0",
      title_de: "Zielgruppe 4 – Alleinerziehende, Rentner & Studenten",
      title_en: "Target Group 4 – Single Parents, Retirees & Students",
      topic_de: "Sicherheit, Würde und Zukunft in unsicheren Zeiten",
      topic_en: "Security, dignity and future in uncertain times",
      lastUpdate: "2025-10-30",
      source: "FSA / Trustyfy – Social Set 04"
    },

    // ░░ DEUTSCH ░░
    de: {
      title: "Zielgruppe 4 – Alleinerziehende, Rentner & Studenten",
      intro:
        "Drei Lebenssituationen, ein gemeinsamer Druck: Alles wird teurer, alles wird digitaler, alles wird kontrollierter. Diese Vorlagen zeigen: Mit FSA (Verstehen) + Trustyfy (Technik) kann man trotzdem souverän bleiben.",
      sections: [
        // ─────────────────────────────
        // 4A – Alleinerziehende
        // ─────────────────────────────
        {
          id: "4a",
          label: "4A – Alleinerziehende",
          blocks: [
            {
              heading: "💬 1. WhatsApp / Facebook / Telegram",
              body: [
                "„Manchmal frag ich mich, wer uns eigentlich absichert, wenn alles teurer wird – und die Banken immer mehr bestimmen.",
                "Ich hab Trustyfy entdeckt – da verwalte ich mein Geld selbst, ohne Dritte, sicher und dezentral.",
                "Die FSA-Akademie zeigt Schritt für Schritt, wie man wieder Kontrolle bekommt – und Zeit für die Familie statt Papierkram.",
                "➡️ Willst du sehen, wie einfach das funktioniert? Ich zeig es dir kurz online.“"
              ]
            },
            {
              heading: "💌 2. E-Mail",
              body: [
                "Betreff: Mehr Ruhe – trotz aller Verantwortung",
                "Hallo [Name],",
                "ich weiß, wie es ist, wenn man alles allein stemmt – Rechnungen, Kinder, Sorgen.",
                "Darum hab ich nach einer Lösung gesucht, wie ich mein Geld wirklich sicher verwalten kann.",
                "Die FSA-Akademie hat mir gezeigt, wie das Finanzsystem tickt, und Trustyfy gibt mir die technische Sicherheit dafür – ohne Bank, ohne Stress.",
                "Ich fühl mich zum ersten Mal ruhiger, weil ich weiß, dass mein Einkommen unter meiner Kontrolle bleibt.",
                "Wenn du magst, schick ich dir den Link zum Einstieg.",
                "Herzliche Grüße, [Dein Name]"
              ]
            },
            {
              heading: "📞 3. Telefon-Leitfaden",
              body: [
                "🔹 Interne Anleitung",
                "Ziel: Verständnis und Erleichterung vermitteln. Keine Finanzsprache, sondern Mitgefühl und eine ruhige Lösung.",
                "Dauer: 5–7 Minuten.",
                "Zielhandlung: 15-Minuten-Gespräch oder Online-Einblick vereinbaren.",
                "",
                "🔹 Vorlese-Skript",
                "„Hey [Name], ich weiß, du trägst viel Verantwortung allein.",
                "Gerade jetzt wird alles unsicherer – Preise, Gesetze, Banken.",
                "Ich wollt dir was zeigen, das mir wirklich Ruhe gibt: Trustyfy.",
                "Da liegt mein Geld nicht mehr bei Dritten, sondern in meiner eigenen Struktur – sicher, transparent und ohne Zugriff von außen.",
                "Und die FSA-Akademie hilft zu verstehen, wie man das einfach umsetzt.",
                "Ich kann dir das in 15 Minuten zeigen – kein Verkauf, einfach Aufklärung. Wann passt dir?“"
              ]
            },
            {
              heading: "🔗 4. Share-Snippets",
              body: [
                "1️⃣ „Sicherheit beginnt mit Verständnis – FSA zeigt den Weg, Trustyfy macht dich unabhängig.“",
                "2️⃣ „Alleinerziehend heißt nicht allein – FSA & Trustyfy geben dir Kontrolle über dein Geld zurück.“",
                "3️⃣ „Weniger Sorge, mehr Sicherheit – Starte mit Wissen und einem System, das dich schützt.“"
              ]
            }
          ]
        },

        // ─────────────────────────────
        // 4B – Rentner / Pensionierte
        // ─────────────────────────────
        {
          id: "4b",
          label: "4B – Rentner / Pensionierte",
          blocks: [
            {
              heading: "💬 1. WhatsApp / Facebook / Telegram",
              body: [
                "„Viele Renten reichen kaum noch, und immer mehr Regeln greifen in unsere Konten ein.",
                "Ich hab eine Lösung gefunden, die mir Ruhe gibt: Trustyfy – ein dezentrales System, das mein Geld schützt und mir die Kontrolle lässt.",
                "Die FSA-Akademie erklärt einfach, wie man sich vorbereitet, bevor alles digital überwacht wird.",
                "➡️ Wenn Sie möchten, zeige ich Ihnen das – es hat mir wirklich geholfen.“"
              ]
            },
            {
              heading: "💌 2. E-Mail",
              body: [
                "Betreff: Kontrolle über das Eigene behalten",
                "Sehr geehrter [Name],",
                "viele Menschen merken, wie schnell sich alles ändert – digitale Währungen, Bankrichtlinien, Zugriffe auf Konten.",
                "Ich hab mich damit beschäftigt und eine Alternative gefunden: Trustyfy.",
                "Damit verwaltet man sein Geld selbst – dezentral, sicher und ohne fremde Zugriffe.",
                "Die FSA-Akademie zeigt in klaren Schritten, wie das funktioniert und warum es so wichtig wird.",
                "Ich würde mich freuen, wenn Sie sich das anschauen.",
                "Mit freundlichen Grüßen, [Ihr Name]"
              ]
            },
            {
              heading: "📞 3. Telefon-Leitfaden",
              body: [
                "🔹 Interne Anleitung",
                "Ziel: Sicherheit und Würde ansprechen, keine Angst schüren.",
                "Dauer: 5–8 Minuten.",
                "Zielhandlung: Einladung zu einem Info-Gespräch oder Link senden.",
                "",
                "🔹 Vorlese-Skript",
                "„Guten Tag [Name], viele merken, wie Banken und Staat immer mehr über unsere Konten entscheiden.",
                "Ich möchte Ihnen zeigen, wie man sein Geld selbst verwalten kann – mit Trustyfy. Es läuft dezentral, ohne fremden Zugriff, ohne Risiko.",
                "Und über die FSA-Akademie wird alles einfach und verständlich erklärt.",
                "Wollen wir uns das gemeinsam in einem kurzen Gespräch ansehen?“"
              ]
            },
            {
              heading: "🔗 4. Share-Snippets",
              body: [
                "1️⃣ „Sicherheit im Alter bedeutet, selbst zu entscheiden – FSA & Trustyfy zeigen, wie es geht.“",
                "2️⃣ „Digitale Rente statt Kontrolle – mit Wissen und Technik die eigene Würde bewahren.“",
                "3️⃣ „Selbstbestimmt statt ausgeliefert – Trustyfy schützt Werte, FSA erklärt das Warum.“"
              ]
            }
          ]
        },

        // ─────────────────────────────
        // 4C – Studenten / Azubis
        // ─────────────────────────────
        {
          id: "4c",
          label: "4C – Studenten / Azubis",
          blocks: [
            {
              heading: "💬 1. WhatsApp / Facebook / Telegram",
              body: [
                "„Hast du schon mal drüber nachgedacht, wie abhängig wir vom System sind – Konto, Apps, Daten?",
                "Mit Trustyfy kann man sein Geld und seine Werte selbst verwalten – dezentral, sicher, ohne Mittelsmänner.",
                "Und die FSA-Akademie zeigt, wie das System hinter Geld und Macht wirklich funktioniert.",
                "➡️ Ich zeig dir das gern – vielleicht ändert es deinen Blick auf Zukunft und Freiheit.“"
            ]
            },
            {
              heading: "💌 2. E-Mail",
              body: [
                "Betreff: Finanzielle Freiheit beginnt mit Verstehen",
                "Hey [Name],",
                "wir wachsen mit Apps und Algorithmen auf – aber kaum jemand weiß, wer eigentlich die Kontrolle hat.",
                "Mit Trustyfy hab ich gelernt, wie ich mein Geld selbst verwalte – ohne Bank, ohne Abhängigkeit.",
                "Und die FSA-Akademie hat mir gezeigt, wie das alles zusammenhängt.",
                "Wenn du wissen willst, wie du deine Zukunft selbst gestaltest, schick ich dir den Link.",
                "LG [Dein Name]"
              ]
            },
            {
              heading: "📞 3. Telefon-Leitfaden",
              body: [
                "🔹 Interne Anleitung",
                "Ziel: Neugier wecken, Zukunftsangst in Motivation verwandeln.",
                "Dauer: 5–7 Minuten.",
                "Zielhandlung: kurzes Online-Gespräch oder Einblick in FSA & Trustyfy.",
                "",
                "🔹 Vorlese-Skript",
                "„Hey [Name], ich frag mal ehrlich – hast du jemals darüber nachgedacht, wer wirklich die Kontrolle über dein Geld hat?",
                "Die meisten wissen gar nicht, wie abhängig sie sind – von Banken und Algorithmen.",
                "Mit Trustyfy kannst du das ändern – dezentral, einfach und sicher.",
                "Und die FSA-Akademie zeigt dir, warum das Thema Zukunft und Freiheit zusammengehört.",
                "Ich zeig’s dir in 15 Minuten – magst du?“"
              ]
            },
            {
              heading: "🔗 4. Share-Snippets",
              body: [
                "1️⃣ „Versteh das System – bevor es dich bestimmt. FSA & Trustyfy zeigen den Weg zur echten Unabhängigkeit.“",
                "2️⃣ „Freiheit ist kein Trend, sondern Wissen – und Wissen beginnt heute.“",
                "3️⃣ „Zukunft selbst steuern – dezentral, verständlich, fair. FSA lehrt, Trustyfy macht es praktisch.“"
              ]
            }
          ]
        }
      ]
    },

    // ░░ ENGLISH ░░
    en: {
      title: "Target Group 4 – Single Parents, Retirees & Students",
      intro:
        "Three vulnerable situations, one answer: understand the system (FSA) and keep control via a decentralized layer (Trustyfy). Use these texts for warm audiences – people you already know.",
      sections: [
        // 4A EN
        {
          id: "4a",
          label: "4A – Single Parents",
          blocks: [
            {
              heading: "💬 1. WhatsApp / Facebook / Telegram",
              body: [
                "“Sometimes I wonder who actually protects us when everything gets more expensive – and banks decide more and more.",
                "I found Trustyfy – I manage my money myself, without third parties, safe and decentralized.",
                "The FSA Academy shows step by step how to regain control – and time for family instead of paperwork.",
                "➡️ Want to see how simple it is? I’ll show you quickly online.”"
              ]
            },
            {
              heading: "💌 2. Email",
              body: [
                "Subject: More peace – even with all this responsibility",
                "Hi [Name],",
                "I know how it feels when you have to manage everything alone – bills, kids, worries.",
                "That’s why I looked for a way to really secure and control my money.",
                "The FSA Academy helped me understand how the financial system works, and Trustyfy gives me the technical safety – no bank, no stress.",
                "For the first time I feel calmer, because I know my income stays under my control.",
                "If you like, I’ll send you the starter link.",
                "Best regards, [Your Name]"
              ]
            },
            {
              heading: "📞 3. Phone guide",
              body: [
                "🔹 Internal notes",
                "Goal: convey care and relief, not pressure.",
                "Length: 5–7 minutes.",
                "Target action: book a 15-minute online call.",
                "",
                "🔹 Script",
                "“Hey [Name], I know you’re carrying a lot on your own.",
                "Right now everything gets more unstable – prices, rules, banks.",
                "I wanted to show you something that really calmed me down: Trustyfy.",
                "With it, my money isn’t exposed to third parties – it’s in my own secure, transparent structure.",
                "And the FSA Academy explains how to set it up easily.",
                "I can show you in 15 minutes – no sales, just clarity. When is better for you?”"
              ]
            },
            {
              heading: "🔗 4. Share snippets",
              body: [
                "1️⃣ “Security starts with understanding – FSA shows the way, Trustyfy makes you independent.”",
                "2️⃣ “Single parent doesn’t mean alone – FSA & Trustyfy give you control over your money again.”",
                "3️⃣ “Less worry, more safety – start with knowledge and a system that protects you.”"
              ]
            }
          ]
        },

        // 4B EN
        {
          id: "4b",
          label: "4B – Retirees / Pensioners",
          blocks: [
            {
              heading: "💬 1. WhatsApp / Facebook / Telegram",
              body: [
                "“Many pensions are no longer enough – and new rules reach deeper into our accounts.",
                "I found something that gave me peace: Trustyfy – a decentralized system that protects my money and leaves control with me.",
                "The FSA Academy explains how to prepare before everything becomes fully monitored.",
                "➡️ If you want, I can show it to you – it really helped me.”"
              ]
            },
            {
              heading: "💌 2. Email",
              body: [
                "Subject: Keeping control over what is yours",
                "Dear [Name],",
                "many people notice how fast everything changes – digital currencies, bank policies, access restrictions.",
                "I looked into it and found an alternative: Trustyfy.",
                "It allows you to manage your money yourself – decentralized, secure and without outside access.",
                "The FSA Academy shows in clear steps how this works and why it will be important.",
                "I would be happy if you have a look at it.",
                "Kind regards, [Your Name]"
              ]
            },
            {
              heading: "📞 3. Phone guide",
              body: [
                "🔹 Internal notes",
                "Goal: speak to dignity and safety, don’t dramatize.",
                "Length: 5–8 minutes.",
                "Target: invite to info call or send link.",
                "",
                "🔹 Script",
                "“Good day [Name], many people notice that banks and the state decide more and more about our accounts.",
                "I’d like to show you how to manage your money yourself – with Trustyfy. It runs decentralized, without outside access, without risk.",
                "And through the FSA Academy everything is explained simply and clearly.",
                "Shall we go through it together in a short call?”"
              ]
            },
            {
              heading: "🔗 4. Share snippets",
              body: [
                "1️⃣ “Real safety in retirement means: you decide. FSA & Trustyfy show how.”",
                "2️⃣ “Digital pensions without control – with knowledge and tech you keep your dignity.”",
                "3️⃣ “Self-determined instead of dependent – Trustyfy protects values, FSA explains the ‘why’.”"
              ]
            }
          ]
        },

        // 4C EN
        {
          id: "4c",
          label: "4C – Students / Trainees",
          blocks: [
            {
              heading: "💬 1. WhatsApp / Facebook / Telegram",
              body: [
                "“Have you ever thought about how dependent we are on the system – bank accounts, apps, data?",
                "With Trustyfy you can manage your money and your values yourself – decentralized, secure, without middlemen.",
                "And the FSA Academy shows how the system behind money and power really works.",
                "➡️ I can show you – it might change how you see future and freedom.”"
              ]
            },
            {
              heading: "💌 2. Email",
              body: [
                "Subject: Financial freedom starts with understanding",
                "Hey [Name],",
                "we grow up with apps and algorithms – but hardly anyone knows who actually controls everything.",
                "With Trustyfy I learned how to manage my money myself – without a bank, without dependency.",
                "And the FSA Academy showed me how it’s all connected.",
                "If you want to know how to shape your future yourself, I’ll send you the link.",
                "Best, [Your Name]"
              ]
            },
            {
              heading: "📞 3. Phone guide",
              body: [
                "🔹 Internal notes",
                "Goal: wake up curiosity, turn future anxiety into action.",
                "Length: 5–7 minutes.",
                "Target: short online call or onboarding into FSA & Trustyfy.",
                "",
                "🔹 Script",
                "“Hey [Name], can I ask you straight – have you ever thought about who really controls your money?",
                "Most people don’t realize how dependent they are – on banks and algorithms.",
                "With Trustyfy you can change that – decentralized, simple and secure.",
                "And the FSA Academy shows why future and freedom belong together.",
                "Takes 15 minutes – want to see it?”"
              ]
            },
            {
              heading: "🔗 4. Share snippets",
              body: [
                "1️⃣ “Understand the system – before it defines you. FSA & Trustyfy show the way.”",
                "2️⃣ “Freedom is not a trend – it’s knowledge. Start today.”",
                "3️⃣ “Steer your future yourself – decentralized, transparent, fair.”"
              ]
            }
          ]
        }
      ]
    }
  };

  // --------------------------------------------------------------------
  // 2) RENDERER – baut HTML in #socialContent (wie 02), aber nur wenn vorhanden
  // --------------------------------------------------------------------
  function renderSocialZielgruppe4(lang) {
    const currentLang = lang || localStorage.getItem("fsa_lang") || "de";
    const data =
      CAMPUS_SOCIAL_04[currentLang] || CAMPUS_SOCIAL_04.de;

    // 🟡 WICHTIGER FIX:
    // Wenn die Seite (social.html) kein #socialContent vorgibt,
    // dann NICHT selber eins anlegen -> sonst doppelt.
    let host = document.getElementById("socialContent");
    if (!host) {
      return; // nix anzeigen, sauber raus
    }

    // vorher leeren, damit nichts drunter klebt
    host.innerHTML = "";

    // Wrapper
    const wrap = document.createElement("div");
    wrap.className = "social-wrapper";

    // Header
    const h1 = document.createElement("h1");
    h1.textContent = data.title;
    wrap.appendChild(h1);

    if (data.intro) {
      const intro = document.createElement("p");
      intro.className = "subtitle";
      intro.textContent = data.intro;
      wrap.appendChild(intro);
    }

    // Sektionen (4A / 4B / 4C)
    (data.sections || []).forEach((section, idx) => {
      const sec = document.createElement("section");
      sec.className = "social-block";

      const h = document.createElement("h2");
      h.textContent =
        section.label ||
        (currentLang === "de" ? "Bereich " + (idx + 1) : "Section " + (idx + 1));
      sec.appendChild(h);

      (section.blocks || []).forEach((blk) => {
        const card = document.createElement("article");
        card.className = "inner-block";

        if (blk.heading) {
          const hh = document.createElement("h3");
          hh.textContent = blk.heading;
          card.appendChild(hh);
        }
        (blk.body || []).forEach((line) => {
          const p = document.createElement("p");
          p.textContent = line;
          card.appendChild(p);
        });

        sec.appendChild(card);
      });

      wrap.appendChild(sec);
    });

    // Close Button
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "close-social";
    closeBtn.textContent = currentLang === "de" ? "Schließen" : "Close";
    closeBtn.addEventListener("click", () => {
      host.innerHTML = "";
      document.dispatchEvent(
        new CustomEvent("social:closed", { detail: "04" })
      );
    });
    wrap.appendChild(closeBtn);

    host.appendChild(wrap);
  }

  // --------------------------------------------------------------------
  // 3) STYLE – gleicher Look wie 02/03
  // --------------------------------------------------------------------
  const style = document.createElement("style");
  style.textContent = `
    #socialContent {
      width: min(1180px, 100%);
      margin: 0 auto;
      padding: 1.5rem 1rem 5rem;
      box-sizing: border-box;
    }
    .social-wrapper {
      background: rgba(11,15,20,0.4);
      border: 1px solid rgba(212,175,55,0.25);
      border-radius: 14px;
      backdrop-filter: blur(14px);
      padding: 1.6rem 1.4rem 4.5rem;
      color: #e5e7eb;
      line-height: 1.55;
    }
    .social-wrapper h1 {
      font-size: 1.45rem;
      margin-bottom: .35rem;
      color: #fff;
    }
    .social-wrapper .subtitle {
      color: #d4af37;
      margin-bottom: 1.2rem;
      font-weight: 500;
    }
    .social-block {
      background: rgba(15,23,42,0.35);
      border: 1px solid rgba(148,163,184,0.12);
      border-radius: 12px;
      padding: .95rem .85rem .95rem;
      margin-bottom: 1.1rem;
    }
    .social-block h2 {
      margin: 0 0 .6rem;
      font-size: 1rem;
      border-bottom: 1px solid rgba(212,175,55,0.12);
      padding-bottom: .35rem;
    }
    .inner-block {
      background: rgba(15,23,42,0.28);
      border: 1px solid rgba(148,163,184,0.08);
      border-radius: 10px;
      padding: .65rem .6rem .35rem;
      margin-bottom: .55rem;
    }
    .inner-block h3 {
      margin: 0 0 .4rem;
      font-size: .93rem;
      color: #fff;
    }
    .inner-block p {
      margin: 0 0 .35rem;
      font-size: .83rem;
      color: rgba(229,231,235,.9);
    }
    .close-social {
      margin-top: 2.5rem;
      background: rgba(212,175,55,0.15);
      border: 1px solid rgba(212,175,55,0.5);
      color: #fff;
      padding: .45rem .9rem;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.2s ease;
    }
    .close-social:hover {
      background: rgba(212,175,55,0.35);
    }
    @media (max-width: 720px) {
      .social-wrapper {
        padding: 1.1rem .6rem 4.5rem;
      }
      .social-block {
        padding: .8rem .6rem;
      }
      .inner-block {
        padding: .6rem .5rem .3rem;
      }
      .inner-block p {
        font-size: .78rem;
      }
    }
  `;
  document.head.appendChild(style);

  // --------------------------------------------------------------------
  // 4) EVENTS + EXPORTS – wie bei 02/03
  // --------------------------------------------------------------------

  // global verfügbar machen
  window.renderSocialZielgruppe4 = function (lang) {
    renderSocialZielgruppe4(lang || localStorage.getItem("fsa_lang") || "de");
  };

  // Datensatz exportieren
  window.FSA_SOCIAL_04 = CAMPUS_SOCIAL_04;

  // Öffnen über Event
  document.addEventListener("social:open-04", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    renderSocialZielgruppe4(lang);
  });

  // Sprache live umschalten, aber nur wenn 04 offen ist
  document.addEventListener("fsa:lang-change", (ev) => {
    const host = document.getElementById("socialContent");
    if (host && host.innerHTML.trim() !== "") {
      renderSocialZielgruppe4(ev.detail || "de");
    }
  });

  // Auto-Trigger via ?open=04
  const params = new URLSearchParams(window.location.search);
  if (params.get("open") === "04") {
    const lang = localStorage.getItem("fsa_lang") || "de";
    renderSocialZielgruppe4(lang);
  }
})();
