import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../components/Button'
import { Highlight } from '../components/PerspectiveHighlight'
import DashboardMock from '../components/DashboardMock'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hero (clinical-minimal) — asymmetric editorial split. Value-prop headline +
 * CTAs on the left, a real dashboard preview on the right. The wordmark lives
 * in the navbar, so the hero leads with the message, not the logo.
 */
export default function Hero() {
  const sectionRef = useRef()
  const headRef = useRef()
  const subRef = useRef()
  const ctaRef = useRef()
  const visualRef = useRef()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.25 })
      tl.from(headRef.current, { y: 34, opacity: 0, duration: 1 })
        .from(subRef.current, { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
        .fromTo(ctaRef.current?.children || [], { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 }, '-=0.5')
        .from(visualRef.current, { x: 36, opacity: 0, duration: 1.1, ease: 'power4.out' }, '-=0.9')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="top" style={{
      position: 'relative', minHeight: '100dvh', background: 'var(--paper)',
      display: 'flex', alignItems: 'center', overflow: 'hidden',
      padding: 'clamp(104px, 15vh, 156px) clamp(20px, 5vw, 56px) 64px',
    }}>
      {/* subtle accent glow + blueprint grid */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 78% 30%, var(--hazard) 0%, transparent 62%)', opacity: 0.05, pointerEvents: 'none', zIndex: 0 }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(var(--grid-dot) 1.1px, transparent 1.5px)',
        backgroundSize: '46px 46px',
        maskImage: 'radial-gradient(120% 100% at 20% 40%, #000 25%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(120% 100% at 20% 40%, #000 25%, transparent 75%)',
      }} />

      <div className="grid-responsive" style={{
        position: 'relative', zIndex: 2, width: '100%', maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.04fr 0.96fr', gap: 'clamp(36px, 5vw, 76px)', alignItems: 'center',
      }}>
        {/* LEFT — message */}
        <div>
          <h1 ref={headRef} style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ink)',
            fontSize: 'clamp(2.6rem, 5.4vw, 4.7rem)', lineHeight: 1.02, letterSpacing: '-0.035em',
            textTransform: 'none', margin: 0, maxWidth: '14ch',
          }}>
            Parkinson&apos;s, measured <Highlight color="coral">between the visits</Highlight>.
          </h1>

          <p ref={subRef} style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(1rem, 1.4vw, 1.18rem)', color: 'var(--text-secondary)',
            lineHeight: 1.6, textTransform: 'none', margin: '26px 0 0', maxWidth: '46ch',
          }}>
            A wrist sensor scores tremor severity 24/7 and shows neurologists exactly what happens between appointments.
          </p>

          <div ref={ctaRef} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 36 }}>
            <Button variant="primary" href="#waitlist">Join the waitlist</Button>
            <Button variant="secondary" href="#how-it-works">See how it works</Button>
          </div>
        </div>

        {/* RIGHT — real dashboard preview */}
        <div ref={visualRef} style={{ willChange: 'transform, opacity' }}>
          <DashboardMock />
        </div>
      </div>
    </section>
  )
}
