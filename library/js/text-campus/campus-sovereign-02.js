// library/js/text-campus/campus-sovereign-02.js
// Aspekt 2 – Finanzielle Souveränität: Kontrolle über Wert und Zugriff
// Verdrahtung: fsa:lang-change / souveränität.html
// Anzeige: einspaltig, mobil tauglich, DE/EN getrennt

(function(){
  const SOVEREIGN_CONTENT = {
    de: {
      title: "💰 Aspekt 2 – Finanzielle Souveränität",
      subtitle: "Kontrolle über Wert und Zugriff",
      blocks: [
        {
          heading: "Einleitung",
          items: [
            {
              body: [
                "Finanzielle Bildung ist in der Akademie kein Rechenfach, sondern Selbstschutz.",
                "Denn jedes Konto, jede Plattform, jede digitale Zahlung ist Teil einer Struktur, die Macht verteilt.",
                "Wer nicht versteht, wie Wert entsteht, übergibt Kontrolle an andere – oft unbewusst.",
                "Finanzielle Souveränität bedeutet, Geld wieder als Werkzeug der Freiheit zu begreifen, nicht als Instrument der Abhängigkeit."
              ]
            }
          ]
        },
        {
          heading: "1. Das unsichtbare Netz",
          items: [
            {
              body: [
                "Banken, Steuern, Versicherungen – viele glauben, diese Systeme dienen ihnen.",
                "In Wahrheit dienen sie sich selbst. Das heißt nicht, sie sind böse; sie sind nur nicht neutral.",
                "Ein souveräner Mensch fragt: Was passiert, wenn der Strom ausfällt, der Server hängt, der Zugang gesperrt wird?",
                "Die Akademie zeigt: Unabhängigkeit beginnt mit Wissen, nicht mit Misstrauen."
              ]
            }
          ]
        },
        {
          heading: "2. Wert verstehen, nicht nur verdienen",
          items: [
            {
              body: [
                "Geld ist gespeicherte Energie. Wenn du sie nicht lenkst, wird sie für dich gelenkt.",
                "Budgetieren, investieren, diversifizieren – alles gut, aber ohne Bewusstheit bleiben es Tools.",
                "Die Akademie lehrt den Unterschied zwischen Besitz und Zugriff. Besitz ist juristisch; Zugriff ist real.",
                "Viele merken das erst, wenn ein Konto gesperrt wird oder eine Wallet leer ist.",
                "Eine dezentrale Finanzstruktur löst das anders: transparente Beteiligung, nachvollziehbare Buchungen, kein blinder Mittelsmann.",
                "So wird Ökonomie wieder Bildung – kein Glücksspiel."
              ]
            }
          ]
        },
        {
          heading: "3. Gegen den Reflex der Angst",
          items: [
            {
              body: [
                "Wenn Märkte fallen, sucht das Ego nach Kontrolle. Aber Souveränität zeigt sich in Ruhe, nicht im Aktionismus.",
                "Wer Prinzipien hat – Liquidität aufgeteilt, Schuldenplan, klaren Fokus – bleibt handlungsfähig.",
                "Die Akademie nennt das Antifragiles Denken: Systeme so bauen, dass sie von Stress lernen.",
                "Ein klar dokumentiertes, dezentrales System zeigt es täglich – Transparenz ersetzt Panik."
              ]
            }
          ]
        },
        {
          heading: "4. Gesetze als Werkzeugkasten",
          items: [
            {
              body: [
                "AEMR Art. 17, BGB § 823, DSGVO Art. 6 – das sind nicht Paragraphen, das sind Schutzschilde.",
                "Du darfst sie anwenden. Du darfst Daten anfordern, Entscheidungen anfechten, Fairness einfordern.",
                "Finanzielle Souveränität ist das praktische Anwenden dieser Rechte."
              ]
            }
          ]
        },
        {
          heading: "Schlussgedanke",
          items: [
            {
              body: [
                "„Frei ist, wer versteht, was sein Konto wirklich speichert: Verantwortung.“"
              ]
            }
          ]
        }
      ]
    },

    en: {
      title: "💰 Aspect 2 – Financial Sovereignty",
      subtitle: "Control over value and access",
      blocks: [
        {
          heading: "Introduction",
          items: [
            {
              body: [
                "At the Academy, financial education isn’t about arithmetic – it’s self-protection.",
                "Every account, every platform, every digital payment is part of a structure that distributes power.",
                "Those who don’t understand how value is created hand over control to others – often unconsciously.",
                "Financial sovereignty means seeing money again as a tool of freedom, not a mechanism of dependence."
              ]
            }
          ]
        },
        {
          heading: "1. The invisible net",
          items: [
            {
              body: [
                "Banks, taxes, insurances – many think these systems serve them.",
                "In truth, they serve themselves. That doesn’t make them evil; just not neutral.",
                "A sovereign person asks: what happens if the power goes out, the server fails, the access is frozen?",
                "The Academy teaches: independence starts with knowledge, not distrust."
              ]
            }
          ]
        },
        {
          heading: "2. Understand value, don’t just earn it",
          items: [
            {
              body: [
                "Money is stored energy. If you don’t direct it, it will be directed for you.",
                "Budgeting, investing, diversifying – all fine, but without awareness they stay tools.",
                "The Academy teaches the difference between ownership and access. Ownership is legal; access is real.",
                "Many realize that only when an account is frozen or a wallet emptied.",
                "A decentralized financial structure approaches this differently: transparent participation, traceable bookings, no blind intermediary.",
                "Economy becomes education again – not a gamble."
              ]
            }
          ]
        },
        {
          heading: "3. Against the reflex of fear",
          items: [
            {
              body: [
                "When markets fall, the ego seeks control. But sovereignty shows in calm, not in reaction.",
                "Those with principles – distributed liquidity, a debt plan, clear focus – remain capable of action.",
                "The Academy calls this antifragile thinking: systems built to learn from stress.",
                "A clearly documented, decentralized setup proves it every day – transparency replaces panic."
              ]
            }
          ]
        },
        {
          heading: "4. Laws as a toolkit",
          items: [
            {
              body: [
                "UDHR Art.17, German Civil Code §823, GDPR Art.6 – these aren’t paragraphs, they’re shields.",
                "You are allowed to use them: request data, challenge decisions, demand fairness.",
                "Financial sovereignty is the practical application of those rights."
              ]
            }
          ]
        },
        {
          heading: "Closing thought",
          items: [
            {
              body: [
                "“Free is the one who understands what their account truly stores: responsibility.”"
              ]
            }
          ]
        }
      ]
    }
  };

  function renderSovereign02(lang){
    const data=SOVEREIGN_CONTENT[lang]||SOVEREIGN_CONTENT.de;
    const host=document.getElementById("sovereignContent")||createHost();
    host.innerHTML="";

    const wrap=document.createElement("div");
    wrap.className="sovereign-wrap";

    const h1=document.createElement("h1");
    h1.textContent=data.title;
    wrap.appendChild(h1);

    const p=document.createElement("p");
    p.className="sovereign-subtitle";
    p.textContent=data.subtitle;
    wrap.appendChild(p);

    (data.blocks||[]).forEach(block=>{
      const section=document.createElement("section");
      section.className="sovereign-section";

      const h2=document.createElement("h2");
      h2.textContent=block.heading;
      section.appendChild(h2);

      (block.items||[]).forEach(item=>{
        const card=document.createElement("article");
        card.className="sovereign-card";
        (item.body||[]).forEach(line=>{
          const pLine=document.createElement("p");
          pLine.textContent=line;
          card.appendChild(pLine);
        });
        section.appendChild(card);
      });

      wrap.appendChild(section);
    });

    const closeBtn=document.createElement("button");
    closeBtn.type="button";
    closeBtn.className="sovereign-close-btn";
    closeBtn.textContent=lang==="de"?"Schließen":"Close";
    closeBtn.addEventListener("click",()=>{
      host.innerHTML="";
      host.style.display="none";
      document.dispatchEvent(new CustomEvent("sovereign:closed",{detail:"02"}));
    });
    wrap.appendChild(closeBtn);

    host.appendChild(wrap);
    host.style.display="block";
  }

  function createHost(){
    const host=document.createElement("div");
    host.id="sovereignContent";
    document.body.appendChild(host);
    return host;
  }

  const style=document.createElement("style");
  style.textContent=`
    #sovereignContent{
      position:relative;width:min(1100px,100%);
      margin:0 auto;
      padding:clamp(1.2rem,2.3vw,2.4rem);
      background:rgba(7,11,17,0.95);
      color:#e5e7eb;line-height:1.55;
      border:1px solid rgba(212,175,55,0.25);
      border-radius:16px;
      backdrop-filter:blur(6px);
      box-shadow:0 20px 40px rgba(0,0,0,0.35);
      z-index:30;
    }
    #sovereignContent h1{font-size:clamp(1.35rem,3.2vw,1.8rem);margin-bottom:.25rem;color:#fff;}
    .sovereign-subtitle{color:rgba(229,231,235,0.75);margin-bottom:1.4rem;}
    .sovereign-section{margin-bottom:1.8rem;}
    .sovereign-section h2{font-size:1.05rem;margin-bottom:.75rem;color:#f3f4f6;border-bottom:1px solid rgba(212,175,55,0.28);padding-bottom:.3rem;}
    .sovereign-card{background:rgba(15,23,42,0.35);border:1px solid rgba(148,163,184,0.18);border-radius:12px;padding:.9rem 1rem .85rem;margin-bottom:.75rem;}
    .sovereign-card p{margin:0 0 .45rem;font-size:.85rem;color:#e2e8f0;}
    .sovereign-close-btn{margin-top:1rem;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.5);color:#fff;padding:.5rem 1.3rem;border-radius:999px;cursor:pointer;transition:.25s ease;}
    .sovereign-close-btn:hover{background:rgba(212,175,55,0.35);box-shadow:0 0 14px rgba(212,175,55,0.4);}
    @media(max-width:720px){#sovereignContent{padding:1rem .65rem 1.3rem;border-radius:0;width:100%;}.sovereign-card{border-radius:10px;}.sovereign-card p{font-size:.8rem;}}
  `;
  document.head.appendChild(style);

  window.renderSovereign02=function(lang){
    renderSovereign02(lang||(localStorage.getItem("fsa_lang")||"de"));
  };

  document.addEventListener("fsa:lang-change",ev=>{
    const lang=ev.detail||"de";
    const host=document.getElementById("sovereignContent");
    if(host&&host.innerHTML.trim()!==""){renderSovereign02(lang);}
  });

  document.addEventListener("sovereign:open-02",()=>{
    const lang=localStorage.getItem("fsa_lang")||"de";
    renderSovereign02(lang);
  });

  window.FSA_SOVEREIGN_02=SOVEREIGN_CONTENT;
})();
