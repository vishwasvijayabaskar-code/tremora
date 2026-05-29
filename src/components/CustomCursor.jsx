import { useEffect, useRef } from 'react'

/**
 * Sensor reticle cursor — a camera-focus frame (4 corner brackets) that slowly
 * spins around a coral center dot, then "locks on" (contracts + spins faster +
 * brightens) over any interactive element. On-brand for a targeting/sensor
 * device. Frame lags the dot for a bit of trailing weight.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const reticleRef = useRef(null)
  const textRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const retPos = useRef({ x: -100, y: -100 })
  const hovering = useRef(false)
  const spin = useRef(0)
  const lock = useRef(0) // eased 0->1 lock-on factor
  const raf = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = (e) => {
      hovering.current = true
      const label = e.currentTarget.dataset?.cursorText || ''
      if (textRef.current) {
        textRef.current.textContent = label
        textRef.current.style.opacity = label ? '1' : '0'
      }
    }

    const onLeave = () => {
      hovering.current = false
      if (textRef.current) textRef.current.style.opacity = '0'
    }

    const animate = () => {
      dotPos.current.x += (pos.current.x - dotPos.current.x) * 0.9
      dotPos.current.y += (pos.current.y - dotPos.current.y) * 0.9
      retPos.current.x += (pos.current.x - retPos.current.x) * 0.18
      retPos.current.y += (pos.current.y - retPos.current.y) * 0.18

      lock.current += ((hovering.current ? 1 : 0) - lock.current) * 0.15
      spin.current += 0.4 + lock.current * 1.6

      const retScale = 1 - lock.current * 0.32
      const dotScale = 1 - lock.current * 0.5

      if (dotRef.current) {
        dotRef.current.style.left = `${dotPos.current.x}px`
        dotRef.current.style.top = `${dotPos.current.y}px`
        dotRef.current.style.transform = `translate(-50%,-50%) scale(${dotScale.toFixed(3)})`
      }
      if (reticleRef.current) {
        reticleRef.current.style.left = `${retPos.current.x}px`
        reticleRef.current.style.top = `${retPos.current.y}px`
        reticleRef.current.style.transform = `translate(-50%,-50%) rotate(${spin.current.toFixed(1)}deg) scale(${retScale.toFixed(3)})`
        reticleRef.current.style.opacity = (0.55 + lock.current * 0.45).toFixed(3)
      }
      if (textRef.current) {
        textRef.current.style.left = `${retPos.current.x}px`
        textRef.current.style.top = `${retPos.current.y + 30}px`
      }

      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(animate)

    const bind = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
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
      {/* Reticle — 4 corner brackets that spin + lock on */}
      <svg
        ref={reticleRef}
        width="46"
        height="46"
        viewBox="0 0 46 46"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%,-50%)',
          opacity: 0.55,
        }}
      >
        <g
          fill="none"
          stroke="var(--coral)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5,15 L5,5 L15,5" />
          <path d="M41,15 L41,5 L31,5" />
          <path d="M5,31 L5,41 L15,41" />
          <path d="M41,31 L41,41 L31,41" />
        </g>
      </svg>

      {/* Center dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--coral)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%,-50%)',
        }}
      />

      {/* Hover label */}
      <div
        ref={textRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          fontSize: '0.55rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color: 'var(--coral)',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          whiteSpace: 'nowrap',
        }}
      />
    </>
  )
}
