// ===== Grundkurs Menü (SVG + Name, minimal) =====
document.addEventListener("DOMContentLoaded", () => {
  const grundkursMenu = `
  <div class="grundkurs-menu">
    <a class="door" href="/lp-anfang/grundkurs-basis.html">📘 Basis</a>
    <a class="door" href="/lp-anfang/grundkurs-sicherheit.html">🛡️ Sicherheit</a>
    <a class="door" href="/lp-anfang/grundkurs-einkommen.html">💡 Einkommen</a>
    <a class="door" href="/lp-anfang/grundkurs-network.html">🌐 Network</a>
    <a class="door" href="/lp-anfang/grundkurs-pruefung-vorbereitung.html">🎓 Prüfung</a>
  </div>

  <style>
    .grundkurs-menu {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1.5rem;
      padding: 2rem 0;
      background: rgba(0,0,0,0.75);
      border-top: 1px solid rgba(212,175,55,0.3);
      border-bottom: 1px solid rgba(212,175,55,0.3);
    }
    .grundkurs-menu .door {
      color: #d4af37;
      font-family: system-ui, sans-serif;
      font-size: 1rem;
      text-decoration: none;
      transition: color 0.3s, text-shadow 0.3s;
    }
    .grundkurs-menu .door:hover {
      color: #fff;
      text-shadow: 0 0 10px rgba(212,175,55,0.8);
    }
  </style>
  `;
  document.body.insertAdjacentHTML("beforeend", grundkursMenu);
});
