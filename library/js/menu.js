// ===== Einheitliches Menü (mit Rahmen – FSA Style) =====
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
        gap: 1.2rem;
        padding: 0.8rem 0;
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
      }
      .door:hover {
        color: #fff;
        border-color: rgba(212,175,55,0.8);
        text-shadow: 0 0 8px rgba(212,175,55,0.8);
        background: rgba(212,175,55,0.08);
      }
    </style>
  `;
  document.body.insertAdjacentHTML("afterbegin", menuHTML);
});
