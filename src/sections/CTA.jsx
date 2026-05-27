import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef()
  const headingRef = useRef()
  const formRef = useRef()
  const footerRef = useRef()
  const gridRef = useRef()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(formRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })

      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      }

      gsap.from(footerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="waitlist"
      ref={sectionRef}
      style={{
        padding: 'var(--section-pad) 0',
        background: 'var(--dark)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial gradient accent */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120%',
        height: '600px',
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(251,79,98,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div ref={headingRef}>
            <span style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: 'rgba(255,234,204,0.4)',
              fontWeight: 500,
              marginBottom: '24px',
              display: 'block',
            }}>
              Early Access
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              textTransform: 'uppercase',
              fontWeight: 900,
              background: 'linear-gradient(180deg, var(--cream) 0%, rgba(255,234,204,0.5) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '28px',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}>
              Get Tremora<br />before GA.
            </h2>
            <p style={{
              color: 'rgba(255,234,204,0.5)',
              fontSize: '1.05rem',
              marginBottom: '56px',
              lineHeight: 1.7,
              maxWidth: '520px',
              margin: '0 auto 56px',
            }}>
              Join our waitlist for early access. We're looking for pilot participants,
              neurology partners, and anyone who believes tremor data should be continuous.
            </p>
          </div>

          <div ref={formRef}>
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  gap: '12px',
                  maxWidth: '500px',
                  margin: '0 auto 64px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{
                    flex: 1,
                    minWidth: '260px',
                    padding: '18px 28px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid rgba(255,234,204,0.12)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'var(--cream)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '18px 36px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--cream)',
                    color: 'var(--dark)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: 'none',
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    letterSpacing: '0.02em',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.03)'
                    e.target.style.boxShadow = '0 8px 32px rgba(255,234,204,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  Join Waitlist
                </button>
              </form>
            ) : (
              <div style={{
                background: 'rgba(255,234,204,0.06)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                marginBottom: '64px',
                maxWidth: '500px',
                margin: '0 auto 64px',
                border: '1px solid rgba(255,234,204,0.08)',
              }}>
                <p style={{ color: 'var(--cream)', fontWeight: 600, fontSize: '1.1rem' }}>
                  You're on the list.
                </p>
                <p style={{ color: 'rgba(255,234,204,0.5)', fontSize: '0.85rem', marginTop: '8px' }}>
                  We'll reach out when early access opens.
                </p>
              </div>
            )}
          </div>

          {/* Trust signals */}
          <div ref={gridRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'rgba(255,234,204,0.06)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            maxWidth: '600px',
            margin: '0 auto 100px',
          }}>
            {[
              { value: '200Hz', label: 'Continuous sampling' },
              { value: '86.4%', label: 'Classifier accuracy' },
              { value: '<50ms', label: 'On-device inference' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'var(--dark-surface)',
                padding: '28px 20px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  color: 'var(--cream)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}>
                  {item.value}
                </div>
                <div style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,234,204,0.4)',
                  marginTop: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div ref={footerRef} style={{
            paddingTop: '48px',
            borderTop: '1px solid rgba(255,234,204,0.06)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  textTransform: 'uppercase',
                  color: 'rgba(255,234,204,0.2)',
                  letterSpacing: '-0.01em',
                }}>
                  Tremora
                </div>
              </div>
              <div style={{ display: 'flex', gap: '32px' }}>
                <a href="mailto:contact@tremora.com" style={{
                  color: 'rgba(255,234,204,0.35)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                }}>
                  Partner Inquiry
                </a>
                <a href="mailto:demo@tremora.com" style={{
                  color: 'rgba(255,234,204,0.35)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                }}>
                  Request Demo
                </a>
              </div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '32px',
              flexWrap: 'wrap',
              gap: '12px',
            }}>
              <p style={{
                color: 'rgba(255,234,204,0.2)',
                fontSize: '0.7rem',
                lineHeight: 1.6,
                maxWidth: '400px',
              }}>
                TremoTrack is early-stage clinical technology. Not FDA-cleared. Not a diagnostic device.
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.15)',
                fontSize: '0.65rem',
              }}>
                © 2026 Tremora
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
