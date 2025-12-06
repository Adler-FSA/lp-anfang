// library/js/text-campus/campus-sovereign-03.js
// Aspekt 3 – Soziale Souveränität: Beziehung ohne Besitz
// Verdrahtung: fsa:lang-change / souveränität.html
// Anzeige: einspaltig, mobil tauglich, DE/EN getrennt

(function(){
  const SOVEREIGN_CONTENT = {
    de: {
      title: "🤝 Aspekt 3 – Soziale Souveränität",
      subtitle: "Beziehung ohne Besitz",
      blocks: [
        {
          heading: "Einleitung",
          items: [
            {
              body: [
                "Gemeinschaft ist das Rückgrat jeder dezentralen Struktur – doch sie funktioniert nur, wenn jeder in seiner Mitte bleibt.",
                "Die FSA-Akademie lehrt kein Netzwerken, sondern gegenseitige Befähigung.",
                "Soziale Souveränität heißt, du kannst in Beziehung gehen, ohne dich zu verlieren."
              ]
            }
          ]
        },
        {
          heading: "1. Abhängigkeit im Mantel der Fürsorge",
          items: [
            {
              body: [
                "Viele gute Menschen brennen aus, weil sie ständig retten.",
                "Mentoren, Eltern, Führungskräfte – sie übernehmen Verantwortung, die anderen gehört.",
                "Das fühlt sich edel an, ist aber subtile Kontrolle.",
                "Ein souveräner Mentor begleitet, er ersetzt nicht.",
                "Die Akademie zeigt, wie man Räume hält, nicht Menschen.",
                "Gute Strukturen spiegeln diese Haltung: jede Aktion ist nachvollziehbar, niemand „besitzt“ den anderen."
              ]
            }
          ]
        },
        {
          heading: "2. Kommunikation als Spiegel von Bewusstsein",
          items: [
            {
              body: [
                "Worte schaffen Wirklichkeit.",
                "„Wir müssen“ erzeugt Druck. „Wir dürfen“ schafft Spielraum.",
                "Wer Sprache bewusst wählt, entgiftet Beziehungen.",
                "Souveränität spricht klar, ohne hart zu werden.",
                "Das ist Sozialkompetenz 2.0 – und Grundlage jeder FSA-Community."
              ]
            }
          ]
        },
        {
          heading: "3. FairPlay als Ethik der Verbindung",
          items: [
            {
              body: [
                "FairPlay ist kein Regelheft, sondern Haltung.",
                "In fairen Systemen heißt das: Transparenz vor Strategie.",
                "In Beziehungen: Wahrheit vor Harmonie.",
                "Die Akademie trainiert diese Haltung, bis sie Gewohnheit wird.",
                "Denn ein System ist nur so stark wie seine Gespräche."
              ]
            }
          ]
        },
        {
          heading: "4. Gesellschaftlich relevant",
          items: [
            {
              body: [
                "Wir leben in einer Zeit, in der Cancel-Culture, Gruppendruck und Polarisierung zunehmen.",
                "Soziale Souveränität ist Gegenprogramm: zuhören, prüfen, halten, ohne zu vereinnahmen.",
                "Das stärkt Demokratie – und schützt dein Nervensystem."
              ]
            }
          ]
        },
        {
          heading: "Schlussgedanke",
          items: [
            {
              body: [
                "„Souveränität ist die Kunst, verbunden zu bleiben, ohne verstrickt zu sein.“"
              ]
            }
          ]
        }
      ]
    },

    en: {
      title: "🤝 Aspect 3 – Social Sovereignty",
      subtitle: "Connection without possession",
      blocks: [
        {
          heading: "Introduction",
          items: [
            {
              body: [
                "Community is the backbone of every decentralized structure – but it only works when each person stays centered.",
                "The FSA Academy doesn’t teach networking, it teaches mutual empowerment.",
                "Social sovereignty means you can connect without losing yourself."
              ]
            }
          ]
        },
        {
          heading: "1. Dependency disguised as care",
          items: [
            {
              body: [
                "Many good people burn out because they keep rescuing.",
                "Mentors, parents, leaders – they take on responsibility that belongs to others.",
                "It feels noble but is subtle control.",
                "A sovereign mentor accompanies, he doesn’t replace.",
                "The Academy shows how to hold space, not people.",
                "Solid systems mirror this attitude: every action is visible, no one ‘owns’ another."
              ]
            }
          ]
        },
        {
          heading: "2. Communication as a mirror of awareness",
          items: [
            {
              body: [
                "Words create reality.",
                "“We must” creates pressure. “We may” creates freedom.",
                "Choosing language consciously detoxifies relationships.",
                "Sovereignty speaks clearly without being harsh.",
                "This is social competence 2.0 – and the foundation of every FSA community."
              ]
            }
          ]
        },
        {
          heading: "3. FairPlay as the ethics of connection",
          items: [
            {
              body: [
                "FairPlay is not a rulebook but an attitude.",
                "In healthy systems it means: transparency before strategy.",
                "In relationships: truth before harmony.",
                "The Academy trains this until it becomes habit.",
                "Because a system is only as strong as its conversations."
              ]
            }
          ]
        },
        {
          heading: "4. Social relevance",
          items: [
            {
              body: [
                "We live in a time of cancel culture, group pressure and polarization.",
                "Social sovereignty is the antidote: listen, assess, hold space – without taking over.",
                "It strengthens democracy and protects your nervous system."
              ]
            }
          ]
        },
        {
          heading: "Closing thought",
          items: [
            {
              body: [
                "“Sovereignty is the art of staying connected without getting entangled.”"
              ]
            }
          ]
        }
      ]
    }
  };

  // --- Renderer (einspaltig, mobil) ---
  function renderSovereign03(lang){
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
      document.dispatchEvent(new CustomEvent("sovereign:closed",{detail:"03"}));
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

  // --- Styles inline ---
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

  // --- Language + Events ---
  window.renderSovereign03=function(lang){
    renderSovereign03(lang||(localStorage.getItem("fsa_lang")||"de"));
  };

  document.addEventListener("fsa:lang-change",ev=>{
    const lang=ev.detail||"de";
    const host=document.getElementById("sovereignContent");
    if(host&&host.innerHTML.trim()!==""){renderSovereign03(lang);}
  });

  document.addEventListener("sovereign:open-03",()=>{
    const lang=localStorage.getItem("fsa_lang")||"de";
    renderSovereign03(lang);
  });

  window.FSA_SOVEREIGN_03=SOVEREIGN_CONTENT;
})();
