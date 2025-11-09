<!-- /lp-anfang/library/js/topbar-autohide.js -->
<script>
(function(){
  // 1) Styles injizieren (Transition + Safe-Area)
  const css = `
  :root{ --safe-top: env(safe-area-inset-top, 0px); }
  .fsa-topbar-autohide{
    position: sticky; top: var(--safe-top);
    z-index: 1000; transition: transform .24s ease;
    will-change: transform; backface-visibility: hidden;
  }
  .fsa-topbar-hidden{ transform: translateY(calc(-100% - var(--safe-top))); }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // 2) Topbar sicher finden (nach menu.js-Render)
  function findTopbar(){
    // häufigster Fall: menu.js rendert in #menu-root hinein
    const root = document.getElementById('menu-root');
    if (root && root.firstElementChild) return root.firstElementChild;
    // Fallbacks (robust gegen Varianten)
    return document.querySelector('[data-fsa-topbar]') ||
           document.querySelector('#menu-root') ||
           document.querySelector('nav');
  }

  function init(){
    const bar = findTopbar();
    if (!bar) return false;
    bar.classList.add('fsa-topbar-autohide');

    let lastY = window.pageYOffset || document.documentElement.scrollTop || 0;
    let ticking = false;
    let stateHidden = false;
    const THRESH = 8;      // Scroll-Schwellwert gegen Zittern
    const SHOW_AT_TOP = 24; // immer anzeigen nahe Seitenanfang

    function onScroll(){
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(()=>{
        const y = window.pageYOffset || document.documentElement.scrollTop || 0;
        const dy = y - lastY;

        if (Math.abs(dy) > THRESH){
          if (dy > 0 && y > SHOW_AT_TOP){ // runter
            if (!stateHidden){ bar.classList.add('fsa-topbar-hidden'); stateHidden = true; }
          } else {                         // hoch
            if (stateHidden){ bar.classList.remove('fsa-topbar-hidden'); stateHidden = false; }
          }
          lastY = y;
        } else {
          // Kleine Bewegungen: nahe Top immer sichtbar
          if (y <= SHOW_AT_TOP && stateHidden){
            bar.classList.remove('fsa-topbar-hidden'); stateHidden = false;
          }
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive:true });
    return true;
  }

  // Warten bis menu.js gerendert hat
  if (!init()){
    const mo = new MutationObserver(()=>{ if (init()) mo.disconnect(); });
    mo.observe(document.documentElement, { childList:true, subtree:true });
    // Sicherheitsnetz (falls MutationObserver zu früh feuert)
    let tries = 0;
    const iv = setInterval(()=>{
      if (init() || ++tries > 40) clearInterval(iv); // ~2s
    }, 50);
  }
})();
</script>
