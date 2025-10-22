// ░░ Musik-Button – FSA Style (integriert ins Menü, Gold-Glow, responsive) ░░
document.addEventListener("DOMContentLoaded", () => {
  const tracks = [
    "/lp-anfang/library/music/pool/track-01.mp3",
    "/lp-anfang/library/music/pool/track-02.mp3",
    "/lp-anfang/library/music/pool/track-03.mp3",
    "/lp-anfang/library/music/pool/track-04.mp3",
    "/lp-anfang/library/music/pool/track-05.mp3",
    "/lp-anfang/library/music/pool/track-06.mp3"
  ];

  let audio = new Audio();
  audio.volume = 0.5;
  let isPlaying = false;

  function playRandomTrack() {
    const random = Math.floor(Math.random() * tracks.length);
    audio.src = tracks[random];
    audio.play();
  }

  // Button erzeugen
  const btn = document.createElement("button");
  btn.id = "musicToggle";
  btn.innerHTML = "🎵 Musik an";
  btn.title = "Musik an/aus";

  // 👉 gezielt im Menü einfügen (wenn Container vorhanden)
  (document.getElementById("musicControl") ||
   document.querySelector("#menu-helpers #musicControl") ||
   document.getElementById("menu-helpers") ||
   document.body).appendChild(btn);

  // Interaktion
  btn.addEventListener("click", () => {
    if (!isPlaying) {
      playRandomTrack();
      isPlaying = true;
      btn.innerHTML = "⏸️ Musik aus";
      btn.classList.add("active");
    } else {
      audio.pause();
      isPlaying = false;
      btn.innerHTML = "🎵 Musik an";
      btn.classList.remove("active");
    }
  });

  audio.addEventListener("ended", () => {
    if (isPlaying) playRandomTrack();
  });

  // Stil (angepasst an Menü & Sprachumschalter)
  const style = document.createElement("style");
  style.textContent = `
    #musicToggle {
      background: rgba(0,0,0,0.45);
      color: #d4af37;
      border: 1px solid rgba(212,175,55,0.35);
      border-radius: 8px;
      padding: 0.45rem 1rem;
      font-size: 0.95rem;
      font-family: system-ui, sans-serif;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(4px);
    }

    #musicToggle:hover {
      background: rgba(212,175,55,0.2);
      border-color: rgba(212,175,55,0.6);
      text-shadow: 0 0 6px rgba(212,175,55,0.6);
    }

    #musicToggle.active {
      background: rgba(212,175,55,0.3);
      border-color: rgba(212,175,55,0.8);
      color: #fff;
      text-shadow: 0 0 8px rgba(212,175,55,0.9);
      box-shadow: 0 0 6px rgba(212,175,55,0.5);
    }

    /* 🔸 Mobil: Buttons stapeln sich automatisch nebeneinander */
    @media (max-width: 420px) {
      #musicToggle {
        font-size: 0.9rem;
        padding: 0.5rem 0.9rem;
      }
    }
  `;
  document.head.appendChild(style);
});
