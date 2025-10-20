// ===== Einheitliches Menü (Startseite vorn, alle Pfade korrekt) =====
document.addEventListener("DOMContentLoaded", () => {
  const menuHTML = `
    <div class="topbar">
      <div class="doors">
        <a class="door" href="/lp-anfang/index.html">🏠 Startseite</a>
        <a class="door" href="/lp-anfang/campus.html">🎓 Campus</a>
        <a class="door" href="/lp-anfang/office.html">📂 Office</a>
        <a class="door" href="/lp-anfang/grundkurs.html">📘 Grundkurs</a>
        <a class="door" href="/lp-anfang/krypto.html">💰 Krypto</a>
      </div>
    </div>

    <style>
      .topbar {
        position: fixed;
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
        justify-content: center;
        gap: 1.5rem;
        padding: 0.8rem 0;
      }
      .door {
        color: #d4af37;
        font-family: system-ui, sans-serif;
        font-size: 1rem;
        text-decoration: none;
        transition: color 0.3s, text-shadow 0.3s;
      }
      .door:hover {
        color: #fff;
        text-shadow: 0 0 10px rgba(212,175,55,0.8);
      }
    </style>
  `;
  document.body.insertAdjacentHTML("afterbegin", menuHTML);
});
