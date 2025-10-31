// ░░ FSA Social Core – steuert die 4 Zielgruppen auf pages/social.html ░░
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-target[data-target]");
  const overlay = document.getElementById("social-overlay");
  const body = document.getElementById("social-body");

  // Mobile Hinweis
  const rotateHint = document.getElementById("rotate-hint");
  if (window.innerWidth < 760 && rotateHint) {
    rotateHint.style.display = "flex";
    setTimeout(() => (rotateHint.style.display = "none"), 5200);
  }

  // Sprache holen
  const getLang = () => localStorage.getItem("fsa_lang") || "de";

  // Zielgruppen Renderer
  const renderTarget = (id) => {
    const lang = getLang();
    const packs = {
      "1": window.FSA_SOCIAL_01,
      "2": window.FSA_SOCIAL_02,
      "3": window.FSA_SOCIAL_03,
      "4": window.FSA_SOCIAL_04,
    };
    const data = packs[id];
    if (!data) return;
    const pack = data[lang] || data["de"];
    body.innerHTML = window.FSA_renderSocialPack(pack);
    body.style.display = "block";
    requestAnimationFrame(() => (body.style.opacity = 1));
    body.setAttribute("data-open-id", id);
  };

  // Karten + Buttons klicken
  cards.forEach((card) => {
    card.addEventListener("click", (ev) => {
      // Nur reagieren, wenn auf Karte oder Button
      const id = card.getAttribute("data-target");
      if (!id) return;
      const target = ev.target;
      if (target.classList.contains("open-btn") || target.closest(".card-target")) {
        // wenn dasselbe nochmal geklickt wird → schließen
        const openId = body.getAttribute("data-open-id");
        if (openId === id && body.style.display === "block") {
          body.style.opacity = 0;
          setTimeout(() => {
            body.innerHTML = "";
            body.style.display = "none";
          }, 250);
        } else {
          renderTarget(id);
        }
      }
    });
  });

  // Sprachwechsel
  document.addEventListener("fsa:lang-change", (ev) => {
    const openId = body.getAttribute("data-open-id");
    if (openId && body.style.display === "block") {
      const lang = ev.detail || "de";
      const packs = {
        "1": window.FSA_SOCIAL_01,
        "2": window.FSA_SOCIAL_02,
        "3": window.FSA_SOCIAL_03,
        "4": window.FSA_SOCIAL_04,
      };
      const data = packs[openId];
      if (data) {
        const pack = data[lang] || data["de"];
        body.innerHTML = window.FSA_renderSocialPack(pack);
      }
    }
  });
});
