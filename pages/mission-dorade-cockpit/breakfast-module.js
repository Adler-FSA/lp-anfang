(()=>{
  const ZOOM_URL='https://zoom.us/j/98106167573?pwd=2MWnNTN9TQDXabd80ev6My6cWADRYB.1';
  const IMAGE_1='../mission-dorade/mission-dorade-die-reise.jpeg';
  const IMAGE_2='/lp-anfang/library/images/zoom-raum-hintergrund.JPG';
  const LOGO_URL='../mission-dorade/Mission-Dorade-Premium-Logo.png';

  function getActiveLanguage(){
    return document.querySelector('.lang button.active')?.dataset.lang==='en'?'en':'de';
  }

  function getGreeting(lang){
    const hour=new Date().getHours();
    const period=hour<11?'morning':hour<18?'day':'evening';
    const greetings={
      de:{
        morning:'Guten Morgen und herzlich willkommen bei Mission Dorade! ☀️',
        day:'Guten Tag und herzlich willkommen bei Mission Dorade! ☀️',
        evening:'Guten Abend und herzlich willkommen bei Mission Dorade! 🌙',
        text:'Wir freuen uns, dass du heute dabei bist. Starte den Tag gemeinsam mit uns beim Frühstück, tausche dich mit anderen Clubpartnern aus und nutze anschließend dein Cockpit für deine persönliche Mission. Gemeinsam machen wir aus Ideen Wirklichkeit – Vom Ich zum Wir.'
      },
      en:{
        morning:'Good morning and welcome to Mission Dorade! ☀️',
        day:'Hello and welcome to Mission Dorade! ☀️',
        evening:'Good evening and welcome to Mission Dorade! 🌙',
        text:'We are glad you are here today. Start the day with us at breakfast, exchange ideas with other club partners and then use your cockpit for your personal mission. Together, we turn ideas into reality – From Me to We.'
      }
    };
    return {headline:greetings[lang][period],text:greetings[lang].text};
  }

  function installHeroGreeting(){
    const heroCopy=document.querySelector('.hero-copy');
    if(!heroCopy) return;
    const lang=getActiveLanguage();
    const greeting=getGreeting(lang);
    heroCopy.innerHTML='<strong class="md-greeting-headline">'+greeting.headline+'</strong><span class="md-greeting-text">'+greeting.text+'</span>';
    heroCopy.removeAttribute('data-i18n');
  }

  function installHeroLogo(){
    if(document.getElementById('missionDoradeHeroLogo')) return;
    const langZone=document.querySelector('.lang-zone');
    const hero=langZone?.closest('.hero')||document.querySelector('.hero');
    if(!hero) return;

    const logoStyle=document.createElement('style');
    logoStyle.id='md-hero-logo-styles';
    logoStyle.textContent=`
      .hero{position:relative!important}
      .hero-copy .md-greeting-headline{display:block;margin-bottom:10px;font-size:clamp(1.12rem,1.9vw,1.42rem);line-height:1.35;color:#fff;font-weight:900}
      .hero-copy .md-greeting-text{display:block}
      .md-hero-logo{position:absolute;z-index:3;right:clamp(70px,9vw,135px);top:52%;transform:translateY(-45%);width:clamp(230px,25vw,365px);max-height:72%;object-fit:contain;filter:drop-shadow(0 16px 32px rgba(0,0,0,.28));opacity:.97;animation:mdLogoFloat 9s ease-in-out infinite,mdLogoGlow 24s ease-in-out infinite;pointer-events:none}
      .md-logo-bubble{position:absolute;z-index:2;right:clamp(95px,12vw,170px);bottom:18%;width:8px;height:8px;border-radius:50%;border:1px solid rgba(255,255,255,.66);background:rgba(255,255,255,.14);box-shadow:inset 0 0 5px rgba(255,255,255,.45);animation:mdBubbleRise 12s linear infinite;pointer-events:none}
      .md-logo-bubble.b2{right:clamp(185px,18vw,265px);bottom:10%;width:5px;height:5px;animation-delay:-4s;animation-duration:15s}
      .md-logo-bubble.b3{right:clamp(120px,14vw,210px);bottom:28%;width:11px;height:11px;animation-delay:-8s;animation-duration:18s}
      .md-logo-bubble.b4{right:clamp(245px,23vw,330px);bottom:16%;width:6px;height:6px;animation-delay:-2s;animation-duration:14s}
      .hero-inner{padding-right:clamp(390px,34vw,520px)!important}
      @keyframes mdLogoFloat{0%,100%{transform:translateY(-45%)}50%{transform:translateY(calc(-45% - 7px))}}
      @keyframes mdLogoGlow{0%,82%,100%{filter:drop-shadow(0 16px 32px rgba(0,0,0,.28)) brightness(1)}88%{filter:drop-shadow(0 16px 34px rgba(216,173,85,.34)) brightness(1.18)}94%{filter:drop-shadow(0 16px 32px rgba(0,0,0,.28)) brightness(1)}}
      @keyframes mdBubbleRise{0%{transform:translateY(30px) scale(.7);opacity:0}12%{opacity:.72}85%{opacity:.35}100%{transform:translateY(-230px) scale(1.15);opacity:0}}
      @media(max-width:1050px){.md-hero-logo{right:44px;width:clamp(190px,27vw,290px)}.hero-inner{padding-right:clamp(310px,35vw,390px)!important}}
      @media(max-width:780px){.md-hero-logo,.md-logo-bubble{display:none}.hero-inner{padding-right:18px!important}}
      @media(prefers-reduced-motion:reduce){.md-hero-logo,.md-logo-bubble{animation:none}}
    `;
    document.head.appendChild(logoStyle);

    const logo=document.createElement('img');
    logo.id='missionDoradeHeroLogo';
    logo.className='md-hero-logo';
    logo.src=LOGO_URL;
    logo.alt='Mission Dorade';
    hero.appendChild(logo);

    ['b1','b2','b3','b4'].forEach(cls=>{
      const bubble=document.createElement('span');
      bubble.className='md-logo-bubble '+cls;
      bubble.setAttribute('aria-hidden','true');
      hero.appendChild(bubble);
    });
  }

  function install(){
    installHeroLogo();
    installHeroGreeting();
    document.querySelectorAll('.lang button').forEach(btn=>btn.addEventListener('click',()=>setTimeout(installHeroGreeting,0)));
    setInterval(installHeroGreeting,60000);

    if(document.getElementById('missionBreakfast')) return;
    const shell=document.querySelector('main.shell');
    if(!shell) return;

    const style=document.createElement('style');
    style.id='md-breakfast-styles';
    style.textContent=`
      .breakfast-wrap{max-width:1440px;margin:0 auto;padding:34px clamp(16px,3.4vw,50px) 0}
      .breakfast{position:relative;overflow:hidden;border:1px solid rgba(0,167,173,.25);border-radius:30px;background:linear-gradient(135deg,#fff 0%,#effcfc 58%,#fff4fa);box-shadow:0 16px 44px rgba(7,27,44,.11)}
      .breakfast:after{content:"";position:absolute;width:360px;height:360px;border-radius:50%;right:-130px;top:-190px;background:radial-gradient(circle,rgba(198,0,111,.13),transparent 68%);pointer-events:none}
      .breakfast-main{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1.45fr) minmax(300px,.75fr);gap:24px;padding:clamp(24px,4vw,42px)}
      .breakfast-kicker{display:inline-flex;align-items:center;gap:9px;color:#087d82;font-size:.78rem;font-weight:900;text-transform:uppercase;letter-spacing:.1em}
      .breakfast-kicker:before{content:"";width:9px;height:9px;border-radius:50%;background:#f0b323;box-shadow:0 0 0 6px rgba(240,179,35,.14)}
      .breakfast h2{margin:12px 0 10px;color:#071b2c;font-size:clamp(1.8rem,3.5vw,3rem);letter-spacing:-.04em}
      .breakfast-lead{margin:0;color:#526475;line-height:1.65;font-size:1.03rem;max-width:850px}
      .breakfast-time{margin-top:16px;font-weight:900;color:#132238}
      .breakfast-status{align-self:stretch;border-radius:24px;background:#071b2c;color:#fff;padding:24px;display:flex;flex-direction:column;justify-content:center;box-shadow:0 14px 34px rgba(7,27,44,.2)}
      .status-label{color:#78e3e3;font-size:.78rem;text-transform:uppercase;letter-spacing:.09em;font-weight:900}
      .status-title{font-size:1.15rem;font-weight:900;margin-top:8px}
      .countdown{font-variant-numeric:tabular-nums;font-size:clamp(2rem,4vw,3.25rem);line-height:1;font-weight:950;letter-spacing:.02em;margin:14px 0}
      .zoom-join{display:flex;align-items:center;justify-content:center;text-decoration:none;border-radius:14px;padding:13px 16px;background:linear-gradient(135deg,#00a7ad,#c6006f);color:#fff;font-weight:900}
      .zoom-join.live{box-shadow:0 0 0 6px rgba(80,224,223,.12),0 12px 28px rgba(0,0,0,.2)}
      .zoom-backgrounds{position:relative;z-index:1;padding:0 clamp(24px,4vw,42px) clamp(24px,4vw,38px)}
      .zoom-backgrounds-intro{margin:0 0 14px;color:#526475;line-height:1.55}
      .zoom-details{border:1px solid #d7e5ea;border-radius:18px;background:#fff;overflow:hidden;margin-top:10px}
      .zoom-details summary{cursor:pointer;list-style:none;padding:16px 18px;font-weight:900;color:#132238;display:flex;align-items:center;justify-content:space-between}
      .zoom-details summary::-webkit-details-marker{display:none}.zoom-details summary:after{content:"+";font-size:1.35rem;color:#00a7ad}.zoom-details[open] summary:after{content:"−"}
      .zoom-content{border-top:1px solid #e1e9ed;padding:16px}.zoom-content img{width:100%;max-height:520px;object-fit:contain;display:block;border-radius:14px;background:#eef3f6}
      .download-bg{display:inline-flex;margin-top:14px;text-decoration:none;border-radius:12px;padding:12px 16px;background:#071b2c;color:#fff;font-weight:900}
      @media(max-width:780px){.breakfast-main{grid-template-columns:1fr}.breakfast-wrap{padding-top:22px}.breakfast-status{min-height:235px}}
    `;
    document.head.appendChild(style);

    const section=document.createElement('section');
    section.className='breakfast-wrap';
    section.id='missionBreakfast';
    section.innerHTML=`
      <div class="breakfast">
        <div class="breakfast-main">
          <div>
            <div class="breakfast-kicker">Gemeinsam in den Tag starten</div>
            <h2>Das Mission-Dorade-Frühstück</h2>
            <p class="breakfast-lead">Jeder erfolgreiche Tag beginnt mit einem guten Start. Von Montag bis Freitag frühstücken wir gemeinsam, tauschen Erfahrungen aus, beantworten Fragen und richten uns auf die nächsten Schritte aus. Ob du gerade erst gestartet bist oder schon länger dabei bist – jeder ist willkommen.</p>
            <div class="breakfast-time">Montag bis Freitag · 09:00–10:00 Uhr</div>
          </div>
          <aside class="breakfast-status">
            <div class="status-label">Nächstes gemeinsames Frühstück</div>
            <div class="status-title" id="breakfastStatusTitle">Beginnt in</div>
            <div class="countdown" id="breakfastCountdown">--:--:--</div>
            <a class="zoom-join" id="breakfastJoin" href="${ZOOM_URL}" target="_blank" rel="noopener">Zoom-Raum öffnen</a>
          </aside>
        </div>
        <div class="zoom-backgrounds">
          <p class="zoom-backgrounds-intro">Ein gemeinsamer Auftritt schafft Wiedererkennung. Nutze gerne einen unserer offiziellen Hintergründe für den gemeinsamen Frühstücksraum und deine Mission-Dorade-Gespräche.</p>
          <details class="zoom-details"><summary>Zoom-Raum Hintergrundbild 1</summary><div class="zoom-content"><img src="${IMAGE_1}" alt="Mission Dorade Zoom-Raum Hintergrundbild 1"><a class="download-bg" href="${IMAGE_1}" download>Hintergrundbild herunterladen</a></div></details>
          <details class="zoom-details"><summary>Zoom-Raum Hintergrundbild 2</summary><div class="zoom-content"><img src="${IMAGE_2}" alt="Mission Dorade Zoom-Raum Hintergrundbild 2"><a class="download-bg" href="${IMAGE_2}" download>Hintergrundbild herunterladen</a></div></details>
        </div>
      </div>`;
    shell.parentNode.insertBefore(section,shell);

    const countdown=document.getElementById('breakfastCountdown');
    const title=document.getElementById('breakfastStatusTitle');
    const join=document.getElementById('breakfastJoin');

    function nextBreakfast(now){
      const target=new Date(now);
      target.setHours(9,0,0,0);
      const day=now.getDay();
      const live=day>=1&&day<=5&&now.getHours()===9;
      if(live) return {target,live:true};
      if(day===0){target.setDate(target.getDate()+1)}
      else if(day===6){target.setDate(target.getDate()+2)}
      else if(now>=target){target.setDate(target.getDate()+(day===5?3:1))}
      return {target,live:false};
    }
    function tick(){
      const now=new Date();
      const state=nextBreakfast(now);
      if(state.live){
        title.textContent='Wir sind jetzt live.';
        countdown.textContent='09:00–10:00';
        join.textContent='Jetzt am gemeinsamen Frühstück teilnehmen';
        join.classList.add('live');
        return;
      }
      title.textContent='Beginnt in';
      join.textContent='Zoom-Raum öffnen';
      join.classList.remove('live');
      const diff=Math.max(0,state.target-now);
      const hours=Math.floor(diff/3600000);
      const minutes=Math.floor((diff%3600000)/60000);
      const seconds=Math.floor((diff%60000)/1000);
      countdown.textContent=String(hours).padStart(2,'0')+':'+String(minutes).padStart(2,'0')+':'+String(seconds).padStart(2,'0');
    }
    tick();
    setInterval(tick,1000);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();