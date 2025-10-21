// ░░ Office-Menü – FSA Style (Gold-Glow, Blur, Responsive, Active State) ░░
document.addEventListener("DOMContentLoaded", function() {
  const officeMenu = [
    { icon: "💼", name: "Mein Arbeitsbereich", link: "/lp-anfang/office.html" },
    { icon: "🌐", name: "Network & Struktur", link: "/lp-anfang/office-network.html" },
    { icon: "⚙️", name: "Tools & Generator", link: "/lp-anfang/office-tools.html" }
  ];

  const menuContainer = document.createElement("div");
  menuContainer.className = "office-menu";

  // Aktive Seite erkennen
  const currentPath = window.location.pathname;

  officeMenu.forEach(item => {
    const a = document.createElement("a");
    a.className = "door";
    a.href = item.link;
    a.textContent = `${item.icon} ${item.name}`;

    if (currentPath.includes(item.link.split("/").pop())) {
      a.classList.add("active");
    }

    menuContainer.appendChild(a);
  });

  document.body.appendChild(menuContainer);

  const style = document.createElement("style");
  style.textContent = `
    .office-menu {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1.2rem 1rem;
      background: rgba(0,0,0,0.55);
      border-top: 1px solid rgba(212,175,55,0.3);
      border-bottom: 1px solid rgba(212,175,55,0.3);
      backdrop-filter: blur(6px);
      box-shadow: 0 0 10px rgba(212,175,55,0.1);
      z-index: 900;
    }

    .office-menu .door {
      color: #d4af37;
      font-family: system-ui, sans-serif;
      font-size: 1rem;
      text-decoration: none;
      padding: 0.55rem 1.2rem;
      border: 1px solid rgba(212,175,55,0.35);
      border-radius: 8px;
      transition: all 0.3s ease;
      background: rgba(255,255,255,0.05);
      box-shadow: 0 0 4px rgba(212,175,55,0.25);
    }

    .office-menu .door:hover {
      color: #fff;
      border-color: rgba(212,175,55,0.8);
      text-shadow: 0 0 8px rgba(212,175,55,0.8);
      background: rgba(212,175,55,0.12);
      transform: translateY(-1px);
    }

    .office-menu .door.active {
      background: rgba(212,175,55,0.25);
      border-color: rgba(212,175,55,0.9);
      color: #fff;
      box-shadow: 0 0 8px rgba(212,175,55,0.5);
    }

    /* 🔸 Responsiv */
    @media (max-width: 720px) {
      .office-menu {
        flex-direction: column;
        align-items: center;
        gap: 0.8rem;
        padding: 1.2rem 0.5rem;
      }

      .office-menu .door {
        width: 80%;
        text-align: center;
        font-size: 1.05rem;
        padding: 0.8rem 1rem;
      }
    }
  `;
  document.head.appendChild(style);
});
