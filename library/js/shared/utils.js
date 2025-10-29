/* ==========================================================================
   FSA Akademie – Utils.js (Orientation Lock + iPad Safe)
   Globale Hilfsfunktionen + Pflicht-Hinweis für Hochformat
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
        s.async = true;
        s.onload = () => resolve(src);
        s.onerror = () => reject(new Error("Fehler beim Laden: " + src));
        document.head.appendChild(s);
      });
    },
    log(msg, type="info"){
      const prefix = "[FSA Utils]";
      switch(type){
        case "warn": console.warn(prefix, msg); break;
        case "error": console.error(prefix, msg); break;
        default: console.log(prefix, msg);
      }
    }
  };
  window.FSA_Utils = Utils;

  /* ========================================================================
     Pflicht-Hinweis + fester Campus-Container + iPad-Stage-Schutz
     ======================================================================== */
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
        transition: none !important;
        position: relative;
      }

      #rotate-lock {
        position: fixed;
        inset: 0;
        background: rgba(11,15,20,0.96);
        color: #e5e7eb;
        display: flex;
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
        font-size: 1.2rem;
        margin-bottom: 0.8rem;
      }
      #rotate-lock span {
        opacity: 0.8;
        font-size: 0.9rem;
      }

      @media (orientation: landscape) and (max-width: 1024px) {
        #rotate-lock { display: none; }
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

      // iPad Stage Manager oder Split View → erzwingen Querformat-Check über Breite
      const minLandscapeWidth = 800;

      if (landscape && width >= minLandscapeWidth) {
        overlay.style.display = "none";
      } else {
        overlay.style.display = "flex";
      }
    }

    // Initial & dynamisch prüfen
    checkOrientation();
    window.addEventListener("orientationchange", () => setTimeout(checkOrientation, 400));
    window.addEventListener("resize", () => setTimeout(checkOrientation, 400));

    FSA_Utils.log("Orientation-Lock aktiv (inkl. iPad Stage-Fix).");
  });

})(window);
