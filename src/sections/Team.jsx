import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'

const milestones = [
  'Replicated Saez et al. ELENA methodology on real accelerometer data',
  'Random Forest classifier — 86.4% accuracy on UPDRS tremor subscale',
  'On-device inference in <50ms per window (ESP32, no cloud dependency)',
  'Accepted to Atlanta Startup Village — presenting July 27, 2026',
  'Pilot study partnership in discussion with UNC Chapel Hill neurology',
]

export default function Team() {
  return (
    <section id="team" style={{ background: 'transparent', padding: 'var(--section-pad) 0' }}>
      <div className="container">
        <div className="mono-label" style={{ color: 'var(--hazard)', marginBottom: 18 }}>[ 05 / TEAM ]</div>
        <Reveal as="h2" variant="lines" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 7vw, 6.5rem)', color: 'var(--ink)', lineHeight: 0.88, letterSpacing: '-0.03em', marginBottom: 36 }}>
          Student builders. Real medical impact.
        </Reveal>
        <div style={{ height: 2, background: 'var(--ink)', marginBottom: 48 }} />

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
          {/* left: narrative + proof list */}
          <div>
            <Reveal style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-secondary)', textTransform: 'none', marginBottom: 20 }}>
              Tremora was founded by high school engineers who saw a gap between what neurologists need and what technology offers. We are building Tremora not as a school project, but as a platform that can change how Parkinson's is monitored at home.
            </Reveal>
            <Reveal style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-secondary)', textTransform: 'none', marginBottom: 36 }}>
              Every firmware line, every signal-processing decision, every hardware choice answers one question: does this give neurologists better data for their patients?
            </Reveal>

            <div className="mono-label" style={{ marginBottom: 16 }}>// PROOF POINTS</div>
            <div style={{ borderTop: '1px solid var(--line-strong)' }}>
              {milestones.map((m, i) => (
                <Reveal key={i} delay={i * 0.05} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--hazard)', flexShrink: 0, paddingTop: 2 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', lineHeight: 1.5, color: 'var(--ink)', textTransform: 'none' }}>{m}</span>
                </Reveal>
              ))}
            </div>
          </div>

          {/* right: photo placeholder + stat cells */}
          <div>
            <Reveal><Placeholder label="TEAM PHOTO" sub="FOUNDERS / SOON" ratio="4/5" theme="paper" /></Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--line-strong)', borderTop: 'none' }}>
              <div style={{ padding: '24px 20px', borderRight: '1px solid var(--line-strong)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--hazard)', lineHeight: 1 }}>86.4%</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: 8 }}>CLASSIFIER ACCURACY</div>
              </div>
              <div style={{ padding: '24px 20px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--ink)', lineHeight: 1 }}>200Hz</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: 8 }}>SAMPLING RATE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
