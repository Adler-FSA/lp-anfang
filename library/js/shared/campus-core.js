// ░░ FSA Social Core – steuert die 4 Zielgruppen auf pages/social.html ░░
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-target[data-target]");
  const overlay = document.getElementById("social-overlay");
  const body = document.getElementById("social-body");
  const closeBtn = document.getElementById("closeOverlayBtn");
  const rotateHint = document.getElementById("rotate-hint");

  // Sicherheit: Abbruch wenn DOM-Elemente fehlen
  if (!cards.length || !overlay || !body || !closeBtn) return;

  // mobiler Hinweis kurz anzeigen
  if (rotateHint && window.innerWidth < 760) {
    rotateHint.style.display = "flex";
    setTimeout(() => (rotateHint.style.display = "none"), 5200);
  }

  // aktuelle Sprache holen
  const getLang = () => localStorage.getItem("fsa_lang") || "de";

  // Datensatz rendern
  const renderTarget = (id) => {
    const lang = getLang();
    const packs = {
      "1": window.FSA_SOCIAL_01,
      "2": window.FSA_SOCIAL_02,
      "3": window.FSA_SOCIAL_03,
      "4": window.FSA_SOCIAL_04
    };
    const data = packs[id];
    if (!data) return;

    const pack = data[lang] || data["de"];
    if (typeof window.FSA_renderSocialPack === "function") {
      body.innerHTML = window.FSA_renderSocialPack(pack);
    } else {
      body.innerHTML = "<p style='color:#f87171'>Fehlende render-Funktion (utils.js prüfen)</p>";
    }

    overlay.style.display = "flex";
    overlay.setAttribute("aria-hidden", "false");
    body.setAttribute("data-open-id", id);
  };

  // Klicks auf Zielgruppen-Karten
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-target");
      renderTarget(id);
    });
  });

  // Overlay schließen
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
    body.innerHTML = "";
  });

  // Sprache live wechseln
  document.addEventListener("fsa:lang-change", (ev) => {
    if (overlay.style.display === "flex") {
      const openId = body.getAttribute("data-open-id");
      if (!openId) return;
      const lang = ev.detail || "de";
      const packs = {
        "1": window.FSA_SOCIAL_01,
        "2": window.FSA_SOCIAL_02,
        "3": window.FSA_SOCIAL_03,
        "4": window.FSA_SOCIAL_04
      };
      const data = packs[openId];
      if (data) {
        const pack = data[lang] || data["de"];
        body.innerHTML = window.FSA_renderSocialPack(pack);
        body.setAttribute("data-open-id", openId);
      }
    }
  });
});
