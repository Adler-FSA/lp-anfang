/* ==========================================================================
   FSA Akademie – Utils.js
   Globale Hilfsfunktionen für alle Campus-Seiten
   ========================================================================== */

(function(window){
  "use strict";

  const Utils = {
    /**
     * Führt eine Funktion aus, sobald das DOM bereit ist.
     * Beispiel: FSA_Utils.ready(() => { ... });
     */
    ready(fn){
      if(document.readyState !== "loading") fn();
      else document.addEventListener("DOMContentLoaded", fn);
    },

    /**
     * Fügt einer URL automatisch einen ?nocache=Zeitstempel an,
     * um Browser-Cache zu umgehen.
     */
    addCacheBypass(url){
      const t = "nocache=" + Date.now();
      return url.includes("?") ? url + "&" + t : url + "?" + t;
    },

    /**
     * Lädt ein externes Skript asynchron.
     * Gibt ein Promise zurück, das aufgelöst wird, wenn das Skript geladen ist.
     */
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

    /**
     * Konsolen-Log mit sauberem Präfix
     */
    log(msg, type="info"){
      const prefix = "[FSA Utils]";
      switch(type){
        case "warn": console.warn(prefix, msg); break;
        case "error": console.error(prefix, msg); break;
        default: console.log(prefix, msg);
      }
    }
  };

  // global verfügbar machen
  window.FSA_Utils = Utils;

  /* ========================================================================
     Mobile Optimierung & Drehhinweis – nur aktiv auf Campus-Seiten
     ======================================================================== */
  Utils.ready(() => {
    const area = document.getElementById("campusArea");
    if(!area) return; // nur aktiv auf Campus-Seiten

    // --- CSS für Mobile-Fix & Hinweis ---
    const style = document.createElement("style");
    style.textContent = `
      @media (max-width: 768px) {
        body { overflow-x: hidden; }
        section[id^="campus-container-"],
        .campus-menu {
          width: 94vw;
          max-width: 94vw;
          margin-left: auto;
          margin-right: auto;
          box-sizing: border-box;
          transition: none !important;
        }
      }
      #rotate-hint {
        position: fixed;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(15, 23, 42, 0.9);
        color: #e5e7eb;
        font-size: 0.8rem;
        padding: 6px 14px;
        border: 1px solid rgba(212,175,55,0.4);
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(212,175,55,0.25);
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s ease;
      }
      @media (orientation: portrait) and (max-width: 900px) {
        #rotate-hint { opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    // --- Hinweis-Element einfügen ---
    const hint = document.createElement("div");
    hint.id = "rotate-hint";
    hint.textContent = "📱 Für bessere Ansicht bitte das Handy quer drehen";
    document.body.appendChild(hint);

    FSA_Utils.log("Mobile-Optimierung & Drehhinweis aktiv");
  });

})(window);
