import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * BendScroll — scroll-driven convex "bend toward you". Whatever section sits at
 * the vertical center of the viewport is at full scale (closest); sections
 * toward the top/bottom edges recede slightly. Reads as a gentle cylindrical
 * bend as you scroll, following the curve.
 *
 * Transform-only (GPU-safe). Excludes the Hero (#top, own parallax) and the
 * pinned Features (#features) — scaling a pinned section's ancestor would break
 * its position:fixed pin. Honors reduced-motion.
 */
export default function BendScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const DEPTH = 0.045 // how far edges recede (1 - DEPTH)
    const sections = gsap.utils.toArray('section[id]')
      .filter((s) => s.id !== 'top' && s.id !== 'features')

    const triggers = sections.map((sec) => {
      gsap.set(sec, { transformOrigin: 'center center', willChange: 'transform' })
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 0.5, invalidateOnRefresh: true },
      })
      tl.fromTo(sec, { scale: 1 - DEPTH }, { scale: 1, ease: 'none' })
        .to(sec, { scale: 1 - DEPTH, ease: 'none' })
      return tl.scrollTrigger
    })

    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => { clearTimeout(t); triggers.forEach((tr) => tr && tr.kill()) }
  }, [])

  return null
}
