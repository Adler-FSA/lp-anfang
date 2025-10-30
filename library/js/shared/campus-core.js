// ░░ FSA Social Core – steuert die 4 Zielgruppen auf pages/social.html ░░
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-target[data-target]");
  const overlay = document.getElementById("social-overlay");
  const body = document.getElementById("social-body");
  const closeBtn = document.getElementById("closeOverlayBtn");

  // mobile hint nur kurz zeigen
  const rotateHint = document.getElementById("rotate-hint");
  if (window.innerWidth < 760) {
    rotateHint.style.display = "flex";
    setTimeout(() => rotateHint.style.display = "none", 5200);
  }

  // aktuelle Sprache holen
  const getLang = () => localStorage.getItem("fsa_lang") || "de";

  const renderTarget = (id) => {
    const lang = getLang();
    let data = null;
    switch (id) {
      case "1":
        data = window.FSA_SOCIAL_01;
        break;
      case "2":
        data = window.FSA_SOCIAL_02;
        break;
      case "3":
        data = window.FSA_SOCIAL_03;
        break;
      case "4":
        data = window.FSA_SOCIAL_04;
        break;
    }
    if (!data) return;
    const pack = data[lang] || data["de"];
    body.innerHTML = window.FSA_renderSocialPack(pack);
    overlay.style.display = "flex";
    overlay.setAttribute("aria-hidden", "false");
  };

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-target");
      renderTarget(id);
    });
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
    body.innerHTML = "";
  });

  // Sprache live wechseln
  document.addEventListener("fsa:lang-change", (ev) => {
    // wenn overlay offen ist: neu rendern
    if (overlay.style.display === "flex") {
      const openId = body.getAttribute("data-open-id");
      if (openId) {
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
    }
  });

  // wenn wir anzeigen, id mitschreiben
  body.addEventListener("set-id", (e) => {
    body.setAttribute("data-open-id", e.detail);
  });
});
