import { useEffect, useRef } from 'react'

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

/**
 * Perspective — cursor-driven 3D tilt that publishes --rx / --ry / --lift
 * CSS vars on its container. Descendant <Highlight> spans read --lift to
 * drift forward, faking depth. On-demand rAF: spins up on mouse move, stops
 * when settled flat, and ignores the cursor while scrolled offscreen so it
 * never fights the pinned horizontal-scroll sections.
 */
export function Perspective({
  children,
  maxRotateX = 14,
  maxRotateY = 30,
  smoothing = 0.12,
  entrance = true,
  style = {},
  className,
  ...props
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

    const set = (rx, ry, lift) => {
      container.style.setProperty('--rx', `${rx}deg`)
      container.style.setProperty('--ry', `${ry}deg`)
      container.style.setProperty('--lift', lift)
    }

    const stop = () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const tick = () => {
      rotX += (targetX - rotX) * smoothing
      rotY += (targetY - rotY) * smoothing
      const lift = Math.min(1, Math.hypot(rotX / maxRotateX, rotY / maxRotateY))
      set(rotX.toFixed(2), rotY.toFixed(2), lift.toFixed(3))

      const settled =
        Math.abs(targetX) < 0.01 &&
        Math.abs(targetY) < 0.01 &&
        Math.abs(rotX) < 0.03 &&
        Math.abs(rotY) < 0.03

      if (settled) {
        set('0', '0', '0')
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

    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      // ignore while scrolled well past the viewport — zero idle cost
      if (r.bottom < -200 || r.top > window.innerHeight + 200) {
        targetX = 0
        targetY = 0
        return
      }
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
      // full strength over the card, fade across the next 2 card-radii
      const dist = Math.hypot(dx, dy)
      const falloff = dist <= 1 ? 1 : Math.max(0, 1 - (dist - 1) / 2)
      targetX = clamp(dy, -1, 1) * maxRotateX * falloff
      targetY = -clamp(dx, -1, 1) * maxRotateY * falloff
      start()
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      start()
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      stop()
    }
  }, [maxRotateX, maxRotateY, smoothing])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        perspective: '1200px',
        ...(entrance ? { animation: 'perspective-blur-in 0.8s ease both' } : {}),
        ...style,
      }}
      {...props}
    >
      <div style={{ transformStyle: 'preserve-3d' }}>
        <div
          ref={cardRef}
          style={{
            willChange: 'transform',
            transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

const PRESETS = {
  coral: { bg: 'var(--hl-coral-bg)', ring: 'var(--hl-coral-ring)', text: '#fff' },
  peach: { bg: 'var(--hl-peach-bg)', ring: 'var(--hl-peach-ring)', text: '#1A1A1A' },
  cream: { bg: 'var(--hl-cream-bg)', ring: 'var(--hl-cream-ring)', text: '#1A1A1A' },
  lavender: { bg: 'var(--hl-lavender-bg)', ring: 'var(--hl-lavender-ring)', text: '#1A1A1A' },
}

/**
 * Highlight — inline pill that lifts toward the viewer as the parent
 * Perspective tilts (translate one way, shadow the other = fake depth).
 */
export function Highlight({ color = 'coral', style = {}, children, ...props }) {
  const c = PRESETS[color] || PRESETS.coral
  return (
    <span
      style={{
        display: 'inline-block',
        borderRadius: '4px',
        padding: '0 7px',
        color: c.text,
        background: c.bg,
        willChange: 'transform, box-shadow',
        transform:
          'translate(calc(-8px * var(--lift, 0)), calc(-6px * var(--lift, 0)))',
        boxShadow: `rgba(${c.ring}, calc(0.8 * var(--lift, 0))) 2px 1.5px 0px 0.75px, rgba(${c.ring}, calc(0.3 * var(--lift, 0))) 8px 4px 4px 0px`,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  )
}
