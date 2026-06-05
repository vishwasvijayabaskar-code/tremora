import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../components/Button'
import { Perspective, Highlight } from '../components/PerspectiveHighlight'
import { useCountUp } from '../hooks/useCountUp'
gsap.registerPlugin(ScrollTrigger)

const WORDMARK = 'Tremora'

function CountStat({ display }) { const { ref, value } = useCountUp(display); return <span ref={ref}>{value}</span> }

export default function Hero() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const contentRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()
  const badgeRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.3 })
      tl.from('.hero-chrome-letter', { yPercent: 140, rotateX: -90, opacity: 0, duration: 1.6, stagger: 0.06, ease: 'power4.out' })
        .from('.hero-nav-link', { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.6')
        .from(subtitleRef.current, { y: 40, opacity: 0, duration: 1 }, '-=0.4')
        .fromTo(ctaRef.current?.children || [], { y: 30, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.1 }, '-=0.5')
        .from(badgeRef.current, { scale: 0.8, opacity: 0, duration: 0.6, ease: 'back.out(2)' }, '-=0.3')

      gsap.to(titleRef.current, {
        y: -150, scale: 0.85,
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '80% top', scrub: 1.5 },
      })
      gsap.to(contentRef.current, {
        y: -60, opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: '30% top', end: '80% top', scrub: 1.5 },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="top" style={{
      position: 'relative', minHeight: '100dvh', background: 'var(--paper)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: '0 24px',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 120%, var(--hazard) 0%, transparent 70%)', opacity: 0.06, pointerEvents: 'none', zIndex: 1 }} />

      {/* Blueprint depth grid — static dot-matrix + hairlines, edge-faded (no rAF) */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage:
          'radial-gradient(var(--grid-dot) 1.1px, transparent 1.5px), linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
        backgroundSize: '44px 44px, 44px 44px, 44px 44px',
        backgroundPosition: 'center',
        maskImage: 'radial-gradient(115% 90% at 50% 42%, #000 30%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(115% 90% at 50% 42%, #000 30%, transparent 78%)',
      }} />

      {/* Wordmark */}
      <div ref={titleRef} style={{ position: 'relative', zIndex: 3, textAlign: 'center', willChange: 'transform', marginTop: 'clamp(56px, calc(8vh + 20px), 130px)', marginBottom: '40px' }}>
        <div style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
          <div style={{ overflow: 'hidden', paddingBottom: '16px' }}>
            <h1 aria-label="Tremora" style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 0, margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--ink)', lineHeight: 0.82, letterSpacing: '-0.045em', fontSize: 'clamp(4.2rem, 17vw, 15rem)', textTransform: 'none' }}>
              {WORDMARK.split('').map((ch, i) => (
                <span key={i} className="hero-chrome-letter" style={{ display: 'inline-block', transformOrigin: 'bottom center', willChange: 'transform' }}>
                  <span style={{ display: 'inline-block', animation: `heroFloat ${(3.6 + i * 0.25).toFixed(2)}s ease-in-out ${(i * 0.18).toFixed(2)}s infinite` }}>{ch}</span>
                </span>
              ))}
            </h1>
          </div>
        </div>
        <div className="mono-label" style={{ letterSpacing: '0.35em', marginTop: '8px' }}>[ CONTINUOUS TREMOR INTELLIGENCE ]</div>
      </div>

      {/* Subtitle + proof + CTA */}
      <div ref={contentRef} style={{ position: 'relative', zIndex: 3, textAlign: 'center', maxWidth: '720px', willChange: 'transform, opacity' }}>
        <Perspective entrance={false} maxRotateX={9} maxRotateY={16} smoothing={0.12} style={{ marginBottom: '28px' }}>
          <p ref={subtitleRef} style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.3rem, 3vw, 2.3rem)', color: 'var(--ink)',
            fontWeight: 600, lineHeight: 1.3, margin: 0, textTransform: 'none', letterSpacing: '-0.01em',
          }}>
            If your neurologist can't see <Highlight color="coral">between visits</Highlight>, they're treating a <Highlight color="ink">snapshot</Highlight>, not a patient.
          </p>
        </Perspective>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '500px', margin: '0 auto 28px', textTransform: 'none' }}>
          A wrist-worn sensor that tracks Parkinson's tremor severity 24/7, scores it with a trained classifier, and shows neurologists what happens between visits.
        </p>

        {/* proof telemetry strip */}
        <div style={{ display: 'flex', justifyContent: 'center', border: '1px solid var(--line-strong)', maxWidth: 520, margin: '0 auto 32px' }}>
          {[{ v: '200Hz', l: 'CONTINUOUS SAMPLING' }, { v: '86.4%', l: 'CLASSIFIER ACCURACY' }, { v: '<50ms', l: 'ON-DEVICE INFERENCE' }].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: '12px 10px', borderRight: i < 2 ? '1px solid var(--line-strong)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', lineHeight: 1 }}><CountStat display={s.v} /></div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.08em', color: 'var(--text-muted)', marginTop: 5 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          <Button variant="primary" href="#waitlist">Join Waitlist</Button>
          <Button variant="secondary" href="#how-it-works">See How It Works</Button>
        </div>

        <div ref={badgeRef} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '9px 16px', border: '1px solid var(--line-strong)' }}>
          <span style={{ width: '7px', height: '7px', background: 'var(--hazard)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>PRESENTING AT ATLANTA STARTUP VILLAGE / JUL 27 2026</span>
        </div>
      </div>

      <style>{`
        @keyframes heroFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
        @media (prefers-reduced-motion: reduce){ .hero-chrome-letter img { animation: none !important } }
      `}</style>
    </section>
  )
}
