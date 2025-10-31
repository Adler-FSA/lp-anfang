// ░░ campus-utility.js – Renderer für alle Social-Zielgruppen ░░
// Wird von campus-core.js aufgerufen, wenn eine Karte geklickt wird.

(function () {
  window.FSA_renderSocialPack = function (pack) {
    // Sicherheitsprüfung
    if (!pack || !pack.blocks) return "<p>Keine Inhalte gefunden.</p>";

    let html = `
      <div class="social-pack">
        <h1 class="pack-title">${pack.title || ""}</h1>
        <p class="pack-sub">${pack.subtitle || ""}</p>
    `;

    pack.blocks.forEach((block) => {
      html += `
        <section class="pack-block">
          <h2>${block.heading || ""}</h2>
      `;
      (block.items || block.blocks || []).forEach((item) => {
        const title = item.title || item.label || "";
        const body = item.body || [];
        html += `
          <article class="pack-article">
            ${title ? `<h3>${title}</h3>` : ""}
            ${body.map(line => `<p>${line}</p>`).join("")}
          </article>
        `;
      });
      html += `</section>`;
    });

    html += `
      <button class="close-pack">Schließen</button>
      </div>
    `;
    return html;
  };

  // Styles nur einmal anhängen
  if (!document.getElementById("fsa-social-style")) {
    const style = document.createElement("style");
    style.id = "fsa-social-style";
    style.textContent = `
      .social-pack {
        background: rgba(15, 23, 42, 0.85);
        border: 1px solid rgba(212,175,55,0.25);
        border-radius: 16px;
        padding: clamp(1.2rem, 2.5vw, 2rem);
        color: #e5e7eb;
        box-shadow: 0 20px 40px rgba(0,0,0,0.35);
        animation: fadeIn 0.4s ease;
      }
      .social-pack h1 {
        color: #facc15;
        font-size: 1.6rem;
        margin-bottom: 0.4rem;
      }
      .social-pack .pack-sub {
        color: #a1a1aa;
        margin-bottom: 1.5rem;
      }
      .pack-block {
        margin-bottom: 1.8rem;
        border-top: 1px solid rgba(212,175,55,0.15);
        padding-top: 1.2rem;
      }
      .pack-block h2 {
        font-size: 1.05rem;
        color: #fff;
        margin-bottom: 0.6rem;
      }
      .pack-article {
        background: rgba(17, 24, 39, 0.45);
        border: 1px solid rgba(212,175,55,0.2);
        border-radius: 12px;
        padding: 0.9rem 1rem 0.85rem;
        margin-bottom: 0.9rem;
      }
      .pack-article h3 {
        margin: 0 0 0.4rem;
        font-size: 0.95rem;
        color: #fefce8;
      }
      .pack-article p {
        margin: 0 0 0.4rem;
        font-size: 0.85rem;
        line-height: 1.55;
      }
      .pack-article p:last-child {
        margin-bottom: 0;
      }
      .close-pack {
        display: inline-block;
        margin-top: 1.2rem;
        background: rgba(212,175,55,0.15);
        border: 1px solid rgba(212,175,55,0.55);
        color: #fff;
        padding: 0.6rem 1.4rem;
        border-radius: 999px;
        cursor: pointer;
        transition: all 0.25s ease;
      }
      .close-pack:hover {
        background: rgba(212,175,55,0.35);
        box-shadow: 0 0 14px rgba(212,175,55,0.4);
      }
      @keyframes fadeIn {
        from {opacity: 0; transform: translateY(10px);}
        to {opacity: 1; transform: translateY(0);}
      }
      @media (max-width: 720px) {
        .social-pack { padding: 1rem 0.8rem; border-radius: 10px; }
        .pack-article p { font-size: 0.8rem; }
      }
    `;
    document.head.appendChild(style);
  }

  // Event-Handler für Close-Button, sobald DOM fertig
  document.addEventListener("click", (ev) => {
    if (ev.target.classList.contains("close-pack")) {
      const container = document.getElementById("social-body");
      container.style.opacity = 0;
      setTimeout(() => {
        container.innerHTML = "";
        container.style.display = "none";
      }, 250);
    }
  });
})();
