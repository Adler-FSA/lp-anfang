// library/js/text-campus/campus-sovereign-01.js
// Aspekt 1 – Persönliche Souveränität: Bewusstsein als Fundament
// Verdrahtung: fsa:lang-change / souveränität.html
// Anzeige: einspaltig, mobil tauglich, DE/EN getrennt

(function(){
  const SOVEREIGN_CONTENT = {
    de: {
      title: "🧭 Aspekt 1 – Persönliche Souveränität",
      subtitle: "Bewusstsein als Fundament",
      blocks: [
        {
          heading: "Einleitung",
          items: [
            {
              title: "",
              body: [
                "In der FSA-Akademie beginnt alles mit Bewusstwerdung.",
                "Nicht mit Tabellen, nicht mit Coins, sondern mit der Frage: Wer entscheidet in meinem Kopf?",
                "Die meisten Menschen glauben, sie wären frei, weil sie wählen dürfen.",
                "Doch Wahl ohne Bewusstsein ist Routine – kein Selbstbesitz.",
                "Persönliche Souveränität bedeutet, wieder Eigentümer der eigenen Wahrnehmung zu werden.",
                "Es ist die Kunst, in einer lauten Welt die innere Frequenz zu halten."
              ]
            }
          ]
        },
        {
          heading: "1. Vom Reiz zur Reflexion",
          items: [
            {
              title: "",
              body: [
                "Wir leben in einem Dauer-Feed. Informationen, Meinungen, Katastrophen – alles konkurriert um Aufmerksamkeit.",
                "Das System nährt sich aus deiner Reaktion. Die Akademie lehrt: Nicht jede Nachricht verdient Antwort.",
                "Bewusstsein ist ein Filter, kein Zaun. Du entscheidest, was du hereinlässt. Das ist Selbstschutz auf neuronaler Ebene.",
                "Artikel 2 GG und Artikel 3 AEMR sichern diese Freiheit – doch erst du machst sie lebendig, wenn du eine Pause machst, bevor du klickst."
              ]
            }
          ]
        },
        {
          heading: "2. Innere Gesetze statt äußerer Kommandos",
          items: [
            {
              title: "",
              body: [
                "Ein souveräner Mensch handelt nach eigenen Prinzipien. Nicht nach Stimmungen, sondern nach Werten.",
                "Werte sind kein Schmuck, sie sind Betriebssystem. Die Akademie hilft, sie zu formulieren: Was ist für dich nicht verhandelbar?",
                "Fairness? Transparenz? Zeit für Familie?",
                "Gerechte Systeme funktionieren genauso: jedes Handeln ist sichtbar, weil es auf klar definierten Prinzipien beruht.",
                "Kein Zwang, keine versteckte Agenda – Strukturen werden zum Spiegel deines Bewusstseins."
              ]
            }
          ]
        },
        {
          heading: "3. Grenzen als Selbstschutz",
          items: [
            {
              title: "",
              body: [
                "Moderne Unfreiheit ist unsichtbar. Sie kommt als Überforderung, nicht als Kette.",
                "Persönliche Souveränität bedeutet, Grenzen zu erkennen und freundlich zu verteidigen.",
                "„Heute nicht.“ ist kein Rückzug, sondern Gesetzgebung in eigener Sache.",
                "Artikel 1 GG – Würde – beginnt genau dort.",
                "In guten digitalen Systemen nennt man das „Permission Layer“: jeder Zugriff braucht Zustimmung. Gleiches gilt für dein Leben."
              ]
            }
          ]
        },
        {
          heading: "4. Bewusstmachen durch Alltag",
          items: [
            {
              title: "",
              body: [
                "– Wie oft sage ich Ja aus Angst, sonst nicht mehr gemocht zu werden?",
                "– Welche Verpflichtungen habe ich übernommen, die mir Energie rauben?",
                "– Welche Gewohnheit nährt mich wirklich – welche betäubt mich nur?",
                "Wer diese Fragen ernst nimmt, trainiert das, was die Akademie „Selbstverantwortung 01“ nennt.",
                "Denn erst, wenn du dich selbst führst, kannst du Systeme führen."
              ]
            }
          ]
        },
        {
          heading: "Schlussgedanke",
          items: [
            {
              title: "",
              body: [
                "„Souveränität beginnt, wenn du erkennst, dass du dein eigenes Grundgesetz bist.“"
              ]
            }
          ]
        }
      ]
    },

    en: {
      title: "🧭 Aspect 1 – Personal Sovereignty",
      subtitle: "Awareness as the foundation",
      blocks: [
        {
          heading: "Introduction",
          items: [
            {
              body: [
                "At the FSA Academy, everything starts with awareness.",
                "Not with charts or coins, but with the question: Who decides in my mind?",
                "Most people believe they are free because they can choose.",
                "But choice without awareness is habit – not self-ownership.",
                "Personal sovereignty means becoming the owner of your own perception again.",
                "It is the art of holding your inner frequency in a noisy world."
              ]
            }
          ]
        },
        {
          heading: "1. From impulse to reflection",
          items: [
            {
              body: [
                "We live in a constant feed of information, opinions, disasters – all competing for attention.",
                "The system feeds on your reaction. The Academy teaches: not every message deserves an answer.",
                "Awareness is a filter, not a fence. You decide what enters. That’s neural self-protection.",
                "Article 2 of the German Constitution and Article 3 of the Universal Declaration of Human Rights secure this freedom – but only you bring it to life when you pause before you click."
              ]
            }
          ]
        },
        {
          heading: "2. Inner laws instead of outer commands",
          items: [
            {
              body: [
                "A sovereign person acts by principle, not by mood.",
                "Values aren’t decoration – they are the operating system.",
                "The Academy helps you define them: What for you is non-negotiable? Fairness? Transparency? Time for family?",
                "Well-designed systems work the same way: every action is visible because it’s based on clear principles.",
                "No coercion, no hidden agenda – structures become a mirror of awareness."
              ]
            }
          ]
        },
        {
          heading: "3. Boundaries as self-protection",
          items: [
            {
              body: [
                "Modern lack of freedom is invisible. It comes as overload, not as chains.",
                "Personal sovereignty means recognizing and kindly defending your limits.",
                "“Not today.” isn’t withdrawal – it’s legislation in your own name.",
                "Article 1 of the Constitution – dignity – begins there.",
                "In good digital setups this is called a “permission layer”: every access requires consent. The same applies to your life."
              ]
            }
          ]
        },
        {
          heading: "4. Everyday awareness",
          items: [
            {
              body: [
                "– How often do I say yes out of fear of not being liked?",
                "– Which commitments drain rather than nourish me?",
                "– Which habits truly strengthen me, and which just numb me?",
                "Those who take these questions seriously train what the Academy calls “Self-Responsibility 01.”",
                "Only when you lead yourself can you lead systems."
              ]
            }
          ]
        },
        {
          heading: "Closing thought",
          items: [
            {
              body: [
                "“Sovereignty begins when you realize you are your own constitution.”"
              ]
            }
          ]
        }
      ]
    }
  };

  // --- Renderer (einspaltig, mobil) ---
  function renderSovereign01(lang){
    const data = SOVEREIGN_CONTENT[lang] || SOVEREIGN_CONTENT.de;
    const host = document.getElementById("sovereignContent") || createHost();
    host.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "sovereign-wrap";

    const h1 = document.createElement("h1");
    h1.textContent = data.title;
    wrap.appendChild(h1);

    const p = document.createElement("p");
    p.className = "sovereign-subtitle";
    p.textContent = data.subtitle;
    wrap.appendChild(p);

    (data.blocks || []).forEach(block=>{
      const section = document.createElement("section");
      section.className = "sovereign-section";

      const h2 = document.createElement("h2");
      h2.textContent = block.heading;
      section.appendChild(h2);

      (block.items||[]).forEach(item=>{
        const card = document.createElement("article");
        card.className = "sovereign-card";
        (item.body||[]).forEach(line=>{
          const pLine = document.createElement("p");
          pLine.textContent = line;
          card.appendChild(pLine);
        });
        section.appendChild(card);
      });

      wrap.appendChild(section);
    });

    const closeBtn = document.createElement("button");
    closeBtn.type="button";
    closeBtn.className="sovereign-close-btn";
    closeBtn.textContent = lang==="de"?"Schließen":"Close";
    closeBtn.addEventListener("click",()=>{
      host.innerHTML="";
      host.style.display="none";
      document.dispatchEvent(new CustomEvent("sovereign:closed",{detail:"01"}));
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
      position:relative;
      width:min(1100px,100%);
      margin:0 auto;
      padding:clamp(1.2rem,2.3vw,2.4rem);
      background:rgba(7,11,17,0.95);
      color:#e5e7eb;
      line-height:1.55;
      border:1px solid rgba(212,175,55,0.25);
      border-radius:16px;
      backdrop-filter:blur(6px);
      box-shadow:0 20px 40px rgba(0,0,0,0.35);
      z-index:30;
    }
    #sovereignContent h1{
      font-size:clamp(1.35rem,3.2vw,1.8rem);
      margin-bottom:.25rem;
      color:#fff;
    }
    .sovereign-subtitle{color:rgba(229,231,235,0.75);margin-bottom:1.4rem;}
    .sovereign-section{margin-bottom:1.8rem;}
    .sovereign-section h2{
      font-size:1.05rem;
      margin-bottom:.75rem;
      color:#f3f4f6;
      border-bottom:1px solid rgba(212,175,55,0.28);
      padding-bottom:.3rem;
    }
    .sovereign-card{
      background:rgba(15,23,42,0.35);
      border:1px solid rgba(148,163,184,0.18);
      border-radius:12px;
      padding:.9rem 1rem .85rem;
      margin-bottom:.75rem;
    }
    .sovereign-card p{margin:0 0 .45rem;font-size:.85rem;color:#e2e8f0;}
    .sovereign-close-btn{
      margin-top:1rem;
      background:rgba(212,175,55,0.15);
      border:1px solid rgba(212,175,55,0.5);
      color:#fff;
      padding:.5rem 1.3rem;
      border-radius:999px;
      cursor:pointer;
      transition:.25s ease;
    }
    .sovereign-close-btn:hover{
      background:rgba(212,175,55,0.35);
      box-shadow:0 0 14px rgba(212,175,55,0.4);
    }
    @media(max-width:720px){
      #sovereignContent{padding:1rem .65rem 1.3rem;border-radius:0;width:100%;}
      .sovereign-card{border-radius:10px;}
      .sovereign-card p{font-size:.8rem;}
    }
  `;
  document.head.appendChild(style);

  // --- Language handling ---
  window.renderSovereign01=function(lang){
    renderSovereign01(lang||(localStorage.getItem("fsa_lang")||"de"));
  };

  document.addEventListener("fsa:lang-change",ev=>{
    const lang=ev.detail||"de";
    const host=document.getElementById("sovereignContent");
    if(host&&host.innerHTML.trim()!==""){renderSovereign01(lang);}
  });

  document.addEventListener("sovereign:open-01",()=>{
    const lang=localStorage.getItem("fsa_lang")||"de";
    renderSovereign01(lang);
  });

  window.FSA_SOVEREIGN_01=SOVEREIGN_CONTENT;
})();
