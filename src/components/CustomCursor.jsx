import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const textRef = useRef(null)
  const glowRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const cursorPos = useRef({ x: -100, y: -100 })
  const trailPos = useRef({ x: -100, y: -100 })
  const hovering = useRef(false)
  const hoverText = useRef('')
  const velocity = useRef({ x: 0, y: 0 })
  const prevPos = useRef({ x: -100, y: -100 })
  const raf = useRef(null)
  const magnetTarget = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      velocity.current = {
        x: e.clientX - pos.current.x,
        y: e.clientY - pos.current.y,
      }
      pos.current = { x: e.clientX, y: e.clientY }

      // Check magnetic pull on interactive elements
      const magnetEls = document.querySelectorAll('[data-cursor-magnetic]')
      let closest = null
      let closestDist = 80

      magnetEls.forEach(el => {
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
        if (dist < closestDist) {
          closest = { x: cx, y: cy, el, dist }
          closestDist = dist
        }
      })

      magnetTarget.current = closest
    }

    const onEnter = (e) => {
      hovering.current = true
      hoverText.current = e.target.dataset?.cursorText || ''
      if (cursorRef.current) {
        cursorRef.current.style.width = '48px'
        cursorRef.current.style.height = '48px'
        cursorRef.current.style.mixBlendMode = 'difference'
        cursorRef.current.style.background = 'white'
        cursorRef.current.style.borderRadius = '50%'
      }
      if (trailRef.current) {
        trailRef.current.style.opacity = '0'
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = '0.3'
        glowRef.current.style.width = '80px'
        glowRef.current.style.height = '80px'
      }
      if (textRef.current) {
        textRef.current.style.opacity = hoverText.current ? '1' : '0'
        textRef.current.textContent = hoverText.current
      }
    }

    const onLeave = () => {
      hovering.current = false
      hoverText.current = ''
      if (cursorRef.current) {
        cursorRef.current.style.width = '10px'
        cursorRef.current.style.height = '10px'
        cursorRef.current.style.mixBlendMode = 'normal'
        cursorRef.current.style.background = 'var(--coral)'
        cursorRef.current.style.borderRadius = '50%'
      }
      if (trailRef.current) {
        trailRef.current.style.opacity = '0.35'
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = '0'
        glowRef.current.style.width = '40px'
        glowRef.current.style.height = '40px'
      }
      if (textRef.current) {
        textRef.current.style.opacity = '0'
      }
    }

    const animate = () => {
      // Smooth cursor with velocity-based stretch
      cursorPos.current.x += (pos.current.x - cursorPos.current.x) * 0.85
      cursorPos.current.y += (pos.current.y - cursorPos.current.y) * 0.85
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.1
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.1

      // Velocity-based shape distortion
      const vx = cursorPos.current.x - prevPos.current.x
      const vy = cursorPos.current.y - prevPos.current.y
      const speed = Math.hypot(vx, vy)
      const angle = Math.atan2(vy, vx) * (180 / Math.PI)
      const stretch = Math.min(speed * 0.15, 0.5)
      prevPos.current = { ...cursorPos.current }

      // Magnetic pull
      let targetX = cursorPos.current.x
      let targetY = cursorPos.current.y
      if (magnetTarget.current && !hovering.current) {
        const pull = 1 - (magnetTarget.current.dist / 80)
        targetX = cursorPos.current.x + (magnetTarget.current.x - cursorPos.current.x) * pull * 0.3
        targetY = cursorPos.current.y + (magnetTarget.current.y - cursorPos.current.y) * pull * 0.3
      }

      if (cursorRef.current) {
        const scaleX = hovering.current ? 1 : 1 + stretch
        const scaleY = hovering.current ? 1 : 1 - stretch * 0.3
        cursorRef.current.style.left = `${targetX}px`
        cursorRef.current.style.top = `${targetY}px`
        cursorRef.current.style.transform = `translate(-50%, -50%) rotate(${hovering.current ? 0 : angle}deg) scaleX(${scaleX}) scaleY(${scaleY})`
      }
      if (trailRef.current) {
        trailRef.current.style.left = `${trailPos.current.x}px`
        trailRef.current.style.top = `${trailPos.current.y}px`
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${targetX}px`
        glowRef.current.style.top = `${targetY}px`
      }
      if (textRef.current) {
        textRef.current.style.left = `${targetX}px`
        textRef.current.style.top = `${targetY + 32}px`
      }

      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(animate)

    const bindHovers = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    bindHovers()

    const observer = new MutationObserver(bindHovers)
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
      {/* Glow layer */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--coral) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9997,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          transition: 'opacity 0.4s ease, width 0.4s ease, height 0.4s ease',
          filter: 'blur(8px)',
        }}
      />
      {/* Main cursor — velocity-stretched dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'var(--coral)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1), height 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s, mix-blend-mode 0.3s, border-radius 0.3s',
        }}
      />
      {/* Trail — lazy follower ring */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid var(--coral)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s ease',
          opacity: 0.35,
        }}
      />
      {/* Hover text label */}
      <div
        ref={textRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          fontSize: '0.6rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--coral)',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          whiteSpace: 'nowrap',
        }}
      />
    </>
  )
}
