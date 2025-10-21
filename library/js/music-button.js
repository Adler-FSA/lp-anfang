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

  const btn = document.createElement("button");
  btn.id = "musicToggle";
  btn.innerHTML = "🎵 Musik an";
  btn.title = "Musik an/aus";
  document.body.appendChild(btn);

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

  const style = document.createElement("style");
  style.textContent = `
    #musicToggle {
      position: fixed;
      top: 20px;          /* exakt gleiche Höhe wie Sprachumschalter */
      right: 20px;
      background: rgba(0,0,0,0.65);
      color: #d4af37;
      border: 1px solid rgba(212,175,55,0.5);
      border-radius: 6px;
      padding: 0.45rem 1rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 9999;
    }
    #musicToggle:hover {
      background: rgba(212,175,55,0.15);
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
