// /lp-anfang/library/js/text-campus/campus-social-02.js
// =====================================================================
// FSA – Social Toolkit (dezentral)
// Zielgruppe 2 – Angestellte / Berufstätige
// Vollständige Fassung DE / EN
// Schema vereinheitlicht mit social-01.js (=> blocks[])
// Verdrahtet auf: lang-switcher (fsa:lang-change)
// Export: window.FSA_SOCIAL_02
// =====================================================================

(function () {
  // 1. INHALT in Schema {de: {title, subtitle, blocks: [...]}, en: {...}}
  const SOCIAL_02 = {
    // ────────────────────────────────────────────────────────────────
    // DEUTSCH
    // ────────────────────────────────────────────────────────────────
    de: {
      title: "📘 Zielgruppe 2 – Angestellte / Berufstätige",
      subtitle: "Sicherheit neu denken – Unabhängigkeit mit dezentralen Strukturen und der FSA-Akademie",
      blocks: [
        // 1. WhatsApp / Messenger
        {
          heading: "1. WhatsApp / Facebook / Telegram – Textvorlagen",
          items: [
            {
              title: "Vorlage 1 – „Der Preis der Sicherheit“",
              body: [
                "Viele Menschen arbeiten härter als je zuvor – und doch wächst die Unsicherheit. Löhne stagnieren, Preise steigen, Zukunft bleibt unklar.",
                "Ich kenne das Gefühl, immer zu funktionieren – aber innerlich zu merken, dass sich nichts ändert.",
                "Genau darum gibt es die FSA-Akademie: Sie zeigt, wie man versteht, was mit Geld wirklich passiert, und wie man sich Schritt für Schritt absichern kann.",
                "Ein dezentrales Finanz-Setup setzt genau dort an: Einkommen, Rücklagen und Identität werden so organisiert, dass sie nicht nur an eine einzige Bank oder Plattform gebunden sind.",
                "➡️ Ich empfehle dir den kostenlosen Grundkurs – kein Risiko, aber vielleicht dein Wendepunkt. Dort siehst du auch, wie du deine eigenen Werkzeuge wählen kannst.",
                "👉 Wenn du willst, schick ich dir sofort den Link."
              ]
            },
            {
              title: "Vorlage 2 – „Zeit gegen Leben“",
              body: [
                "Viele verbringen ihre besten Stunden im Job – und tauschen jeden Monat Zeit gegen Geld, das kaum reicht.",
                "Freiheit klingt schön, aber wer zeigt einem, wie man sie wirklich erreicht?",
                "In der FSA-Akademie lernst du, wie Einkommen auch dann fließt, wenn du mal nicht arbeitest – durch Wissen, das kaum jemand teilt.",
                "Dazu gehört auch eine dezentrale Struktur für dein Geld: Du verteilst Werte auf Lösungen, bei denen du Zugriffe und Freigaben selbst bestimmst.",
                "➡️ Wenn du das Gefühl hast, du willst mehr vom Leben als Rechnungen – melde dich. Ich schick dir den Startlink.",
                "👉 15 Minuten Erklärung – du siehst sofort, ob es für dich passt."
              ]
            },
            {
              title: "Vorlage 3 – „Von Angst zu Klarheit“",
              body: [
                "Viele haben Angst vor der Zukunft – Inflation, KI, Jobabbau, Rente. Aber niemand erklärt, wie man sich vorbereitet.",
                "Der Grundkurs der FSA-Akademie öffnet genau da den Blick: Wie du Geldflüsse verstehst, digitale Chancen erkennst, Verantwortung übernimmst.",
                "Dazu kommen praktische Beispiele für dezentrale Konten- und Wallet-Strukturen, mit denen du Einkommen und Rücklagen weniger angreifbar machst.",
                "Kein Druck, kein Verkauf – nur Klarheit.",
                "➡️ Wenn du willst, dass dein Einkommen für dich arbeitet – nicht umgekehrt – ich zeig dir, wo du anfangen kannst.",
                "👉 Sag kurz Bescheid, dann schick ich dir alles rüber."
              ]
            }
          ]
        },

        // 2. E-Mails
        {
          heading: "2. E-Mail-Vorlagen (Kontaktaufnahme)",
          items: [
            {
              title: "E-Mail 1 – „Ein Kurs, der nicht verkauft – sondern erklärt“",
              body: [
                "Betreff: Kostenloser Grundkurs – Finanzielle Souveränität verstehen",
                "",
                "Hallo [Name],",
                "ich weiß, wie sich der Alltag anfühlt, wenn Arbeit alles bestimmt und am Monatsende wenig bleibt.",
                "Die FSA-Akademie bietet einen kostenlosen Einstiegskurs, der genau das aufbricht: Du lernst, wie Geld wirklich funktioniert – und warum kleine Entscheidungen große Wirkung haben können.",
                "Ich habe selbst dort angefangen – und es hat meinen Blick komplett verändert.",
                "Parallel dazu arbeite ich mit einem dezentralen Finanz-Setup, bei dem Einkommen und Werte nicht nur von einem einzigen Konto oder Anbieter abhängen.",
                "Willst du den Link? Ich schick ihn dir gern.",
                "Viele Grüße,",
                "[Dein Name]"
              ]
            },
            {
              title: "E-Mail 2 – „Mehr als nur Finanzen“",
              body: [
                "Betreff: Warum Wissen heute Sicherheit bedeutet",
                "",
                "Hallo [Name],",
                "wir leben in einer Zeit, in der Sicherheit teuer wird – aber Wissen kostenlos ist.",
                "Der Grundkurs der FSA-Akademie zeigt, wie du dein Einkommen schützt, Risiken erkennst und dich unabhängiger machst – ohne Werbung, ohne Verpflichtung.",
                "Dezentrale Konten- und Wallet-Lösungen ergänzen das Ganze auf der technischen Ebene: transparent, verteilte Verantwortung, weniger stille Eingriffe von Banken oder Institutionen.",
                "Wenn du dir zwei Stunden Zeit nimmst, wirst du verstehen, warum das Thema so viele bewegt.",
                "Ich helfe dir gern beim Einstieg.",
                "Herzliche Grüße,",
                "[Dein Name]"
              ]
            },
            {
              title: "E-Mail 3 – „Vom Funktionieren zum Verstehen“",
              body: [
                "Betreff: Wege aus der Abhängigkeit – kostenloser FSA-Grundkurs",
                "",
                "Hallo [Name],",
                "die meisten Menschen wissen alles über ihren Job – aber kaum etwas über das System, in dem ihr Geld verschwindet.",
                "Die FSA-Akademie hat das geändert. Im kostenlosen Grundkurs lernst du, wie du dein Geld, deine Zeit und deine Entscheidungen wieder selbst steuerst.",
                "Du bekommst außerdem Beispiele, wie Menschen ihre Einkommen und Vermögenswerte in dezentralen Strukturen organisieren, sodass sie weniger anfällig für Sperren und Zugriffe von außen sind.",
                "Ich war skeptisch, aber der Kurs spricht Klartext – ohne Fachchinesisch, ohne Verkaufsdruck.",
                "Wenn du willst, schick ich dir den Link.",
                "Beste Grüße,",
                "[Dein Name]"
              ]
            }
          ]
        },

        // 3. Telefon-Leitfäden
        {
          heading: "3. Telefon-Leitfäden (mit interner Anleitung)",
          items: [
            {
              title: "📞 Leitfaden 1 – Realität anerkennen – Sicherheit zurückholen",
              body: [
                "🔹 Interne Anleitung",
                "Ziel: Den Gesprächspartner spüren lassen, dass „Sicherheit“ heute keine Selbstverständlichkeit mehr ist.",
                "Emotion: ruhig, verständnisvoll, nicht ängstlich.",
                "Ablauf:",
                "1. Verbindung über Alltag und Unsicherheit herstellen",
                "2. Systemische Abhängigkeit (Bank, Staat, KI) ansprechen",
                "3. Risiko – Sperrungen, Zugriffe, Zwangsmaßnahmen",
                "4. Weg aus der Ohnmacht – Bildung (FSA) + eigene dezentrale Finanzstruktur",
                "5. Einladung zum Gespräch oder Grundkurs",
                "Hinweis: Nicht missionieren. Du bietest einen Weg an, keinen Dogmatismus.",
                "",
                "„Hallo [Name], darf ich ehrlich sein? Ich kenne kaum jemanden, der sich heute noch wirklich sicher fühlt. Preise steigen, Gesetze ändern sich ständig, und immer mehr hängt an zentralen Systemen – Banken, Arbeitgebern, Behörden.“",
                "„Viele geben alles, aber haben das Gefühl, die Kontrolle über ihr Leben zu verlieren. Manche hatten schon Kontosperrungen, andere fürchten, dass KI und neue EU-Verordnungen ihnen den Job nehmen.“",
                "„Ich arbeite deshalb mit der FSA-Akademie und einer ergänzenden, dezentralen Struktur für meine Geldflüsse – damit Entscheidungen wieder bei mir liegen.“",
                "„Es geht nicht um Reichtum, sondern um Sicherheit. Ich kann Ihnen das gern zeigen – 15 Minuten reichen. Wann passt es besser – heute Abend oder morgen Vormittag?“"
              ]
            },
            {
              title: "📞 Leitfaden 2 – Von Angst zu Handlung",
              body: [
                "🔹 Interne Anleitung",
                "Ziel: Angst und Ohnmacht in Handlungsenergie umwandeln.",
                "Fokus: Arbeitsplatz-, Existenz- und digitale Kontrollangst.",
                "Ablauf:",
                "1. Einstieg über Unsicherheit und Kontrollverlust",
                "2. Politische und regulatorische Eingriffe kurz anreißen (digitale Währungen, Konto-Monitoring)",
                "3. Lösung: dezentrale Systeme als Ergänzung + Bildung in der FSA-Akademie",
                "4. Abschluss: Einladung zum Gespräch",
                "Wichtig: Nicht drohen. Immer sagen: „Es gibt einen Weg.“",
                "",
                "„Hallo [Name], ich rufe an, weil viele sagen: ‘Man arbeitet und spart, aber alles wird enger.’ Kennen Sie das?“",
                "„Viele merken nicht, wie sehr sie von Systemen abhängig sind, die sie nicht beeinflussen können. Ein Klick – und das Konto ist gesperrt. Ein neues Gesetz – und eine Abgabe kommt.“",
                "„Mit einer eigenen, dezentralen Struktur kann man Werte und Zahlungen besser verteilen und unter eigener Kontrolle behalten. Und in der FSA-Akademie lernt man, wie man sich schon heute darauf vorbereitet.“",
                "„Keine Theorie, keine Verkaufsnummer – nur Information. Wollen wir das kurz durchgehen? 15 Minuten reichen.“"
              ]
            },
            {
              title: "📞 Leitfaden 3 – Aus der Abhängigkeit in die Freiheit",
              body: [
                "🔹 Interne Anleitung",
                "Ziel: Begreifen lassen, dass „Normalität“ Abhängigkeit bedeutet – und dass mehr Freiheit wieder möglich ist.",
                "Themen: digitale Zentralwährungen, Social Credit, politische Zugriffe.",
                "Ablauf:",
                "1. Persönliche Frage zum Sicherheitsgefühl",
                "2. Realbeispiel (Sperrung, Zwangskontrolle)",
                "3. Lösung: dezentrale Selbstverwaltung + digitale Souveränität mit eigenem Werkzeug-Setup",
                "4. Einladung zum Online-Call",
                "Tonalität: ruhig, souverän, nicht verschwörerisch.",
                "",
                "„[Name], darf ich Sie direkt fragen? Wenn morgen Ihr Konto gesperrt wird oder eine neue Regel Ihre Arbeit verändert – wären Sie vorbereitet?“",
                "„Viele verlassen sich auf Systeme, die ihnen nicht gehören. Digitale Zentralwährungen und Überwachung kommen – und damit mehr Kontrolle über unser Leben.“",
                "„Mit einer Kombination aus Wissen (FSA-Akademie) und dezentral organisierten Werten bauen wir eine Gegenstrategie auf: klare Freigaben, verteilte Zugriffe, weniger Abhängigkeit von einem einzigen System.“",
                "„Ich zeige Ihnen gern, wie das grundsätzlich geht. Wann passt ein kurzes Gespräch besser – morgen Vormittag oder nach Feierabend?“"
              ]
            }
          ]
        },

        // 4. Snippets
        {
          heading: "4. Share-Snippets",
          items: [
            {
              title: "Snippet 1",
              body: [
                "„Viele arbeiten hart, aber kaum jemand versteht, warum Geld immer knapper wird. Lern’s im kostenlosen FSA-Grundkurs – und baue dir danach dein eigenes dezentrales Sicherheitsnetz auf.“"
              ]
            },
            {
              title: "Snippet 2",
              body: [
                "„Wenn du keine Zeit hast, brauchst du Systeme. Die FSA-Akademie erklärt dir die Zusammenhänge – und zeigt, wie du dein Geld technisch absicherst.“"
              ]
            },
            {
              title: "Snippet 3",
              body: [
                "„Zukunftsangst bleibt, bis du verstehst, wie Geld wirklich funktioniert – und wie du es in eigenen, dezentralen Strukturen organisierst.“"
              ]
            }
          ]
        }
      ]
    },

    // ────────────────────────────────────────────────────────────────
    // ENGLISH
    // ────────────────────────────────────────────────────────────────
    en: {
      title: "📘 Target Group 2 – Employees & Professionals",
      subtitle: "Rethinking security – independence with decentralized setups and the FSA Academy",
      blocks: [
        {
          heading: "1. WhatsApp / Facebook / Telegram – templates",
          items: [
            {
              title: "Template 1 – “The cost of feeling safe”",
              body: [
                "Many people work harder than ever – and still feel less secure. Salaries stagnate, prices go up, the future feels unstable.",
                "That feeling of ‘I keep running, but nothing really changes’ – that’s exactly where we start.",
                "The FSA Academy explains how money flows actually work and how you can protect yourself step by step.",
                "A decentralized financial setup adds the technical side: your income and savings are not tied to one single bank or platform.",
                "➡️ My recommendation is to start with the free basic course – no risk, but it might be a turning point. From there you can choose the tools that fit you.",
                "👉 If you like, I can send you the link right away."
              ]
            },
            {
              title: "Template 2 – “Time vs. life”",
              body: [
                "Most people trade their best hours for money – and still it is barely enough.",
                "Freedom sounds great – but hardly anyone shows you how to move in that direction.",
                "Inside the FSA Academy you learn how to build income streams that do not depend only on your monthly job.",
                "On the technical side you can add a decentralized structure for your money, where you control access rights and approvals yourself.",
                "➡️ If you feel you want more than just paying bills, tell me. I’ll send you the starting link.",
                "👉 15 minutes of explanation and you will know if it’s for you."
              ]
            },
            {
              title: "Template 3 – “From fear to clarity”",
              body: [
                "People worry about inflation, AI, job cuts, pensions – but nobody explains how to prepare.",
                "The FSA Academy gives you the bigger picture: how to read money flows, spot digital opportunities and take responsibility.",
                "You also see practical examples of decentralized account and wallet structures that make income and reserves less vulnerable to blocks and outages.",
                "No pressure, no sales pitch – just clarity.",
                "➡️ If you want your income to work for you – not the other way round – I can show you where to start.",
                "👉 Send me a quick message and I’ll forward everything."
              ]
            }
          ]
        },

        {
          heading: "2. Email templates (outreach)",
          items: [
            {
              title: "Email 1 – “A course that explains, not sells”",
              body: [
                "Subject: Free intro course – understanding financial sovereignty",
                "",
                "Hi [Name],",
                "I know what it feels like when work dominates everything and still nothing is really secure at the end of the month.",
                "The FSA Academy offers a free starter course that breaks this pattern: you learn how money actually works – and why small decisions can make a big difference.",
                "That course completely changed the way I look at my own finances.",
                "Alongside it I use a decentralized setup for my income and assets, so they don’t depend on a single account or provider.",
                "Would you like the link? I’m happy to send it.",
                "Best regards,",
                "[Your Name]"
              ]
            },
            {
              title: "Email 2 – “More than just finances”",
              body: [
                "Subject: Why knowledge means security today",
                "",
                "Hello [Name],",
                "we live in a time where personal security gets expensive – but knowledge is still free.",
                "The FSA Academy’s basic course shows how to protect your income, recognize risks and become more independent – without advertising or obligations.",
                "Decentralized account and wallet solutions add the technical layer: transparent, distributed and less prone to silent interventions from banks or institutions.",
                "If you invest two hours to watch it, you’ll understand why this topic is gaining attention.",
                "Happy to help you get started.",
                "Kind regards,",
                "[Your Name]"
              ]
            },
            {
              title: "Email 3 – “From functioning to understanding”",
              body: [
                "Subject: Ways out of financial dependency – free FSA basic course",
                "",
                "Hello [Name],",
                "most people know their job inside out – but almost nothing about the system their money disappears into.",
                "The FSA Academy changed that for me. In the free basic course you learn how to take control of your money, your time and your decisions again.",
                "You also see how people organise income and assets in decentralized structures so they are less exposed to blocks or external access.",
                "I was skeptical at first, but the course is straightforward – no jargon, no pressure.",
                "If you like, I’ll send you the link.",
                "Best regards,",
                "[Your Name]"
              ]
            }
          ]
        },

        {
          heading: "3. Call scripts (with internal guidance)",
          items: [
            {
              title: "📞 Call script 1 – Face reality, reclaim security",
              body: [
                "🔹 Internal guidance",
                "Goal: help them feel that ‘security’ today is no longer a given.",
                "Tone: calm, empathetic, factual.",
                "Steps:",
                "1. connect via everyday pressure",
                "2. name system dependency (bank, state, employer, AI)",
                "3. outline risks (freezes, access, new rules)",
                "4. way out: education (FSA) + personal decentralized structure for income and savings",
                "5. invite to a short call or the basic course",
                "",
                "“Hello [Name], can I be honest? I hardly know anyone who still feels truly secure. Prices rise, laws change, and more and more depends on central systems – banks, employers, authorities.”",
                "“Many people give everything, but feel they are losing control over their life. Some already had account issues, others are afraid of AI and new EU regulations.”",
                "“That’s why I work with the FSA Academy and an additional decentralized setup for my money flows – so that decisions come back to me.”",
                "“It’s not about getting rich, it’s about not being helpless. I can show you the basics in 15 minutes. What suits you better – this evening or tomorrow morning?”"
              ]
            },
            {
              title: "📞 Call script 2 – Turn fear into action",
              body: [
                "🔹 Internal guidance",
                "Goal: transform anxiety into a concrete next step.",
                "Focus: job security, cost of living, digital control.",
                "Steps:",
                "1. start with the feeling of ‘getting tighter’",
                "2. point to political and regulatory trends (digital currencies, monitoring)",
                "3. offer solution: decentralized setups as complement + FSA for understanding",
                "4. close with invitation to 15 min call",
                "",
                "“Hi [Name], I’m calling because many people tell me: ‘I work and save, but it gets tighter every year.’ Do you know that feeling?”",
                "“Often that’s because their income sits entirely in systems they can’t influence. One click – and access is restricted. One new rule – and fees or limits appear.”",
                "“With a personal decentralized structure you can spread values and keep more control over how money moves. And the FSA Academy explains how to prepare for this now.”",
                "“No hype, no pressure – just information. Shall we go through it briefly? 15 minutes is enough.”"
              ]
            },
            {
              title: "📞 Call script 3 – From dependency to more freedom",
              body: [
                "🔹 Internal guidance",
                "Goal: make them see that ‘normal’ often means dependent – and that more freedom is possible.",
                "Topics: digital currencies, social-credit-style systems, political access.",
                "Steps:",
                "1. ask about their feeling of security",
                "2. share a real-world example (blocking, forced control)",
                "3. solution: decentralized self-management + digital sovereignty with tools they choose themselves",
                "4. invite to online call",
                "Tone: calm, confident, not conspiratorial.",
                "",
                "“[Name], may I ask you directly? If tomorrow your main account were restricted or a new rule changed your work situation – would you be prepared?”",
                "“Most people rely on systems they don’t own. Digital central-bank money and more monitoring are coming – and with that, more control over our lives.”",
                "“By combining knowledge from the FSA Academy with a decentralized way of organising your assets, you build a counter-strategy: clear approvals, distributed access, less dependency on a single system.”",
                "“I’m happy to show you the basic idea. When is a short conversation easier – tomorrow morning or after work?”"
              ]
            }
          ]
        },

        {
          heading: "4. Share snippets",
          items: [
            {
              title: "Snippet 1",
              body: [
                "“Most people work hard, but few understand why money keeps getting tighter. Start with the free FSA intro course – then build your own decentralized safety net.”"
              ]
            },
            {
              title: "Snippet 2",
              body: [
                "“No time? Then you need systems. The FSA Academy explains the logic – and shows how to secure your money technically.”"
              ]
            },
            {
              title: "Snippet 3",
              body: [
                "“Future anxiety stays until you understand how money really works – and how to organise it in your own decentralized structures.”"
              ]
            }
          ]
        }
      ]
    }
  };

  // 2. GLOBAL EXPORT (für social.html)
  window.FSA_SOCIAL_02 = SOCIAL_02;

  // 3. OPTIONAL: eigener Renderer (wie bei 01 nutzbar)
  function createHost() {
    let host = document.getElementById("socialContent");
    if (!host) {
      host = document.createElement("div");
      host.id = "socialContent";
      document.body.appendChild(host);
    }
    return host;
  }

  function renderSocial02(lang) {
    const data = SOCIAL_02[lang] || SOCIAL_02.de;
    const host = createHost();
    host.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "social-wrap-02";

    const h1 = document.createElement("h1");
    h1.textContent = data.title;
    wrap.appendChild(h1);

    const sub = document.createElement("p");
    sub.className = "social-subtitle-02";
    sub.textContent = data.subtitle;
    wrap.appendChild(sub);

    (data.blocks || []).forEach((block, idx) => {
      const sec = document.createElement("section");
      sec.className = "social-sec-02";

      const h2 = document.createElement("h2");
      h2.textContent = block.heading || ((lang === "de" ? "Bereich " : "Section ") + (idx + 1));
      sec.appendChild(h2);

      (block.items || []).forEach((item) => {
        const art = document.createElement("article");
        art.className = "social-card-02";

        if (item.title) {
          const h3 = document.createElement("h3");
          h3.textContent = item.title;
          art.appendChild(h3);
        }

        (item.body || []).forEach((line) => {
          const p = document.createElement("p");
          p.textContent = line;
          art.appendChild(p);
        });

        sec.appendChild(art);
      });

      wrap.appendChild(sec);
    });

    const close = document.createElement("button");
    close.type = "button";
    close.className = "social-close-02";
    close.textContent = lang === "de" ? "Schließen" : "Close";
    close.addEventListener("click", () => {
      host.innerHTML = "";
      document.dispatchEvent(new CustomEvent("social:closed", { detail: "02" }));
    });
    wrap.appendChild(close);

    host.appendChild(wrap);
  }

  // 4. Styles (ähnlich wie 01, eigener Prefix)
  const style = document.createElement("style");
  style.textContent = `
    #socialContent {
      width: min(1100px, 100%);
      margin: 0 auto;
      padding: 1.2rem 1rem 2.4rem;
      box-sizing: border-box;
    }
    .social-wrap-02 {
      background: rgba(11,15,20,0.85);
      border: 1px solid rgba(212,175,55,0.25);
      border-radius: 16px;
      backdrop-filter: blur(8px);
      padding: 1.4rem 1.3rem 2.8rem;
      color: #e5e7eb;
      line-height: 1.55;
      box-shadow: 0 20px 40px rgba(0,0,0,0.35);
    }
    .social-wrap-02 h1 {
      font-size: 1.55rem;
      margin-bottom: .35rem;
      color: #fff;
    }
    .social-subtitle-02 {
      color: rgba(229,231,235,.7);
      margin-bottom: 1.2rem;
    }
    .social-sec-02 {
      margin-bottom: 1.6rem;
    }
    .social-sec-02 h2 {
      font-size: 1rem;
      margin-bottom: .6rem;
      border-bottom: 1px solid rgba(212,175,55,0.28);
      padding-bottom: .3rem;
      color: #ffda6a;
    }
    .social-card-02 {
      background: rgba(15,23,42,0.35);
      border: 1px solid rgba(148,163,184,0.14);
      border-radius: 12px;
      padding: .75rem .85rem .6rem;
      margin-bottom: .65rem;
    }
    .social-card-02 h3 {
      margin: 0 0 .35rem;
      font-size: .9rem;
      color: #fff;
    }
    .social-card-02 p {
      margin: 0 0 .35rem;
      font-size: .82rem;
    }
    .social-close-02 {
      margin-top: 1.2rem;
      background: rgba(212,175,55,0.18);
      border: 1px solid rgba(212,175,55,0.6);
      padding: .45rem 1.2rem;
      border-radius: 999px;
      color: #fff;
      cursor: pointer;
    }
    @media (max-width: 720px) {
      .social-wrap-02 {
        padding: 1rem .6rem 2.6rem;
      }
      .social-card-02 p {
        font-size: .78rem;
      }
    }
  `;
  document.head.appendChild(style);

  // 5. Events wie bei 01
  document.addEventListener("social:open-02", () => {
    const lang = localStorage.getItem("fsa_lang") || "de";
    renderSocial02(lang);
  });

  // 6. Sprachwechsel
  document.addEventListener("fsa:lang-change", (ev) => {
    const lang = ev.detail || "de";
    const host = document.getElementById("socialContent");
    if (host && host.innerHTML.trim() !== "") {
      renderSocial02(lang);
    }
  });

  // 7. URL-Parameter ?open=02
  const params = new URLSearchParams(window.location.search);
  if (params.get("open") === "02") {
    const lang = localStorage.getItem("fsa_lang") || "de";
    renderSocial02(lang);
    }
})();
