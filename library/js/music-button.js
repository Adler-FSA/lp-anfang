document.addEventListener("DOMContentLoaded", () => {
  // === Musikdateien definieren ===
  const tracks = [
    "/lp-anfang/library/music/pool/track-01.mp3",
    "/lp-anfang/library/music/pool/track-02.mp3",
    "/lp-anfang/library/music/pool/track-03.mp3",
    "/lp-anfang/library/music/pool/track-04.mp3",
    "/lp-anfang/library/music/pool/track-05.mp3",
    "/lp-anfang/library/music/pool/track-06.mp3"
  ];

  // === Audio-Objekt vorbereiten ===
  let audio = new Audio();
  audio.volume = 0.5;
  let isPlaying = false;

  // === Zufalls-Track wählen ===
  function playRandomTrack() {
    const random = Math.floor(Math.random() * tracks.length);
    audio.src = tracks[random];
    audio.play();
  }

  // === Button erzeugen ===
  const btn = document.createElement("button");
  btn.id = "musicToggle";
  btn.innerHTML = "🎵 Musik an";
  btn.title = "Musik an/aus";
  document.body.appendChild(btn);

  // === Klick-Logik ===
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

  // === Automatisch nächster Track nach Ende ===
  audio.addEventListener("ended", () => {
    if (isPlaying) playRandomTrack();
  });

  // === Stil ===
  const style = document.createElement("style");
  style.textContent = `
    #musicToggle {
      position: fixed;
      top: 58px;       /* unter Hauptmenü */
      right: 20px;
      background: rgba(0,0,0,0.7);
      color: #d4af37;
      border: 1px solid rgba(212,175,55,0.5);
      border-radius: 6px;
      padding: 0.6rem 1.2rem;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 9999;
    }
    #musicToggle:hover {
      background: rgba(212,175,55,0.1);
      text-shadow: 0 0 6px rgba(212,175,55,0.8);
    }
    #musicToggle.active {
      border-color: rgba(212,175,55,0.9);
      color: #fff;
      text-shadow: 0 0 8px rgba(212,175,55,0.9);
    }
  `;
  document.head.appendChild(style);
});
