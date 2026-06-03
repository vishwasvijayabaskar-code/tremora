import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Technology', href: '#features' },
  { label: 'Device', href: '#device' },
  { label: 'Team', href: '#team' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const dark = scrolled
  return (
    <nav
      className="tm-nav"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'stretch',
        height: scrolled ? 56 : 72,
        background: dark ? 'var(--ink)' : 'transparent',
        color: dark ? 'var(--paper)' : 'var(--ink)',
        borderBottom: `1px solid ${dark ? 'var(--line-light)' : 'var(--line)'}`,
        transition: 'height .4s var(--ease), background .4s var(--ease), color .4s var(--ease), border-color .4s var(--ease)',
        backdropFilter: dark ? 'none' : 'none',
      }}
    >
      {/* logo cell */}
      <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        data-cursor-hover
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '0 clamp(20px,5vw,40px)',
          borderRight: `1px solid ${dark ? 'var(--line-light)' : 'var(--line)'}`,
          fontFamily: 'var(--font-display)', fontSize: scrolled ? '1.1rem' : '1.3rem',
          letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'inherit',
        }}>
        <span style={{ width: 7, height: 7, background: 'var(--hazard)', display: 'inline-block' }} />
        Tremora
      </a>

      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div className="nav-text-links" style={{ display: 'flex', alignItems: 'stretch' }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)} data-cursor-hover
              className="tm-nav-link"
              style={{
                display: 'flex', alignItems: 'center', padding: '0 22px',
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'inherit',
                borderLeft: `1px solid ${dark ? 'var(--line-light)' : 'var(--line)'}`,
              }}>
              {link.label}
            </a>
          ))}
        </div>
        <a href="#waitlist" onClick={(e) => scrollTo(e, '#waitlist')} data-cursor-hover
          className="tm-nav-cta"
          style={{
            display: 'flex', alignItems: 'center', padding: '0 clamp(20px,4vw,32px)',
            background: 'var(--hazard)', color: 'var(--paper)',
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
            transition: 'background .25s var(--ease)',
          }}>
          Waitlist &rarr;
        </a>
      </div>

      <style>{`
        .tm-nav { animation: navIn .7s var(--ease) both; }
        @keyframes navIn { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        @media (hover:hover){
          .tm-nav-link:hover{ color: var(--hazard) !important; }
          .tm-nav-cta:hover{ background: var(--ink) !important; }
        }
      `}</style>
    </nav>
  )
}
