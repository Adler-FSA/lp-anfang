/* ==========================================================================
   FSA Campus – Text-Container
   Modul: Souveränität / Container 4 – "Zukunft & Verantwortung"
   Pfad: /library/js/text-campus/campus-sovereign-04.js
   Eigenschaften:
   • Autoload (fügt sich selbst ein)
   • Fade-In (goldener Glow, Darkmode)
   • Keyboard (←/→), Touch-Swipe, ARIA
   • Fortschritts-Punkte + Zähler
   • DE/EN anhand window.FSA_LANG oder <html lang="">
   • Slot-Logik: nutzt #campus-container-4, fällt zurück auf <body>
   ========================================================================== */
(function CampusSovereign04(){
  // ----- Sprache bestimmen (DE als Standard) -----
  const currentLang = (window.FSA_LANG || document.documentElement.lang || "de").toLowerCase();
  const LANG = currentLang.startsWith("de") ? "de" : "en";

  // ----- Inhalte (11 Slides, Langfassung) -----
  const SLIDES_DE = [
    { t: "Souveränität als tägliche Entscheidung", p: [
      "Souveränität ist kein Pokal, den man ins Regal stellt. Sie lebt in jedem kleinen „Ja“ und „Nein“.",
      "Beim Kauf: Wähle ich billig und abhängig – oder fair und verständlich? Im Gespräch: Rede ich ehrlich, auch wenn es unbequem ist – oder um zu gefallen?",
      "In der Handlung: Treffe ich heute eine Entscheidung, für die ich auch morgen einstehen kann? Freiheit ist weniger ein Ereignis als eine Gewohnheit – leise, wiederholbar, stabil.",
      "Wer das versteht, verliert die Angst vor dem großen Sprung und gewinnt Respekt vor dem kleinen Schritt."
    ]},
    { t: "Wissen bewahren, weitergeben", p: [
      "Wissen ist wie Feuer: Es verliert nichts, wenn man es teilt – es gewinnt Reichweite.",
      "In angespannten Zeiten hilft nicht „Geheimwissen“, sondern verständliche Erklärungen: Wie funktioniert ein Wallet? Was bedeutet „Zugriff“ wirklich?",
      "Wer etwas kapiert hat, kann es in einfachen Sätzen beschreiben – und damit Familien, Teams, Nachbarn stärken.",
      "Weitergeben heißt nicht „Besserwisser spielen“, sondern Brücken bauen: „So habe ich’s verstanden. Schau mal, ob dir das hilft.“ Gemeinschaft, die teilt, wird weniger manipulierbar."
    ]},
    { t: "Technologie als Werkzeug, nicht als Herr", p: [
      "Technik ist neutral, bis Interessen sie färben. Dann entscheidet Verständnis.",
      "Algorithmen ordnen Feeds, nicht Wahrheiten. Clouds speichern Daten, nicht Verantwortung.",
      "Souverän nutzt Technik bewusst: Verschlüsselung, eigene Schlüssel, klare Grenzen. Nicht jedes „Update“ verdient Vertrauen – besonders, wenn es Zugriffe bündelt.",
      "Offline bleibt ein legitimer Modus: Papier, lokale Backups, unabhängige Wege. Wer die Schalter kennt, bleibt handlungsfähig, wenn Systeme stolpern."
    ]},
    { t: "Wirtschaft im Wandel", p: [
      "Die Versprechen der alten Ordnung – „Job bis Rente“, „Inflation ist vorübergehend“, „Banken sind sicher“ – klingen zunehmend hohl.",
      "Lieferketten reißen, Währungen schwanken, Eigentum wird neu verhandelt – mal rechtlich, mal faktisch.",
      "Im Bruch liegt aber auch Freiheit: Räume für neue Formen von Wert und Tausch.",
      "Souveränität kämpft nicht blind gegen das Alte, sie baut klug das Neue: transparent, fair, nachvollziehbar. Frage: Wo entsteht Wert, der Menschen stärkt – nicht nur Bilanzen?"
    ]},
    { t: "Trustyfy als Prinzip der Zusammenarbeit", p: [
      "Trustyfy steht für ein einfaches Versprechen: gemeinsam handeln, ohne Kontrolle abzugeben.",
      "Kein „System, das dich besitzt“, sondern Werkzeuge, die Beteiligung sichtbar machen: Wer bringt was ein? Wer profitiert wie?",
      "So wird Vertrauen messbar – nicht als Misstrauen, sondern als Klarheit.",
      "Gerade wenn Institutionen wackeln, hilft geerdete Transparenz: nachvollziehbare Regeln, offene Wege, offene Bücher. Souverän ist, wer fair beteiligt ist und jederzeit aussteigen kann."
    ]},
    { t: "Verantwortung für die Wirkung", p: [
      "Erfolg ohne Verantwortung hinterlässt verbrannte Erde.",
      "Die Frage lautet: Welche Spur lässt mein Handeln – in Menschen, Orten, Daten?",
      "Finanzielle Freiheit ist leer, wenn sie nur der Flucht dient; sie wird stark, wenn sie Räume schafft: für Lernen, Hilfe, Aufbau.",
      "Verantwortung ist Richtung: Sie verhindert, dass man aus Angst oder Gier gegen sich selbst arbeitet. Wer Wirkung mitdenkt, baut Systeme, die Menschen nicht verbrauchen, sondern befähigen."
    ]},
    { t: "Familie, Zeit, Sinn", p: [
      "Wenn Strukturen tragen, kehrt die Zeit zurück – und mit ihr das, was zählt.",
      "Ein Abendessen ohne Handy. Ein Wochenende ohne Alarm. Ein Projekt mit den Kindern, das nach Holz riecht, nicht nach Deadline.",
      "Souveränität ordnet Prioritäten: erst Mensch, dann Maschine. Geld ist Werkzeug, keine Identität. Arbeit ist Wirkung, nicht Flucht.",
      "Wer das begreift, wird klarer in Angeboten und Forderungen. Sinn ist kein Luxus – er ist der Grund, warum man morgens gerne aufsteht."
    ]},
    { t: "Gesellschaft der Gestalter", p: [
      "Systeme kippen nicht, weil jemand laut ruft, sondern weil viele leise anders handeln.",
      "Aus Konsumenten werden Mitgestalter: Sie fragen nach Herkunft, nach fairen Regeln, nach Zugriffen – und treffen Entscheidungen, die diese Fragen ernst nehmen.",
      "Das ändert Märkte schneller als Parolen. Souveräne Gesellschaft ist Bürgerpraxis: teilen, erklären, klare Grenzen setzen.",
      "Wer Gestalter wird, verliert die Lust am Jammern. Das ist ansteckend – im besten Sinn."
    ]},
    { t: "Krisen als Prüfstein", p: [
      "Die letzten Jahre waren ein Stresstest: Energiepreise, Grenzschließungen, Kontosperren, digitale Zensur.",
      "Sie zeigten, wie fragil „Sicherheit“ sein kann, wenn sie auf Fremdzugriffen beruht.",
      "Souveränität besteht die Prüfung nicht mit Perfektion, sondern mit Ruhe: „Was bleibt, wenn X ausfällt? Wer hilft? Was kann ich selbst?“",
      "Jede Krise ist Unterricht – teuer, aber lehrreich. Wer sie als Spiegel nutzt, wird nicht zynisch, sondern wach."
    ]},
    { t: "Der Kreis schließt sich", p: [
      "Verstehen → Handeln → Wirken → Weitergeben: Das ist der Zyklus.",
      "Menschen, die verstehen, handeln anders. Menschen, die handeln, verändern Strukturen.",
      "Strukturen, die Menschen stärken, schaffen Zukunft – nicht durch Zwang, sondern durch Vorbild.",
      "Die Akademie existiert, um diesen Kreis zu nähren: Bewusstsein, Werkzeuge, Räume. Souveränität bleibt Bewegung – und du bleibst der, der geht."
    ]},
    { t: "Einladung: Teil der stillen Revolution", p: [
      "Werde Teil der größten stillen Revolution und hilf anderen, diese Akademie kennenzulernen.",
      "Die neue Welt gelebter finanzieller Souveränität – die jeder für sich selbst gestaltet.",
      "Als Neuanfang. Als Perspektive. Als Ausweg aus dem Hamsterrad.",
      "Nicht lauter, sondern klarer. Nicht gegen, sondern für. Bring jemanden mit – und fang dort an, wo du stehst."
    ]}
  ];

  const SLIDES_EN = [
    { t: "Sovereignty as a daily choice", p: [
      "Sovereignty isn’t a trophy on a shelf. It lives in every small yes and no.",
      "Purchases: cheap and dependent—or fair and comprehensible? Conversations: honest even when uneasy—or pleasing?",
      "Actions: a decision today you can stand by tomorrow. Freedom is a habit—quiet, repeatable, steady.",
      "Respect the small step; the big leap becomes less frightening."
    ]},
    { t: "Keep knowledge, pass it on", p: [
      "Knowledge is like fire: it loses nothing when shared—it gains reach.",
      "In tense times, clear explanations beat “secret insights”: how a wallet works, what access really means.",
      "If you truly grasp it, you can say it simply—and strengthen family, teams, neighbours.",
      "Sharing isn’t showing off; it’s bridge-building. Communities that share are harder to manipulate."
    ]},
    { t: "Technology as tool, not master", p: [
      "Tech is neutral until interests colour it; then understanding decides.",
      "Algorithms order feeds, not truths. Clouds store data, not responsibility.",
      "Use tech consciously: encryption, own keys, clear limits. Not every update deserves trust—especially if it centralises access.",
      "Offline is valid: paper, local backups, independent paths. Know the switches, stay capable."
    ]},
    { t: "Economy in transition", p: [
      "Old promises fade: job-to-pension, tame inflation, safe banks.",
      "Supply chains break, currencies sway, ownership gets renegotiated—legally or factually.",
      "In the fracture lies freedom: space for new forms of value and exchange.",
      "Don’t fight the old blindly; build the new wisely: transparent, fair, auditable. Ask where value strengthens people—not just balance sheets."
    ]},
    { t: "Trustyfy as a principle of collaboration", p: [
      "A simple promise: act together without giving up control.",
      "Not a system that owns you, but tools that make participation visible: who adds what, who benefits how.",
      "Trust becomes measurable—not as distrust but as clarity.",
      "When institutions wobble, grounded transparency helps: open rules, open paths, open books. Fair participation with the option to step out."
    ]},
    { t: "Accountability for impact", p: [
      "Success without responsibility scorches the ground.",
      "Ask: what trace does my action leave—in people, places, data?",
      "Freedom is weak if it’s only escape; it is strong when it creates room: for learning, help, building.",
      "Responsibility is direction; it stops fear or greed from turning you against yourself."
    ]},
    { t: "Family, time, meaning", p: [
      "When structures hold, time returns—and with it what matters.",
      "Dinner without phone. A weekend without alarms. A project with the kids that smells of wood, not deadlines.",
      "Sovereignty orders priorities: people before machines. Money is a tool, not identity. Work is impact, not escape.",
      "Meaning isn’t luxury—it’s why you want to get up."
    ]},
    { t: "A society of makers", p: [
      "Systems don’t tilt from shouting but from many people quietly acting differently.",
      "Consumers become co-creators: asking about origin, fair rules, access—and deciding accordingly.",
      "Markets change faster that way than with slogans. A sovereign society is citizen practice: sharing, explaining, drawing clear lines.",
      "Makers lose the taste for whining. It’s contagious—in the best sense."
    ]},
    { t: "Crises as proving ground", p: [
      "Recent years were a stress test: energy prices, border closures, frozen accounts, digital censorship.",
      "They showed how fragile “security” is when it rests on others’ access.",
      "Sovereignty passes not by perfection but by calm: what remains if X fails, who helps, what can I do myself?",
      "Every crisis is costly tuition—use the mirror, grow awake, not cynical."
    ]},
    { t: "The circle closes", p: [
      "Understand → Act → Have impact → Pass on: that’s the cycle.",
      "Those who understand act differently; those who act reshape structures.",
      "Structures that strengthen people create future—not by force but by example.",
      "The academy exists to feed that cycle: awareness, tools, spaces. Sovereignty stays in motion—and you keep walking."
    ]},
    { t: "Invitation: the quiet revolution", p: [
      "Join the largest quiet revolution and help others discover this academy.",
      "A lived world of financial sovereignty—shaped by each person.",
      "A new start. A perspective. A way out of the hamster wheel.",
      "Not louder but clearer. Not against but for. Bring someone—and begin where you stand."
    ]}
  ];

  const DATA = (LANG === "de") ? SLIDES_DE : SLIDES_EN;
  const TOTAL = DATA.length;

  // ----- Styles (scoped im Modul) -----
  const CSS = `
  .fsa-so4 { width:min(980px,92vw); margin:56px auto; background:#0f172a;
    border:1px solid rgba(212,175,55,.35); border-radius:16px;
    box-shadow:0 0 28px rgba(212,175,55,.25); color:#e5e7eb;
    font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
    padding:clamp(22px,3vw,36px) clamp(20px,3vw,40px); line-height:1.55;
    opacity:0; transform:translateY(8px); animation:fsa-fade .45s ease forwards; }
  @keyframes fsa-fade { to { opacity:1; transform:none; } }
  .fsa-so4 h2 { color:#d4af37; text-align:center; margin:0 0 18px;
    font-size:clamp(22px,2.4vw,28px); text-shadow:0 0 8px rgba(212,175,55,.35); }
  .fsa-so4 .stage { position:relative; min-height:300px; outline:none; }
  .fsa-so4 .card { position:absolute; inset:0; display:none; opacity:0; transform:translateY(10px);
    transition:opacity .45s ease, transform .45s ease; }
  .fsa-so4 .card.active { display:block; opacity:1; transform:none; }
  .fsa-so4 .card h3 { color:#e5e7eb; font-size:clamp(18px,2.1vw,22px); margin:0 0 10px; position:relative; }
  .fsa-so4 .card h3::after { content:""; position:absolute; left:0; bottom:-6px; width:60px; height:2px;
    background:linear-gradient(90deg,#d4af37 0%,transparent 100%); }
  .fsa-so4 .card p { margin:.45em 0; font-size:1.02rem; max-width:70ch; }
  .fsa-so4 .nav { display:flex; justify-content:space-between; align-items:center; margin-top:26px; gap:14px; }
  .fsa-so4 .btn { background:transparent; color:#e5e7eb; border:1px solid rgba(212,175,55,.4);
    border-radius:10px; padding:10px 16px; cursor:pointer; font-weight:600;
    box-shadow:0 0 22px rgba(212,175,55,.25); transition:background .2s ease, transform .15s ease; }
  .fsa-so4 .btn:hover { background:rgba(212,175,55,.08); }
  .fsa-so4 .btn:active { transform:translateY(1px); }
  .fsa-so4 .stat { color:#94a3b8; font-size:.95rem; }
  .fsa-so4 .progress { display:flex; justify-content:center; gap:10px; margin-top:18px; }
  .fsa-so4 .dot { width:10px; height:10px; border-radius:50%; background:rgba(212,175,55,.25);
    box-shadow:0 0 8px rgba(212,175,55,.25); transition:all .3s ease; }
  .fsa-so4 .dot.active { background:#d4af37; box-shadow:0 0 12px rgba(212,175,55,.6); transform:scale(1.2); }
  @media (max-width:820px){ .fsa-so4{ margin:36px auto; padding:22px } .fsa-so4 .stage{ min-height:360px } }
  `;

  // ----- Ziel-Slot holen: #campus-container-4 → sonst <body> -----
  const host = document.getElementById("campus-container-4") || document.body;

  // ----- Container erzeugen -----
  const box = document.createElement("section");
  box.className = "fsa-so4";
  box.setAttribute("id","campus-sovereign-04");
  box.setAttribute("aria-live","polite");
  box.innerHTML = `
    <style>${CSS}</style>
    <h2>${LANG==="de" ? "🦅 Zukunft & Verantwortung" : "🦅 Future & Responsibility"}</h2>
    <div class="stage" tabindex="0"></div>
    <div class="nav">
      <button class="btn" data-act="prev">${LANG==="de" ? "⬅ Zurück" : "⬅ Back"}</button>
      <div class="stat">1 / ${TOTAL}</div>
      <button class="btn" data-act="next">${LANG==="de" ? "Weiter ➡" : "Next ➡"}</button>
    </div>
    <div class="progress" aria-label="${LANG==="de" ? "Fortschritt" : "Progress"}"></div>
  `;

  host.appendChild(box);

  // ----- DOM-Refs -----
  const stage = box.querySelector(".stage");
  const stat  = box.querySelector(".stat");
  const prev  = box.querySelector('[data-act="prev"]');
  const next  = box.querySelector('[data-act="next"]');
  const progress = box.querySelector(".progress");
  const SRC = DATA;

  // ----- Slides rendern -----
  SRC.forEach((s, i) => {
    const card = document.createElement("article");
    card.className = "card" + (i===0 ? " active" : "");
    const paras = s.p.map(line => `<p>${escapeHtml(line)}</p>`).join("");
    card.innerHTML = `<h3>${escapeHtml(s.t)}</h3>${paras}`;
    stage.appendChild(card);

    const dot = document.createElement("div");
    dot.className = "dot" + (i===0 ? " active" : "");
    progress.appendChild(dot);
  });

  let idx = 0;
  function show(n){
    const cards = stage.querySelectorAll(".card");
    const dots  = progress.querySelectorAll(".dot");
    cards.forEach(c => c.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    cards[n].classList.add("active");
    dots[n].classList.add("active");
    stat.textContent = `${n+1} / ${TOTAL}`;
    prev.disabled = (n===0);
    next.disabled = (n===TOTAL-1);
  }

  // ----- Navigation -----
  prev.addEventListener("click", ()=>{ if(idx>0){ idx--; show(idx); } });
  next.addEventListener("click", ()=>{ if(idx<TOTAL-1){ idx++; show(idx); } });

  // Keyboard
  stage.addEventListener("keydown", e => {
    if(e.key==="ArrowRight" && idx<TOTAL-1){ idx++; show(idx); }
    if(e.key==="ArrowLeft"  && idx>0){ idx--; show(idx); }
  });

  // Touch
  let startX = null;
  stage.addEventListener("touchstart", e => startX = e.touches[0].clientX, {passive:true});
  stage.addEventListener("touchend", e => {
    if(startX===null) return;
    const diff = e.changedTouches[0].clientX - startX;
    if(Math.abs(diff)>40){
      if(diff<0 && idx<TOTAL-1){ idx++; show(idx); }
      if(diff>0 && idx>0){ idx--; show(idx); }
    }
    startX = null;
  }, {passive:true});

  stage.focus();
  show(idx);

  // ----- Utils -----
  function escapeHtml(str){
    return String(str)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;")
      .replace(/>/g,"&gt;").replace(/"/g,"&quot;")
      .replace(/'/g,"&#39;");
  }
})();
