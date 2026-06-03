import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../components/Button'
import { useCountUp } from '../hooks/useCountUp'

gsap.registerPlugin(ScrollTrigger)

const WORD = 'TREMORA'.split('')
const proof = [
  { v: '200Hz', l: 'CONTINUOUS SAMPLING' },
  { v: '86.4%', l: 'CLASSIFIER ACCURACY' },
  { v: '<50ms', l: 'ON-DEVICE INFERENCE' },
]

function Stat({ display }) { const { ref, value } = useCountUp(display); return <span ref={ref}>{value}</span> }

export default function Hero() {
  const sectionRef = useRef()
  const titleRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 })
      tl.from('.tm-hero-letter', { yPercent: 115, duration: 1.1, stagger: 0.05 })
        .from('.tm-hero-fade', { y: 24, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.5')

      gsap.to(titleRef.current, {
        yPercent: -18,
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="top" style={{
      position: 'relative', minHeight: '100dvh',
      background: 'var(--paper)', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', overflow: 'hidden',
      paddingTop: 'clamp(96px, 14vh, 160px)',
    }}>
      {/* top telemetry band */}
      <div className="container tm-hero-fade" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span className="mono-label">[ CONTINUOUS TREMOR INTELLIGENCE ]</span>
        <span className="mono-label">UNIT / TREMORA-V1 &nbsp;&nbsp; REV 1.0 &nbsp;&nbsp; 35.96&deg;N</span>
      </div>

      {/* massive wordmark */}
      <div className="container" style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center' }}>
        <div ref={titleRef} style={{ width: '100%' }}>
          <div aria-label="Tremora" style={{ display: 'flex', overflow: 'hidden', lineHeight: 0.8 }}>
            {WORD.map((ch, i) => (
              <span key={i} className="tm-hero-letter" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 19vw, 18rem)',
                letterSpacing: '-0.05em', color: 'var(--ink)', display: 'inline-block',
              }}>{ch}</span>
            ))}
            <span className="tm-hero-letter" style={{ color: 'var(--hazard)', fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 19vw, 18rem)', lineHeight: 0.8 }}>.</span>
          </div>
        </div>
      </div>

      {/* bottom block: rule, value prop, proof, CTAs */}
      <div className="container" style={{ paddingBottom: 40 }}>
        <div className="tm-hero-fade" style={{ height: 2, background: 'var(--ink)', marginBottom: 28 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)', gap: 40, alignItems: 'end' }} className="grid-responsive">
          <p className="tm-hero-fade" style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)',
            lineHeight: 1.45, color: 'var(--ink)', textTransform: 'none', maxWidth: 560, fontWeight: 500,
          }}>
            A wrist-worn sensor that tracks Parkinson's tremor severity 24/7, scores it with a trained classifier, and shows neurologists what happens <span style={{ color: 'var(--hazard)' }}>between visits</span>.
          </p>

          <div className="tm-hero-fade" style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
            {/* proof telemetry strip */}
            <div style={{ display: 'flex', width: '100%', border: '1px solid var(--line-strong)' }}>
              {proof.map((p, i) => (
                <div key={i} style={{ flex: 1, padding: '12px 14px', borderRight: i < 2 ? '1px solid var(--line-strong)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--ink)', lineHeight: 1 }}><Stat display={p.v} /></div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.08em', color: 'var(--text-muted)', marginTop: 6 }}>{p.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button variant="primary" href="#waitlist">Join Waitlist</Button>
              <Button variant="secondary" href="#how-it-works">See How It Works</Button>
            </div>
          </div>
        </div>
      </div>

      {/* scroll reticle — on-brand, replaces generic line */}
      <div className="tm-hero-fade" aria-hidden="true" style={{
        position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--text-muted)' }}>SCROLL</span>
        <svg width="22" height="22" viewBox="0 0 22 22" className="tm-scroll-reticle">
          <g fill="none" stroke="var(--hazard)" strokeWidth="1.5">
            <path d="M3,7 V3 H7 M19,7 V3 H15 M3,15 V19 H7 M19,15 V19 H15" />
          </g>
          <circle cx="11" cy="11" r="1.6" fill="var(--hazard)" />
          <path d="M11,9 V13 M9.5,11.5 L11,13 L12.5,11.5" stroke="var(--ink)" strokeWidth="1.2" fill="none" />
        </svg>
      </div>

      <style>{`
        @keyframes scrollBob { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(4px) } }
        .tm-scroll-reticle{ animation: scrollBob 1.8s var(--ease) infinite; }
        @media (prefers-reduced-motion: reduce){ .tm-scroll-reticle{ animation: none } }
      `}</style>
    </section>
  )
}
