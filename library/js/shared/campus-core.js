/* ==========================================================================
   FSA Akademie – Campus-Core.js
   Zentrale Steuerung für Campus-Seiten (Social, Community, Mentor, Souveränität)
   Lädt automatisch alle Text-Container (01–04) in richtiger Reihenfolge.
   ========================================================================== */

(function(window){
  "use strict";

  const U = window.FSA_Utils;

  if(!U){
    console.error("FSA Utils nicht gefunden. Bitte zuerst utils.js laden.");
    return;
  }

  U.ready(async () => {

    // Ermittelt anhand der URL, welche Campus-Seite aktiv ist
    const path = window.location.pathname;
    const base = (()=>{
      if(path.includes("social")) return "social";
      if(path.includes("community")) return "community";
      if(path.includes("mentoren")) return "mentor";
      if(path.includes("souveraenitaet")) return "sovereign";
      return null;
    })();

    if(!base){
      U.log("Keine Campus-Seite erkannt. Campus-Core beendet.", "warn");
      return;
    }

    // Pfadgrundlage für Text-Container
    const root = "../library/js/text-campus/";
    const files = [
      `${root}campus-${base}-01.js`,
      `${root}campus-${base}-02.js`,
      `${root}campus-${base}-03.js`,
      `${root}campus-${base}-04.js`
    ];

    U.log(`Lade Campus-Container für: ${base}`);

    // Container sequentiell laden
    for(const f of files){
      try{
        await U.loadScript(f);
        U.log(`Geladen: ${f}`);
      }catch(e){
        U.log(`Fehler: ${e.message}`, "error");
      }
    }

    U.log(`Campus-Core abgeschlossen (${base})`);
  });

})(window);
