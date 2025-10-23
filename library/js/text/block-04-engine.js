/*!
 * FSA – block-04-engine.js (v1.4)
 * Kursauswertung + Fortschritt speichern (ohne Repeat-Zähler)
 * - Sanfter Fade beim Ergebnis
 * - Button-Logik: Gold → nächster Kurs, sonst „Kurs wiederholen“
 * - DE/EN Texte
 */

(function(){
  // Kurs-Schlüssel / Nächste Seite aus URL ableiten
  function detectCourseKey() {
    const p = (location.pathname || "").toLowerCase();
    if (p.includes("grundkurs-basis"))      return {key:"course1", idx:1, next:"grundkurs-sicherheit.html"};
    if (p.includes("grundkurs-sicherheit")) return {key:"course2", idx:2, next:"grundkurs-einkommen.html"};
    if (p.includes("grundkurs-einkommen"))  return {key:"course3", idx:3, next:"grundkurs-network.html"};
    if (p.includes("grundkurs-network"))    return {key:"course4", idx:4, next:"grundkurs-pruefung-vorbereitung.html"};
    return {key:"course1", idx:1, next:"grundkurs-sicherheit.html"};
  }
  const ctx = detectCourseKey();

  // Ergebnis-Renderer
  window.showResult = function showResult(triggeredByUser){
    if (triggeredByUser !== true) return;

    const lang = localStorage.getItem("fsa_lang") || "de";
    const score = typeof window.correctCount === "number" ? window.correctCount : 0;
    const total = typeof window.totalQuestions === "number" ? window.totalQuestions : 10;

    const firstName = localStorage.getItem("fsa_firstName") || "";
    const lastName  = localStorage.getItem("fsa_lastName")  || "";
    const fullName  = `${firstName} ${lastName}`.trim();

    // Status
    let status = "", mentorText = "";
    if (score <= 5) {
      status = lang==="de" ? "Wiederholen ❌" : "Repeat ❌";
      mentorText = lang==="de"
        ? "Lass dich nicht entmutigen. Versuch es noch einmal – du bist näher am Ziel, als du denkst."
        : "Don’t be discouraged. Try again — you’re closer than you think.";
    } else if (score <= 7) {
      status = lang==="de" ? "Bronze 🥉" : "Bronze 🥉";
      mentorText = lang==="de"
        ? "Gutes Fundament. Bleib konsequent – dein nächster Flug trägt dich höher."
        : "Solid base. Stay consistent — your next flight will take you higher.";
    } else if (score <= 9) {
      status = lang==="de" ? "Silber 🥈" : "Silver 🥈";
      mentorText = lang==="de"
        ? "Stark! Mit etwas Feinschliff erreichst du volle Souveränität."
        : "Strong! With a bit more refinement, you’ll reach sovereignty.";
    } else {
      status = lang==="de" ? "Gold 🥇" : "Gold 🥇";
      mentorText = lang==="de"
        ? "Großartig! Du hast die Prinzipien wirklich verinnerlicht."
        : "Outstanding! You’ve internalized the core principles.";
    }

    // Speichern (bereinigt)
    localStorage.setItem(`fsa_${ctx.key}_score`, String(score));
    localStorage.setItem(`fsa_${ctx.key}_status`, status);
    if (status.toLowerCase().includes("gold")) {
      localStorage.setItem(`fsa_${ctx.key}_passed`, "true");
    }

    const percent = Math.round((score / total) * 100);
    const color = score <= 5 ? "#ef4444" : score <=7 ? "#cd7f32" : score <=9 ? "#93c5fd" : "#d4af37";

    const isGold = status.toLowerCase().includes("gold");
    const buttonLabel = isGold
      ? (lang==="de" ? (ctx.idx<4 ? "Weiter zum nächsten Kurs →" : "Zur Prüfungsvorbereitung →")
                     : (ctx.idx<4 ? "Continue to next course →" : "Go to exam prep →"))
      : (lang==="de" ? "Kurs wiederholen" : "Repeat course");

    const buttonAction = isGold
      ? () => { window.location.href = ctx.next + "?nocache=" + Date.now(); }
      : () => { location.reload(); };

    // Zielcontainer
    const container = window.container || document.querySelector("#quiz-root") || document.body;

    // Fade-Stil einmalig
    const styleId = "fsa-result-fade-style";
    if (!document.getElementById(styleId)) {
      const st = document.createElement("style");
      st.id = styleId;
      st.textContent = `.fsa-result{opacity:0;transition:opacity .2s ease}.fsa-result.show{opacity:1}`;
      document.head.appendChild(st);
    }

    // Render
    const wrap = document.createElement("div");
    wrap.className = "fsa-result";
    wrap.innerHTML = `
      <div style="background:rgba(17,24,39,0.8);border:1px solid ${color};
        border-radius:12px;padding:2rem;text-align:center;
        box-shadow:0 0 25px rgba(212,175,55,0.15);margin-top:1cm;">
        <h2 style="color:${color};font-size:1.6rem;margin-bottom:0.4rem;">${window.courseName || (lang==="de"?"Grundkurs":"Course")}</h2>
        ${fullName ? `<p style="font-size:1.05rem;color:#94a3b8;margin-bottom:1.2rem;">
          ${lang==="de"?"Auswertung für":"Evaluation for"} <strong>${fullName}</strong>
        </p>` : ""}
        ${typeof window.renderStats==="function" ? window.renderStats() : ""}
        <div style="margin:1rem auto 1.4rem auto;width:80%;background:#1e293b;border-radius:8px;height:16px;overflow:hidden;">
          <div style="width:${percent}%;height:100%;background:${color};transition:width 1s ease;"></div>
        </div>
        <p style="margin-bottom:0.8rem;">
          ${lang==="de"
            ? `Du hast <strong>${score}</strong> von <strong>${total}</strong> Fragen richtig.`
            : `You answered <strong>${score}</strong> out of <strong>${total}</strong> correctly.`}
        </p>
        <p style="margin-bottom:1rem;">
          ${lang==="de"?"Status":"Status"}: <strong style="color:${color};">${status}</strong>
        </p>
        <blockquote style="font-style:italic;color:#e5e7eb;background:rgba(255,255,255,0.05);
          border-left:4px solid ${color};padding:1rem 1.5rem;border-radius:6px;
          margin:1.2rem auto;max-width:700px;">“${mentorText}”</blockquote>
        <div class="btn-row" style="display:flex;flex-wrap:wrap;gap:.8rem;margin-top:1rem;justify-content:center">
          <button id="courseActionBtn" class="btn ${isGold ? 'primary':''}" style="${isGold?'background:linear-gradient(90deg,#3b82f6,#d4af37);color:#fff;border:none':''}">
            ${buttonLabel}
          </button>
        </div>
      </div>
    `;

    // Altes UI ersetzen, ohne die Scrollposition zu verlieren
    const prevY = window.scrollY;
    container.innerHTML = "";
    container.appendChild(wrap);
    // Fade rein
    setTimeout(() => wrap.classList.add("show"), 10);
    // Scrollposition beibehalten
    window.scrollTo({ top: prevY });

    document.getElementById("courseActionBtn")?.addEventListener("click", buttonAction);
  };

  console.log("✅ Auswertung aktiv – v1.4 (Fade, Gold→Next, kein Repeat-Zähler).");
})();
