// library/js/text-social-02.js
// =====================================================================
// FSA / Trustyfy – Social Toolkit
// Zielgruppe 2 – Angestellte / Berufstätige
// Vollständige Fassung DE / EN
// Verdrahtet auf: library/js/lang-switcher.js
// Anzeige: eigener Container + Schließen-Button
// Keine Kürzungen, keine Platzhalter
// =====================================================================

(function () {
  // -------------------------------------------------------------------
  // 1) DATENBASIS
  // -------------------------------------------------------------------
  const TEXT_SOCIAL_02 = {
    de: {
      meta: {
        id: "social-zg2",
        title: "Zielgruppe 2 – Angestellte / Berufstätige",
        subtitle: "Sicherheit neu denken – Unabhängigkeit mit Trustyfy und der FSA-Akademie",
        hint: "Tipp: Für bessere Lesbarkeit auf dem Handy quer drehen."
      },
      whatsapp: [
        {
          title: "Vorlage 1 – „Der Preis der Sicherheit“",
          body: [
            "Viele Menschen arbeiten härter als je zuvor – und doch wächst die Unsicherheit. Löhne stagnieren, Preise steigen, Zukunft bleibt unklar.",
            "Ich kenne das Gefühl, immer zu funktionieren – aber innerlich zu merken, dass sich nichts ändert.",
            "Genau darum gibt es die FSA-Akademie: Sie zeigt, wie man versteht, was mit Geld wirklich passiert, und wie man sich Schritt für Schritt absichern kann.",
            "Trustyfy setzt genau dort an: Es schützt Einkommen, Werte und Identität dezentral – ohne Bank, ohne stille Sperren, ohne Dritte.",
            "➡️ Ich empfehle dir den kostenlosen Grundkurs – kein Risiko, aber vielleicht dein Wendepunkt.",
            "👉 Wenn du willst, schick ich dir sofort den Link."
          ]
        },
        {
          title: "Vorlage 2 – „Zeit gegen Leben“",
          body: [
            "Viele verbringen ihre besten Stunden im Job – und tauschen jeden Monat Zeit gegen Geld, das kaum reicht.",
            "Freiheit klingt schön, aber wer zeigt einem, wie man sie wirklich erreicht?",
            "In der FSA-Akademie lernst du, wie Einkommen auch dann fließt, wenn du mal nicht arbeitest – durch Wissen, das kaum jemand teilt.",
            "Trustyfy ist die technische Seite davon: Dein Geld bleibt bei dir, auch wenn Systeme wackeln oder Gesetze nachziehen.",
            "➡️ Wenn du das Gefühl hast, du willst mehr vom Leben als Rechnungen – melde dich. Ich schick dir den Startlink.",
            "👉 15 Minuten Erklärung – du siehst sofort, ob es für dich passt."
          ]
        },
        {
          title: "Vorlage 3 – „Von Angst zu Klarheit“",
          body: [
            "Viele haben Angst vor der Zukunft – Inflation, KI, Jobabbau, Rente. Aber niemand erklärt, wie man sich vorbereitet.",
            "Der Grundkurs der FSA-Akademie öffnet genau da den Blick: Wie du Geldflüsse verstehst, digitale Chancen erkennst, Verantwortung übernimmst.",
            "Trustyfy liefert dazu die Praxis: Einkommen dezentral sichern, vor Pfändungen und Kontosperren schützen, Abhängigkeit von Banken reduzieren.",
            "Kein Druck, kein Verkauf – nur Klarheit.",
            "➡️ Wenn du willst, dass dein Einkommen für dich arbeitet – nicht umgekehrt – ich zeig dir, wo du anfangen kannst.",
            "👉 Sag kurz Bescheid, dann schick ich dir alles rüber."
          ]
        }
      ],
      emails: [
        {
          title: "E-Mail 1 – „Ein Kurs, der nicht verkauft – sondern erklärt“",
          subject: "Kostenloser Grundkurs – Finanzielle Souveränität verstehen",
          body: [
            "Hallo [Name],",
            "ich weiß, wie sich der Alltag anfühlt, wenn Arbeit alles bestimmt und am Monatsende wenig bleibt.",
            "Die FSA-Akademie bietet einen kostenlosen Einstiegskurs, der genau das aufbricht: Du lernst, wie Geld wirklich funktioniert – und warum kleine Entscheidungen große Wirkung haben können.",
            "Ich habe selbst dort angefangen – und es hat meinen Blick komplett verändert.",
            "Parallel dazu arbeite ich mit Trustyfy – einer dezentralen Lösung, mit der man Einkommen und Werte so verwalten kann, dass kein Dritter sie einfach sperrt oder einzieht.",
            "Willst du den Link? Ich schick ihn dir gern.",
            "Viele Grüße,",
            "[Dein Name]"
          ]
        },
        {
          title: "E-Mail 2 – „Mehr als nur Finanzen“",
          subject: "Warum Wissen heute Sicherheit bedeutet",
          body: [
            "Hallo [Name],",
            "wir leben in einer Zeit, in der Sicherheit teuer wird – aber Wissen kostenlos ist.",
            "Der Grundkurs der FSA-Akademie zeigt, wie du dein Einkommen schützt, Risiken erkennst und dich unabhängig machst – ohne Werbung, ohne Verpflichtung.",
            "Trustyfy ergänzt das Ganze auf der technischen Ebene: Dezentral, transparent, keine stillen Eingriffe von Banken oder Institutionen.",
            "Wenn du dir zwei Stunden Zeit nimmst, wirst du verstehen, warum das Thema so viele bewegt.",
            "Ich helfe dir gern beim Einstieg.",
            "Herzliche Grüße,",
            "[Dein Name]"
          ]
        },
        {
          title: "E-Mail 3 – „Vom Funktionieren zum Verstehen“",
          subject: "Wege aus der Abhängigkeit – kostenloser FSA-Grundkurs",
          body: [
            "Hallo [Name],",
            "die meisten Menschen wissen alles über ihren Job – aber kaum etwas über das System, in dem ihr Geld verschwindet.",
            "Die FSA-Akademie hat das geändert. Im kostenlosen Grundkurs lernst du, wie du dein Geld, deine Zeit und deine Entscheidungen wieder selbst steuerst.",
            "Trustyfy zeigt dir parallel, wie du Einkommen und Vermögenswerte so verwaltest, dass niemand sie dir einfach wegnehmen oder blockieren kann – auch nicht bei strengeren EU-Vorgaben.",
            "Ich war skeptisch, aber der Kurs spricht Klartext – ohne Fachchinesisch, ohne Verkaufsdruck.",
            "Wenn du willst, schick ich dir den Link.",
            "Beste Grüße,",
            "[Dein Name]"
          ]
        }
      ],
      calls: [
        {
          title: "📞 Leitfaden 1 – Realität anerkennen – Sicherheit zurückholen",
          internal: [
            "🔹 Interne Anleitung",
            "Ziel: Den Gesprächspartner spüren lassen, dass „Sicherheit“ heute keine Selbstverständlichkeit mehr ist.",
            "Emotion: ruhig, verständnisvoll, nicht ängstlich.",
            "Ablauf:",
            "1. Verbindung über Alltag und Unsicherheit herstellen",
            "2. Systemische Abhängigkeit (Bank, Staat, KI) ansprechen",
            "3. Gefahr – Pfändung, Zugriff, Zwangsverwaltung",
            "4. Weg aus der Ohnmacht – Dezentralität + Wissen (FSA + Trustyfy)",
            "5. Einladung zum Gespräch oder Grundkurs",
            "Hinweis: Nicht missionieren. Du bietest einen Weg an, keinen Dogmatismus."
          ],
          script: [
            "„Hallo [Name], darf ich ehrlich sein? Ich kenne kaum jemanden, der sich heute noch wirklich sicher fühlt. Preise steigen, Gesetze ändern sich ständig, und immer mehr hängt an zentralen Systemen – Banken, Arbeitgebern, Behörden.“",
            "„Viele geben alles, aber haben das Gefühl, die Kontrolle über ihr Leben zu verlieren. Manche hatten schon Kontosperrungen, andere fürchten, dass KI und neue EU-Verordnungen ihnen den Job nehmen.“",
            "„Ich arbeite mit der FSA-Akademie und Trustyfy – zwei Wege, um genau das zu ändern: eigenes Wissen aufbauen, Werte schützen, Einkommen unabhängig machen.“",
            "„Es geht nicht um Reichtum, sondern um Sicherheit. Ich kann Ihnen das gern zeigen – 15 Minuten reichen. Wann passt es besser – heute Abend oder morgen Vormittag?“"
          ]
        },
        {
          title: "📞 Leitfaden 2 – Von Angst zu Handlung",
          internal: [
            "🔹 Interne Anleitung",
            "Ziel: Angst und Ohnmacht in Handlungsenergie umwandeln.",
            "Fokus: Arbeitsplatz-, Existenz- und digitale Kontrollangst.",
            "Ablauf:",
            "1. Einstieg über Unsicherheit und Kontrollverlust",
            "2. Politische und regulatorische Eingriffe kurz anreißen (digitale Währungen, Konto-Monitoring)",
            "3. Lösung: Dezentrale Systeme (Trustyfy) und Bildung (FSA)",
            "4. Abschluss: Einladung zum Gespräch",
            "Wichtig: Nicht drohen. Immer sagen: „Es gibt einen Weg.“"
          ],
          script: [
            "„Hallo [Name], ich rufe an, weil viele sagen: ‘Man arbeitet und spart, aber alles wird enger.’ Kennen Sie das?“",
            "„Viele merken nicht, wie sehr sie von Systemen abhängig sind, die sie nicht beeinflussen können. Ein Klick – und das Konto ist gesperrt. Ein neues Gesetz – und eine Abgabe kommt.“",
            "„Mit Trustyfy kann man Werte und Zahlungen selbst verwalten, ohne Fremdzugriff. Und in der FSA-Akademie lernt man, wie man sich schon heute absichert.“",
            "„Keine Theorie, keine Verkaufsnummer – nur Information. Wollen wir das kurz durchgehen? 15 Minuten reichen.“"
          ]
        },
        {
          title: "📞 Leitfaden 3 – Aus der Abhängigkeit in die Freiheit",
          internal: [
            "🔹 Interne Anleitung",
            "Ziel: Begreifen lassen, dass „Normalität“ Abhängigkeit bedeutet – und dass Freiheit wieder möglich ist.",
            "Themen: Pfändung, digitale Zentralwährungen, Social Credit, politische Zugriffe.",
            "Ablauf:",
            "1. Persönliche Frage zum Sicherheitsgefühl",
            "2. Realbeispiel (Sperrung, Zwangskontrolle)",
            "3. Lösung: Dezentrale Selbstverwaltung + digitale Souveränität",
            "4. Einladung zum Online-Call",
            "Tonalität: ruhig, souverän, nicht verschwörerisch."
          ],
          script: [
            "„[Name], darf ich Sie direkt fragen? Wenn morgen Ihr Konto gesperrt wird oder eine neue Regel Ihre Arbeit verändert – wären Sie vorbereitet?“",
            "„Viele verlassen sich auf Systeme, die ihnen nicht gehören. Digitale Zentralwährungen und Überwachung kommen – und damit Kontrolle über unser Leben.“",
            "„Mit Trustyfy und der FSA-Akademie bauen wir die Gegenstrategie auf: dezentrale Strukturen, eigene Freigaben, keine Pfändung, keine Blockade, keine stille Zensur.“",
            "„Ich zeige Ihnen gern, wie das geht. Wann passt ein kurzes Gespräch besser – morgen Vormittag oder nach Feierabend?“"
          ]
        }
      ],
      snippets: [
        "„Viele arbeiten hart, aber kaum jemand versteht, warum Geld immer knapper wird. Lern’s im kostenlosen FSA-Grundkurs.“",
        "„Wenn du keine Zeit hast, brauchst du Wissen. Die FSA-Akademie zeigt, wie du Zeit und Geld zurückholst – Trustyfy schützt es technisch.“",
        "„Zukunftsangst? Nur bis du verstehst, wie Geld wirklich funktioniert – und wie du es dezentral sicherst.“"
      ]
    },

    // -----------------------------------------------------------------
    // ENGLISH VERSION (sinngemäß, nicht wortwörtlich)
    // -----------------------------------------------------------------
    en: {
      meta: {
        id: "social-zg2",
        title: "Target Group 2 – Employees & Professionals",
        subtitle: "Rethinking security – independence with Trustyfy and the FSA Academy",
        hint: "Tip: Rotate your phone for better readability."
      },
      whatsapp: [
        {
          title: "Template 1 – “The Cost of Feeling Safe”",
          body: [
            "Many people work harder than ever – but still feel less secure. Salaries stagnate, prices go up, the future feels unstable.",
            "That feeling of ‘I keep running, but nothing changes’ – that’s exactly what we address.",
            "The FSA Academy explains how money flows really work and how to protect yourself step by step.",
            "Trustyfy adds the tech layer: it keeps your income and assets under your control – no silent freezes, no third-party access.",
            "➡️ I recommend starting with the free basic course – no risk, but possibly your turning point.",
            "👉 If you want, I can send you the link right away."
          ]
        },
        {
          title: "Template 2 – “Time vs. Life”",
          body: [
            "Most people trade their best hours for money – and still it is not enough.",
            "Freedom sounds great – but hardly anyone shows you how to get it.",
            "Inside the FSA Academy you learn how to create income that keeps flowing even when you are not working.",
            "Trustyfy is the backup: decentralized, independent from banks, future-proof.",
            "➡️ If you feel you want more than just paying bills – tell me. I’ll send you the link.",
            "👉 15 minutes of explanation and you’ll know if it’s for you."
          ]
        },
        {
          title: "Template 3 – “From Fear to Clarity”",
          body: [
            "People are worried: inflation, AI, job cuts, pensions – but nobody explains how to prepare.",
            "The FSA Academy gives the clarity. Trustyfy gives the protection.",
            "No pressure, no sales – just information.",
            "➡️ If you want your income to work for you – not the other way round – I can show you where to start.",
            "👉 Short message is enough and I’ll send you everything."
          ]
        }
      ],
      emails: [
        {
          title: "Email 1 – “A course that explains, not sells”",
          subject: "Free intro course – understanding financial sovereignty",
          body: [
            "Hi [Name],",
            "I know what it’s like when work takes over and still nothing is really secure.",
            "The FSA Academy has a free starter course that finally explains how money actually works – and how to protect yourself.",
            "Together with Trustyfy you get a technical way to keep your income out of centralized control.",
            "Do you want the link?",
            "Best,",
            "[Your Name]"
          ]
        },
        {
          title: "Email 2 – “Why knowledge = security now”",
          subject: "Why decentralization is becoming the new safety layer",
          body: [
            "Hello [Name],",
            "we’re living in a time where control is increasing but personal security is not.",
            "The FSA Academy shows the principles. Trustyfy makes them real: decentralized, transparent, and independent from banks.",
            "Take 2 hours to watch it – you’ll be ahead of 90% of people.",
            "Kind regards,",
            "[Your Name]"
          ]
        },
        {
          title: "Email 3 – “From functioning to understanding”",
          subject: "How to break out of financial dependency",
          body: [
            "Hello [Name],",
            "most people know everything about their job – but almost nothing about the system their money sits in.",
            "That’s why I like the FSA Academy – and why I use Trustyfy to secure income outside bank rules.",
            "If you’re open for that, I’ll send you the links.",
            "Best regards,",
            "[Your Name]"
          ]
        }
      ],
      calls: [
        {
          title: "📞 Call Script 1 – Face reality, reclaim security",
          internal: [
            "🔹 Internal guidance",
            "Goal: make them feel that ‘security’ today is mostly an illusion based on central systems.",
            "Tone: calm, empathetic, factual.",
            "Steps:",
            "1. connect via everyday pressure",
            "2. point out system dependency (bank, state, employer, AI)",
            "3. show risk (freezing, garnishment, digital euro)",
            "4. offer way out: FSA (knowledge) + Trustyfy (tech)",
            "5. schedule 15 min call"
          ],
          script: [
            "“Hello [Name], I’m calling because many people tell me they work more than ever but still feel vulnerable.",
            "Prices go up, laws change, and more and more is decided by systems we don’t control.”",
            "“That’s why I work with the FSA Academy and Trustyfy – together they give you back control over income and assets.”",
            "“I can show you in 15 minutes. When is better – today evening or tomorrow morning?”"
          ]
        },
        {
          title: "📞 Call Script 2 – Turn fear into action",
          internal: [
            "🔹 Internal guidance",
            "Goal: transform anxiety (job, AI, central control) into concrete next step.",
            "Don’t exaggerate – stay real.",
            "CTA: 15 min Zoom/phone."
          ],
          script: [
            "“Hi [Name], a lot of people right now have the feeling: ‘I work and work, but it gets tighter.’ Do you know that?”",
            "“That’s often because income sits in places we don’t control – banks, platforms, payroll systems.”",
            "“With Trustyfy you can manage values and payments yourself – and the FSA Academy explains the bigger picture.”",
            "“I can walk you through it quickly. 15 minutes is enough.”"
          ]
        },
        {
          title: "📞 Call Script 3 – From functioning to freedom",
          internal: [
            "🔹 Internal guidance",
            "Goal: help them see that they are ‘functioning’ but not really steering.",
            "Emphasize digital control, CBDC, social-credit-style risks.",
            "Finish with: ‘Let’s look at it before rules get tighter.’"
          ],
          script: [
            "“[Name], may I ask you something personal? If tomorrow your account was frozen or your job situation changed – would you be ready?”",
            "“Most people aren’t – because their income is centrally controlled.”",
            "“With Trustyfy and FSA you can build a parallel, decentralized buffer – under your name, under your control.”",
            "“I can show you how – 15 minutes, relaxed. When suits you?”"
          ]
        }
      ],
      snippets: [
        "“Most people work hard, but only few know how to protect their money. Start with the FSA intro – then secure it with Trustyfy.”",
        "“No time? Then you need systems. FSA explains, Trustyfy protects.”",
        "“Digital control is coming. Decentralized income is the answer.”"
      ]
    }
  };

  // -------------------------------------------------------------------
  // 2) RENDERER
  // -------------------------------------------------------------------
  function createSection(title, paragraphs) {
    const sec = document.createElement("section");
    sec.className = "social-block";
    const h3 = document.createElement("h3");
    h3.textContent = title;
    sec.appendChild(h3);
    paragraphs.forEach(p => {
      const para = document.createElement("p");
      para.textContent = p;
      sec.appendChild(para);
    });
    return sec;
  }

  function renderSocialZielgruppe2(lang) {
    const currentLang =
      lang ||
      localStorage.getItem("fsa_lang") ||
      "de";

    const data = TEXT_SOCIAL_02[currentLang] || TEXT_SOCIAL_02.de;

    // Host ermitteln
    let host = document.getElementById("socialContent");
    if (!host) {
      host = document.createElement("div");
      host.id = "socialContent";
      document.body.appendChild(host);
    }
    host.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "social-wrapper";

    const h1 = document.createElement("h1");
    h1.textContent = data.meta.title;
    wrap.appendChild(h1);

    const h2 = document.createElement("p");
    h2.className = "subtitle";
    h2.textContent = data.meta.subtitle;
    wrap.appendChild(h2);

    const hint = document.createElement("p");
    hint.className = "hint";
    hint.textContent = data.meta.hint;
    wrap.appendChild(hint);

    // WhatsApp
    const waTitle = document.createElement("h2");
    waTitle.textContent = currentLang === "de"
      ? "1. WhatsApp / Facebook / Telegram – Textvorlagen"
      : "1. WhatsApp / Facebook / Telegram – templates";
    wrap.appendChild(waTitle);

    data.whatsapp.forEach(item => {
      wrap.appendChild(createSection(item.title, item.body));
    });

    // Emails
    const mailTitle = document.createElement("h2");
    mailTitle.textContent = currentLang === "de"
      ? "2. E-Mail-Vorlagen (Kontaktaufnahme)"
      : "2. Email templates (outreach)";
    wrap.appendChild(mailTitle);

    data.emails.forEach(mail => {
      const sec = document.createElement("section");
      sec.className = "social-block";
      const h = document.createElement("h3");
      h.textContent = mail.title;
      sec.appendChild(h);
      const subj = document.createElement("p");
      subj.innerHTML = "<strong>" + (currentLang === "de" ? "Betreff: " : "Subject: ") + "</strong>" + mail.subject;
      sec.appendChild(subj);
      mail.body.forEach(line => {
        const p = document.createElement("p");
        p.textContent = line;
        sec.appendChild(p);
      });
      wrap.appendChild(sec);
    });

    // Calls
    const callTitle = document.createElement("h2");
    callTitle.textContent = currentLang === "de"
      ? "3. Telefon-Leitfäden (mit interner Anleitung)"
      : "3. Call scripts (with internal guidance)";
    wrap.appendChild(callTitle);

    data.calls.forEach(call => {
      const sec = document.createElement("section");
      sec.className = "social-block";
      const h = document.createElement("h3");
      h.textContent = call.title;
      sec.appendChild(h);

      const internalH = document.createElement("p");
      internalH.className = "internal-label";
      internalH.textContent = currentLang === "de" ? "Interne Anleitung:" : "Internal guidance:";
      sec.appendChild(internalH);

      call.internal.forEach(line => {
        const p = document.createElement("p");
        p.className = "internal-line";
        p.textContent = line;
        sec.appendChild(p);
      });

      const scriptH = document.createElement("p");
      scriptH.className = "script-label";
      scriptH.textContent = currentLang === "de" ? "Vorlese-Skript:" : "Reading script:";
      sec.appendChild(scriptH);

      call.script.forEach(line => {
        const p = document.createElement("p");
        p.textContent = line;
        sec.appendChild(p);
      });

      wrap.appendChild(sec);
    });

    // Snippets
    const snTitle = document.createElement("h2");
    snTitle.textContent = currentLang === "de"
      ? "4. Share-Snippets"
      : "4. Share snippets";
    wrap.appendChild(snTitle);

    const snList = document.createElement("ul");
    snList.className = "snippet-list";
    data.snippets.forEach(sn => {
      const li = document.createElement("li");
      li.textContent = sn;
      snList.appendChild(li);
    });
    wrap.appendChild(snList);

    // Close Button
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "close-social";
    closeBtn.textContent = currentLang === "de" ? "Schließen" : "Close";
    closeBtn.addEventListener("click", () => {
      host.innerHTML = "";
      document.dispatchEvent(new CustomEvent("social:closed", { detail: data.meta.id }));
    });
    wrap.appendChild(closeBtn);

    host.appendChild(wrap);
  }

  // -------------------------------------------------------------------
  // 3) STYLE INJECTION
  // -------------------------------------------------------------------
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
      font-size: 1.5rem;
      margin-bottom: .35rem;
      color: #fff;
    }
    .social-wrapper .subtitle {
      color: #d4af37;
      margin-bottom: 1rem;
      font-weight: 500;
    }
    .social-wrapper .hint {
      font-size: .8rem;
      color: rgba(229,231,235,.6);
      margin-bottom: 1.5rem;
    }
    .social-wrapper h2 {
      font-size: 1.1rem;
      margin-top: 1.5rem;
      margin-bottom: .6rem;
      color: #fff;
      border-bottom: 1px solid rgba(212,175,55,0.15);
      padding-bottom: .4rem;
    }
    .social-block {
      background: rgba(15,23,42,0.35);
      border: 1px solid rgba(148,163,184,0.12);
      border-radius: 12px;
      padding: .9rem .8rem .9rem;
      margin-bottom: .9rem;
    }
    .social-block h3 {
      margin: 0 0 .5rem;
      font-size: .98rem;
      color: #fff;
    }
    .social-block p {
      margin: 0 0 .4rem;
      font-size: .85rem;
    }
    .internal-label,
    .script-label {
      font-weight: 600;
      color: #d4af37;
      margin-top: .5rem;
      margin-bottom: .35rem;
    }
    .internal-line {
      color: rgba(229,231,235,.85);
    }
    .snippet-list {
      list-style: disc;
      padding-left: 1.3rem;
    }
    .snippet-list li {
      margin-bottom: .4rem;
      font-size: .85rem;
    }
    .close-social {
      margin-top: 2.5rem;
      background: rgba(212,175,55,0.15);
      border: 1px solid rgba(212,175,55,0.5);
      color: #fff;
      padding: .45rem .9rem;
      border-radius: 6px;
      cursor: pointer;
    }
    .close-social:hover {
      background: rgba(212,175,55,0.3);
    }
    @media (max-width: 720px) {
      .social-wrapper {
        padding: 1.1rem .6rem 4.5rem;
      }
      .social-block {
        padding: .8rem .6rem;
      }
      .social-wrapper h1 {
        font-size: 1.25rem;
      }
      .social-wrapper .hint {
        font-size: .75rem;
      }
    }
  `;
  document.head.appendChild(style);

  // -------------------------------------------------------------------
// ===============================================================
// EXPORT – stellt den Datensatz für social.html bereit
window.FSA_SOCIAL_02 = TEXT_SOCIAL_02;

