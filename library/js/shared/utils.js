// ░░ FSA Utils – generische Hilfsfunktionen für Social & Campus ░░

// Universal Renderer für Social Packs
window.FSA_renderSocialPack = function (pack) {
  if (!pack || !pack.blocks) return "<p>Kein Inhalt geladen.</p>";

  let html = `
    <div class="social-pack">
      <h1>${pack.title || ""}</h1>
      <p class="subtitle">${pack.subtitle || ""}</p>
  `;

  pack.blocks.forEach((section) => {
    html += `<section class="social-section">
      <h2>${section.heading || ""}</h2>
    `;

    (section.items || section.blocks || []).forEach((item) => {
      html += `<article class="social-card">
        <h3>${item.title || item.heading || ""}</h3>
      `;
      (item.body || []).forEach((line) => {
        html += `<p>${line}</p>`;
      });
      html += `</article>`;
    });

    html += `</section>`;
  });

  html += `
    <button type="button" class="social-close-btn" onclick="document.getElementById('closeOverlayBtn').click()">
      ${localStorage.getItem("fsa_lang") === "en" ? "Close" : "Schließen"}
    </button>
  </div>`;

  return html;
};

// Minimale Stylesicherung (falls CSS fehlt)
const style = document.createElement("style");
style.textContent = `
  .social-pack { color:#e5e7eb; line-height:1.55; font-family:system-ui,sans-serif; }
  .social-section { margin:1.5rem 0; }
  .social-card { background:rgba(15,23,42,0.35); border:1px solid rgba(148,163,184,0.18);
                 border-radius:12px; padding:0.9rem 1rem; margin-bottom:0.7rem; }
  .social-close-btn { margin-top:1rem; background:rgba(212,175,55,0.15); border:1px solid rgba(212,175,55,0.4);
                      color:#fff; padding:0.5rem 1.3rem; border-radius:999px; cursor:pointer; }
  .social-close-btn:hover { background:rgba(212,175,55,0.3); }
`;
document.head.appendChild(style);
