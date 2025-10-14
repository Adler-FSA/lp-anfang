// FSA Background Music Script
(async function() {
  try {
    const configRes = await fetch('config.json', {cache:'no-store'});
    const config = await configRes.json();

    if (!config.music || !config.music.enabled) return;

    const playlistRes = await fetch(`library/music/${config.music.playlist}`, {cache:'no-store'});
    const playlist = await playlistRes.json();

    const audio = new Audio();
    audio.volume = playlist.volume ?? 0.5;
    audio.autoplay = playlist.autoplay ?? true;
    audio.loop = false;

    let current = 0;

    const playTrack = (index) => {
      if (playlist.tracks.length === 0) return;
      audio.src = playlist.tracks[index];
      audio.play().catch(err => console.warn('Autoplay blockiert:', err));
    };

    audio.addEventListener('ended', () => {
      current = (current + 1) % playlist.tracks.length;
      if (playlist.loop || current !== 0) {
        playTrack(current);
      }
    });

    const savedVol = localStorage.getItem('fsa_music_volume');
    if (savedVol) audio.volume = parseFloat(savedVol);

    audio.addEventListener('volumechange', () => {
      localStorage.setItem('fsa_music_volume', audio.volume);
    });

    playTrack(current);
  } catch (err) {
    console.error('Fehler beim Laden der Musik:', err);
  }
})();