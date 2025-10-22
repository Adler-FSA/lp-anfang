// ░░ Sprachumschalter – FSA Style (integriert ins Menü, Gold-Glow, responsive) ░░
document.addEventListener("DOMContentLoaded", () => {
  const langs = [
    { code: "de", flag: "🇩🇪", label: "Deutsch" },
    { code: "en", flag: "🇬🇧", label: "English" }
  ];

  // Migration alter Keys
  const oldKey = localStorage.getItem("fsaLang");
  const newKey = localStorage.getItem("fsa_lang");
  if (!newKey && oldKey) {
    localStorage.setItem("fsa_lang", oldKey);
    localStorage.removeItem("fsaLang");
  }

  // Aktuelle Sprache (Default: de)
  let currentLang = localStorage.getItem("fsa_lang") || "de";

  // Container
  const langBox = document.createElement("div");
  langBox.id = "langSwitcher";

  langs.forEach(lang => {
    const btn = document.createElement("button");
    btn.className = "lang-btn";
    btn.innerHTML = lang.flag;
    btn.title = lang.label;
    if (lang.code === currentLang) btn.classList.add("active");

    btn.addEventListener("click", () => {
      if (lang.code === localStorage.getItem("fsa_lang")) return;
      localStorage.setItem("fsa_lang", lang.code);
      document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      location.reload();
    });

    langBox.appendChild(btn);
  });

  // 👉 gezielt in Menü einfügen, falls vorhanden
  (document.getElementById("langSwitcher") || 
   document.querySelector("#menu-helpers #langSwitcher") ||
   document.getElementById("menu-helpers") ||
   document.body).appendChild(langBox);

  // Stil
  const style = document.createElement("style");
  style.textContent = `
    #langSwitcher {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

    .lang-btn {
      font-size: 1.1rem;
      border: 1px solid rgba(212,175,55,0.35);
      border-radius: 6px;
      background: rgba(255,255,255,0.08);
      color: #fff;
      cursor: pointer;
      padding: 0.35rem 0.55rem;
      transition: all 0.3s ease;
    }

    .lang-btn:hover {
      background: rgba(212,175,55,0.2);
      border-color: rgba(212,175,55,0.6);
      text-shadow: 0 0 6px rgba(212,175,55,0.6);
    }

    .lang-btn.active {
      background: rgba(212,175,55,0.35);
      border-color: rgba(212,175,55,0.8);
      box-shadow: 0 0 6px rgba(212,175,55,0.7);
    }

    /* 🔸 Mobiloptimierung */
    @media (max-width: 420px) {
      #langSwitcher {
        flex-direction: row;
        gap: 6px;
      }
    }
  `;
  document.head.appendChild(style);
});
