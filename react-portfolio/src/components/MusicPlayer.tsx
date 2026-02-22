import { useState, useRef, useCallback } from 'react'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

const VIDEO_ID = 'zN8w-uuHeZ4'

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const playerRef = useRef<any>(null)
  const ytRequestedRef = useRef(false)
  const queuedPlayRef = useRef(false)

  const loadYT = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (window.YT && window.YT.Player) return resolve()
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
      window.onYouTubeIframeAPIReady = () => resolve()
    })
  }, [])

  const buildPlayer = useCallback(() => {
    playerRef.current = new window.YT.Player('yt-player', {
      height: '0',
      width: '0',
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        playsinline: 1,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        iv_load_policy: 3
      },
      events: {
        onReady: () => {
          setIsReady(true)
          try {
            playerRef.current.pauseVideo()
            playerRef.current.setVolume(60)
            playerRef.current.unMute()
          } catch (_) {}
          
          if (queuedPlayRef.current) {
            try {
              playerRef.current.unMute()
              playerRef.current.setVolume(60)
              playerRef.current.playVideo()
            } catch (_) {}
            queuedPlayRef.current = false
          }
          setIsBusy(false)
        },
        onStateChange: (event: any) => {
          const state = event.data
          setIsPlaying(state === window.YT.PlayerState.PLAYING || state === window.YT.PlayerState.BUFFERING)
          setIsBusy(false)
        },
        onError: () => {
          setIsBusy(false)
        }
      }
    })
  }, [])

  const handleToggle = useCallback(async () => {
    if (isBusy) return
    setIsBusy(true)

    try {
      if (!ytRequestedRef.current) {
        queuedPlayRef.current = true
        ytRequestedRef.current = true
        await loadYT()
        buildPlayer()
        return
      }
      
      if (!isReady) {
        queuedPlayRef.current = true
        return
      }

      if (!isPlaying) {
        playerRef.current.unMute()
        playerRef.current.setVolume(60)
        playerRef.current.playVideo()
      } else {
        playerRef.current.pauseVideo()
      }
    } finally {
      setTimeout(() => setIsBusy(false), 900)
    }
  }, [isBusy, isReady, isPlaying, loadYT, buildPlayer])

  const label = isPlaying ? 'Pause music' : 'Play music'
  const icon = isPlaying ? '⏸' : '▶'

  return (
    <div className="music-bar">
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          id="music-toggle"
          className="music-btn"
          aria-label={label}
          title={label}
          type="button"
          disabled={isBusy}
          onClick={handleToggle}
        >
          {icon}
        </button>
      </div>
    </div>
  )
}

export default MusicPlayer
