// ░░ Einheitliches FSA-Menü – mobilfreundlich & edel (sticky, Gold-Glow, Auto-Umbruch) ░░
document.addEventListener("DOMContentLoaded", () => {
  const menuHTML = `
    <div class="topbar">
      <nav class="doors">
        <a class="door" href="/lp-anfang/index.html">🏠 Startseite</a>
        <a class="door" href="/lp-anfang/krypto.html">💰 Krypto</a>
        <a class="door" href="/lp-anfang/grundkurs.html">📘 Grundkurs</a>
        <a class="door" href="/lp-anfang/office.html">📂 Office</a>
        <a class="door" href="/lp-anfang/campus.html">🎓 Campus</a>
        <a class="door" href="/lp-anfang/hoersaal.html">🏛️ Hörsaal</a>
      </nav>

      <!-- Zusatzbereich für Sprach- & Musikbuttons -->
      <div id="menu-helpers">
        <div id="langSwitcher"></div>
        <div id="musicControl"></div>
      </div>
    </div>

    <style>
      .topbar {
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        background: rgba(0,0,0,0.75);
        backdrop-filter: blur(6px);
        border-bottom: 1px solid rgba(212,175,55,0.3);
        z-index: 1000;
      }

      .doors {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.8rem;
        padding: 0.8rem 1rem 0.6rem 1rem;
        box-sizing: border-box;
      }

      .door {
        color: #d4af37;
        font-family: system-ui, sans-serif;
        font-size: 1rem;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border: 1px solid rgba(212,175,55,0.4);
        border-radius: 6px;
        background: rgba(255,255,255,0.05);
        transition: all 0.3s ease;
        white-space: nowrap;
      }

      .door:hover {
        color: #fff;
        border-color: rgba(212,175,55,0.8);
        text-shadow: 0 0 8px rgba(212,175,55,0.8);
        background: rgba(212,175,55,0.08);
      }

      /* 🔸 Sprach- & Musik-Button-Zone */
      #menu-helpers {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 0.5rem 0 0.8rem;
        border-top: 1px solid rgba(212,175,55,0.25);
      }

      #menu-helpers > div {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* 🔸 Responsive Regeln */
      @media (max-width: 720px) {
        .door { flex: 1 1 45%; text-align: center; }
      }

      @media (max-width: 420px) {
        .door { flex: 1 1 100%; font-size: 0.95rem; }
        #menu-helpers { flex-direction: column; gap: 6px; }
      }
    </style>
  `;
  document.body.insertAdjacentHTML("afterbegin", menuHTML);
});
