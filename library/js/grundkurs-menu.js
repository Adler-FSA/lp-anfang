// <!-- library/js/grundkurs-menu.js -->
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // --- Menüdefinition (wie im Repo) ---
    const items = [
      { icon: "📘", name: "Basis",       link: "/lp-anfang/grundkurs-basis.html",       key: "grundkurs-basis" },
      { icon: "🛡️", name: "Sicherheit", link: "/lp-anfang/grundkurs-sicherheit.html",  key: "grundkurs-sicherheit" },
      { icon: "💡", name: "Einkommen",   link: "/lp-anfang/grundkurs-einkommen.html",   key: "grundkurs-einkommen" },
      { icon: "🌐", name: "Network",     link: "/lp-anfang/grundkurs-network.html",     key: "grundkurs-network" },
      // ✅ Fix: Pfad & Key auf die finale Prüfungsseite
      { icon: "🎓", name: "Prüfung",     link: "/lp-anfang/grundkurs-pruefung.html",    key: "grundkurs-pruefung" }
    ];

    // --- Aktive Seite bestimmen ---
    const path = (location.pathname || "").toLowerCase();

    // --- Container wählen: bevorzugt der Anker, sonst body ---
    const host =
      document.getElementById("kursmenu-anchor") ||
      document.body;

    // Bestehendes Menü entfernen, um Doppel-Einträge zu vermeiden
    host.querySelectorAll(".grundkurs-menu").forEach(el => el.remove());

    // Menü aufbauen
    const menu = document.createElement("nav");
    menu.className = "grundkurs-menu";
    items.forEach(it => {
      const a = document.createElement("a");
      a.className = "door";
      a.href = it.link;
      a.textContent = `${it.icon} ${it.name}`;
      if (path.includes(it.key)) a.classList.add("active");

      // Sanfter Übergang: Fade-Out vor Navigation (ohne hässlichen Reload-Blitz)
      a.addEventListener("click", (ev) => {
        if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || a.target === "_blank") return;
        ev.preventDefault();
        document.documentElement.classList.add("page-leave");
        setTimeout(() => { window.location.href = a.href; }, 120);
      });

      menu.appendChild(a);

      // Prefetch der Zielseite (schnelleres Laden, weniger Flackern)
      const pf = document.createElement("link");
      pf.rel = "prefetch";
      pf.href = it.link;
      document.head.appendChild(pf);
    });

    host.appendChild(menu);

    // --- Einmaliger Fade-In ---
    document.documentElement.classList.add("page-enter");
    setTimeout(() => document.documentElement.classList.remove("page-enter"), 220);

    // --- Styles (unverändert) ---
    const style = document.createElement("style");
    style.textContent = `
      :root { --fade-ms: 160ms; }
      html.page-enter body { opacity: 0; }
      html:not(.page-enter) body { transition: opacity var(--fade-ms) ease; }
      html.page-leave body { opacity: 0; transition: opacity var(--fade-ms) ease; }

      .grundkurs-menu {
        display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem;
        padding: 1.2rem 1rem; background: rgba(0,0,0,0.55);
        border-top: 1px solid rgba(212,175,55,0.3);
        border-bottom: 1px solid rgba(212,175,55,0.3);
        backdrop-filter: blur(6px);
        box-shadow: 0 0 10px rgba(212,175,55,0.1); z-index: 900;
      }
      .grundkurs-menu .door {
        color: #d4af37; font-family: system-ui, sans-serif; font-size: 1rem;
        text-decoration: none; padding: 0.55rem 1.2rem;
        border: 1px solid rgba(212,175,55,0.35); border-radius: 8px;
        transition: all 0.3s ease; background: rgba(255,255,255,0.05);
        box-shadow: 0 0 4px rgba(212,175,55,0.25);
      }
      .grundkurs-menu .door:hover {
        color: #fff; border-color: rgba(212,175,55,0.8);
        text-shadow: 0 0 8px rgba(212,175,55,0.8);
        background: rgba(212,175,55,0.12); transform: translateY(-1px);
      }
      .grundkurs-menu .door.active {
        background: rgba(212,175,55,0.25);
        border-color: rgba(212,175,55,0.9); color: #fff;
        box-shadow: 0 0 8px rgba(212,175,55,0.5);
      }
      @media (max-width: 720px) {
        .grundkurs-menu { flex-direction: column; align-items: center; gap: .8rem; padding: 1.2rem .5rem; }
        .grundkurs-menu .door { width: 80%; text-align: center; font-size: 1.05rem; padding: .8rem 1rem; }
      }
    `;
    document.head.appendChild(style);
  });
})();
