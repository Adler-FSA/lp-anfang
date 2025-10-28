/* ==========================================================================
   FSA Campus – Text-Container
   Modul: Souveränität / Container 3 – "Praxis & Entscheidungen"
   Pfad: /library/js/text-campus/campus-sovereign-03.js
   Eigenschaften:
   • Autoload (fügt sich selbst ein)
   • Fade-In (goldener Glow, Darkmode)
   • Keyboard (←/→), Touch-Swipe, ARIA
   • Fortschritts-Punkte + Zähler
   • DE/EN anhand window.FSA_LANG oder <html lang="">
   • Slot-Logik: nutzt #campus-container-3, fällt zurück auf <body>
   ========================================================================== */
(function CampusSovereign03(){
  // ----- Sprache bestimmen (DE als Standard) -----
  const currentLang = (window.FSA_LANG || document.documentElement.lang || "de").toLowerCase();
  const LANG = currentLang.startsWith("de") ? "de" : "en";

  // ----- Inhalte (10 Slides) -----
  const SLIDES_DE = [
    { t: "Wenn Theorie auf Wirklichkeit trifft", p: [
      "Souveränität zeigt sich, wenn Pläne auf Realität prallen.",
      "Nicht im Idealzustand, sondern in Momenten, wo Systeme versagen.",
      "Wenn Strompreise explodieren, Lieferungen stocken oder Konten blockiert werden, wird sichtbar, wer wirklich Zugriff hat.",
      "Praxis beginnt da, wo Kontrolle keine Annahme mehr ist, sondern geprüft wird."
    ]},
    { t: "Entscheidungen im Sturm", p: [
      "Man erkennt freie Menschen nicht an ihren Worten, sondern daran, wie sie in Krisen entscheiden.",
      "Wer seine Reserven kennt, bleibt handlungsfähig.",
      "Wer Abhängigkeiten versteht, reagiert nicht panisch.",
      "Souveränität ist kein Mut zur Rebellion, sondern Ruhe im Sturm – das Wissen, welche Handlung heute trägt."
    ]},
    { t: "Energie, Essen, Einkommen", p: [
      "Wenn Lieferketten reißen, Preise steigen oder Gehälter stocken, zeigt sich die Qualität persönlicher Struktur.",
      "Souverän handeln heißt, Alternativen zu sehen, bevor sie nötig werden.",
      "Eigenes Netz, Vorrat, Fähigkeiten – kein Prepper-Denken, sondern Weitsicht.",
      "Du musst nichts besitzen, um vorbereitet zu sein – du musst nur verstehen, wo du abhängig bist."
    ]},
    { t: "Finanzen unter Zugriff", p: [
      "Viele merken erst bei einer Kontosperre, wem das Geld wirklich gehört.",
      "Souveränes Handeln heißt, Liquidität so zu verteilen, dass kein einzelner Hebel alles stoppt.",
      "Digitale Brieftasche, echtes Bargeld, unabhängige Einnahmequellen – kleine Dinge, große Freiheit.",
      "Trustyfy bietet hier einen Ansatz: Kooperation, ohne Kontrolle abzugeben."
    ]},
    { t: "Verantwortung ohne Angst", p: [
      "In unsicheren Zeiten wächst das Bedürfnis nach Sicherheit – und die Versuchung, Verantwortung abzugeben.",
      "Doch wer Verantwortung teilt, ohne zu prüfen, gibt Kontrolle mit ab.",
      "Struktur bedeutet nicht, sich zu fesseln, sondern bewusst zu wählen, wem man vertraut.",
      "Souveränität heißt: keine Angst, aber ein Plan."
    ]},
    { t: "Kooperation als Gegengift", p: [
      "Abhängigkeit isoliert. Gemeinschaft befreit – wenn sie klar bleibt.",
      "Trustyfy zeigt, dass Zusammenarbeit nicht Verlust bedeutet, sondern Stabilität.",
      "Transparente Prozesse, nachvollziehbare Wege, klare Zuständigkeiten.",
      "So wird Vertrauen zur Währung, nicht zur Schwachstelle."
    ]},
    { t: "Eigenes Tempo, eigener Kurs", p: [
      "Schnelligkeit ist kein Zeichen von Souveränität.",
      "Wer immer auf Trends springt, lebt fremde Prioritäten.",
      "Ruhige Entscheidungen brauchen Distanz, nicht Datenflut.",
      "Die Kunst besteht darin, rechtzeitig zu handeln – nicht sofort."
    ]},
    { t: "Lernen aus Fehlern anderer", p: [
      "Bankenpleiten, Datenskandale, politische Kehrtwenden – jedes Ereignis ist ein Lehrstück.",
      "Souveräne Menschen lernen aus den Fehlern anderer, bevor sie selbst betroffen sind.",
      "Das Ziel ist nicht Kontrolle über alles, sondern Kontrolle über sich.",
      "Wer Wissen teilt, schützt Gemeinschaft."
    ]},
    { t: "Die Rolle von Trustyfy", p: [
      "In einer Welt voller Unsicherheiten wird Vertrauen zur Infrastruktur.",
      "Trustyfy schafft Räume, in denen Beteiligung fair, klar und messbar bleibt.",
      "Kein blindes Vertrauen, sondern nachvollziehbare Verantwortung.",
      "So entsteht die Grundlage für echte Kooperation – und damit für wirtschaftliche Unabhängigkeit."
    ]},
    { t: "Zeit zurückgewinnen", p: [
      "Souveränität schenkt das, was Geld nie kann: Zeit.",
      "Zeit für Familie, für Kinder, für das, was Sinn gibt.",
      "Wer Strukturen versteht, wird nicht gehetzt, sondern gestaltet.",
      "Finanzielle Freiheit ist kein Ziel – sie ist der Anfang eines selbstbestimmten Lebens."
    ]}
  ];

  const SLIDES_EN = [
    { t: "When theory meets reality", p: [
      "Sovereignty shows when plans hit reality.",
      "Not in ideal states, but when systems fail.",
      "When energy prices spike, deliveries stall or accounts are frozen, you see who truly has access.",
      "Practice begins where control is tested, not assumed."
    ]},
    { t: "Decisions in the storm", p: [
      "Free people aren’t known by words but by how they decide in crises.",
      "Knowing your reserves keeps you capable.",
      "Understanding dependencies prevents panic.",
      "Sovereignty isn’t rebellion; it’s calm in the storm—knowing which action carries today."
    ]},
    { t: "Energy, food, income", p: [
      "When supply chains break, prices rise or pay stalls, your personal structure is revealed.",
      "Sovereign action sees alternatives before they’re needed.",
      "Own network, provisions, skills—not doomsday, but foresight.",
      "You don’t need to own everything; you need to understand where you depend."
    ]},
    { t: "Finance under access control", p: [
      "Many realise only with a frozen account who really owns the money.",
      "Sovereign action spreads liquidity so no single lever stops everything.",
      "Digital wallet, real cash, independent income streams—small things, big freedom.",
      "Trustyfy offers an approach here: cooperation without giving up control."
    ]},
    { t: "Responsibility without fear", p: [
      "In uncertain times, the hunger for safety grows—and so does the urge to hand off responsibility.",
      "But sharing responsibility without scrutiny hands off control too.",
      "Structure isn’t a chain; it’s a choice of whom to trust.",
      "Sovereignty means: no fear, but a plan."
    ]},
    { t: "Cooperation as antidote", p: [
      "Dependency isolates. Community frees—if it stays clear.",
      "Trustyfy shows collaboration can mean stability, not loss.",
      "Transparent processes, traceable paths, clear roles.",
      "Thus trust becomes currency, not a vulnerability."
    ]},
    { t: "Own pace, own course", p: [
      "Speed isn’t a sign of sovereignty.",
      "Chasing trends means living others’ priorities.",
      "Calm decisions need distance, not data floods.",
      "The art is to act in time—not instantly."
    ]},
    { t: "Learning from others’ failures", p: [
      "Bank collapses, data scandals, political U-turns—each is a lesson.",
      "Sovereign people learn before they’re personally hit.",
      "The goal isn’t control over everything, but control over oneself.",
      "Sharing knowledge protects community."
    ]},
    { t: "Trustyfy’s role", p: [
      "In a world of uncertainty, trust is infrastructure.",
      "Trustyfy creates spaces where participation stays fair, clear and measurable.",
      "Not blind trust, but accountable responsibility.",
      "That builds the basis for true cooperation—and economic independence."
    ]},
    { t: "Winning back time", p: [
      "Sovereignty gives what money can’t: time.",
      "Time for family, children, what gives meaning.",
      "Those who understand structures aren’t chased—they shape.",
      "Financial freedom isn’t an end; it’s the start of a self-directed life."
    ]}
  ];

  const DATA = (LANG === "de") ? SLIDES_DE : SLIDES_EN;
  const TOTAL = DATA.length;

  // ----- Styles (scoped im Modul) -----
  const CSS = `
  .fsa-so3 { width:min(980px,92vw); margin:56px auto; background:#0f172a;
    border:1px solid rgba(212,175,55,.35); border-radius:16px;
    box-shadow:0 0 28px rgba(212,175,55,.25); color:#e5e7eb;
    font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
    padding:clamp(22px,3vw,36px) clamp(20px,3vw,40px); line-height:1.55;
    opacity:0; transform:translateY(8px); animation:fsa-fade .45s ease forwards; }
  @keyframes fsa-fade { to { opacity:1; transform:none; } }
  .fsa-so3 h2 { color:#d4af37; text-align:center; margin:0 0 18px;
    font-size:clamp(22px,2.4vw,28px); text-shadow:0 0 8px rgba(212,175,55,.35); }
  .fsa-so3 .stage { position:relative; min-height:300px; outline:none; }
  .fsa-so3 .card { position:absolute; inset:0; display:none; opacity:0; transform:translateY(10px);
    transition:opacity .45s ease, transform .45s ease; }
  .fsa-so3 .card.active { display:block; opacity:1; transform:none; }
  .fsa-so3 .card h3 { color:#e5e7eb; font-size:clamp(18px,2.1vw,22px); margin:0 0 10px; position:relative; }
  .fsa-so3 .card h3::after { content:""; position:absolute; left:0; bottom:-6px; width:60px; height:2px;
    background:linear-gradient(90deg,#d4af37 0%,transparent 100%); }
  .fsa-so3 .card p { margin:.45em 0; font-size:1.02rem; max-width:70ch; }
  .fsa-so3 .nav { display:flex; justify-content:space-between; align-items:center; margin-top:26px; gap:14px; }
  .fsa-so3 .btn { background:transparent; color:#e5e7eb; border:1px solid rgba(212,175,55,.4);
    border-radius:10px; padding:10px 16px; cursor:pointer; font-weight:600;
    box-shadow:0 0 22px rgba(212,175,55,.25); transition:background .2s ease, transform .15s ease; }
  .fsa-so3 .btn:hover { background:rgba(212,175,55,.08); }
  .fsa-so3 .btn:active { transform:translateY(1px); }
  .fsa-so3 .stat { color:#94a3b8; font-size:.95rem; }
  .fsa-so3 .progress { display:flex; justify-content:center; gap:10px; margin-top:18px; }
  .fsa-so3 .dot { width:10px; height:10px; border-radius:50%; background:rgba(212,175,55,.25);
    box-shadow:0 0 8px rgba(212,175,55,.25); transition:all .3s ease; }
  .fsa-so3 .dot.active { background:#d4af37; box-shadow:0 0 12px rgba(212,175,55,.6); transform:scale(1.2); }
  @media (max-width:820px){ .fsa-so3{ margin:36px auto; padding:22px } .fsa-so3 .stage{ min-height:360px } }
  `;

  // ----- Ziel-Slot holen: #campus-container-3 → sonst <body> -----
  const host = document.getElementById("campus-container-3") || document.body;

  // ----- Container erzeugen -----
  const box = document.createElement("section");
  box.className = "fsa-so3";
  box.setAttribute("id","campus-sovereign-03");
  box.setAttribute("aria-live","polite");
  box.innerHTML = `
    <style>${CSS}</style>
    <h2>${LANG==="de" ? "⚙️ Praxis & Entscheidungen" : "⚙️ Practice & Decisions"}</h2>
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
