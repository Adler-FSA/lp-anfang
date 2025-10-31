// ░░ FSA Campus Social Core – steuert Social.html ░░
// Version: FINAL – nur eine Zielgruppe gleichzeitig offen
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-target[data-target]");
  const outputArea = document.getElementById("social-body");
  const overlay = document.getElementById("social-overlay");
  const closeBtn = document.getElementById("closeOverlayBtn");

  // Sprachsteuerung
  const getLang = () => localStorage.getItem("fsa_lang") || "de";

  // Aktuell offene Zielgruppe merken
  let openId = null;

  // Smooth anzeigen / ausblenden
  const showContent = (html) => {
    outputArea.innerHTML = html;
    outputArea.style.display = "block";
    outputArea.style.opacity = "0";
    setTimeout(() => (outputArea.style.opacity = "1"), 30);
  };
  const hideContent = () => {
    outputArea.style.opacity = "0";
    setTimeout(() => {
      outputArea.innerHTML = "";
      outputArea.style.display = "none";
    }, 250);
  };

  // Renderer
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

    // Render-Helper aufrufen
    const html = window.FSA_renderSocialPack
      ? window.FSA_renderSocialPack(pack)
      : `<p style="color:#fbbf24;">⚠️ Renderer fehlt.</p>`;

    // Ausgabe anzeigen
    showContent(html);
    openId = id;
  };

  // Klick auf Karten
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-target");
      if (openId === id) {
        hideContent();
        openId = null;
      } else {
        hideContent();
        setTimeout(() => renderTarget(id), 280);
      }
    });
  });

  // Sprache wechseln → neu rendern
  document.addEventListener("fsa:lang-change", (ev) => {
    const lang = ev.detail || "de";
    if (openId) {
      const packs = {
        "1": window.FSA_SOCIAL_01,
        "2": window.FSA_SOCIAL_02,
        "3": window.FSA_SOCIAL_03,
        "4": window.FSA_SOCIAL_04
      };
      const data = packs[openId];
      if (data) {
        const pack = data[lang] || data["de"];
        const html = window.FSA_renderSocialPack
          ? window.FSA_renderSocialPack(pack)
          : `<p style="color:#fbbf24;">⚠️ Renderer fehlt.</p>`;
        showContent(html);
      }
    }
  });

  // Close-Button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      hideContent();
      openId = null;
    });
  }

  // Grund-Style (sanftes Ein-/Ausblenden)
  const style = document.createElement("style");
  style.textContent = `
    #social-body {
      transition: opacity .25s ease;
      opacity: 0;
      display: none;
      margin-top: 2.2rem;
    }
  `;
  document.head.appendChild(style);
});
