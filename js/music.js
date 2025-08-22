// YouTube IFrame API based single-button music controller
(function(){
  const VIDEO_ID = 'zN8w-uuHeZ4';
  const toggleBtn = document.getElementById('music-toggle');
  const host = document.getElementById('yt-player');
  if (!toggleBtn || !host) return;

  let player; let ready = false; let inFlight = false; let fallbackTimer; let queuedPlay = false;

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
      playerVars: { autoplay: 0, controls: 0, disablekb: 1, playsinline: 1, modestbranding: 1, rel: 0, fs: 0, iv_load_policy: 3 },
      events: { onReady, onStateChange, onError }
    });
  }

  function onReady() {
    ready = true;
    try { player.pauseVideo(); player.setVolume(60); player.unMute(); } catch(_) {}
    // If user tapped before readiness, start playback now
    if (queuedPlay) {
      try { player.unMute(); player.setVolume(60); player.playVideo(); } catch(_) {}
      queuedPlay = false;
    }
    clearBusy();
    updateUi();
  }
  function onStateChange() { clearBusy(); updateUi(); }
  function onError() { updateUi(); }

  function isPlaying() {
    if (!player || !ready) return false;
    const st = player.getPlayerState();
    return st === YT.PlayerState.PLAYING || st === YT.PlayerState.BUFFERING;
  }
  function isMuted() { return !player || !ready ? true : player.isMuted(); }

  function updateUi() {
    // Only two states: Play music or Pause music
    const label = isPlaying() ? 'Pause music' : 'Play music';
    toggleBtn.textContent = label;
    toggleBtn.title = label;
    toggleBtn.setAttribute('aria-label', label);
  }

  function setBusy(b) {
    toggleBtn.disabled = b;
    toggleBtn.setAttribute('aria-busy', b ? 'true' : 'false');
  }

  function clearBusy() {
    inFlight = false;
    setBusy(false);
    if (fallbackTimer) { clearTimeout(fallbackTimer); fallbackTimer = null; }
  }

  function userToggle() {
    if (inFlight) return;
    inFlight = true;
    setBusy(true);
    try {
      if (!ready) {
        // Queue the action; will auto-play when ready
        queuedPlay = true;
      } else if (!isPlaying()) {
        player.unMute();
        player.setVolume(60);
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    } finally {
      // Fallback to clear busy if state change is delayed on mobile
      fallbackTimer = setTimeout(() => { if (inFlight) { clearBusy(); updateUi(); } }, 900);
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
