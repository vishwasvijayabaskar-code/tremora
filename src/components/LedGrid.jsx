import { useRef, useEffect } from 'react'

/**
 * LedGrid — a dot-matrix "LED board" behind the hero. Dots idle faint, then
 * coordinated cells light up (hazard red) to form a shape (X, +, T, a tremor
 * pulse), hold, dissolve, and form the next. Inspired by halftone/LED panels.
 * Canvas + single rAF, paused when the hero scrolls out of view. Reduced-motion
 * shows a static faint grid.
 */
const SHAPES = ['pulse', 'X', 'T', '+', 'pulse']

export default function LedGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1)
    const GAP = 24, R = 1.7
    let cols = 0, rows = 0, dots = [] // {gx,gy,x,y,on,b}
    let raf = 0, running = true

    const sampleShape = (kind) => {
      // render glyph to an offscreen canvas at grid resolution, return Set of "gx,gy" that are "lit"
      const oc = document.createElement('canvas')
      oc.width = cols; oc.height = rows
      const o = oc.getContext('2d')
      o.fillStyle = '#000'; o.clearRect(0, 0, cols, rows)
      o.fillStyle = '#fff'
      const cx = cols / 2, cy = rows / 2
      if (kind === 'pulse') {
        o.strokeStyle = '#fff'; o.lineWidth = Math.max(1.4, rows * 0.05); o.beginPath()
        for (let gx = 0; gx <= cols; gx++) {
          const p = gx / cols
          let y = cy
          if (p > 0.42 && p < 0.58) y = cy - Math.sin((p - 0.42) / 0.16 * Math.PI) * rows * 0.34 * (p < 0.5 ? 1 : -1) - (p > 0.5 ? rows * 0 : 0)
          gx === 0 ? o.moveTo(gx, y) : o.lineTo(gx, y)
        }
        o.stroke()
      } else {
        o.font = `900 ${rows * 0.92}px Archivo Black, sans-serif`
        o.textAlign = 'center'; o.textBaseline = 'middle'
        o.fillText(kind, cx, cy + rows * 0.04)
      }
      const data = o.getImageData(0, 0, cols, rows).data
      const lit = new Set()
      for (let gy = 0; gy < rows; gy++) for (let gx = 0; gx < cols; gx++) {
        if (data[(gy * cols + gx) * 4 + 3] > 80) lit.add(gx + ',' + gy)
      }
      return lit
    }

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect()
      W = r.width; H = r.height
      canvas.width = W * dpr; canvas.height = H * dpr
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.floor(W / GAP); rows = Math.floor(H / GAP)
      const offX = (W - (cols - 1) * GAP) / 2, offY = (H - (rows - 1) * GAP) / 2
      dots = []
      for (let gy = 0; gy < rows; gy++) for (let gx = 0; gx < cols; gx++) {
        dots.push({ gx, gy, x: offX + gx * GAP, y: offY + gy * GAP, on: 0, b: 0.05 })
      }
    }
    resize()
    window.addEventListener('resize', resize)

    if (reduce) {
      // static faint grid
      dots.forEach(d => { ctx.fillStyle = 'rgba(10,10,10,0.06)'; ctx.beginPath(); ctx.arc(d.x, d.y, R, 0, 7); ctx.fill() })
      return () => window.removeEventListener('resize', resize)
    }

    // state machine
    let shapeI = 0, phase = 'wait', t0 = performance.now()
    const apply = () => {
      const lit = sampleShape(SHAPES[shapeI % SHAPES.length])
      dots.forEach(d => { d.on = lit.has(d.gx + ',' + d.gy) ? 1 : 0; d.delay = Math.random() * 600 })
    }

    const loop = (now) => {
      if (!running) { raf = requestAnimationFrame(loop); return }
      const elapsed = now - t0
      if (phase === 'wait' && elapsed > 700) { apply(); phase = 'form'; t0 = now }
      else if (phase === 'form' && elapsed > 2600) { dots.forEach(d => d.on = 0); phase = 'clear'; t0 = now }
      else if (phase === 'clear' && elapsed > 900) { shapeI++; phase = 'wait'; t0 = now }

      ctx.clearRect(0, 0, W, H)
      for (const d of dots) {
        const target = d.on ? (elapsed > (d.delay || 0) ? 1 : 0.05) : 0.05
        d.b += (target - d.b) * 0.12
        if (d.b > 0.07) {
          ctx.fillStyle = `rgba(230,25,25,${Math.min(1, d.b)})`
          ctx.beginPath(); ctx.arc(d.x, d.y, R + d.b * 1.2, 0, 7); ctx.fill()
        } else {
          ctx.fillStyle = `rgba(10,10,10,${0.05})`
          ctx.beginPath(); ctx.arc(d.x, d.y, R, 0, 7); ctx.fill()
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // pause when hero off-screen
    const io = new IntersectionObserver((e) => { running = e[0].isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}
