/* ==========================================================================
   FSA Akademie – Utils.js
   Globale Hilfsfunktionen für alle Campus-Seiten
   ========================================================================== */

(function(window){
  "use strict";

  const Utils = {
    /**
     * Führt eine Funktion aus, sobald das DOM bereit ist.
     * Beispiel: Utils.ready(() => { ... });
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

})(window);
