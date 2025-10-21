// ░░ Sprachumschalter – FSA Style (responsive, Menülinie, Gold-Glow) ░░
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

  document.body.appendChild(langBox);

  // Stil
  const style = document.createElement("style");
  style.textContent = `
    #langSwitcher {
      position: fixed;
      top: 10px;
      left: 10px;
      display: flex;
      gap: 8px;
      z-index: 1100;
      background: rgba(0,0,0,0.35);
      padding: 0.3rem 0.4rem;
      border-radius: 8px;
      border: 1px solid rgba(212,175,55,0.35);
      backdrop-filter: blur(5px);
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

    /* 🔸 Responsiv: verschiebt sich bei kleinen Geräten */
    @media (max-width: 720px) {
      #langSwitcher {
        top: auto;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        justify-content: center;
        padding: 0.4rem 0.6rem;
        border-radius: 10px;
      }
    }
  `;
  document.head.appendChild(style);
});
