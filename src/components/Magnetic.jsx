import { useRef } from 'react'

// Magnetic button wrapper — element gently follows the cursor within a radius.
// Disabled for reduced-motion / touch users.
const Magnetic = ({ children, strength = 0.3, className = '' }) => {
  const ref = useRef(null)

  const onMove = (e) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0,0)'
  }

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-flex', transition: 'transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1)' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  )
}

export default Magnetic
