/* ==========================================================================
   FSA Akademie – Utils.js (Stabiler Orientation Lock + Fix-Layout)
   ========================================================================== */

(function(window){
  "use strict";

  const Utils = {
    ready(fn){
      if(document.readyState !== "loading") fn();
      else document.addEventListener("DOMContentLoaded", fn);
    },
    addCacheBypass(url){
      const t = "nocache=" + Date.now();
      return url.includes("?") ? url + "&" + t : url + "?" + t;
    },
    loadScript(src){
      return new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = Utils.addCacheBypass(src);
        s.defer = true;
        s.onload = () => resolve(src);
        s.onerror = () => reject(new Error("Fehler beim Laden: " + src));
        document.head.appendChild(s);
      });
    },
    log(msg){ console.log("[FSA Utils]", msg); }
  };

  window.FSA_Utils = Utils;

  Utils.ready(() => {
    const style = document.createElement("style");
    style.textContent = `
      html, body {
        overflow-x: hidden;
        margin: 0;
        padding: 0;
        max-width: 100%;
      }

      section[id^="campus-container-"],
      .campus-menu {
        width: min(940px, 94vw);
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
        position: relative;
        transition: none !important;
      }

      #rotate-lock {
        position: fixed;
        inset: 0;
        background: rgba(11,15,20,0.96);
        color: #e5e7eb;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: system-ui, sans-serif;
        text-align: center;
        font-size: 1rem;
        padding: 2rem;
        z-index: 99999;
      }
      #rotate-lock h2 {
        color: #d4af37;
        font-size: 1.3rem;
        margin-bottom: 0.6rem;
        animation: glow 2s ease-in-out infinite alternate;
      }
      #rotate-lock span {
        opacity: 0.8;
        font-size: 0.9rem;
      }
      @keyframes glow {
        from { text-shadow: 0 0 4px #d4af37; }
        to { text-shadow: 0 0 16px #d4af37; }
      }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.id = "rotate-lock";
    overlay.innerHTML = `
      <h2>📱 Bitte Gerät quer drehen</h2>
      <span>Für optimale Darstellung der FSA Campus-Module.</span>
    `;
    document.body.appendChild(overlay);

    function checkOrientation(){
      const width = window.innerWidth;
      const height = window.innerHeight;
      const landscape = width > height;
      const minLandscapeWidth = 800; // iPad-Split-Erkennung

      const shouldShow = !landscape || width < minLandscapeWidth;

      if (shouldShow) {
        overlay.style.display = "flex";
        document.body.style.overflow = "hidden";
      } else {
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
      }
    }

    checkOrientation();

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkOrientation, 350);
    });

    window.addEventListener("orientationchange", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkOrientation, 350);
    });

    FSA_Utils.log("Orientation-Lock stabil aktiv.");
  });

})(window);
