// YouTube IFrame API based single-button music controller
(function(){
  const VIDEO_ID = 'zN8w-uuHeZ4';
  const toggleBtn = document.getElementById('music-toggle');
  const host = document.getElementById('yt-player');
  if (!toggleBtn || !host) return;

  let player; let ready = false;

  // Load YouTube IFrame API
  function loadYT() {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) return resolve();
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => resolve();
    });
  }

  function buildPlayer() {
    player = new YT.Player('yt-player', {
      height: '0', width: '0', videoId: VIDEO_ID,
      playerVars: { autoplay: 1, controls: 0, disablekb: 1, playsinline: 1, modestbranding: 1, rel: 0, fs: 0, iv_load_policy: 3 },
      events: { onReady, onStateChange, onError }
    });
  }

  function onReady() {
    ready = true;
    try { player.mute(); player.playVideo(); } catch(_) {}
    updateUi();
  }
  function onStateChange() { updateUi(); }
  function onError() { updateUi(); }

  function isPlaying() {
    if (!player || !ready) return false;
    const st = player.getPlayerState();
    return st === YT.PlayerState.PLAYING || st === YT.PlayerState.BUFFERING;
  }
  function isMuted() { return !player || !ready ? true : player.isMuted(); }

  function updateUi() {
    // Text labels: Play music (stopped/paused), Unmute music (playing muted), Mute music (playing unmuted)
    let label = 'Play music';
    if (isPlaying()) label = isMuted() ? 'Unmute music' : 'Mute music';
    toggleBtn.textContent = label;
    toggleBtn.title = label;
    toggleBtn.setAttribute('aria-label', label);
  }

  function userToggle() {
    if (!ready) return;
    try {
      if (!isPlaying()) {
        // Start audible playback on first click
        player.unMute();
        player.setVolume(60);
        player.playVideo();
      } else {
        // If playing: toggle mute/unmute
        if (isMuted()) { player.unMute(); player.setVolume(60); }
        else { player.mute(); }
      }
    } finally {
      updateUi();
    }
  }

  toggleBtn.addEventListener('click', userToggle);
  toggleBtn.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter' || e.code === 'Space' || e.keyCode === 32) { e.preventDefault(); userToggle(); }
  });

  loadYT().then(buildPlayer).catch(()=>{
    toggleBtn.disabled = true;
  });
})();
