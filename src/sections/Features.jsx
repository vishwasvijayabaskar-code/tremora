import { useCountUp } from '../hooks/useCountUp'
import Reveal from '../components/Reveal'

const features = [
  { id: 'SYS-01', stat: '<50ms', statLabel: 'INFERENCE TIME', title: 'On-Device ML',
    desc: 'Random Forest classifier runs entirely on the ESP32. No cloud, no latency, no data exposure — tremor scored at the wrist.',
    detail: 'Trained on 2,400+ labeled tremor windows. Compressed to fit 520KB SRAM.', tags: ['EDGE-AI', 'PRIVACY', 'REALTIME'] },
  { id: 'SYS-02', stat: '4-6Hz', statLabel: 'TREMOR BAND', title: 'FFT Signal Analysis',
    desc: 'Fast Fourier Transform isolates the Parkinsonian tremor band from noise — rest tremor vs voluntary movement.',
    detail: 'Sliding 256-sample Hamming window @ 200Hz. PSD across 3-8Hz, 0.78Hz resolution.', tags: ['SPECTRAL', 'BAND-ISO', 'DENOISE'] },
  { id: 'SYS-03', stat: '0-4', statLabel: 'SEVERITY SCALE', title: 'UPDRS Proxy Score',
    desc: 'Maps sensor data to the clinical UPDRS tremor subscale — a familiar metric without in-person observation.',
    detail: 'Regression: RMS amplitude + dominant freq + spectral entropy → UPDRS 3.15-3.18.', tags: ['CLINICAL', 'CONTINUOUS', 'VALIDATED'] },
  { id: 'SYS-04', stat: '1-PRESS', statLabel: 'DOSE CAPTURE', title: 'Medication Logging',
    desc: 'A physical button logs exact medication timing, building before/after tremor response curves for every dose.',
    detail: 'Timestamps at ±50ms. Dashboard overlays dose events on the severity timeline.', tags: ['DOSE', 'RESPONSE', 'ADHERENCE'] },
  { id: 'SYS-05', stat: '24/7', statLabel: 'MONITORING', title: 'Continuous Data',
    desc: '200Hz sampling runs all day. SPIFFS logs raw CSV per session. Weeks of data between visits.',
    detail: '2000mAh LiPo → ~18hr active recording, auto-segmented into sleep/wake sessions.', tags: ['ALWAYS-ON', 'CSV', 'MULTI-WEEK'] },
  { id: 'SYS-06', stat: 'LIVE', statLabel: 'DATA SYNC', title: 'Neurologist Dashboard',
    desc: 'A web dashboard surfaces weeks of tremor patterns with auto-generated severity reports for clinical review.',
    detail: 'BLE → companion app → cloud API → provider dashboard. HIPAA-aligned encryption.', tags: ['PORTAL', 'REPORTS', 'HIPAA'] },
]

function Stat({ display }) { const { ref, value } = useCountUp(display); return <span ref={ref}>{value}</span> }

export default function Features() {
  return (
    <section id="features" style={{ background: 'var(--ink)', color: 'var(--text-light)' }}>
      <div className="container" style={{ paddingTop: 'var(--section-pad)', paddingBottom: 24 }}>
        <div className="mono-label" style={{ color: 'var(--hazard)', marginBottom: 18 }}>[ 03 / TECHNOLOGY ]</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
          <Reveal as="h2" variant="lines" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 7vw, 6rem)', color: 'var(--paper)', lineHeight: 0.9, letterSpacing: '-0.03em', margin: 0 }}>
            Six systems. One wrist.
          </Reveal>
          <Reveal style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', lineHeight: 1.7, color: 'var(--text-light-2)', maxWidth: 280, letterSpacing: '0.03em' }}>
            SCROLL — EACH PANEL STACKS OVER THE LAST. SIX SUBSYSTEMS, ONE OUTCOME: TREMOR DATA A NEUROLOGIST CAN ACT ON.
          </Reveal>
        </div>
        <div style={{ height: 2, background: 'var(--hazard)', marginTop: 28 }} />
      </div>

      {/* sticky flashcard stack — each panel sticks at top, next scrolls up and covers it */}
      <div style={{ position: 'relative' }}>
        {features.map((f, i) => (
          <div key={i} style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: i }}>
            <article style={{
              position: 'relative', width: 'min(960px, 92vw)', height: 'min(80vh, 640px)',
              background: 'var(--ink-2)', border: '1px solid var(--line-light)',
              boxShadow: '0 -30px 80px rgba(0,0,0,0.6)',
              padding: 'clamp(28px, 4vw, 56px)', display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.14em', color: 'var(--text-light-2)' }}>
                <span style={{ color: 'var(--hazard)' }}>{f.id}</span>
                <span>{f.statLabel}</span>
              </div>
              <div style={{ height: 1, background: 'var(--line-light)', margin: '20px 0' }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.2rem, 8vw, 6rem)', color: 'var(--paper)', lineHeight: 0.9 }}><Stat display={f.stat} /></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)', color: 'var(--paper)', lineHeight: 0.95, margin: '18px 0 16px' }}>{f.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.95rem,1.4vw,1.1rem)', lineHeight: 1.6, color: 'var(--text-light-2)', textTransform: 'none', marginBottom: 14, maxWidth: 620 }}>{f.desc}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', lineHeight: 1.55, color: 'var(--text-muted)', letterSpacing: '0.02em', marginBottom: 'auto', maxWidth: 620 }}>{f.detail}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
                {f.tags.map((t, j) => <span key={j} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--paper)', border: '1px solid var(--line-light)', padding: '6px 12px' }}>{t}</span>)}
              </div>
              <div style={{ position: 'absolute', bottom: 'clamp(20px,3vw,40px)', right: 'clamp(28px,4vw,56px)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{String(i + 1).padStart(2, '0')} / 06</div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
