// ░░ Campus-Menü – FSA Style (responsive, Gold-Glow, Blur, Active State) ░░
document.addEventListener("DOMContentLoaded", function() {
  const campusMenu = [
    { icon: "📣", name: "Social Media", link: "/lp-anfang/pages/social.html" },
    { icon: "👥", name: "Community", link: "/lp-anfang/pages/community.html" },
    { icon: "🧭", name: "Mentorenzone", link: "/lp-anfang/pages/mentoren.html" },
    { icon: "🪙", name: "Souveränität", link: "/lp-anfang/pages/souveraenitaet.html" }
  ];

  const menuContainer = document.createElement("div");
  menuContainer.className = "campus-menu";

  // Aktuelle Seite bestimmen
  const currentPath = window.location.pathname;

  campusMenu.forEach(item => {
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
    .campus-menu {
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

    .campus-menu .door {
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

    .campus-menu .door:hover {
      color: #fff;
      border-color: rgba(212,175,55,0.8);
      text-shadow: 0 0 8px rgba(212,175,55,0.8);
      background: rgba(212,175,55,0.12);
      transform: translateY(-1px);
    }

    .campus-menu .door.active {
      background: rgba(212,175,55,0.25);
      border-color: rgba(212,175,55,0.9);
      color: #fff;
      box-shadow: 0 0 8px rgba(212,175,55,0.5);
    }

    /* 🔸 Responsiv */
    @media (max-width: 720px) {
      .campus-menu {
        flex-direction: column;
        align-items: center;
        gap: 0.8rem;
        padding: 1.2rem 0.5rem;
      }

      .campus-menu .door {
        width: 80%;
        text-align: center;
        font-size: 1.05rem;
        padding: 0.8rem 1rem;
      }
    }
  `;
  document.head.appendChild(style);
});
