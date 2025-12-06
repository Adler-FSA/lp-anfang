// /lp-anfang/library/js/text-campus/campus-social-04.js
// ======================================================================
// FSA – Social Set 04 (dezentral)
// Zielgruppe 4 – Alleinerziehende, Rentner/Pensionierte, Studenten/Azubis
// Vollversion DE + EN, produktneutral
// Verdrahtet auf: lang-switcher.js  (event: fsa:lang-change)
// Anzeige: eigener Container (#socialContent) + Schließen-Button
// ======================================================================

(function () {
  // --------------------------------------------------------------------
  // 1) DATENBASIS – produktneutral (FSA + eigene dezentrale Lösungen)
  // --------------------------------------------------------------------
  const CAMPUS_SOCIAL_04 = {
    meta: {
      id: "tg4",
      group: "fsa-dezentral",
      version: "1.0.1",
      title_de: "Zielgruppe 4 – Alleinerziehende, Rentner & Studenten",
      title_en: "Target Group 4 – Single Parents, Retirees & Students",
      topic_de: "Sicherheit, Würde und Zukunft in unsicheren Zeiten",
      topic_en: "Security, dignity and future in uncertain times",
      lastUpdate: "2025-12-06",
      source: "FSA – Social Set 04 (dezentral)"
    },

    // ░░ DEUTSCH ░░
    de: {
      title: "Zielgruppe 4 – Alleinerziehende, Rentner & Studenten",
      intro:
        "Drei Lebenssituationen, ein gemeinsamer Druck: Alles wird teurer, alles wird digitaler, alles wird kontrollierter. Diese Vorlagen zeigen: Mit der FSA-Akademie (Verstehen) und einem eigenen dezentralen Finanz-Setup kann man trotzdem souverän bleiben.",
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
                "Ich habe mir ein eigenes dezentrales Finanz-Setup aufgebaut – dort verwalte ich mein Geld selbst, ohne Zwischeninstanzen, transparent und gut verteilt.",
                "Die FSA-Akademie zeigt Schritt für Schritt, wie man wieder Kontrolle bekommt – und mehr Zeit für die Familie statt nur Papierkram hat.",
                "➡️ Willst du sehen, wie einfach das grundsätzlich funktionieren kann? Ich zeig es dir kurz online.“"
              ]
            },
            {
              heading: "💌 2. E-Mail",
              body: [
                "Betreff: Mehr Ruhe – trotz aller Verantwortung",
                "Hallo [Name],",
                "ich weiß, wie es ist, wenn man alles allein stemmt – Rechnungen, Kinder, Sorgen.",
                "Darum hab ich nach einer Lösung gesucht, wie ich mein Geld wirklich sicher und unter eigener Kontrolle verwalten kann.",
                "Die FSA-Akademie hat mir gezeigt, wie das Finanzsystem tickt, und über ein eigenes dezentrales Konten- und Wallet-Setup habe ich mir eine zusätzliche Sicherheitsschicht aufgebaut.",
                "Ich fühl mich zum ersten Mal ruhiger, weil ich weiß, dass ein Teil meines Einkommens nicht nur an ein einziges Konto gebunden ist.",
                "Wenn du magst, schick ich dir den Link zum Einstieg.",
                "Herzliche Grüße, [Dein Name]"
              ]
            },
            {
              heading: "📞 3. Telefon-Leitfaden",
              body: [
                "🔹 Interne Anleitung",
                "Ziel: Verständnis und Erleichterung vermitteln. Keine Finanzsprache, sondern Mitgefühl und eine ruhige, praktische Lösung.",
                "Dauer: 5–7 Minuten.",
                "Zielhandlung: 15-Minuten-Gespräch oder Online-Einblick vereinbaren.",
                "",
                "🔹 Vorlese-Skript",
                "„Hey [Name], ich weiß, du trägst viel Verantwortung allein.",
                "Gerade jetzt wird alles unsicherer – Preise, Gesetze, Banken.",
                "Ich wollt dir etwas zeigen, das mir wirklich Ruhe gibt: Ich habe mir ein dezentrales Finanz-Setup aufgebaut, bei dem nicht eine einzige Bank alles entscheidet.",
                "Mein Geld liegt nicht mehr ausschließlich bei Dritten, sondern in einer Struktur, die ich selbst steuere.",
                "Und die FSA-Akademie hilft zu verstehen, wie man so etwas Schritt für Schritt aufbaut.",
                "Ich kann dir das in 15 Minuten erklären – kein Verkauf, einfach Aufklärung. Wann passt dir?“"
              ]
            },
            {
              heading: "🔗 4. Share-Snippets",
              body: [
                "1️⃣ „Sicherheit beginnt mit Verständnis – die FSA zeigt den Weg, ein dezentrales Setup macht dich unabhängiger.“",
                "2️⃣ „Alleinerziehend heißt nicht allein – Wissen und ein eigener Plan B geben dir Kontrolle über dein Geld zurück.“",
                "3️⃣ „Weniger Sorge, mehr Sicherheit – starte mit Wissen und einer Struktur, die du selbst steuerst.“"
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
                "Ich habe eine Lösung gefunden, die mir Ruhe gibt: ein eigenes dezentrales Werte-Setup, bei dem ich nicht alles einer Bank überlasse.",
                "Die FSA-Akademie erklärt einfach, wie man sich vorbereitet, bevor alles vollständig digital überwacht und gesteuert wird.",
                "➡️ Wenn Sie möchten, zeige ich Ihnen die Grundidee – es hat mir wirklich geholfen.“"
              ]
            },
            {
              heading: "💌 2. E-Mail",
              body: [
                "Betreff: Kontrolle über das Eigene behalten",
                "Sehr geehrter [Name],",
                "viele Menschen merken, wie schnell sich alles ändert – digitale Währungen, Bankrichtlinien, Zugriffe auf Konten.",
                "Ich habe mich intensiver damit beschäftigt und einen Weg gefunden, unabhängiger zu werden: ein eigenes dezentrales Finanz-Setup als Ergänzung zum normalen Konto.",
                "Damit verwaltet man einen Teil seines Geldes selbst – verteilt, sicherer und weniger anfällig für einseitige Sperren.",
                "Die FSA-Akademie zeigt in klaren, verständlichen Schritten, wie das System dahinter funktioniert und warum es so wichtig wird.",
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
                "Ich möchte Ihnen zeigen, wie man einen Teil seines Geldes wieder selbst verwalten kann – in einer dezentralen Struktur, die nicht nur an ein einziges Konto gebunden ist.",
                "So haben Sie zusätzliche Sicherheit, ohne alles umzuschmeißen.",
                "Über die FSA-Akademie wird das alles einfach und nachvollziehbar erklärt.",
                "Wollen wir uns das gemeinsam in einem kurzen Gespräch ansehen?“"
              ]
            },
            {
              heading: "🔗 4. Share-Snippets",
              body: [
                "1️⃣ „Sicherheit im Alter bedeutet, selbst zu entscheiden – die FSA zeigt, wie ein eigener Plan B aussehen kann.“",
                "2️⃣ „Digitale Rente ohne Ohnmacht – mit Wissen und einem dezentralen Werte-Setup die eigene Würde bewahren.“",
                "3️⃣ „Selbstbestimmt statt ausgeliefert – Wissen schützt Werte, solange du rechtzeitig handelst.“"
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
                "Mit einem eigenen dezentralen Wallet- und Konten-Setup kannst du dein Geld und deine Werte selbst verwalten – ohne dass alles an einer einzigen Stelle hängt.",
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
                "Über ein dezentrales Finanz-Setup habe ich gelernt, wie ich mein Geld selbst verteilen und absichern kann – nicht nur über eine Bank.",
                "Und die FSA-Akademie hat mir gezeigt, wie das alles zusammenhängt und warum das Thema so wichtig wird.",
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
                "Zielhandlung: kurzes Online-Gespräch oder Einblick in FSA + dezentrales Setup.",
                "",
                "🔹 Vorlese-Skript",
                "„Hey [Name], ich frag mal ehrlich – hast du jemals darüber nachgedacht, wer wirklich die Kontrolle über dein Geld hat?",
                "Die meisten wissen gar nicht, wie abhängig sie sind – von Banken und Algorithmen.",
                "Mit einem eigenen dezentralen Finanz-Setup kannst du das verändern – überschaubar, Schritt für Schritt und technisch längst möglich.",
                "Und die FSA-Akademie zeigt dir, warum Zukunft und Freiheit genau damit zusammenhängen.",
                "Ich zeig’s dir in 15 Minuten – magst du?“"
              ]
            },
            {
              heading: "🔗 4. Share-Snippets",
              body: [
                "1️⃣ „Versteh das System – bevor es dich bestimmt. Die FSA zeigt den Weg zur echten Unabhängigkeit.“",
                "2️⃣ „Freiheit ist kein Trend, sondern Wissen – und Wissen beginnt heute.“",
                "3️⃣ „Zukunft selbst steuern – mit klaren Grundlagen und einem dezentralen Plan B für dein Geld.“"
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
        "Three vulnerable situations, one underlying pattern: rising prices, more digital control, less stability. These texts combine FSA Academy (understanding the system) with the idea of building your own small decentralized financial setup as an extra layer of security.",
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
                "I started to build my own small decentralized setup for my money – where I don’t rely on one single bank account.",
                "The FSA Academy shows step by step how to regain control – and create more time for family instead of paperwork.",
                "➡️ Want to see how simple the basic idea is? I can show you quickly online.”"
              ]
            },
            {
              heading: "💌 2. Email",
              body: [
                "Subject: More peace – even with all this responsibility",
                "Hi [Name],",
                "I know how it feels when you have to manage everything alone – bills, kids, worries.",
                "That’s why I looked for a way to really secure and control my money myself.",
                "The FSA Academy helped me understand how the financial system works, and with a small decentralized setup I’ve added an extra layer of security to my income.",
                "For the first time I feel calmer, because I know not everything depends on one single account.",
                "If you like, I’ll send you the starter link.",
                "Best regards, [Your Name]"
              ]
            },
            {
              heading: "📞 3. Phone guide",
              body: [
                "🔹 Internal notes",
                "Goal: convey care and relief, not pressure or hype.",
                "Length: 5–7 minutes.",
                "Target action: book a 15-minute online call.",
                "",
                "🔹 Script",
                "“Hey [Name], I know you’re carrying a lot on your own.",
                "Right now everything gets more unstable – prices, rules, banks.",
                "I wanted to show you something that really calmed me down: I built a small decentralized setup so not everything sits on one bank account.",
                "Part of my money is now in a structure that I manage myself.",
                "And the FSA Academy explains how to set this up step by step.",
                "I can walk you through it in 15 minutes – no sales, just clarity. When is better for you?”"
              ]
            },
            {
              heading: "🔗 4. Share snippets",
              body: [
                "1️⃣ “Security starts with understanding – FSA shows the way, a decentralized setup makes you less dependent.”",
                "2️⃣ “Single parent doesn’t mean alone – knowledge and a plan B give you back control over your money.”",
                "3️⃣ “Less worry, more safety – start with knowledge and a structure you manage yourself.”"
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
                "“Many pensions are no longer enough – and new rules reach deeper and deeper into our accounts.",
                "I found something that gave me peace of mind: a decentralized way of holding part of my money so I don’t rely only on one bank.",
                "The FSA Academy explains how to prepare before everything is fully digital and monitored.",
                "➡️ If you want, I can show you the basic idea – it really helped me.”"
              ]
            },
            {
              heading: "💌 2. Email",
              body: [
                "Subject: Keeping control over what is yours",
                "Dear [Name],",
                "many people notice how fast everything changes – digital currencies, bank policies, access restrictions.",
                "I looked into it and found a way to become a bit more independent: a small decentralized financial setup next to the normal bank account.",
                "It allows you to manage part of your money yourself – more diversified and less vulnerable to one-sided blocks.",
                "The FSA Academy shows in clear, simple steps how the system behind this works and why it will become important.",
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
                "I’d like to show you how to manage part of your money yourself – in a decentralized structure, so not everything depends on a single account.",
                "That way you add an extra layer of safety without changing everything at once.",
                "Through the FSA Academy everything is explained simply and clearly.",
                "Shall we go through it together in a short call?”"
              ]
            },
            {
              heading: "🔗 4. Share snippets",
              body: [
                "1️⃣ “Real safety in retirement means: you decide. FSA shows what a personal plan B can look like.”",
                "2️⃣ “Digital pensions without losing control – with knowledge and a decentralized setup you keep your dignity.”",
                "3️⃣ “Self-determined instead of dependent – knowledge protects your values if you act in time.”"
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
                "With your own small decentralized wallet and account setup you can manage your money and your values yourself – so not everything sits in one place.",
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
                "By building a decentralized plan B I learned how to distribute and secure my money myself – not only through one bank.",
                "And the FSA Academy showed me how it’s all connected and why this topic will matter even more.",
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
                "Target: short online call or intro into FSA + decentralized setup.",
                "",
                "🔹 Script",
                "“Hey [Name], can I ask you straight – have you ever thought about who really controls your money?",
                "Most people don’t realize how dependent they are – on banks and algorithms.",
                "With a simple decentralized financial setup you can change that – step by step, with tools that already exist.",
                "And the FSA Academy shows why future and freedom are directly connected to this.",
                "Takes 15 minutes – want me to walk you through it?”"
              ]
            },
            {
              heading: "🔗 4. Share snippets",
              body: [
                "1️⃣ “Understand the system – before it defines you. FSA shows the way to real independence.”",
                "2️⃣ “Freedom is not a trend – it’s knowledge. And knowledge starts today.”",
                "3️⃣ “Steer your future yourself – with clear basics and a decentralized plan B for your money.”"
              ]
            }
          ]
        }
      ]
    }
  };

  // --------------------------------------------------------------------
  // 2) RENDERER – baut HTML in #socialContent (wie 02/03)
  // --------------------------------------------------------------------
  function renderSocialZielgruppe4(lang) {
    const currentLang = lang || localStorage.getItem("fsa_lang") || "de";
    const data = CAMPUS_SOCIAL_04[currentLang] || CAMPUS_SOCIAL_04.de;

    // nur rendern, wenn #socialContent existiert
    let host = document.getElementById("socialContent");
    if (!host) return;

    host.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "social-wrapper";

    const h1 = document.createElement("h1");
    h1.textContent = data.title;
    wrap.appendChild(h1);

    if (data.intro) {
      const intro = document.createElement("p");
      intro.className = "subtitle";
      intro.textContent = data.intro;
      wrap.appendChild(intro);
    }

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

  window.renderSocialZielgruppe4 = function (lang) {
    renderSocialZielgruppe4(lang || localStorage.getItem("fsa_lang") || "de");
  };

  window.FSA_SOCIAL_04 = CAMPUS_SOCIAL_04;

  document.addEventListener("social:open-04", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    renderSocialZielgruppe4(lang);
  });

  document.addEventListener("fsa:lang-change", (ev) => {
    const host = document.getElementById("socialContent");
    if (host && host.innerHTML.trim() !== "") {
      renderSocialZielgruppe4(ev.detail || "de");
    }
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get("open") === "04") {
    const lang = localStorage.getItem("fsa_lang") || "de";
    renderSocialZielgruppe4(lang);
  }
})();
