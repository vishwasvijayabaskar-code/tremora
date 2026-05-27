import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../components/Button'
import ChromeObjects from '../components/ChromeObjects'

gsap.registerPlugin(ScrollTrigger)

const heroObjects = [
  { type: 'pill', position: [-5, 2.8, 0.5], scale: 0.6, speed: 0.5 },
  { type: 'torus', position: [5.2, -2, 0.3], scale: 0.65, speed: 0.35 },
  { type: 'pulse', position: [-4.2, -2.8, 0.2], scale: 0.5, speed: 0.45 },
  { type: 'brain', position: [4.5, 3, 0.4], scale: 0.5, speed: 0.3 },
  { type: 'pill', position: [2, 3.8, -0.3], scale: 0.35, speed: 0.6 },
  { type: 'torus', position: [-2.2, -3.8, 0.1], scale: 0.4, speed: 0.4 },
  { type: 'pulse', position: [-1, 3.2, 0.6], scale: 0.3, speed: 0.55 },
  { type: 'brain', position: [1.5, -3.5, 0.2], scale: 0.3, speed: 0.5 },
]

const chromeTextStyle = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 800,
  fontStyle: 'italic',
  fontSize: 'clamp(5rem, 15vw, 14rem)',
  lineHeight: 0.85,
  letterSpacing: '-0.03em',
  textTransform: 'none',
  background: 'linear-gradient(180deg, #f0f0f0 0%, #c8c8c8 15%, #e8e8e8 30%, #a0a0a0 50%, #d0d0d0 65%, #b0b0b0 80%, #e0e0e0 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  filter: 'drop-shadow(0 1px 0px rgba(255,255,255,0.4)) drop-shadow(0 -1px 0px rgba(0,0,0,0.15)) drop-shadow(0 4px 8px rgba(0,0,0,0.08))',
  textShadow: 'none',
  position: 'relative',
}

export default function Hero() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const contentRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()
  const badgeRef = useRef()
  const navLinksRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        delay: 0.3,
      })

      // Title letters stagger with 3D flip
      tl.from('.hero-chrome-letter', {
        yPercent: 140,
        rotateX: -90,
        opacity: 0,
        duration: 1.6,
        stagger: 0.06,
        ease: 'power4.out',
      })
      .from('.hero-nav-link', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
      }, '-=0.6')
      .from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
      }, '-=0.4')
      .fromTo(ctaRef.current?.children || [], {
        y: 30,
        autoAlpha: 0,
        scale: 0.95,
      }, {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
      }, '-=0.5')
      .from(badgeRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(2)',
      }, '-=0.3')

      // Scroll-linked parallax
      gsap.to(titleRef.current, {
        y: -150,
        scale: 0.85,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '80% top',
          scrub: 1.5,
        },
      })

      gsap.to(contentRef.current, {
        y: -60,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '30% top',
          end: '80% top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const titleLetters = 'tremora'.split('')

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'var(--cream)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '0 24px',
    }}>
      {/* Subtle gradient overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(249,150,103,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: 'linear-gradient(to bottom, rgba(255,234,204,0.6) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <ChromeObjects objects={heroObjects} />

      {/* Chrome Title — Per-letter animation */}
      <div ref={titleRef} style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        willChange: 'transform',
        marginBottom: '40px',
      }}>
        <div style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}>
          <div style={{ overflow: 'hidden', paddingBottom: '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              gap: '0',
            }}>
              {titleLetters.map((letter, i) => (
                <span
                  key={i}
                  className="hero-chrome-letter"
                  style={{
                    ...chromeTextStyle,
                    transformOrigin: 'bottom center',
                    display: 'inline-block',
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline under title */}
        <div style={{
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.35em',
          color: 'var(--text-muted)',
          fontWeight: 500,
          marginTop: '8px',
        }}>
          Continuous tremor intelligence
        </div>
      </div>

      {/* Nav links under title */}
      <div ref={navLinksRef} style={{
        display: 'flex',
        gap: '40px',
        justifyContent: 'center',
        marginBottom: '80px',
        position: 'relative',
        zIndex: 4,
      }}>
        {[
          { label: 'How it works', href: '#how-it-works' },
          { label: 'Technology', href: '#features' },
          { label: 'Device', href: '#device' },
          { label: 'Team', href: '#team' },
        ].map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="hero-nav-link"
            data-cursor-text="View"
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              transition: 'color 0.3s ease',
              position: 'relative',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Subtitle + CTA */}
      <div ref={contentRef} style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        maxWidth: '700px',
        willChange: 'transform, opacity',
      }}>
        <p ref={subtitleRef} style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
          color: 'var(--text-primary)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1.3,
          marginBottom: '32px',
        }}>
          If your neurologist can't see
          between visits, they're treating
          a snapshot — not a patient.
        </p>

        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '480px',
          margin: '0 auto 44px',
        }}>
          A wrist-worn sensor that tracks Parkinson's tremor severity 24/7,
          scores it with a trained classifier, and shows neurologists what
          happens between visits.
        </p>

        <div ref={ctaRef} style={{
          display: 'flex',
          gap: '14px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '40px',
        }}>
          <Button variant="primary" href="#how-it-works">
            See How It Works
          </Button>
          <Button variant="secondary" href="#waitlist">
            Join Waitlist
          </Button>
        </div>

        {/* Social proof badge */}
        <div ref={badgeRef} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 20px',
          borderRadius: 'var(--radius-pill)',
          background: 'rgba(26,26,26,0.04)',
          border: '1px solid rgba(26,26,26,0.06)',
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 6px rgba(34,197,94,0.4)',
            animation: 'pulse-green 2s ease-in-out infinite',
          }} />
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            fontWeight: 500,
          }}>
            Presenting at Atlanta Startup Village — July 27, 2026
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
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
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.3; }
          50% { transform: scaleY(0.5); opacity: 0.6; }
        }
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 6px rgba(34,197,94,0.4); }
          50% { box-shadow: 0 0 12px rgba(34,197,94,0.6); }
        }
      `}</style>
    </section>
  )
}
