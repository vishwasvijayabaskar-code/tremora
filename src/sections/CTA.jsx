import { useState } from 'react'
import Reveal from '../components/Reveal'

const trust = [
  { v: 'JUL 27', l: 'ATLANTA STARTUP VILLAGE' },
  { v: '$199', l: 'TARGET DEVICE PRICE' },
  { v: '50', l: 'PILOT DEVICES / BATCH 1' },
]

export default function CTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const onSubmit = (e) => { e.preventDefault(); if (email) setSubmitted(true) }

  return (
    <section id="waitlist" style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'var(--section-pad) 0' }}>
      <div className="container">
        <div className="mono-label" style={{ color: 'var(--hazard)', marginBottom: 18 }}>[ 08 / EARLY ACCESS ]</div>
        <Reveal as="h2" variant="lines" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 11vw, 10rem)', color: 'var(--paper)', lineHeight: 0.85, letterSpacing: '-0.04em', marginBottom: 28 }}>
          Get Tremora before GA.
        </Reveal>
        <Reveal style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-light-2)', maxWidth: 560, textTransform: 'none', marginBottom: 40 }}>
          Join the waitlist for early access. We're looking for pilot participants, neurology partners, and anyone who believes tremor data should be continuous.
        </Reveal>

        {/* form */}
        <div style={{ maxWidth: 620, marginBottom: 56 }}>
          {!submitted ? (
            <form onSubmit={onSubmit} style={{ display: 'flex', border: '1px solid var(--line-light)' }}>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR.EMAIL@DOMAIN.COM" required aria-label="Email address"
                style={{
                  flex: 1, minWidth: 0, padding: '18px 20px', border: 'none', background: 'transparent',
                  color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.06em', outline: 'none',
                }}
              />
              <button type="submit" data-cursor-hover style={{
                padding: '0 28px', background: 'var(--hazard)', color: 'var(--paper)', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                transition: 'background .25s var(--ease), color .25s var(--ease)',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--paper)'; e.currentTarget.style.color = 'var(--ink)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--hazard)'; e.currentTarget.style.color = 'var(--paper)' }}
              >Join &rarr;</button>
            </form>
          ) : (
            <div role="status" aria-live="polite" style={{ border: '1px solid var(--hazard)', padding: '24px 28px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--paper)' }}>YOU'RE ON THE LIST.</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-light-2)', marginTop: 8, letterSpacing: '0.04em' }}>WE'LL REACH OUT WHEN EARLY ACCESS OPENS.</div>
            </div>
          )}
        </div>

        {/* trust telemetry row */}
        <div className="grid-responsive-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '1px solid var(--line-light)', marginBottom: 64 }}>
          {trust.map((t, i) => (
            <Reveal key={i} delay={i * 0.07} style={{ padding: '26px 22px', borderRight: i < 2 ? '1px solid var(--line-light)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', color: 'var(--paper)', lineHeight: 1 }}>{t.v}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.1em', color: 'var(--text-light-2)', marginTop: 8 }}>{t.l}</div>
            </Reveal>
          ))}
        </div>

        {/* footer */}
        <div style={{ borderTop: '1px solid var(--line-light)', paddingTop: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--paper)' }}>
              <span style={{ width: 7, height: 7, background: 'var(--hazard)', display: 'inline-block' }} />TREMORA
            </div>
            <div style={{ display: 'flex', gap: 28 }}>
              <a href="mailto:partners@tremora.com" data-cursor-hover style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', letterSpacing: '0.1em', color: 'var(--text-light-2)' }}>PARTNER INQUIRY</a>
              <a href="mailto:demo@tremora.com" data-cursor-hover style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', letterSpacing: '0.1em', color: 'var(--text-light-2)' }}>REQUEST DEMO</a>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, flexWrap: 'wrap', gap: 10 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', maxWidth: 460, lineHeight: 1.6, letterSpacing: '0.03em' }}>TREMORA IS EARLY-STAGE CLINICAL TECHNOLOGY. NOT FDA-CLEARED. NOT A DIAGNOSTIC DEVICE.</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>&copy; 2026 TREMORA</p>
          </div>
        </div>
      </div>
    </section>
  )
}
