import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Capture',
    description: 'A wrist-worn sensor samples tremor movement at 200Hz continuously throughout the day.',
    techTags: ['MPU-6050 IMU', '6-axis sensing', '200Hz sampling'],
    visual: 'waveform',
  },
  {
    number: '02',
    title: 'Score',
    description: 'On-device signal processing with FFT analysis and a trained classifier scores tremor severity in real time.',
    techTags: ['FFT analysis', 'Random Forest', 'UPDRS proxy', 'Med logging'],
    visual: 'processing',
  },
  {
    number: '03',
    title: 'Reveal',
    description: 'A neurologist dashboard surfaces weeks of patterns, showing how tremor responds to each medication dose.',
    techTags: ['Medication response', 'Severity timeline', 'Clinical summary'],
    visual: 'dashboard',
  },
]

const barKeyframes = `
@keyframes fftBar {
  0%, 100% { height: 20%; }
  50% { height: var(--bar-max); }
}
`

function StepVisual({ type }) {
  return (
    <div style={{
      width: '100%',
      height: '200px',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,234,204,0.06)',
    }}>
      {type === 'waveform' && (
        <svg viewBox="0 0 200 60" style={{ width: '80%', height: '50%' }}>
          <path
            d="M0,30 Q10,10 20,30 T40,30 T60,30 Q70,5 80,30 T100,30 T120,30 Q130,8 140,30 T160,30 T180,30 T200,30"
            fill="none"
            stroke="var(--coral)"
            strokeWidth="2"
          >
            <animate attributeName="d"
              values="M0,30 Q10,10 20,30 T40,30 T60,30 Q70,5 80,30 T100,30 T120,30 Q130,8 140,30 T160,30 T180,30 T200,30;M0,30 Q10,20 20,30 T40,30 T60,30 Q70,15 80,30 T100,30 T120,30 Q130,18 140,30 T160,30 T180,30 T200,30;M0,30 Q10,10 20,30 T40,30 T60,30 Q70,5 80,30 T100,30 T120,30 Q130,8 140,30 T160,30 T180,30 T200,30"
              dur="3s" repeatCount="indefinite" />
          </path>
        </svg>
      )}
      {type === 'processing' && (
        <>
          <style>{barKeyframes}</style>
          <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '60%' }}>
            {Array.from({ length: 24 }).map((_, i) => {
              const maxH = 40 + Math.sin(i * 0.8) * 35 + Math.random() * 25
              return (
                <div
                  key={i}
                  style={{
                    width: '5px',
                    height: '20%',
                    background: `linear-gradient(to top, var(--coral), var(--peach))`,
                    borderRadius: '2px',
                    '--bar-max': `${maxH}%`,
                    animation: `fftBar ${1.2 + Math.random() * 0.8}s ease-in-out ${i * 0.05}s infinite`,
                  }}
                />
              )
            })}
          </div>
        </>
      )}
      {type === 'dashboard' && (
        <div style={{ padding: '20px', width: '100%' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
            {['UPDRS: 2.3', 'Peak: 5.2Hz', 'Tremor: 34%'].map((label, i) => (
              <div key={i} style={{
                background: 'rgba(255,234,204,0.06)',
                borderRadius: '6px',
                padding: '5px 10px',
                fontSize: '0.6rem',
                fontWeight: 600,
                color: 'var(--cream)',
              }}>
                {label}
              </div>
            ))}
          </div>
          <div style={{
            height: '80px',
            background: 'rgba(255,234,204,0.04)',
            borderRadius: '10px',
            padding: '14px',
          }}>
            <svg viewBox="0 0 300 50" style={{ width: '100%', height: '100%' }}>
              <path d="M0,40 L30,35 L60,25 L90,30 L120,15 L150,20 L180,10 L210,18 L240,12 L270,8 L300,15" fill="none" stroke="var(--coral)" strokeWidth="2" />
              <line x1="120" y1="0" x2="120" y2="50" stroke="var(--peach)" strokeWidth="1" strokeDasharray="3,3" />
              <text x="122" y="48" fill="var(--peach)" fontSize="6">Med taken</text>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

export default function HowItWorks() {
  const sectionRef = useRef()
  const headerRef = useRef()
  const stepsRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      const cards = stepsRef.current.children
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      Array.from(cards).forEach((card) => {
        gsap.to(card, {
          y: -15,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      style={{
        padding: 'var(--section-pad) 0',
        background: 'var(--dark)',
      }}
    >
      <div className="container">
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(255,234,204,0.4)',
            fontWeight: 500,
            marginBottom: '20px',
            display: 'block',
          }}>
            How It Works
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--cream)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            From wrist to neurologist<br />in three steps.
          </h2>
        </div>

        <div ref={stepsRef} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                background: i % 2 === 0 ? 'var(--dark-surface)' : 'var(--dark-elevated)',
                borderRadius: 'var(--radius-xl)',
                padding: '44px',
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                gap: '40px',
                alignItems: 'center',
                border: '1px solid rgba(255,234,204,0.04)',
              }}
            >
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '4rem',
                  fontWeight: 800,
                  color: 'var(--coral)',
                  opacity: 0.2,
                  lineHeight: 1,
                  marginBottom: '0',
                }}>
                  {step.number}
                </div>
                <h3 style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  color: 'var(--cream)',
                  marginBottom: '14px',
                  marginTop: '-6px',
                  letterSpacing: '-0.02em',
                  fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: 'rgba(255,234,204,0.55)',
                  fontSize: '0.9rem',
                  marginBottom: '20px',
                  maxWidth: '400px',
                  lineHeight: 1.7,
                }}>
                  {step.description}
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {step.techTags.map((tag, j) => (
                    <span key={j} style={{
                      fontSize: '0.65rem',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'rgba(255,234,204,0.06)',
                      color: 'rgba(255,234,204,0.6)',
                      fontWeight: 500,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <StepVisual type={step.visual} />
              </div>
            </div>
          ))}
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '0.7rem',
          color: 'rgba(255,234,204,0.25)',
          marginTop: '40px',
          fontStyle: 'italic',
        }}>
          All severity scores are algorithmic proxies intended to support, not replace, clinical judgment.
        </p>
      </div>
    </section>
  )
}
