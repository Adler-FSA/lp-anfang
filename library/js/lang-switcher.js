// ░░ Sprachumschalter – FSA Style (ohne Reload, mobil-optimiert) ░░
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

  let currentLang = localStorage.getItem("fsa_lang") || "de";

  // Container bestimmen
  const host =
    document.getElementById("langSwitcher") ||
    document.querySelector("#menu-helpers #langSwitcher") ||
    document.getElementById("menu-helpers") ||
    document.body;

  let langBox = host.id === "langSwitcher" ? host : null;
  if (!langBox) {
    langBox = document.createElement("div");
    langBox.id = "langSwitcher";
    host.appendChild(langBox);
  } else {
    langBox.innerHTML = "";
  }

  // Buttons
  langs.forEach(lang => {
    const btn = document.createElement("button");
    btn.className = "lang-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", lang.label);
    btn.setAttribute("data-lang", lang.code);
    btn.innerHTML = lang.flag;
    if (lang.code === currentLang) btn.classList.add("active");

    const handleLangChange = (code) => {
      if (code === localStorage.getItem("fsa_lang")) return;
      localStorage.setItem("fsa_lang", code);
      currentLang = code;
      langBox.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Fallback für mobile Browser (kein StorageEvent)
      document.dispatchEvent(new CustomEvent("fsa:lang-change", { detail: code }));

      // Optionale Renderer anstoßen
      if (typeof window.renderIntro === "function") window.renderIntro(code);
      if (typeof window.renderUserData === "function") window.renderUserData(code);
    };

    // Klick- und Touchsteuerung
    ["click", "touchstart"].forEach(evt => {
      btn.addEventListener(evt, (e) => {
        e.preventDefault();
        handleLangChange(lang.code);
      }, { passive: true });
    });

    langBox.appendChild(btn);
  });

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
    @media (max-width: 420px) {
      #langSwitcher { flex-direction: row; gap: 6px; }
      .lang-btn { font-size: 1rem; padding: 0.3rem 0.45rem; }
    }
  `;
  document.head.appendChild(style);
});
