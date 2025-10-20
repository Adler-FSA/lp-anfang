document.addEventListener("DOMContentLoaded", function() {
  const campusMenu = [
    { icon: "📣", name: "Social Media", link: "/lp-anfang/pages/social.html" },
    { icon: "👥", name: "Community", link: "/lp-anfang/pages/community.html" },
    { icon: "🧭", name: "Mentorenzone", link: "/lp-anfang/pages/mentoren.html" },
    { icon: "🪙", name: "Souveränität", link: "/lp-anfang/pages/souveraenitaet.html" }
  ];

  const menuContainer = document.createElement("div");
  menuContainer.className = "campus-menu";

  campusMenu.forEach(item => {
    const a = document.createElement("a");
    a.className = "door";
    a.href = item.link;
    a.textContent = `${item.icon} ${item.name}`;
    menuContainer.appendChild(a);
  });

  const style = document.createElement("style");
  style.textContent = `
    .campus-menu {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1.2rem;
      padding: 1.5rem 0;
      background: rgba(0,0,0,0.75);
      border-top: 1px solid rgba(212,175,55,0.3);
      border-bottom: 1px solid rgba(212,175,55,0.3);
    }
    .campus-menu .door {
      color: #d4af37;
      font-family: system-ui, sans-serif;
      font-size: 1rem;
      text-decoration: none;
      padding: 0.6rem 1.2rem;
      border: 1px solid rgba(212,175,55,0.4);
      border-radius: 6px;
      transition: all 0.3s ease;
      background: rgba(255,255,255,0.05);
    }
    .campus-menu .door:hover {
      color: #fff;
      border-color: rgba(212,175,55,0.8);
      text-shadow: 0 0 8px rgba(212,175,55,0.8);
      background: rgba(212,175,55,0.08);
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(menuContainer);
});
