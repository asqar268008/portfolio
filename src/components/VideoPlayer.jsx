import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, Pause, Fullscreen, VolumeOn, VolumeOff } from './icons.jsx'

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]

const fmt = (s) => {
  if (!Number.isFinite(s) || s < 0) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

// Label the source resolution from the decoded frame height.
const resLabel = (h) => {
  if (!h) return null
  if (h >= 2100) return '4K'
  if (h >= 1400) return '1440p'
  if (h >= 1000) return '1080p'
  if (h >= 700) return '720p'
  if (h >= 460) return '480p'
  return `${h}p`
}

// Self-contained HTML5 player: poster overlay, play/pause, seek with buffered
// track, volume, playback speed, fullscreen, keyboard shortcuts, and a source
// resolution badge. The frame adopts the video's real aspect ratio once
// metadata loads, so nothing is letterboxed or cropped.
const VideoPlayer = ({ src, poster, label = 'Project demo', gradient = ['#3b82f6', '#8b5cf6'] }) => {
  const videoRef = useRef(null)
  const wrapRef = useRef(null)

  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [rate, setRate] = useState(1)
  const [speedOpen, setSpeedOpen] = useState(false)
  const [ratio, setRatio] = useState(null)
  const [quality, setQuality] = useState(null)
  const [failed, setFailed] = useState(!src)

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      setStarted(true)
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const onVolume = (e) => {
    const v = videoRef.current
    const value = Number(e.target.value)
    setVolume(value)
    if (!v) return
    v.volume = value
    v.muted = value === 0
    setMuted(v.muted)
  }

  const seekTo = (clientX, bar) => {
    const v = videoRef.current
    if (!v || !Number.isFinite(v.duration)) return
    const rect = bar.getBoundingClientRect()
    const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
    v.currentTime = pct * v.duration
    setCurrent(v.currentTime)
  }

  const nudge = useCallback((delta) => {
    const v = videoRef.current
    if (!v || !Number.isFinite(v.duration)) return
    v.currentTime = Math.min(Math.max(v.currentTime + delta, 0), v.duration)
    setCurrent(v.currentTime)
  }, [])

  const setSpeed = (r) => {
    const v = videoRef.current
    setRate(r)
    setSpeedOpen(false)
    if (v) v.playbackRate = r
  }

  const fullscreen = useCallback(() => {
    const el = wrapRef.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen?.()
    else el.requestFullscreen?.()
  }, [])

  // Media events — time, metadata, buffering.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const onTime = () => setCurrent(v.currentTime)
    const onMeta = () => {
      setDuration(v.duration || 0)
      if (v.videoWidth && v.videoHeight) {
        setRatio(v.videoWidth / v.videoHeight)
        setQuality(resLabel(v.videoHeight))
      }
    }
    const onProgress = () => {
      if (v.buffered.length && v.duration) {
        setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100)
      }
    }
    const onEnded = () => setPlaying(false)

    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('progress', onProgress)
    v.addEventListener('ended', onEnded)
    if (v.readyState >= 1) onMeta()

    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('progress', onProgress)
      v.removeEventListener('ended', onEnded)
    }
  }, [src])

  // Keyboard shortcuts, scoped to the focused player.
  const onKeyDown = (e) => {
    const keys = [' ', 'k', 'K', 'm', 'M', 'f', 'F', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
    if (!keys.includes(e.key)) return
    e.preventDefault()
    const v = videoRef.current
    switch (e.key) {
      case ' ':
      case 'k':
      case 'K':
        togglePlay(); break
      case 'm':
      case 'M':
        toggleMute(); break
      case 'f':
      case 'F':
        fullscreen(); break
      case 'ArrowLeft': nudge(-5); break
      case 'ArrowRight': nudge(5); break
      case 'ArrowUp':
      case 'ArrowDown': {
        if (!v) break
        const next = Math.min(Math.max(v.volume + (e.key === 'ArrowUp' ? 0.1 : -0.1), 0), 1)
        v.volume = next
        v.muted = next === 0
        setVolume(next)
        setMuted(v.muted)
        break
      }
      default: break
    }
  }

  const progress = duration ? (current / duration) * 100 : 0

  const posterStyle = poster
    ? { backgroundImage: `url(${poster})` }
    : {
        backgroundImage: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]}), linear-gradient(180deg, rgba(7,11,21,.4), rgba(7,11,21,.8))`,
        backgroundBlendMode: 'overlay, normal',
      }

  return (
    <div
      className={`video-player${started ? ' is-started' : ''}`}
      ref={wrapRef}
      style={ratio ? { aspectRatio: String(ratio) } : undefined}
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="region"
      aria-label={label}
    >
      <video
        ref={videoRef}
        src={src || undefined}
        poster={poster || undefined}
        preload="metadata"
        playsInline
        onPlay={() => { setPlaying(true); setStarted(true) }}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
        onClick={togglePlay}
      />

      {!started && !failed && (
        <button className="video-poster" onClick={togglePlay} aria-label={`Play ${label}`} style={posterStyle}>
          <span className="play-btn"><Play size={26} /></span>
          <span className="video-label">{label}</span>
        </button>
      )}

      {failed && (
        <div className="video-poster" style={posterStyle}>
          <span style={{ color: '#fff', fontSize: '0.95rem', textAlign: 'center', padding: '0 2rem', lineHeight: 1.6 }}>
            Add your demo video to <code style={{ color: '#7dd3fc' }}>/public/videos/</code> and set it in{' '}
            <code style={{ color: '#7dd3fc' }}>src/data/projects.js</code>
          </span>
        </div>
      )}

      {started && !failed && (
        <div className="video-controls">
          <button onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <div
            className="video-progress"
            onClick={(e) => seekTo(e.clientX, e.currentTarget)}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(current)}
            aria-valuetext={`${fmt(current)} of ${fmt(duration)}`}
          >
            <div className="buffer" style={{ width: `${buffered}%` }} />
            <div className="fill" style={{ width: `${progress}%` }} />
            <div className="knob" style={{ left: `${progress}%` }} />
          </div>

          <span className="video-time">{fmt(current)} / {fmt(duration)}</span>

          <div className="video-volume">
            <button onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
              {muted || volume === 0 ? <VolumeOff size={18} /> : <VolumeOn size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={onVolume}
              aria-label="Volume"
            />
          </div>

          <div className="video-speed">
            <button
              className="speed-btn"
              onClick={() => setSpeedOpen((o) => !o)}
              aria-haspopup="true"
              aria-expanded={speedOpen}
              aria-label="Playback speed"
            >
              {rate}×
            </button>
            {speedOpen && (
              <div className="speed-menu" role="menu">
                {SPEEDS.map((s) => (
                  <button
                    key={s}
                    role="menuitemradio"
                    aria-checked={rate === s}
                    className={rate === s ? 'active' : undefined}
                    onClick={() => setSpeed(s)}
                  >
                    {s}×
                  </button>
                ))}
              </div>
            )}
          </div>

          {quality && <span className="video-quality" title="Source resolution">{quality}</span>}

          <button onClick={fullscreen} aria-label="Fullscreen">
            <Fullscreen size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
