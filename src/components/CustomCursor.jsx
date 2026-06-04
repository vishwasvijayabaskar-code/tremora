import { useEffect, useRef } from 'react'

/**
 * Telemetry HUD cursor — a tactical reticle (rotating tick-ring + corner
 * brackets) trailing a square hazard core, with a live monospace readout of the
 * cursor's screen coordinates + lock status. Locks on (contracts, spins up,
 * status flips TRK -> LOCK, brightens) over any interactive element. On-brand
 * for a sensor/targeting device; the live coordinate HUD is the signature.
 * Single rAF, lerped follow, MutationObserver re-binds hover targets.
 */
export default function CustomCursor() {
  const coreRef = useRef(null)
  const reticleRef = useRef(null)
  const hudRef = useRef(null)
  const statusRef = useRef(null)
  const coordRef = useRef(null)

  const pos = useRef({ x: -200, y: -200 })
  const corePos = useRef({ x: -200, y: -200 })
  const retPos = useRef({ x: -200, y: -200 })
  const hovering = useRef(false)
  const labelText = useRef('')
  const spin = useRef(0)
  const lock = useRef(0) // eased 0->1 lock-on factor
  const raf = useRef(null)

  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY } }

    const onEnter = (e) => {
      hovering.current = true
      labelText.current = e.currentTarget.dataset?.cursorText || ''
    }
    const onLeave = () => { hovering.current = false; labelText.current = '' }

    const animate = () => {
      const p = pos.current
      corePos.current.x += (p.x - corePos.current.x) * 0.85
      corePos.current.y += (p.y - corePos.current.y) * 0.85
      retPos.current.x += (p.x - retPos.current.x) * 0.16
      retPos.current.y += (p.y - retPos.current.y) * 0.16

      lock.current += ((hovering.current ? 1 : 0) - lock.current) * 0.15
      spin.current += 0.35 + lock.current * 2.2

      const retScale = 1 - lock.current * 0.34
      const coreScale = 1 - lock.current * 0.45

      if (coreRef.current) {
        const s = coreRef.current.style
        s.left = `${corePos.current.x}px`
        s.top = `${corePos.current.y}px`
        s.transform = `translate(-50%,-50%) rotate(45deg) scale(${coreScale.toFixed(3)})`
      }
      if (reticleRef.current) {
        const s = reticleRef.current.style
        s.left = `${retPos.current.x}px`
        s.top = `${retPos.current.y}px`
        s.transform = `translate(-50%,-50%) rotate(${spin.current.toFixed(1)}deg) scale(${retScale.toFixed(3)})`
        s.opacity = (0.5 + lock.current * 0.5).toFixed(3)
      }
      if (hudRef.current) {
        const s = hudRef.current.style
        s.left = `${retPos.current.x + 24}px`
        s.top = `${retPos.current.y + 16}px`
      }
      if (coordRef.current) {
        coordRef.current.textContent =
          `X:${String(Math.round(p.x)).padStart(4, '0')} Y:${String(Math.round(p.y)).padStart(4, '0')}`
      }
      if (statusRef.current) {
        const locked = lock.current > 0.5
        statusRef.current.textContent = labelText.current || (locked ? '▣ LOCK' : '+ TRK')
        statusRef.current.style.color = locked ? 'var(--hazard-2)' : 'var(--hazard)'
      }

      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(animate)

    const bind = () => {
      document.querySelectorAll('a, button, input, [role="button"], [data-cursor-hover], [data-cursor-text]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    bind()

    const observer = new MutationObserver(bind)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      observer.disconnect()
    }
  }, [])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      {/* Reticle — rotating tick-ring + corner brackets, lock-on contracts it */}
      <svg
        ref={reticleRef}
        width="54"
        height="54"
        viewBox="0 0 54 54"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%,-50%)', opacity: 0.5 }}
      >
        <g fill="none" stroke="var(--hazard)" strokeWidth="1.5" strokeLinecap="square">
          <path d="M7,17 L7,7 L17,7" />
          <path d="M47,17 L47,7 L37,7" />
          <path d="M7,37 L7,47 L17,47" />
          <path d="M47,37 L47,47 L37,47" />
          <path d="M27,3 L27,9" />
          <path d="M27,45 L27,51" />
          <path d="M3,27 L9,27" />
          <path d="M45,27 L51,27" />
          <circle cx="27" cy="27" r="14" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
        </g>
      </svg>

      {/* Square hazard core (diamond) */}
      <div
        ref={coreRef}
        style={{ position: 'fixed', top: 0, left: 0, width: 6, height: 6, background: 'var(--hazard)', pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%,-50%) rotate(45deg)' }}
      />

      {/* Live telemetry HUD — status + screen coordinates */}
      <div
        ref={hudRef}
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 3, fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.14em', lineHeight: 1, whiteSpace: 'nowrap' }}
      >
        <span ref={statusRef} style={{ color: 'var(--hazard)', fontWeight: 700 }}>+ TRK</span>
        <span ref={coordRef} style={{ color: 'var(--text-muted)' }}>X:0000 Y:0000</span>
      </div>
    </>
  )
}
