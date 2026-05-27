import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Device', href: '#device' },
  { label: 'Team', href: '#team' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef()

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 1.2,
    })

    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: scrolled ? '12px' : '0',
        left: scrolled ? '50%' : '0',
        right: scrolled ? 'auto' : '0',
        transform: scrolled ? 'translateX(-50%)' : 'none',
        width: scrolled ? 'min(90vw, 900px)' : '100%',
        zIndex: 100,
        padding: scrolled ? '12px 28px' : '22px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
        background: scrolled ? 'rgba(13,13,13,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderRadius: scrolled ? 'var(--radius-pill)' : '0',
        border: scrolled ? '1px solid rgba(255,234,204,0.08)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.12)' : 'none',
      }}
    >
      <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{
        fontFamily: 'var(--font-display)',
        fontSize: scrolled ? '1.3rem' : '1.6rem',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        color: scrolled ? 'var(--cream)' : 'var(--text-primary)',
        transition: 'all 0.4s ease',
      }}>
        Tremora
      </a>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: scrolled ? '24px' : '32px',
        transition: 'gap 0.4s ease',
      }}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
            style={{
              fontSize: scrolled ? '0.75rem' : '0.8rem',
              color: scrolled ? 'rgba(255,234,204,0.6)' : 'var(--text-secondary)',
              fontWeight: 400,
              letterSpacing: '0.02em',
              transition: 'color 0.3s, font-size 0.4s',
              textTransform: 'uppercase',
            }}
            onMouseEnter={e => e.target.style.color = scrolled ? 'var(--cream)' : 'var(--text-primary)'}
            onMouseLeave={e => e.target.style.color = scrolled ? 'rgba(255,234,204,0.6)' : 'var(--text-secondary)'}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#waitlist"
          onClick={(e) => scrollTo(e, '#waitlist')}
          style={{
            fontSize: scrolled ? '0.75rem' : '0.8rem',
            fontWeight: 500,
            color: scrolled ? 'var(--dark)' : 'white',
            background: scrolled ? 'var(--cream)' : 'var(--text-primary)',
            padding: scrolled ? '8px 18px' : '10px 22px',
            borderRadius: 'var(--radius-pill)',
            transition: 'all 0.4s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={e => {
            e.target.style.background = 'var(--coral)'
            e.target.style.color = 'white'
          }}
          onMouseLeave={e => {
            e.target.style.background = scrolled ? 'var(--cream)' : 'var(--text-primary)'
            e.target.style.color = scrolled ? 'var(--dark)' : 'white'
          }}
        >
          Waitlist
        </a>
      </div>
    </nav>
  )
}
