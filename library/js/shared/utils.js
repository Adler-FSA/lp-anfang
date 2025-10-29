/* ==========================================================================
   FSA Akademie – Utils.js (mobile optimized)
   Globale Hilfsfunktionen + mobile Fixes für Campus-Seiten
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
     Mobile-Fix & Drehhinweis
     ======================================================================== */
  Utils.ready(() => {
    const area = document.getElementById("campusArea");
    if(!area) return; // Nur Campus-Seiten

    // --- Dynamische Style-Korrekturen ---
    const style = document.createElement("style");
    style.textContent = `
      html, body {
        overflow-x: hidden;
        max-width: 100%;
      }

      section[id^="campus-container-"],
      .campus-menu {
        width: min(94vw, 980px);
        margin: 0 auto;
        box-sizing: border-box;
        transition: none !important;
      }

      /* Texte sauber umbrechen und Block-Höhe automatisch */
      .fsa-so1, .fsa-so2, .fsa-so3, .fsa-so4 {
        word-wrap: break-word;
        overflow-wrap: anywhere;
        min-height: unset !important;
        height: auto !important;
        padding-bottom: 60px;
      }
      .fsa-so1 p, .fsa-so2 p, .fsa-so3 p, .fsa-so4 p {
        font-size: clamp(0.95rem, 2.5vw, 1.05rem);
        line-height: 1.55;
        text-align: left;
      }

      /* Hinweis sichtbar nur in Hochformat */
      #rotate-hint {
        position: fixed;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(15, 23, 42, 0.92);
        color: #e5e7eb;
        font-size: 0.8rem;
        padding: 6px 14px;
        border: 1px solid rgba(212,175,55,0.4);
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(212,175,55,0.25);
        z-index: 99999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.4s ease;
      }
      @media (orientation: portrait) and (max-width: 900px) {
        #rotate-hint { opacity: 1; }
      }
      @media (orientation: landscape) and (max-width: 900px) {
        #rotate-hint { opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    // --- Hinweis-Element ---
    const hint = document.createElement("div");
    hint.id = "rotate-hint";
    hint.textContent = "📱 Für bessere Ansicht bitte das Handy quer drehen";
    document.body.appendChild(hint);

    FSA_Utils.log("Mobile-Optimierung aktiv (Textfix + Drehhinweis).");
  });

})(window);
