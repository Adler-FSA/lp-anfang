document.addEventListener("DOMContentLoaded", function() {
  const officeMenu = [
    { icon: "💼", name: "Mein Arbeitsbereich", link: "/lp-anfang/office.html" },
    { icon: "🌐", name: "Network & Struktur", link: "/lp-anfang/office-network.html" },
    { icon: "⚙️", name: "Tools & Generator", link: "/lp-anfang/office-tools.html" }
  ];

  const menuContainer = document.createElement("div");
  menuContainer.className = "office-menu";

  officeMenu.forEach(item => {
    const a = document.createElement("a");
    a.className = "door";
    a.href = item.link;
    a.textContent = `${item.icon} ${item.name}`;
    menuContainer.appendChild(a);
  });

  const style = document.createElement("style");
  style.textContent = `
    .office-menu {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1.5rem;
      padding: 2rem 0;
      background: rgba(0,0,0,0.75);
      border-top: 1px solid rgba(212,175,55,0.3);
      border-bottom: 1px solid rgba(212,175,55,0.3);
    }
    .office-menu .door {
      color: #d4af37;
      font-family: system-ui, sans-serif;
      font-size: 1.05rem;
      text-decoration: none;
      padding: 0.9rem 1.8rem;
      border: 1px solid rgba(212,175,55,0.4);
      border-radius: 6px;
      transition: all 0.3s ease;
      background: rgba(255,255,255,0.05);
    }
    .office-menu .door:hover {
      color: #fff;
      border-color: rgba(212,175,55,0.8);
      text-shadow: 0 0 8px rgba(212,175,55,0.8);
      background: rgba(212,175,55,0.08);
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(menuContainer);
});
