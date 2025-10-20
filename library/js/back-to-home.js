window.addEventListener("load", () => {
  const btn = document.createElement("a");
  btn.id = "backHome";
  btn.href = "/lp-anfang/index.html";
  btn.innerHTML = "🏠 Zurück zur Startseite";
  document.body.appendChild(btn);

  const style = document.createElement("style");
  style.textContent = `
    #backHome {
      position: fixed;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      text-decoration: none;
      color: #d4af37;
      border: 1px solid rgba(212,175,55,0.5);
      background: rgba(0,0,0,0.7);
      padding: 0.8rem 1.6rem;
      border-radius: 6px;
      font-family: system-ui, sans-serif;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-shadow: 0 0 8px rgba(212,175,55,0.3);
      z-index: 9999;
    }
    #backHome:hover {
      color: #fff;
      border-color: rgba(212,175,55,0.9);
      text-shadow: 0 0 6px rgba(212,175,55,0.8);
      box-shadow: 0 0 12px rgba(212,175,55,0.6);
      background: rgba(212,175,55,0.08);
    }
  `;
  document.head.appendChild(style);
});
