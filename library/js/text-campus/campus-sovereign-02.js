/* ==========================================================================
   FSA Campus – Text-Container
   Modul: Souveränität / Container 2 – "Handeln mit Struktur"
   Pfad: /library/js/text-campus/campus-sovereign-02.js
   Eigenschaften:
   • Autoload (fügt sich selbst ein)
   • Fade-In (goldener Glow, Darkmode)
   • Keyboard (←/→), Touch-Swipe, ARIA
   • Fortschritts-Punkte + Zähler
   • DE/EN anhand window.FSA_LANG oder <html lang="">
   • Slot-Logik: nutzt #campus-container-2, fällt zurück auf <body>
   ========================================================================== */
(function CampusSovereign02(){
  // ----- Sprache bestimmen (DE als Standard) -----
  const currentLang = (window.FSA_LANG || document.documentElement.lang || "de").toLowerCase();
  const LANG = currentLang.startsWith("de") ? "de" : "en";

  // ----- Inhalte (10 Slides) -----
  const SLIDES_DE = [
    { t: "Klarheit in Bewegung", p: [
      "Wenn draußen alles lauter wird, gewinnt nicht, wer am meisten rennt, sondern wer am klarsten sieht.",
      "Struktur heißt hier nicht Regelheft, sondern innere Linie: Was zählt für dich? Wofür bist du bereit einzustehen, auch wenn es unpraktisch wird?",
      "Spontane Entscheidungen sind teuer, wenn sie aus Angst kommen. Klare Entscheidungen sind leise – und wirken länger."
    ]},
    { t: "Werte vor Währung", p: [
      "Geld schwankt. Prinzipien nicht.",
      "Wenn du in Werten denkst – Ehrlichkeit, Verantwortung, Fairness – sortiert sich vieles von selbst: mit wem du arbeitest, was du kaufst, welche Risiken du bewusst nimmst.",
      "Wer nur auf Rendite schaut, verliert oft die Richtung, wenn der Kurs dreht. Wer auf Werte schaut, findet auch im Sturm seinen Kompass."
    ]},
    { t: "Beziehungen als Sicherheitsnetz", p: [
      "Systeme versprechen Sicherheit; Menschen geben sie.",
      "Wenn das Konto stockt, hilft dir kein Algorithmus, aber ein echter Kontakt tut es oft.",
      "Familie, Freunde, Partner, lokale Kreise – sie sind tragfähige Brücken, wenn die Infrastruktur klemmt. Souveränes Handeln sieht Menschen zuerst, Strukturen erst danach."
    ]},
    { t: "Wissen als Besitz, der bleibt", p: [
      "Was du verstehst, kann dir niemand sperren.",
      "Ob Energie, Verträge oder digitale Werkzeuge – wer die Grundlogik kennt, verliert weniger Zeit und weniger Geld.",
      "Wissen ist Vermögen, das nicht einfriert, wenn Konten es tun. Ein klarer Satz pro Thema reicht oft: „So funktioniert das – und hier greife ich ein, wenn’s kippt.“"
    ]},
    { t: "Dezentral denken: Zugang in eigener Hand", p: [
      "Abhängigkeiten werden zur Falle, wenn der Zugang anderen gehört.",
      "Eigenes Wallet, eigene Backups, eigene Schlüssel – nicht aus Misstrauen, sondern aus Respekt vor der Realität.",
      "Es geht nicht um Autarkie, sondern um Handlungsfähigkeit: teilnehmen, ohne ausgeliefert zu sein. Verantwortung teilen, Kontrolle zurückholen."
    ]},
    { t: "Handeln in unsicheren Zeiten", p: [
      "Wenn Preise springen und Regeln sich ändern, zahlt sich ruhiges Tempo aus.",
      "Kleine, nachvollziehbare Schritte sind stärker als große, die du nicht halten kannst.",
      "Alltag: Anbieter wechseln statt Ärger; barrierefreie Kontaktwege statt Plattform-Monokultur; ein zweiter Zugang statt Heldengeschichte. Souveränität ist unspektakulär – und stabil."
    ]},
    { t: "Mut zur Pause", p: [
      "Reaktion ist laut, Reflexion ist machtvoll.",
      "Eine kurze Pause vor einer Entscheidung verändert oft alles: Du hörst dich wieder.",
      "Wer Pausen zulässt, handelt seltener gegen sich. Souveränes Handeln liebt nicht die Eile, sondern die Klarheit nach dem Einatmen."
    ]},
    { t: "Vertrauen in Prozesse, nicht in Versprechen", p: [
      "Versprechen sind billig, Prozesse sind teuer – und deshalb wertvoll.",
      "Ein Prozess trägt dich, wenn die Laune fehlt: einfache Abläufe, die du kennst und denen du traust.",
      "Langsam ist häufig stabiler: Wer zu schnell baut, baut oft für den Abbruch. Souveränität ist weniger „großer Sprung“ als „ruhige Spur“."
    ]},
    { t: "Kooperation ohne Zwang (Trustyfy im Blick)", p: [
      "Unabhängigkeit entsteht, wenn Menschen Verantwortung teilen, ohne sie abzugeben.",
      "Trustyfy kann ein Werkzeug dafür sein: Transparenz, Teilhabe, Beteiligung – nachvollziehbar statt nebulös.",
      "Nicht als Dogma, sondern als Option, die Reibung senkt: weniger Zwischenhändler, mehr Einsicht in das, was man gemeinsam bewegt. Souveräne Kooperation fühlt sich nach Raum an, nicht nach Kette."
    ]},
    { t: "Souveränität als Lebenshaltung", p: [
      "Am Ende geht es nicht um Systeme, sondern um dein Leben.",
      "Souveränes Handeln gibt dir Zeit zurück: für Liebe, Familie, Kinder, Freundschaften, Hobbys, Träume.",
      "Du wirst nicht „perfekt frei“. Du wirst spürbar freier. Das ist genug – und es trägt."
    ]}
  ];

  const SLIDES_EN = [
    { t: "Clarity in motion", p: [
      "When the world gets loud, the winner isn’t the fastest but the clearest.",
      "Structure isn’t a rulebook here, but an inner line: What matters to you? What will you stand for even when it’s inconvenient?",
      "Fear-driven decisions are expensive; clear ones are quiet and last longer."
    ]},
    { t: "Values before currency", p: [
      "Money fluctuates. Principles don’t.",
      "Thinking in values—honesty, responsibility, fairness—sorts a lot on its own: partners, purchases, risks you accept on purpose.",
      "Chasing returns loses direction when markets swing; values keep your compass in the storm."
    ]},
    { t: "Relationships as a safety net", p: [
      "Systems promise safety; people provide it.",
      "When accounts stall, an algorithm won’t help—but a person often will.",
      "Family, friends, partners, local circles—they’re bridges when infrastructure jams. Sovereign action sees people first, structures second."
    ]},
    { t: "Knowledge as enduring ownership", p: [
      "What you understand can’t be frozen.",
      "Energy, contracts, digital tools—knowing the basics saves time and money.",
      "Knowledge is wealth that doesn’t lock when accounts do. One clear sentence per topic often suffices: “This is how it works—and here I intervene if it fails.”"
    ]},
    { t: "Think decentralised: access in your own hand", p: [
      "Dependencies become traps when access belongs to others.",
      "Your own wallet, backups, keys—not from distrust but from realism.",
      "It’s not off-grid isolation—it’s agency: participate without being captive. Share responsibility, reclaim control."
    ]},
    { t: "Acting in uncertain times", p: [
      "When prices jump and rules shift, calm pacing pays.",
      "Small, traceable steps beat big ones you can’t sustain.",
      "Everyday: switch providers instead of stewing; alternative contact paths instead of platform monoculture; a second access path over hero stories. Sovereignty looks unspectacular—and that’s why it’s stable."
    ]},
    { t: "Courage to pause", p: [
      "Reaction is loud; reflection is powerful.",
      "A short pause before deciding changes everything: you can hear yourself again.",
      "Those who allow pauses act less against themselves. Sovereign action prefers clarity after the inhale."
    ]},
    { t: "Trust processes, not promises", p: [
      "Promises are cheap; processes are costly—and therefore valuable.",
      "A process carries you when mood doesn’t: simple steps you know and trust.",
      "Slow is often sturdier: those who build too fast often build for demolition. Sovereignty is less a leap than a steady lane."
    ]},
    { t: "Cooperation without coercion (Trustyfy in view)", p: [
      "Independence grows when people share responsibility without giving it away.",
      "Trustyfy can be such a tool: transparency, participation, shared value—traceable instead of nebulous.",
      "Not as dogma, but as an option that reduces friction: fewer middlemen, more insight into what you move together. Sovereign cooperation feels like space, not a chain."
    ]},
    { t: "Sovereignty as a way of life", p: [
      "In the end it’s not about systems—it’s about your life.",
      "Sovereign action gives you back time for love, family, children, friends, hobbies, dreams.",
      "You won’t be perfectly free. You’ll be noticeably freer. That’s enough—and it holds."
    ]}
  ];

  const DATA = (LANG === "de") ? SLIDES_DE : SLIDES_EN;
  const TOTAL = DATA.length;

  // ----- Styles (scoped im Modul) -----
  const CSS = `
  .fsa-so2 { width:min(980px,92vw); margin:56px auto; background:#0f172a;
    border:1px solid rgba(212,175,55,.35); border-radius:16px;
    box-shadow:0 0 28px rgba(212,175,55,.25); color:#e5e7eb;
    font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
    padding:clamp(22px,3vw,36px) clamp(20px,3vw,40px); line-height:1.55;
    opacity:0; transform:translateY(8px); animation:fsa-fade .45s ease forwards; }
  @keyframes fsa-fade { to { opacity:1; transform:none; } }
  .fsa-so2 h2 { color:#d4af37; text-align:center; margin:0 0 18px;
    font-size:clamp(22px,2.4vw,28px); text-shadow:0 0 8px rgba(212,175,55,.35); }
  .fsa-so2 .stage { position:relative; min-height:300px; outline:none; }
  .fsa-so2 .card { position:absolute; inset:0; display:none; opacity:0; transform:translateY(10px);
    transition:opacity .45s ease, transform .45s ease; }
  .fsa-so2 .card.active { display:block; opacity:1; transform:none; }
  .fsa-so2 .card h3 { color:#e5e7eb; font-size:clamp(18px,2.1vw,22px); margin:0 0 10px; position:relative; }
  .fsa-so2 .card h3::after { content:""; position:absolute; left:0; bottom:-6px; width:60px; height:2px;
    background:linear-gradient(90deg,#d4af37 0%,transparent 100%); }
  .fsa-so2 .card p { margin:.45em 0; font-size:1.02rem; max-width:70ch; }
  .fsa-so2 .nav { display:flex; justify-content:space-between; align-items:center; margin-top:26px; gap:14px; }
  .fsa-so2 .btn { background:transparent; color:#e5e7eb; border:1px solid rgba(212,175,55,.4);
    border-radius:10px; padding:10px 16px; cursor:pointer; font-weight:600;
    box-shadow:0 0 22px rgba(212,175,55,.25); transition:background .2s ease, transform .15s ease; }
  .fsa-so2 .btn:hover { background:rgba(212,175,55,.08); }
  .fsa-so2 .btn:active { transform:translateY(1px); }
  .fsa-so2 .stat { color:#94a3b8; font-size:.95rem; }
  .fsa-so2 .progress { display:flex; justify-content:center; gap:10px; margin-top:18px; }
  .fsa-so2 .dot { width:10px; height:10px; border-radius:50%; background:rgba(212,175,55,.25);
    box-shadow:0 0 8px rgba(212,175,55,.25); transition:all .3s ease; }
  .fsa-so2 .dot.active { background:#d4af37; box-shadow:0 0 12px rgba(212,175,55,.6); transform:scale(1.2); }
  @media (max-width:820px){ .fsa-so2{ margin:36px auto; padding:22px } .fsa-so2 .stage{ min-height:360px } }
  `;

  // ----- Ziel-Slot holen: #campus-container-2 → sonst <body> -----
  const host = document.getElementById("campus-container-2") || document.body;

  // ----- Container erzeugen -----
  const box = document.createElement("section");
  box.className = "fsa-so2";
  box.setAttribute("id","campus-sovereign-02");
  box.setAttribute("aria-live","polite");
  box.innerHTML = `
    <style>${CSS}</style>
    <h2>${LANG==="de" ? "🧱 Handeln mit Struktur" : "🧱 Acting with Structure"}</h2>
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
