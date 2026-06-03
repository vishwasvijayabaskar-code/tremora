import Reveal from '../components/Reveal'

const items = [
  { k: 'A', title: 'Data We Collect', text: 'Accelerometer data from the wrist sensor to compute tremor severity. Waitlist collects email only — no names, locations, or PII beyond motion readings.' },
  { k: 'B', title: 'How We Use It', text: 'Sensor data processed on-device. Aggregated severity scores reach a neurologist dashboard only if the patient opts in. We never sell or monetize patient data.' },
  { k: 'C', title: 'Storage & Security', text: 'Raw data stored locally via SPIFFS, exportable as CSV. Cloud transmission uses TLS 1.3. HIPAA-aligned security practices across all handling.' },
  { k: 'D', title: 'Your Rights', text: 'Request deletion anytime at privacy@tremora.com. Unsubscribe instantly via email link. Device data wipeable locally via reset.' },
]

export default function Privacy() {
  return (
    <section id="privacy" style={{ background: 'var(--paper-2)', padding: 'var(--section-pad) 0' }}>
      <div className="container">
        <div className="mono-label" style={{ color: 'var(--hazard)', marginBottom: 18 }}>[ 07 / PRIVACY & SECURITY ]</div>
        <Reveal as="h2" variant="lines" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 6.5vw, 6rem)', color: 'var(--ink)', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: 20 }}>
          Your data. Your control.
        </Reveal>
        <Reveal style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: 540, textTransform: 'none', marginBottom: 48 }}>
          Privacy isn't a feature, it's the architecture. On-device processing means tremor data never leaves the wrist unless you say so.
        </Reveal>

        <div className="grid-responsive-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'var(--ink)', border: '1px solid var(--ink)' }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.06} style={{ background: 'var(--paper)', padding: 36 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--ink)', lineHeight: 1 }}>{it.title}</h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--hazard)' }}>/{it.k}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.86rem', lineHeight: 1.65, color: 'var(--text-secondary)', textTransform: 'none' }}>{it.text}</p>
            </Reveal>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 32, letterSpacing: '0.04em' }}>
          LAST UPDATED MAY 2026 / PRE-CLINICAL TECHNOLOGY, NOT SUBJECT TO FDA REGULATION AT THIS STAGE.
        </p>
      </div>
    </section>
  )
}
