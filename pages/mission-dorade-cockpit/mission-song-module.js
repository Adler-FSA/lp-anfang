(()=>{
  const SONG_URL='../mission-dorade-live/vom-ich-zum-wir-(remastered).mp3';
  const COVER_URL='../mission-dorade-live/mission-dorade-song-cover.jpeg';

  function installMissionSong(){
    if(document.getElementById('missionDoradeSong')) return;
    const backgrounds=document.querySelector('#missionBreakfast .zoom-backgrounds');
    if(!backgrounds) return;

    if(!document.getElementById('md-mission-song-styles')){
      const style=document.createElement('style');
      style.id='md-mission-song-styles';
      style.textContent=`
        .md-mission-song{margin-top:18px;border:1px solid #d7e5ea;border-radius:18px;background:#fff;padding:16px;display:grid;grid-template-columns:110px minmax(0,1fr);gap:18px;align-items:center}
        .md-mission-song img{width:110px;height:110px;object-fit:cover;border-radius:14px;display:block}
        .md-mission-song h3{margin:0 0 12px;color:#132238;font-size:1.12rem;line-height:1.35}
        .md-mission-song audio{width:100%;display:block}
        @media(max-width:560px){.md-mission-song{grid-template-columns:82px minmax(0,1fr);gap:12px;padding:12px}.md-mission-song img{width:82px;height:82px}.md-mission-song h3{font-size:1rem;margin-bottom:8px}}
      `;
      document.head.appendChild(style);
    }

    const song=document.createElement('div');
    song.id='missionDoradeSong';
    song.className='md-mission-song';
    song.innerHTML=`
      <img src="${COVER_URL}" alt="Mission Dorade – Vom Ich zum Wir">
      <div>
        <h3>Mission Dorade – Vom Ich zum Wir (Remastered)</h3>
        <audio controls preload="metadata" src="${SONG_URL}">Dein Browser unterstützt die Audiowiedergabe nicht.</audio>
      </div>`;
    backgrounds.appendChild(song);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(installMissionSong,0),{once:true});
  else setTimeout(installMissionSong,0);
  setTimeout(installMissionSong,300);
})();