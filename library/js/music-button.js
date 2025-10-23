// ░░ Musik-Button – FSA Style (optimiert mit Touch, Speicher & Preload) ░░
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

  // letzten Status aus Speicher abrufen
  const saved = localStorage.getItem("fsa_music_on");
  if (saved === "true") isPlaying = true;

  function playRandomTrack() {
    const random = Math.floor(Math.random() * tracks.length);
    audio.src = tracks[random];
    audio.load();
    audio.play().catch(() => {
      // Falls Autoplay blockiert wird
      showNotice();
    });
  }

  function showNotice() {
    if (document.getElementById("musicNotice")) return;
    const note = document.createElement("div");
    note.id = "musicNotice";
    note.textContent = "🎧 Tippe, um Musik zu starten";
    note.style.cssText = `
      position: fixed; bottom: 15px; left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.7);
      color: #d4af37;
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      z-index: 9999;
      backdrop-filter: blur(3px);
      border: 1px solid rgba(212,175,55,0.4);
    `;
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 4000);
  }

  // Button erzeugen
  const btn = document.createElement("button");
  btn.id = "musicToggle";
  btn.innerHTML = isPlaying ? "⏸️ Musik aus" : "🎵 Musik an";
  btn.title = "Musik an/aus";

  // gezielt im Menü einfügen
  (document.getElementById("musicControl") ||
   document.querySelector("#menu-helpers #musicControl") ||
   document.getElementById("menu-helpers") ||
   document.body).appendChild(btn);

  // Steuerung
  const toggleMusic = () => {
    if (!isPlaying) {
      playRandomTrack();
      isPlaying = true;
      btn.innerHTML = "⏸️ Musik aus";
      btn.classList.add("active");
      localStorage.setItem("fsa_music_on", "true");
    } else {
      audio.pause();
      isPlaying = false;
      btn.innerHTML = "🎵 Musik an";
      btn.classList.remove("active");
      localStorage.setItem("fsa_music_on", "false");
    }
  };

  btn.addEventListener("click", toggleMusic);
  btn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    toggleMusic();
  });

  audio.addEventListener("ended", () => {
    if (isPlaying) playRandomTrack();
  });

  // Wenn gespeichert „an“ → direkt starten (nach erster Interaktion)
  if (isPlaying) {
    document.addEventListener("click", function initOnce() {
      document.removeEventListener("click", initOnce);
      playRandomTrack();
    }, { once: true });
  }

  // Stil (wie Sprachumschalter)
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
    @media (max-width: 420px) {
      #musicToggle {
        font-size: 0.9rem;
        padding: 0.5rem 0.9rem;
      }
    }
  `;
  document.head.appendChild(style);
});
