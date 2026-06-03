import { useRef, useEffect } from 'react'

/**
 * LedGrid — global fixed dot-matrix "LED board" behind the whole site. Dots idle
 * faint; up to 3 shapes (O, T, X, triangle, square) glide across the viewport,
 * lighting the dots they pass over (hazard red), drift off the edges, and new
 * shapes enter. Canvas + single rAF, paused when the tab is hidden. Static under
 * reduced-motion.
 */
const TYPES = ['O', 'T', 'X', 'triangle', 'square']
const MAX = 3

// distance from point to segment
function segDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay
  const l2 = dx * dx + dy * dy || 1
  let t = ((px - ax) * dx + (py - ay) * dy) / l2
  t = Math.max(0, Math.min(1, t))
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy))
}

// distance from a point to a shape's OUTLINE (centered at sx,sy, size s)
function outlineDist(type, dx, dy, s) {
  const h = s / 2
  if (type === 'O') return Math.abs(Math.hypot(dx, dy) - h)
  if (type === 'square') {
    const ax = Math.abs(dx), ay = Math.abs(dy)
    if (Math.max(ax, ay) > h + 8) return 999
    return Math.abs(Math.max(ax, ay) - h)
  }
  if (type === 'X') {
    return Math.min(
      segDist(dx, dy, -h, -h, h, h),
      segDist(dx, dy, -h, h, h, -h)
    )
  }
  if (type === 'T') {
    return Math.min(
      segDist(dx, dy, -h, -h, h, -h),   // top bar
      segDist(dx, dy, 0, -h, 0, h)      // stem
    )
  }
  if (type === 'triangle') {
    const A = [0, -h], B = [h, h], C = [-h, h]
    return Math.min(
      segDist(dx, dy, A[0], A[1], B[0], B[1]),
      segDist(dx, dy, B[0], B[1], C[0], C[1]),
      segDist(dx, dy, C[0], C[1], A[0], A[1])
    )
  }
  return 999
}

export default function LedGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0, H = 0
    const dpr = Math.min(1.5, window.devicePixelRatio || 1)
    const GAP = 28, R = 1.5
    let dots = []
    const BAND = GAP * 0.72

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W * dpr; canvas.height = H * dpr
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cols = Math.ceil(W / GAP) + 1, rows = Math.ceil(H / GAP) + 1
      dots = []
      for (let gy = 0; gy < rows; gy++) for (let gx = 0; gx < cols; gx++) dots.push({ x: gx * GAP, y: gy * GAP })
    }
    resize()
    window.addEventListener('resize', resize)

    if (reduce) {
      ctx.fillStyle = 'rgba(10,10,10,0.055)'
      dots.forEach(d => { ctx.beginPath(); ctx.arc(d.x, d.y, R, 0, 7); ctx.fill() })
      return () => window.removeEventListener('resize', resize)
    }

    const rnd = (a, b) => a + Math.random() * (b - a)
    const spawn = () => {
      const type = TYPES[(Math.random() * TYPES.length) | 0]
      const size = rnd(110, 190)
      const edge = (Math.random() * 4) | 0 // 0 top,1 right,2 bottom,3 left
      const m = size
      let x, y
      if (edge === 0) { x = rnd(0, W); y = -m }
      else if (edge === 1) { x = W + m; y = rnd(0, H) }
      else if (edge === 2) { x = rnd(0, W); y = H + m }
      else { x = -m; y = rnd(0, H) }
      // velocity roughly toward the opposite side + drift, px/s
      const sp = rnd(14, 34)
      const tx = rnd(W * 0.2, W * 0.8), ty = rnd(H * 0.2, H * 0.8)
      const a = Math.atan2(ty - y, tx - x) + rnd(-0.4, 0.4)
      return { type, size, x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, rot: rnd(-0.3, 0.3), vr: rnd(-0.05, 0.05) }
    }
    let shapes = Array.from({ length: MAX }, spawn)

    let last = performance.now(), raf = 0, hidden = false
    const onVis = () => { hidden = document.hidden; if (!hidden) { last = performance.now(); raf = requestAnimationFrame(loop) } }
    document.addEventListener('visibilitychange', onVis)

    const loop = (now) => {
      if (hidden) return
      const dt = Math.min(0.05, (now - last) / 1000); last = now

      shapes.forEach((s, i) => {
        s.x += s.vx * dt; s.y += s.vy * dt; s.rot += s.vr * dt
        const off = s.size + GAP * 2
        if (s.x < -off || s.x > W + off || s.y < -off || s.y > H + off) shapes[i] = spawn()
      })

      ctx.clearRect(0, 0, W, H)
      for (const d of dots) {
        let inten = 0
        for (const s of shapes) {
          let dx = d.x - s.x, dy = d.y - s.y
          if (Math.abs(dx) > s.size || Math.abs(dy) > s.size) continue
          if (s.rot) { const c = Math.cos(-s.rot), sn = Math.sin(-s.rot); const nx = dx * c - dy * sn, ny = dx * sn + dy * c; dx = nx; dy = ny }
          const od = outlineDist(s.type, dx, dy, s.size)
          if (od < BAND) inten = Math.max(inten, 1 - od / BAND)
        }
        if (inten > 0.04) {
          ctx.fillStyle = `rgba(230,25,25,${(0.18 + inten * 0.82).toFixed(3)})`
          ctx.beginPath(); ctx.arc(d.x, d.y, R + inten * 1.6, 0, 7); ctx.fill()
        } else {
          ctx.fillStyle = 'rgba(10,10,10,0.05)'
          ctx.beginPath(); ctx.arc(d.x, d.y, R, 0, 7); ctx.fill()
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => { cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', onVis); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0 }} />
}
