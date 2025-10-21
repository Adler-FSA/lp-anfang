// ░░ Back-to-Home Button – FSA Style (Gold-Glow, Responsive, Harmonisch) ░░
window.addEventListener("load", () => {
  const btn = document.createElement("a");
  btn.id = "backHome";
  btn.href = "/lp-anfang/index.html";
  btn.innerHTML = "🏠 Zurück zur Startseite";
  document.body.appendChild(btn);

  const style = document.createElement("style");
  style.textContent = `
    #backHome {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: .4rem;
      text-decoration: none;
      color: #d4af37;
      border: 1px solid rgba(212,175,55,0.35);
      background: rgba(0,0,0,0.55);
      padding: 0.8rem 1.8rem;
      border-radius: 8px;
      font-family: system-ui, sans-serif;
      font-size: 1rem;
      font-weight: 500;
      transition: all .3s ease;
      box-shadow: 0 0 6px rgba(212,175,55,0.25);
      margin: 2.2rem auto;
      display: block;
      width: fit-content;
      backdrop-filter: blur(4px);
    }

    #backHome:hover {
      color: #fff;
      border-color: rgba(212,175,55,0.8);
      text-shadow: 0 0 6px rgba(212,175,55,0.8);
      box-shadow: 0 0 10px rgba(212,175,55,0.5);
      background: rgba(212,175,55,0.12);
      transform: translateY(-2px);
    }

    /* 🔸 Responsiv: zentriert + größere Klickfläche für Mobil */
    @media (max-width: 720px) {
      #backHome {
        width: 80%;
        text-align: center;
        font-size: 1.05rem;
        padding: 1rem 0;
        margin: 2rem auto 3rem;
      }
    }
  `;
  document.head.appendChild(style);
});
