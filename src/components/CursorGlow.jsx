import { useEffect } from 'react'

// Subtle radial glow that follows the cursor. GPU-friendly (transform only),
// disabled automatically for reduced-motion / coarse-pointer users.
const CursorGlow = () => {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return

    const el = document.querySelector('.cursor-glow')
    let raf = 0

    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${e.clientX}px`)
        el.style.setProperty('--my', `${e.clientY}px`)
      })
    }

    document.addEventListener('mousemove', move, { passive: true })
    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="cursor-glow" aria-hidden="true" />
}

export default CursorGlow
