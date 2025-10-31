// /library/js/shared/campus-core.js
// FSA Social Core – steuert das Öffnen/Schließen der 4 Zielgruppen
// nutzt: window.FSA_SOCIAL_01 ... window.FSA_SOCIAL_04
// Renderer ist hier drin, keine weitere utility nötig.

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-target[data-target]");
  const body = document.getElementById("social-body");
  const rotateHint = document.getElementById("rotate-hint");

  // kleiner Mobile-Hinweis
  if (window.innerWidth < 760 && rotateHint) {
    rotateHint.style.display = "flex";
    setTimeout(() => (rotateHint.style.display = "none"), 5200);
  }

  // Sprach-Helper
  const getLang = () => localStorage.getItem("fsa_lang") || "de";

  // Datenquelle sammeln
  const packs = {
    "1": () => window.FSA_SOCIAL_01,
    "2": () => window.FSA_SOCIAL_02,
    "3": () => window.FSA_SOCIAL_03,
    "4": () => window.FSA_SOCIAL_04,
  };

  // Renderer
  function renderSocialPack(sourceObj) {
    if (!sourceObj) return "<p>Keine Inhalte gefunden.</p>";

    // deine Dateien haben tlw. Struktur {de: {...}, en: {...}}
    // also auf Sprache runterbrechen:
    const lang = getLang();
    const pack = sourceObj[lang] || sourceObj["de"] || sourceObj;

    let html = `<div class="social-pack">`;

    // Titel + Sub
    if (pack.title) {
      html += `<h1 class="pack-title">${pack.title}</h1>`;
    }
    if (pack.subtitle || pack.intro) {
      html += `<p class="pack-sub">${pack.subtitle || pack.intro}</p>`;
    }

    // verschiedene Strukturen abfangen:
    const blocks = pack.blocks || pack.sections || [];
    blocks.forEach((block) => {
      const heading = block.heading || block.label || "";
      html += `<section class="pack-block">`;
      if (heading) {
        html += `<h2>${heading}</h2>`;
      }

      const items = block.items || block.blocks || block.body || [];
      items.forEach((item) => {
        // item kann wieder ein Array aus Texten sein
        if (typeof item === "string") {
          html += `<article class="pack-article"><p>${item}</p></article>`;
          return;
        }
        const title = item.title || item.heading || item.label || "";
        const body = item.body || [];
        html += `<article class="pack-article">`;
        if (title) html += `<h3>${title}</h3>`;
        body.forEach((line) => {
          html += `<p>${line}</p>`;
        });
        html += `</article>`;
      });

      html += `</section>`;
    });

    html += `<button class="close-pack" type="button">Schließen</button>`;
    html += `</div>`;

    return html;
  }

  // Styles nur 1x
  if (!document.getElementById("fsa-social-style")) {
    const style = document.createElement("style");
    style.id = "fsa-social-style";
    style.textContent = `
      #social-body {
        transition: opacity .25s ease;
      }
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

  // Klick-Logik
  function openPack(id) {
    const getData = packs[id];
    if (!getData) return;

    const data = getData();
    const html = renderSocialPack(data);
    body.innerHTML = html;
    body.style.display = "block";
    requestAnimationFrame(() => (body.style.opacity = 1));
    body.setAttribute("data-open-id", id);

    // Karte markieren
    cards.forEach(c => c.classList.toggle("active", c.getAttribute("data-target") === id));
  }

  function closePack() {
    body.style.opacity = 0;
    setTimeout(() => {
      body.innerHTML = "";
      body.style.display = "none";
      body.removeAttribute("data-open-id");
    }, 220);
    cards.forEach(c => c.classList.remove("active"));
  }

  // Karten aktivieren
  cards.forEach((card) => {
    card.addEventListener("click", (ev) => {
      const id = card.getAttribute("data-target");
      if (!id) return;
      const isOpen = body.getAttribute("data-open-id") === id && body.style.display === "block";

      if (isOpen) {
        closePack();
      } else {
        openPack(id);
      }
    });
  });

  // Close-Button aus dynamischem Bereich
  document.addEventListener("click", (ev) => {
    if (ev.target.classList.contains("close-pack")) {
      closePack();
    }
  });

  // Sprache ändern → neu rendern falls offen
  document.addEventListener("fsa:lang-change", (ev) => {
    const openId = body.getAttribute("data-open-id");
    if (openId) {
      openPack(openId);
    }
  });
});
