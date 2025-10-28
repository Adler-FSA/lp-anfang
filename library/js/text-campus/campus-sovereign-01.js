/* ==========================================================================
   FSA Campus – Text-Container
   Modul: Souveränität / Container 1 – "Denken in Besitzverhältnissen"
   Pfad: /library/js/text-campus/campus-sovereign-01.js
   Eigenschaften:
   • Autoload (fügt sich selbst ein)
   • Fade-In (goldener Glow, Darkmode)
   • Keyboard (←/→), Touch-Swipe, ARIA
   • Fortschritts-Punkte + Zähler
   • DE/EN anhand window.FSA_LANG oder <html lang="">
   • Slot-Logik: nutzt #campus-container-1, fällt zurück auf <body>
   ========================================================================== */
(function CampusSovereign01(){
  // ----- Sprache bestimmen (DE als Standard) -----
  const currentLang = (window.FSA_LANG || document.documentElement.lang || "de").toLowerCase();
  const LANG = currentLang.startsWith("de") ? "de" : "en";

  // ----- Inhalte (10 Slides) -----
  const SLIDES_DE = [
    { t: "Souveränität beginnt im Kopf", p: [
      "Souveränität entsteht nicht durch Besitz, sondern durch Bewusstsein.",
      "Sie beginnt in dem Moment, in dem du dich fragst, wem dein Alltag wirklich gehört – dein Geld, deine Energie, deine Zeit, dein Zuhause.",
      "In einer Welt, in der Strompreise, Hypotheken und Algorithmen täglich neu über dein Leben entscheiden, ist Unabhängigkeit kein Luxus, sondern Strategie.",
      "Viele merken erst in Krisen, wie wenig sie wirklich führen. Der erste Schritt ist, das zu erkennen – und echte Kontrolle zu lernen."
    ]},
    { t: "Wem gehört, was ich nutze?", p: [
      "Dein Konto gehört der Bank, dein Stromnetz dem Konzern, dein Handy dem Anbieter, deine Reichweite der Plattform.",
      "Viele Länder erleben, wie leicht Systeme Menschen von ihrem Besitz trennen – per Knopfdruck: Sanktionen, Sperren, Abschaltungen.",
      "Freiheit beginnt dort, wo du siehst, dass Nutzung keine Kontrolle bedeutet. Wer versteht, was ausgelagert ist, kann Alternativen schaffen – klein, lokal, selbstbestimmt."
    ]},
    { t: "Besitz ist nicht gleich Kontrolle", p: [
      "Du kannst ein Haus besitzen und doch wenig entscheiden, wenn der Zins steigt oder das Gas ausbleibt.",
      "Du kannst sparen, und doch verliert dein Geld täglich an Kaufkraft.",
      "Souverän sein heißt, Strukturen zu erkennen – Kredit, Vertrag, Versicherung, Steuer – und Spielräume zu nutzen, bevor sie verschwinden."
    ]},
    { t: "Zeit gegen Geld oder Wert gegen Wirkung", p: [
      "Viele arbeiten härter denn je – und fühlen sich trotzdem machtlos, weil das System auf Funktion statt Freiheit ausgelegt ist.",
      "Wer Monat für Monat nur Verpflichtungen bedient, lebt nicht von seinem Wert, sondern von der Duldung anderer.",
      "Ein souveräner Mensch baut Strukturen, die wirken, auch wenn er nicht anwesend ist – digital, menschlich, real."
    ]},
    { t: "Eine Übung zur Klarheit", p: [
      "Schreib fünf Dinge auf, die dein tägliches Leben sichern: Einkommen, Strom, Internet, Konto, Wohnung.",
      "Frag dich: Wer kontrolliert sie? Was passiert, wenn eines davon morgen ausfällt – durch Krise, Sanktion, Hackerangriff oder politische Entscheidung?",
      "Das ist kein Angstmacher, sondern ein Spiegel: Wo bist du verwundbar – und wo beginnst du mit echtem Aufbau?"
    ]},
    { t: "Mentorenimpuls: Abhängigkeit ist kein Fehler", p: [
      "In einer vernetzten Welt sind wir alle abhängig – voneinander, von Systemen, von Ressourcen.",
      "Gefährlich wird es erst, wenn du Abhängigkeit nicht erkennst.",
      "Wenn ganze Länder stocken, weil Lieferketten reißen oder Software gesperrt wird, zeigt sich: Kontrolle ist die neue Währung.",
      "Souveränität wächst dort, wo Menschen sich befähigen – Wissen, Energie, Vertrauen teilen."
    ]},
    { t: "Bewusst handeln, nicht perfekt", p: [
      "Du musst nicht autark leben, um frei zu sein.",
      "Aber du musst verstehen, was du freiwillig abgibst – und warum.",
      "Souveränität heißt, Entscheidungen zu treffen, bevor andere sie für dich treffen. Wer das heute übt, bleibt morgen handlungsfähig – egal, wie laut die Welt wird."
    ]},
    { t: "Fazit: Besitz verstehen heißt Macht verstehen", p: [
      "Kontrolle ist selten sichtbar, aber überall spürbar.",
      "Wer versteht, wie sie funktioniert, verliert die Angst vor ihr.",
      "Souveränität heißt, sich selbst zu führen – Klarheit statt Wut, Teilnahme statt Ohnmacht."
    ]},
    { t: "Trustyfy: Werkzeuge für echte Unabhängigkeit", p: [
      "Souveränität braucht Strukturen, nicht Parolen.",
      "Trustyfy gibt dir Werkzeuge für Transparenz, Teilhabe und Beteiligung – dezentral, ohne Zwischenhändler.",
      "So wird finanzielle Bildung zu Handlung: Werte gemeinsam aufbauen, Verantwortung verteilen, Kontrolle zurückholen."
    ]},
    { t: "Freiheit hat wieder Platz", p: [
      "Wenn du diese Prinzipien lebst, verändert sich dein Alltag: Du nutzt Systeme, statt von ihnen benutzt zu werden.",
      "Wohlstand wird wieder zu Zeit: Liebe, Familie, Kinder, Freundschaften, Hobbys, Träume.",
      "Finanzielle Souveränität schenkt nicht nur Geld – sie gibt dir dein Leben zurück."
    ]}
  ];

  const SLIDES_EN = [
    { t: "Sovereignty starts in your mind", p: [
      "Sovereignty doesn’t come from owning things but from awareness.",
      "It begins the moment you ask who truly owns your everyday – your money, energy, time, home.",
      "In a world where prices, mortgages and algorithms decide your day, independence is not luxury but strategy.",
      "Many only see this in crises. First step: recognise it – then learn real control."
    ]},
    { t: "Who owns what I use?", p: [
      "Your account belongs to the bank, the grid to a utility, the phone to a provider, your reach to a platform.",
      "Nations learn how easily systems detach people from assets – sanctions, freezes, shutdowns.",
      "Freedom starts when you see that usage ≠ control. Understand what’s outsourced, then build small, local, self-determined alternatives."
    ]},
    { t: "Ownership ≠ Control", p: [
      "You can own a house yet decide little when rates jump or gas stops.",
      "You can save and still lose purchasing power daily.",
      "Sovereignty means seeing structures – credit, contract, insurance, tax – and using your room to move before it’s gone."
    ]},
    { t: "Time for money or value for impact", p: [
      "People work harder than ever yet feel powerless; systems reward function over freedom.",
      "If each month only services obligations, you live on permission, not value.",
      "Build structures that work when you’re not there – digital, human, real."
    ]},
    { t: "A clarity exercise", p: [
      "List five things your life relies on: income, power, internet, account, housing.",
      "Who controls each? What happens if one fails tomorrow – crisis, sanction, hack, policy?",
      "Not fear – a mirror: see exposure and where to start building."
    ]},
    { t: "Mentor’s note: dependency isn’t a sin", p: [
      "In a networked world, we’re all dependent. It’s dangerous only when unseen.",
      "When countries stall because deliveries stop or software is blocked, you see: control is a new currency.",
      "Sovereignty grows where people empower each other – share knowledge, energy, trust."
    ]},
    { t: "Act consciously, not perfectly", p: [
      "You don’t need to be off-grid to be free.",
      "Know what you give away – and why.",
      "Decide before others decide for you. Practice today, stay capable tomorrow."
    ]},
    { t: "Bottom line: understand ownership to understand power", p: [
      "Control is rarely visible but always present.",
      "Understanding dissolves fear.",
      "Sovereignty is self-leadership – clarity over anger, participation over helplessness."
    ]},
    { t: "Trustyfy: tools for real independence", p: [
      "Sovereignty needs structures, not slogans.",
      "Trustyfy provides tools for transparency, participation and shared value – decentralised, without middlemen.",
      "Education becomes action: build value together, distribute responsibility, reclaim control."
    ]},
    { t: "Space for life again", p: [
      "Live these principles and your everyday changes: you use systems instead of being used.",
      "Wealth becomes time – for love, family, children, friends, hobbies, dreams.",
      "Financial sovereignty gives not just money – it gives you back your life."
    ]}
  ];

  const DATA = (LANG === "de") ? SLIDES_DE : SLIDES_EN;
  const TOTAL = DATA.length;

  // ----- Styles (scoped im Modul) -----
  const CSS = `
  .fsa-so1 { width:min(980px,92vw); margin:56px auto; background:#0f172a;
    border:1px solid rgba(212,175,55,.35); border-radius:16px;
    box-shadow:0 0 28px rgba(212,175,55,.25); color:#e5e7eb;
    font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
    padding:clamp(22px,3vw,36px) clamp(20px,3vw,40px); line-height:1.55;
    opacity:0; transform:translateY(8px); animation:fsa-fade .45s ease forwards; }
  @keyframes fsa-fade { to { opacity:1; transform:none; } }
  .fsa-so1 h2 { color:#d4af37; text-align:center; margin:0 0 18px;
    font-size:clamp(22px,2.4vw,28px); text-shadow:0 0 8px rgba(212,175,55,.35); }
  .fsa-so1 .stage { position:relative; min-height:300px; outline:none; }
  .fsa-so1 .card { position:absolute; inset:0; display:none; opacity:0; transform:translateY(10px);
    transition:opacity .45s ease, transform .45s ease; }
  .fsa-so1 .card.active { display:block; opacity:1; transform:none; }
  .fsa-so1 .card h3 { color:#e5e7eb; font-size:clamp(18px,2.1vw,22px); margin:0 0 10px; position:relative; }
  .fsa-so1 .card h3::after { content:""; position:absolute; left:0; bottom:-6px; width:60px; height:2px;
    background:linear-gradient(90deg,#d4af37 0%,transparent 100%); }
  .fsa-so1 .card p { margin:.45em 0; font-size:1.02rem; max-width:70ch; }
  .fsa-so1 .nav { display:flex; justify-content:space-between; align-items:center; margin-top:26px; gap:14px; }
  .fsa-so1 .btn { background:transparent; color:#e5e7eb; border:1px solid rgba(212,175,55,.4);
    border-radius:10px; padding:10px 16px; cursor:pointer; font-weight:600;
    box-shadow:0 0 22px rgba(212,175,55,.25); transition:background .2s ease, transform .15s ease; }
  .fsa-so1 .btn:hover { background:rgba(212,175,55,.08); }
  .fsa-so1 .btn:active { transform:translateY(1px); }
  .fsa-so1 .stat { color:#94a3b8; font-size:.95rem; }
  .fsa-so1 .progress { display:flex; justify-content:center; gap:10px; margin-top:18px; }
  .fsa-so1 .dot { width:10px; height:10px; border-radius:50%; background:rgba(212,175,55,.25);
    box-shadow:0 0 8px rgba(212,175,55,.25); transition:all .3s ease; }
  .fsa-so1 .dot.active { background:#d4af37; box-shadow:0 0 12px rgba(212,175,55,.6); transform:scale(1.2); }
  @media (max-width:820px){ .fsa-so1{ margin:36px auto; padding:22px } .fsa-so1 .stage{ min-height:360px } }
  `;

  // ----- Ziel-Slot holen: #campus-container-1 → sonst <body> -----
  const host = document.getElementById("campus-container-1") || document.body;

  // ----- Container erzeugen -----
  const box = document.createElement("section");
  box.className = "fsa-so1";
  box.setAttribute("id","campus-sovereign-01");
  box.setAttribute("aria-live","polite");
  box.innerHTML = `
    <style>${CSS}</style>
    <h2>${LANG==="de" ? "🪙 Denken in Besitzverhältnissen" : "🪙 Thinking in Terms of Ownership"}</h2>
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
  const SRC = (LANG === "de") ? SLIDES_DE : SLIDES_EN;

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
