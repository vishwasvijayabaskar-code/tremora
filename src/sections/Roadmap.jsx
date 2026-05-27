import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PerspectiveTilt from '../components/PerspectiveTilt'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: 'Neurologist Dashboard',
    description: 'Weeks of tremor data, medication response analytics, and auto-generated clinical summaries in one interface.',
    status: 'In Development',
    statusColor: 'var(--coral)',
    bg: 'var(--lavender-light)',
  },
  {
    title: 'Clinical Validation',
    description: 'Pilot study with neurology partners to validate UPDRS proxy accuracy against clinical assessment.',
    status: 'Planned',
    statusColor: 'var(--peach)',
    bg: 'var(--peach-light)',
  },
  {
    title: 'Partner Platform',
    description: 'API and integration layer for neurology practices, enabling Medicare RPM billing (CPT 99453/99454).',
    status: 'In Development',
    statusColor: 'var(--coral)',
    bg: 'var(--cream-light)',
  },
  {
    title: 'Med Response Analytics',
    description: 'Before-vs-after scoring for every dose, revealing which medications are actually working.',
    status: 'In Development',
    statusColor: 'var(--coral)',
    bg: 'var(--lavender-light)',
  },
  {
    title: 'Pilot Program',
    description: 'Early access for neurology practices and Parkinson\'s patients. Limited spots available.',
    status: 'Coming Soon',
    statusColor: '#22c55e',
    bg: 'var(--coral-light)',
  },
]

function RoadmapCard({ card, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <PerspectiveTilt maxRotateX={5} maxRotateY={10} smoothing={0.08}>
    <div
      data-cursor-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: card.bg,
        borderRadius: 'var(--radius-xl)',
        padding: '44px',
        width: '380px',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
      }}>
        <h3 style={{
          fontSize: '1.4rem',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          lineHeight: 1.15,
          maxWidth: '220px',
        }}>
          {card.title}
        </h3>
        <span style={{
          fontSize: '0.6rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '5px 14px',
          borderRadius: 'var(--radius-pill)',
          background: 'rgba(26,26,26,0.06)',
          color: 'var(--text-secondary)',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: card.statusColor,
            display: 'inline-block',
          }} />
          {card.status}
        </span>
      </div>

      <p style={{
        fontSize: '0.88rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.65,
        marginBottom: '32px',
      }}>
        {card.description}
      </p>

      <div style={{
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-display)',
        letterSpacing: '0.1em',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
    </PerspectiveTilt>
  )
}

export default function Roadmap() {
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
          start: 'top 20%',
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
      id="roadmap"
      ref={sectionRef}
      style={{
        background: 'var(--cream)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ paddingTop: 'var(--section-pad)' }}>
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--text-muted)',
            fontWeight: 500,
            marginBottom: '20px',
            display: 'block',
          }}>
            What's Next
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            <span>Building</span>{' '}
            <span style={{ color: 'var(--text-muted)' }}>in public.</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            margin: '20px auto 0',
            lineHeight: 1.7,
          }}>
            Tremora is early-stage clinical technology. Here's what we're working on next.
          </p>
        </div>
      </div>

      <div ref={wrapperRef} style={{ paddingBottom: 'var(--section-pad)' }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '24px',
            paddingLeft: 'max(24px, calc((100vw - 1200px) / 2))',
            paddingRight: '48px',
            width: 'max-content',
          }}
        >
          {cards.map((card, i) => (
            <RoadmapCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
