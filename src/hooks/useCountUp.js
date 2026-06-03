import { useEffect, useRef, useState } from 'react'

/**
 * useCountUp — animates a number from 0 to target when the element scrolls
 * into view. Uses IntersectionObserver + rAF (no GSAP ScrollTrigger).
 *
 * Returns { ref, value } — attach ref to the element, render `value` (a string,
 * formatted). Pass the literal display string (e.g. "86.4%", "200", "1,187,093",
 * "<50") and it parses the numeric part, animates it, and re-applies prefix/suffix.
 */
export function useCountUp(display, { duration = 1600, decimals } = {}) {
  const ref = useRef(null)
  const [out, setOut] = useState(() => zeroLike(display, decimals))
  const done = useRef(false)

  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setOut(display); return }

    const el = ref.current
    if (!el) return

    const parsed = parse(display)
    if (parsed.num == null) { setOut(display); return }
    const dp = decimals != null ? decimals : parsed.decimals
    const hasComma = display.includes(',')

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || done.current) return
        done.current = true
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 4) // power4.out
          const cur = parsed.num * eased
          setOut(parsed.prefix + fmt(cur, dp, hasComma) + parsed.suffix)
          if (t < 1) requestAnimationFrame(tick)
          else setOut(display)
        }
        requestAnimationFrame(tick)
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [display, duration, decimals])

  return { ref, value: out }
}

function parse(s) {
  const m = String(s).match(/^(\D*?)([\d,]*\.?\d+)(.*)$/)
  if (!m) return { num: null }
  const prefix = m[1] || ''
  const raw = m[2].replace(/,/g, '')
  const suffix = m[3] || ''
  const num = parseFloat(raw)
  const decimals = raw.includes('.') ? raw.split('.')[1].length : 0
  return { num, prefix, suffix, decimals }
}

function fmt(n, dp, comma) {
  const fixed = n.toFixed(dp)
  if (!comma) return fixed
  const [int, dec] = fixed.split('.')
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return dec ? `${withCommas}.${dec}` : withCommas
}

function zeroLike(display, decimals) {
  const p = parse(display)
  if (p.num == null) return display
  const dp = decimals != null ? decimals : p.decimals
  return p.prefix + (0).toFixed(dp) + p.suffix
}
