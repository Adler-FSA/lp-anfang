// library/js/text-campus/campus-sovereign-04.js
// Aspekt 4 – Digitale Souveränität: Kontrolle über Identität und Zugang
// Verdrahtung: fsa:lang-change / souveränität.html
// Anzeige: einspaltig, mobilfreundlich, DE/EN getrennt

(function(){
  const SOVEREIGN_CONTENT = {
    de: {
      title: "💻 Aspekt 4 – Digitale Souveränität",
      subtitle: "Kontrolle über Identität und Zugang",
      blocks: [
        {
          heading: "Einleitung",
          items: [
            {
              body: [
                "Die digitale Welt ist das neue Territorium der Macht.",
                "Wer sie versteht, schützt sich – wer sie ignoriert, wird Produkt.",
                "Die FSA-Akademie übersetzt Technik in Bewusstsein: Daten, Wallets, Netzwerke – sie sind keine Magie, sie sind Verträge.",
                "Und Verträge kann man gestalten."
              ]
            }
          ]
        },
        {
          heading: "1. Unsichtbare Ketten",
          items: [
            {
              body: [
                "Cookies, Metadaten, verknüpfte Logins – all das sammelt mehr über dich, als du ahnst.",
                "Digitale Souveränität beginnt, wenn du dir diese Kette sichtbar machst.",
                "Jeder Like, jede Anmeldung, jeder Cloud-Speicher ist Teil deiner digitalen Biografie.",
                "Artikel 12 AEMR und DSGVO Art. 15–17 sichern dir das Recht, sie zu sehen und zu löschen.",
                "Doch du musst es einfordern."
              ]
            }
          ]
        },
        {
          heading: "2. Trustyfy als Vorbild für digitale Ethik",
          items: [
            {
              body: [
                "Trustyfy ist der technische Beweis, dass Transparenz und Datenschutz sich nicht ausschließen.",
                "Alle Teilnehmer sehen, was geschieht – aber niemand sieht, was privat bleibt.",
                "Jede Aktion ist verschlüsselt, jede Zustimmung freiwillig.",
                "So funktioniert Dezentralität als Würdeprinzip.",
                "Die Akademie nutzt dieses Beispiel, um digitale Bildung zur Bürgerpflicht zu machen."
              ]
            }
          ]
        },
        {
          heading: "3. Resilienz durch Wissen",
          items: [
            {
              body: [
                "Wenn Plattformen wanken, brauchst du Backups, Offline-Wege, eigene Domains.",
                "Die Akademie nennt das digitale Resilienz: nicht gegen Technik kämpfen, sondern sie verstehen.",
                "Denn Technik ist nie neutral; sie trägt die Absicht ihres Erbauers.",
                "Souveränität heißt, zu prüfen, bevor man vertraut."
              ]
            }
          ]
        },
        {
          heading: "4. Verantwortung in der Cloud",
          items: [
            {
              body: [
                "Daten sind wie Energie – wer sie kontrolliert, kontrolliert Zukunft.",
                "Deshalb lehren wir: Nutze Technik, aber bleib Eigentümer.",
                "Kein Tool ersetzt Bewusstsein.",
                "Und kein Passwort ersetzt Haltung."
              ]
            }
          ]
        },
        {
          heading: "Schlussgedanke",
          items: [
            {
              body: [
                "„Digitale Souveränität ist die moderne Form von Würde: still, präzise, nicht verhandelbar.“"
              ]
            }
          ]
        }
      ]
    },

    en: {
      title: "💻 Aspect 4 – Digital Sovereignty",
      subtitle: "Control over identity and access",
      blocks: [
        {
          heading: "Introduction",
          items: [
            {
              body: [
                "The digital world is the new territory of power.",
                "Those who understand it protect themselves – those who ignore it become products.",
                "The FSA Academy translates technology into awareness: data, wallets, networks – they’re not magic, they’re contracts.",
                "And contracts can be shaped."
              ]
            }
          ]
        },
        {
          heading: "1. Invisible chains",
          items: [
            {
              body: [
                "Cookies, metadata, linked logins – they collect more about you than you imagine.",
                "Digital sovereignty begins when you make this chain visible.",
                "Every like, every sign-in, every cloud file is part of your digital biography.",
                "Article 12 of the UDHR and GDPR Articles 15–17 guarantee your right to see and erase them.",
                "But you have to claim it."
              ]
            }
          ]
        },
        {
          heading: "2. Trustyfy as a model of digital ethics",
          items: [
            {
              body: [
                "Trustyfy proves that transparency and privacy can coexist.",
                "All participants see what happens – yet no one sees what stays private.",
                "Every action is encrypted, every consent voluntary.",
                "That’s decentralization as a principle of dignity.",
                "The Academy uses this to make digital literacy a civic duty."
              ]
            }
          ]
        },
        {
          heading: "3. Resilience through knowledge",
          items: [
            {
              body: [
                "When platforms falter, you need backups, offline routes, your own domains.",
                "The Academy calls this digital resilience: not fighting tech, but understanding it.",
                "Technology is never neutral; it carries the intent of its maker.",
                "Sovereignty means to verify before you trust."
              ]
            }
          ]
        },
        {
          heading: "4. Responsibility in the cloud",
          items: [
            {
              body: [
                "Data is like energy – whoever controls it controls the future.",
                "So we teach: use technology, but remain the owner.",
                "No tool replaces awareness.",
                "And no password replaces integrity."
              ]
            }
          ]
        },
        {
          heading: "Closing thought",
          items: [
            {
              body: [
                "“Digital sovereignty is the modern form of dignity: quiet, precise, non-negotiable.”"
              ]
            }
          ]
        }
      ]
    }
  };

  // --- Renderer (einspaltig, mobil) ---
  function renderSovereign04(lang){
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
      document.dispatchEvent(new CustomEvent("sovereign:closed",{detail:"04"}));
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

  // --- Sprache & Events ---
  window.renderSovereign04=function(lang){
    renderSovereign04(lang||(localStorage.getItem("fsa_lang")||"de"));
  };

  document.addEventListener("fsa:lang-change",ev=>{
    const lang=ev.detail||"de";
    const host=document.getElementById("sovereignContent");
    if(host&&host.innerHTML.trim()!==""){renderSovereign04(lang);}
  });

  document.addEventListener("sovereign:open-04",()=>{
    const lang=localStorage.getItem("fsa_lang")||"de";
    renderSovereign04(lang);
  });

  window.FSA_SOVEREIGN_04=SOVEREIGN_CONTENT;
})();
