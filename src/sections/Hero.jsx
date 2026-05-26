import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../components/Button'
import ChromeObjects from '../components/ChromeObjects'

gsap.registerPlugin(ScrollTrigger)

const heroObjects = [
  { type: 'pill', position: [-3.2, 1.5, -0.3], scale: 0.5, speed: 0.6 },
  { type: 'torus', position: [3.5, -1.2, -0.2], scale: 0.55, speed: 0.4 },
  { type: 'pulse', position: [-2.8, -1.8, -0.5], scale: 0.4, speed: 0.5 },
  { type: 'brain', position: [3.2, 1.8, -0.4], scale: 0.4, speed: 0.35 },
]

const subtitleWords = 'A wrist-worn sensor that tracks Parkinson\'s tremor severity 24/7, scores it with a trained classifier, and shows neurologists what happens between visits.'.split(' ')

export default function Hero() {
  const sectionRef = useRef()
  const titleWrapRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()
  const contentRef = useRef()
  const tagRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from('.hero-line', {
        yPercent: 110,
        rotateX: -80,
        opacity: 0,
        duration: 1.4,
        stagger: 0.12,
      })
      .from(tagRef.current, {
        width: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.6')
      .from('.hero-word', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.03,
      }, '-=0.4')
      .from(ctaRef.current.children, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
      }, '-=0.3')

      gsap.to(contentRef.current, {
        scale: 0.85,
        opacity: 0,
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '80% top',
          scrub: 1.5,
        },
      })

      gsap.to(sectionRef.current, {
        '--gradient-pos': '100%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'var(--cream)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(249,150,103,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <ChromeObjects objects={heroObjects} />

      <div ref={contentRef} style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        maxWidth: '1100px',
        padding: '0 24px',
        willChange: 'transform, opacity',
      }}>
        <div ref={titleWrapRef} style={{
          marginBottom: '28px',
          overflow: 'hidden',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5.5rem, 16vw, 14rem)',
            fontWeight: 400,
            color: 'var(--text-primary)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            perspective: '800px',
          }}>
            <div style={{ overflow: 'hidden', paddingBottom: '8px' }}>
              <div className="hero-line" style={{
                display: 'block',
                transformOrigin: 'bottom center',
                willChange: 'transform',
              }}>
                Tremora
              </div>
            </div>
          </div>
        </div>

        <div
          ref={tagRef}
          style={{
            width: '80px',
            height: '3px',
            background: 'var(--coral)',
            margin: '0 auto 28px',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        />

        <p ref={subtitleRef} style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
          color: 'var(--text-secondary)',
          fontWeight: 400,
          lineHeight: 1.7,
          maxWidth: '540px',
          margin: '0 auto 36px',
        }}>
          {subtitleWords.map((word, i) => (
            <span
              key={i}
              className="hero-word"
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              {word}
            </span>
          ))}
        </p>

        <div ref={ctaRef} style={{
          display: 'flex',
          gap: '14px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <Button variant="primary" href="#how-it-works">
            See How It Works
          </Button>
          <Button variant="secondary" href="#waitlist">
            Join Waitlist
          </Button>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          fontWeight: 500,
        }}>
          Scroll
        </span>
        <div style={{
          width: '1px',
          height: '32px',
          background: 'var(--text-muted)',
          opacity: 0.3,
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { transform: scaleY(1); opacity: 0.3; }
            50% { transform: scaleY(0.5); opacity: 0.6; }
          }
        `}</style>
      </div>
    </section>
  )
}
