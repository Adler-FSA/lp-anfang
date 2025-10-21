document.addEventListener("DOMContentLoaded", () => {
  const langs = [
    { code: "de", flag: "🇩🇪", label: "Deutsch" },
    { code: "en", flag: "🇬🇧", label: "English" }
  ];

  // aktueller Wert aus localStorage
  let currentLang = localStorage.getItem("fsaLang") || "de";

  // Container
  const langBox = document.createElement("div");
  langBox.id = "langSwitcher";

  langs.forEach(lang => {
    const btn = document.createElement("button");
    btn.className = "lang-btn";
    btn.innerHTML = `${lang.flag}`;
    btn.title = lang.label;
    if (lang.code === currentLang) btn.classList.add("active");

    btn.addEventListener("click", () => {
      localStorage.setItem("fsaLang", lang.code);
      document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      location.reload(); // Seite neu laden, später Übersetzung
    });

    langBox.appendChild(btn);
  });

  document.body.appendChild(langBox);

  // Stil
  const style = document.createElement("style");
  style.textContent = `
    #langSwitcher {
      position: fixed;
      top: 105px;         /* tiefer gesetzt, gleiche Höhe wie Musik-Button */
      left: 20px;
      display: flex;
      gap: 8px;
      z-index: 9999;
    }
    .lang-btn {
      font-size: 1.1rem;
      border: 1px solid rgba(212,175,55,0.5);
      border-radius: 6px;
      background: rgba(255,255,255,0.15);
      color: #fff;
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      transition: all 0.3s ease;
      box-shadow: 0 0 4px rgba(212,175,55,0.4);
    }
    .lang-btn:hover {
      background: rgba(212,175,55,0.25);
      border-color: rgba(212,175,55,0.8);
      text-shadow: 0 0 6px rgba(212,175,55,0.6);
    }
    .lang-btn.active {
      background: rgba(212,175,55,0.4);
      border-color: rgba(212,175,55,0.9);
      box-shadow: 0 0 8px rgba(212,175,55,0.8);
    }
  `;
  document.head.appendChild(style);
});
