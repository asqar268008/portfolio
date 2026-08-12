import { useEffect, useRef } from 'react'

// Neural-network inspired particle background.
// - Nodes drift slowly; nearby nodes connect with lines (RAG-inspired "graph" feel)
// - Lines brighten near the cursor
// - Pauses when off-screen; respects prefers-reduced-motion
const ParticleCanvas = () => {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')

    let raf = 0
    let particles = []
    let mouse = { x: -9999, y: -9999 }
    let running = false

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = w * DPR
      canvas.height = h * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      const count = Math.min(Math.floor((w * h) / 18000), 90)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 1,
      }))
    }

    const step = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(96,165,250,0.5)'
        ctx.fill()
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Mouse links
      for (const p of particles) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 160) {
          const alpha = (1 - dist / 160) * 0.35
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(34,211,238,${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(step)
    }

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!running && !reduced) { running = true; raf = requestAnimationFrame(step) }
      } else if (running) {
        running = false
        cancelAnimationFrame(raf)
      }
    }, { threshold: 0.05 })

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', onLeave)
    io.observe(canvas)

    if (!reduced) {
      running = true
      raf = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />
}

export default ParticleCanvas
