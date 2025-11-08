/* FSA – Menü-Patch: baut das globale Akademie-Menü ein, falls vergessen.
   Nutzt ausschließlich lokale Bausteine:
   - library/js/menu.js
   - library/js/lang-switcher.js
   - library/js/music-button.js
   Wirkt idempotent (keine Dubletten), stellt Padding oben sicher und setzt DE/EN korrekt.
*/
(function () {
  "use strict";

  var SCRIPTS = [
    "library/js/menu.js",
    "library/js/lang-switcher.js",
    "library/js/music-button.js"
  ];

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function hasScript(part) {
    var list = document.scripts;
    for (var i = 0; i < list.length; i++) {
      var src = list[i].getAttribute("src") || "";
      if (src.indexOf(part) !== -1) return true;
    }
    return false;
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (hasScript(src)) return resolve("exists");
      var el = document.createElement("script");
      el.src = src;
      el.async = false; // Reihenfolge beibehalten
      el.onload = function () { resolve("loaded"); };
      el.onerror = function () { reject(new Error("Script load failed: " + src)); };
      document.body.appendChild(el);
    });
  }

  function ensureMenuRoot() {
    var root = document.getElementById("menu-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "menu-root";
      // Ganz oben im Body einfügen (feste Topbar).
      document.body.insertBefore(root, document.body.firstChild);
    }
    return root;
  }

  function ensureStyles() {
    // Fallback für .hidden
    if (!document.getElementById("fsa-hidden-style")) {
      var h = document.createElement("style");
      h.id = "fsa-hidden-style";
      h.textContent = ".hidden{display:none !important}";
      document.head.appendChild(h);
    }
    // Padding oben für Seiteninhalt
    if (!document.getElementById("fsa-menu-patch-style")) {
      var st = document.createElement("style");
      st.id = "fsa-menu-patch-style";
      st.textContent = ".page-top{padding-top:110px}";
      document.head.appendChild(st);
    }
    // page-top auf <main> setzen (oder Body-Fallback)
    var main = document.querySelector("main");
    if (main) {
      if (!main.classList.contains("page-top")) main.classList.add("page-top");
    } else {
      document.body.style.paddingTop = "110px";
    }
  }

  function applyLangNow() {
    var code = localStorage.getItem("fsa_lang") || "de";
    document.documentElement.lang = code;

    // Sichtbarkeit auf der Seite (Menü-Bausteine reagieren zusätzlich auf Event)
    var de = document.querySelectorAll(".de");
    var en = document.querySelectorAll(".en");
    for (var i = 0; i < de.length; i++) de[i].classList.toggle("hidden", code !== "de");
    for (var j = 0; j < en.length; j++) en[j].classList.toggle("hidden", code !== "en");

    // Event für Listener (z. B. deine Bausteine)
    try {
      var ev = new CustomEvent("fsa:lang-change", { detail: code });
      document.dispatchEvent(ev);
    } catch (e) { /* ältere Browser ignorieren */ }
  }

  // Bekannte Init-Hooks der Bausteine vorsichtig anstoßen + Events nachreichen
  function bootstrapMenu() {
    try { if (window.FSA_MENU_INIT) window.FSA_MENU_INIT(); } catch(e){}
    try { if (window.FSA && typeof window.FSA.menuInit === "function") window.FSA.menuInit(); } catch(e){}
    try { if (typeof window.fsaMenuInit === "function") window.fsaMenuInit(); } catch(e){}
    try { document.dispatchEvent(new Event("DOMContentLoaded")); } catch(e){}
    try { document.dispatchEvent(new Event("fsa:menu-init")); } catch(e){}
    try { window.dispatchEvent(new Event("resize")); } catch(e){}
  }

  function wait(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }

  onReady(async function () {
    try {
      ensureMenuRoot();
      ensureStyles();

      // Bausteine in definierter Reihenfolge laden (nur wenn nötig)
      for (var i = 0; i < SCRIPTS.length; i++) {
        try { await loadScript(SCRIPTS[i]); } catch (e) { /* still, weiterladen */ }
      }

      // Init anstoßen + DE/EN synchronisieren
      bootstrapMenu();
      applyLangNow();
      // kleiner zweiter Durchgang, falls Rendering minimal verzögert ist
      await wait(120);
      applyLangNow();
    } catch (err) {
      try { console.warn("[FSA menu-patch] ", err && err.message ? err.message : err); } catch (_) {}
    }
  });
})();
