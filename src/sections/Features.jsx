import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PerspectiveTilt from '../components/PerspectiveTilt'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: 'On-Device ML',
    stat: '<50ms',
    statLabel: 'inference time',
    description: 'Random Forest classifier runs entirely on ESP32. No cloud dependency, no latency, no data exposure. Tremor scored at the wrist.',
    detail: 'Trained on 2,400+ labeled tremor windows from clinical accelerometer datasets. Model compressed to fit 520KB SRAM.',
    tags: ['Edge AI', 'Privacy-first', 'Real-time'],
    bg: 'linear-gradient(135deg, var(--lavender-light) 0%, var(--lavender) 100%)',
  },
  {
    title: 'FFT Signal Analysis',
    stat: '4-6Hz',
    statLabel: 'tremor band',
    description: 'Fast Fourier Transform isolates Parkinsonian tremor frequency band from noise. Distinguishes rest tremor from voluntary movement.',
    detail: 'Sliding 256-sample Hamming window at 200Hz. Power spectral density extracted across 3-8Hz band with 0.78Hz resolution.',
    tags: ['Spectral analysis', 'Band isolation', 'Noise filtering'],
    bg: 'linear-gradient(135deg, var(--peach-light) 0%, var(--peach) 100%)',
  },
  {
    title: 'UPDRS Proxy Score',
    stat: '0-4',
    statLabel: 'severity scale',
    description: 'Maps sensor data to clinical UPDRS tremor subscale. Gives neurologists a familiar metric without in-person observation.',
    detail: 'Regression model maps RMS amplitude + dominant frequency + spectral entropy to UPDRS Item 3.15-3.18 equivalent scores.',
    tags: ['Clinical standard', 'Continuous scoring', 'Validated'],
    bg: 'linear-gradient(135deg, var(--cream-light) 0%, var(--cream) 100%)',
  },
  {
    title: 'Medication Logging',
    stat: '1-press',
    statLabel: 'dose capture',
    description: 'Physical button on device logs exact medication timing. Creates before/after tremor response curves for each dose.',
    detail: 'Timestamps stored with ±50ms precision. Dashboard overlays dose events on tremor severity timeline automatically.',
    tags: ['Dose tracking', 'Response curves', 'Adherence'],
    bg: 'linear-gradient(135deg, var(--coral-light) 0%, rgba(251,79,98,0.3) 100%)',
  },
  {
    title: 'Continuous Data',
    stat: '24/7',
    statLabel: 'monitoring',
    description: '200Hz sampling runs all day. SPIFFS storage logs raw CSV per session. Weeks of data visible between visits.',
    detail: '2000mAh LiPo provides ~18hr active recording. Auto-segmented into sleep/wake sessions for clinical relevance.',
    tags: ['Always-on', 'CSV export', 'Multi-week'],
    bg: 'linear-gradient(135deg, var(--lavender-light) 0%, var(--peach-light) 100%)',
  },
  {
    title: 'Neurologist Dashboard',
    stat: 'Live',
    statLabel: 'data sync',
    description: 'Web dashboard surfaces weeks of tremor patterns. Auto-generated severity reports ready for clinical review.',
    detail: 'BLE sync to companion app → cloud API → provider dashboard. HIPAA-aligned encryption at rest and in transit.',
    tags: ['Provider portal', 'Auto-reports', 'HIPAA-aligned'],
    bg: 'linear-gradient(135deg, var(--cream-light) 0%, var(--lavender-light) 100%)',
  },
]

function FeatureCard({ feature, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <PerspectiveTilt maxRotateX={6} maxRotateY={12} smoothing={0.08}>
      <div
        data-cursor-hover
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: feature.bg,
          borderRadius: 'var(--radius-xl)',
          padding: '48px 40px',
          width: '420px',
          minHeight: '440px',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          transition: 'box-shadow 0.4s ease',
          boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.12)' : '0 4px 20px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Big stat */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '4.5rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1,
            marginBottom: '4px',
            opacity: 0.9,
          }}>
            {feature.stat}
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '28px',
          }}>
            {feature.statLabel}
          </div>
        </div>

        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            marginBottom: '14px',
            lineHeight: 1.1,
          }}>
            {feature.title}
          </h3>

          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '10px',
          }}>
            {feature.description}
          </p>

          {/* Technical detail — shown more on hover */}
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '20px',
            maxHeight: hovered ? '80px' : '0',
            overflow: 'hidden',
            opacity: hovered ? 0.8 : 0,
            transition: 'max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease',
            fontStyle: 'italic',
          }}>
            {feature.detail}
          </p>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {feature.tags.map((tag, j) => (
              <span key={j} style={{
                fontSize: '0.6rem',
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(26,26,26,0.06)',
                color: 'var(--text-secondary)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card number */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          fontFamily: 'var(--font-display)',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          opacity: 0.5,
          letterSpacing: '0.1em',
        }}>
          FIG {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </PerspectiveTilt>
  )
}

export default function Features() {
  const sectionRef = useRef()
  const headerRef = useRef()
  const trackRef = useRef()
  const wrapperRef = useRef()

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

      const track = trackRef.current
      const totalScroll = track.scrollWidth - track.offsetWidth

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 15%',
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      style={{
        background: 'var(--cream)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ paddingTop: 'var(--section-pad)' }}>
        <div ref={headerRef} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '72px',
        }}>
          <div>
            <span style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--text-muted)',
              fontWeight: 500,
              marginBottom: '20px',
              display: 'block',
            }}>
              Technology
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>
              <span>Built different.</span><br />
              <span style={{ color: 'var(--text-muted)' }}>By design.</span>
            </h2>
          </div>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '360px',
            lineHeight: 1.7,
            fontSize: '0.9rem',
            textAlign: 'right',
          }}>
            Every technical decision optimized for one outcome:
            giving neurologists continuous tremor data they can act on.
          </p>
        </div>
      </div>

      <div ref={wrapperRef} style={{ paddingBottom: 'var(--section-pad)' }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '28px',
            paddingLeft: 'max(24px, calc((100vw - 1200px) / 2))',
            paddingRight: '48px',
            width: 'max-content',
          }}
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
