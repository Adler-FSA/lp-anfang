// ░░ Grundkurs-Menü – FSA Style (responsive, Gold-Glow, Blur) ░░
document.addEventListener("DOMContentLoaded", function() {
  const grundkursMenu = [
    { icon: "📘", name: "Basis", link: "/lp-anfang/grundkurs-basis.html" },
    { icon: "🛡️", name: "Sicherheit", link: "/lp-anfang/grundkurs-sicherheit.html" },
    { icon: "💡", name: "Einkommen", link: "/lp-anfang/grundkurs-einkommen.html" },
    { icon: "🌐", name: "Network", link: "/lp-anfang/grundkurs-network.html" },
    { icon: "🎓", name: "Prüfung", link: "/lp-anfang/grundkurs-pruefung-vorbereitung.html" }
  ];

  const menuContainer = document.createElement("div");
  menuContainer.className = "grundkurs-menu";

  grundkursMenu.forEach(item => {
    const a = document.createElement("a");
    a.className = "door";
    a.href = item.link;
    a.textContent = `${item.icon} ${item.name}`;
    menuContainer.appendChild(a);
  });

  document.body.appendChild(menuContainer);

  const style = document.createElement("style");
  style.textContent = `
    .grundkurs-menu {
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

    .grundkurs-menu .door {
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

    .grundkurs-menu .door:hover {
      color: #fff;
      border-color: rgba(212,175,55,0.8);
      text-shadow: 0 0 8px rgba(212,175,55,0.8);
      background: rgba(212,175,55,0.12);
      transform: translateY(-1px);
    }

    /* 🔸 Aktiver Kurs-Button */
    .grundkurs-menu .door.active {
      background: rgba(212,175,55,0.25);
      border-color: rgba(212,175,55,0.9);
      color: #fff;
      box-shadow: 0 0 8px rgba(212,175,55,0.5);
    }

    /* 🔸 Responsiv */
    @media (max-width: 720px) {
      .grundkurs-menu {
        flex-direction: column;
        align-items: center;
        gap: 0.8rem;
        padding: 1.2rem 0.5rem;
      }

      .grundkurs-menu .door {
        width: 80%;
        text-align: center;
        font-size: 1.05rem;
        padding: 0.8rem 1rem;
      }
    }
  `;
  document.head.appendChild(style);
});
