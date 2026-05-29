import { useEffect, useRef } from 'react'

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

export default function PerspectiveTilt({
  children,
  maxRotateX = 10,
  maxRotateY = 20,
  smoothing = 0.1,
  style = {},
}) {
  const containerRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const card = cardRef.current
    if (!container || !card) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let targetX = 0
    let targetY = 0
    let rotX = 0
    let rotY = 0
    let raf = 0
    let running = false

    const stop = () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const tick = () => {
      rotX += (targetX - rotX) * smoothing
      rotY += (targetY - rotY) * smoothing

      card.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`

      // settled and returning to rest -> stop the loop so the page can idle
      const settled =
        Math.abs(targetX) < 0.01 &&
        Math.abs(targetY) < 0.01 &&
        Math.abs(rotX) < 0.05 &&
        Math.abs(rotY) < 0.05

      if (settled) {
        card.style.transform = ''
        stop()
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(tick)
    }

    // Scoped to THIS card only — no global listener, so cards don't all
    // warp together and idle cards burn zero frames.
    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
      targetX = clamp(dy, -1, 1) * maxRotateX
      targetY = -clamp(dx, -1, 1) * maxRotateY
      start()
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      start()
    }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)

    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      stop()
    }
  }, [maxRotateX, maxRotateY, smoothing])

  return (
    <div
      ref={containerRef}
      style={{
        perspective: '1200px',
        ...style,
      }}
    >
      <div style={{ transformStyle: 'preserve-3d' }}>
        <div
          ref={cardRef}
          style={{
            willChange: 'transform',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
