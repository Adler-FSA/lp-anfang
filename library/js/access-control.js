/* ===========================================================
   FSA Access-Control v1.0
   Schutzsystem für geschützte Bereiche (Community / Insider / Start-Level-2)
   Passwörter:
     Community     → changeme1
     Insider       → changeme2
     Start-Level-2 → changeme3
   =========================================================== */

(function() {
  const pages = {
    "community.html": "changeme1",
    "insider.html": "changeme2",
    "start-level-2.html": "changeme3"
  };

  const current = location.pathname.split("/").pop().toLowerCase();

  if (pages[current]) {
    const key = `fsa_auth_${current}`;
    const saved = localStorage.getItem(key);

    if (saved !== pages[current]) {
      const entered = prompt("🔒 Zugriff geschützt – bitte Passwort eingeben:");
      if (entered === pages[current]) {
        localStorage.setItem(key, entered);
        alert("✅ Zugriff erlaubt.");
      } else {
        alert("⛔ Falsches Passwort. Zugriff verweigert.");
        window.location.href = "../../index.html";
      }
    }
  }
})();
