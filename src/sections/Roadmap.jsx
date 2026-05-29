import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PerspectiveTilt from '../components/PerspectiveTilt'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: 'Neurologist Dashboard',
    description: 'Weeks of tremor data, medication response analytics, and auto-generated clinical summaries in one interface.',
    detail: 'Severity heatmaps, dose-response overlays, exportable PDF visit reports.',
    quarter: 'Q3 2026',
    status: 'In Development',
    statusColor: 'var(--coral)',
    bg: 'var(--lavender-light)',
  },
  {
    title: 'Clinical Validation',
    description: 'Pilot study with neurology partners to validate UPDRS proxy accuracy against clinical assessment.',
    detail: 'Target: n=30 patients, Bland-Altman agreement vs. in-clinic UPDRS scoring.',
    quarter: 'Q4 2026',
    status: 'Planned',
    statusColor: 'var(--peach)',
    bg: 'var(--peach-light)',
  },
  {
    title: 'Partner Platform',
    description: 'API and integration layer for neurology practices, enabling Medicare RPM billing (CPT 99453/99454).',
    detail: 'Reimbursable remote monitoring — up to ~$120/patient/month recurring.',
    quarter: 'Q1 2027',
    status: 'In Development',
    statusColor: 'var(--coral)',
    bg: 'var(--cream-light)',
  },
  {
    title: 'Med Response Analytics',
    description: 'Before-vs-after scoring for every dose, revealing which medications are actually working.',
    detail: 'Auto-detects wearing-off periods and dyskinesia windows from tremor curves.',
    quarter: 'Q2 2027',
    status: 'In Development',
    statusColor: 'var(--coral)',
    bg: 'var(--lavender-light)',
  },
  {
    title: 'Pilot Program',
    description: 'Early access for neurology practices and Parkinson\'s patients. Limited spots available.',
    detail: 'First 50 devices shipping to design partners. Join the waitlist below.',
    quarter: 'Open now',
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
        marginBottom: '16px',
      }}>
        {card.description}
      </p>

      <p style={{
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
        fontStyle: 'italic',
        marginBottom: '24px',
        paddingTop: '16px',
        borderTop: '1px solid rgba(26,26,26,0.08)',
      }}>
        {card.detail}
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          {card.quarter}
        </span>
        <span style={{
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-display)',
          letterSpacing: '0.1em',
        }}>
          {String(index + 1).padStart(2, '0')} / 05
        </span>
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
      const getScroll = () => track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -getScroll(),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: () => `+=${getScroll()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 400)

    // While scrolling, the track slides under the cursor and Chrome fires a
    // synthetic mousemove every frame -> card hover state + PerspectiveTilt
    // both churn mid-scroll (re-render + box-shadow paint = jank). Disable
    // pointer hits on the track during motion, restore when it stops.
    let lenis = null
    let idleT = null
    const onScroll = () => {
      const track = trackRef.current
      if (!track) return
      track.style.pointerEvents = 'none'
      clearTimeout(idleT)
      idleT = setTimeout(() => { track.style.pointerEvents = 'auto' }, 140)
    }
    const attach = setTimeout(() => {
      lenis = window.__lenis
      lenis?.on('scroll', onScroll)
    }, 0)

    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(t)
      clearTimeout(attach)
      clearTimeout(idleT)
      lenis?.off('scroll', onScroll)
      ctx.revert()
    }
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
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
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
            paddingRight: 'max(48px, calc((100vw - 1200px) / 2))',
            width: 'max-content',
            willChange: 'transform',
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
