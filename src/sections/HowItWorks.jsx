import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import HScrollStrip from '../components/HScrollStrip'
import { useCountUp } from '../hooks/useCountUp'

const steps = [
  { n: '01', title: 'Capture', desc: 'A wrist-worn sensor samples tremor movement at 200Hz continuously throughout the day.', tags: ['MPU-6050', '6-AXIS', '200HZ'], metric: '~18hr', metricLabel: 'ACTIVE RECORDING / CHARGE', visual: 'wave' },
  { n: '02', title: 'Score', desc: 'On-device FFT and a trained classifier score tremor severity in real time — no cloud round-trip.', tags: ['FFT', 'RANDOM-FOREST', 'UPDRS'], metric: '<50ms', metricLabel: 'PER 256-SAMPLE WINDOW', visual: 'bars' },
  { n: '03', title: 'Reveal', desc: 'A neurologist dashboard surfaces weeks of patterns, showing how tremor responds to each dose.', tags: ['DASHBOARD', 'TIMELINE', 'REPORTS'], metric: 'WEEKS', metricLabel: 'OF DATA PER VISIT', visual: 'dash' },
]

// Deep-dive: the on-device signal pipeline, stage by stage (horizontal rail).
const pipeline = [
  { stage: 'P-01', io: 'SENSOR', title: 'Raw Capture', desc: 'Six-axis inertial data streamed off the wrist module, continuously, every waking hour.', specs: [['IMU', 'MPU-6050'], ['RATE', '200 Hz'], ['RANGE', '±2g / ±250°/s'], ['AXES', '3 accel + 3 gyro']] },
  { stage: 'P-02', io: 'BUFFER', title: 'Windowing', desc: 'The stream is cut into overlapping frames so no tremor burst ever falls between two windows.', specs: [['WINDOW', '256 samples'], ['SPAN', '1.28 s'], ['OVERLAP', '50%'], ['TAPER', 'Hann']] },
  { stage: 'P-03', io: 'TRANSFORM', title: 'FFT', desc: 'Each frame moves to the frequency domain to isolate the 4–6 Hz Parkinsonian tremor band from voluntary motion.', specs: [['METHOD', 'Radix-2 FFT'], ['BINS', '128'], ['BAND', '4–6 Hz'], ['CLEAN', 'DC + drift removed']] },
  { stage: 'P-04', io: 'FEATURES', title: 'Feature Vector', desc: 'A compact set of discriminative features is computed per window and handed to the classifier.', specs: [['BAND PWR', 'tremor / total'], ['ENTROPY', 'spectral'], ['RMS', 'per axis'], ['PEAK', 'dominant Hz']] },
  { stage: 'P-05', io: 'INFERENCE', title: 'Random Forest', desc: 'A trained ensemble scores severity entirely on the ESP32 — no cloud, no latency, no data leaving the wrist.', specs: [['MODEL', 'Random Forest'], ['TREES', '100'], ['LATENCY', '<50 ms'], ['ACCURACY', '86.4%*']] },
  { stage: 'P-06', io: 'OUTPUT', title: 'UPDRS Proxy', desc: 'Window scores aggregate into a continuous severity curve, time-aligned to every logged medication dose.', specs: [['SCALE', '0–4 proxy'], ['CADENCE', 'per minute'], ['ALIGNED', 'dose events'], ['EXPORT', 'CSV / PDF']] },
]

function Metric({ display }) { const { ref, value } = useCountUp(display); return <span ref={ref}>{value}</span> }

function Visual({ type }) {
  if (type === 'dash') return <Placeholder label="DASHBOARD" sub="SCREENSHOT / SOON" ratio="16/10" theme="dark" />
  return (
    <div style={{ width: '100%', aspectRatio: '16/10', border: '1px solid var(--line-light)', background: 'var(--ink-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {type === 'wave' && (
        <svg viewBox="0 0 200 60" style={{ width: '78%' }}>
          <path d="M0,30 Q10,8 20,30 T40,30 T60,30 Q70,4 80,30 T100,30 T120,30 Q130,6 140,30 T160,30 T180,30 T200,30" fill="none" stroke="var(--hazard)" strokeWidth="2">
            <animate attributeName="d" values="M0,30 Q10,8 20,30 T40,30 T60,30 Q70,4 80,30 T100,30 T120,30 Q130,6 140,30 T160,30 T180,30 T200,30;M0,30 Q10,20 20,30 T40,30 T60,30 Q70,16 80,30 T100,30 T120,30 Q130,18 140,30 T160,30 T180,30 T200,30;M0,30 Q10,8 20,30 T40,30 T60,30 Q70,4 80,30 T100,30 T120,30 Q130,6 140,30 T160,30 T180,30 T200,30" dur="3s" repeatCount="indefinite" />
          </path>
        </svg>
      )}
      {type === 'bars' && (
        <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: '55%' }}>
          {Array.from({ length: 22 }).map((_, i) => (
            <div key={i} style={{ width: 5, height: '20%', background: 'var(--hazard)', animation: `tmBar ${1.1 + (i % 5) * 0.15}s var(--ease) ${i * 0.04}s infinite`, ['--m']: `${40 + Math.sin(i) * 30 + (i % 7) * 6}%` }} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'var(--section-pad) 0' }}>
      <style>{`@keyframes tmBar{0%,100%{height:20%}50%{height:var(--m)}}`}</style>
      <div className="container">
        <div className="mono-label" style={{ color: 'var(--hazard)', marginBottom: 18 }}>[ 02 / PIPELINE ]</div>
        <Reveal as="h2" variant="lines" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 7vw, 6.5rem)', color: 'var(--paper)', lineHeight: 0.88, letterSpacing: '-0.03em', marginBottom: 36 }}>
          Wrist to neurologist, in three.
        </Reveal>
        <div style={{ height: 2, background: 'var(--hazard)', marginBottom: 8 }} />

        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="grid-responsive" style={{
              display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: 48,
              alignItems: 'center', padding: '44px 0', borderBottom: '1px solid var(--line-light)',
            }}>
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 14 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', color: 'var(--hazard)', lineHeight: 1 }}>{s.n}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.2rem)', color: 'var(--paper)', lineHeight: 0.95 }}>{s.title}</h3>
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text-light-2)', textTransform: 'none', maxWidth: 420, marginBottom: 22 }}>{s.desc}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, paddingTop: 18, borderTop: '1px solid var(--line-light)', marginBottom: 18 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--hazard)' }}><Metric display={s.metric} /></span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{s.metricLabel}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {s.tags.map((t, j) => <span key={j} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--paper)', border: '1px solid var(--line-light)', padding: '4px 9px' }}>{t}</span>)}
                </div>
              </div>
              <div style={{ order: i % 2 === 0 ? 1 : 0 }}><Visual type={s.visual} /></div>
            </div>
          </Reveal>
        ))}

        {/* Deep-dive horizontal rail — drag / arrows, jank-free native scroll-snap */}
        <div style={{ marginTop: 72 }}>
          <Reveal>
            <HScrollStrip title="[ DEEP DIVE / SIGNAL PIPELINE → ]" ariaLabel="On-device signal pipeline, stage by stage">
              {pipeline.map((p, i) => (
                <article key={i} style={{
                  scrollSnapAlign: 'start', flex: '0 0 auto', width: 'min(340px, 80vw)', marginRight: 16,
                  padding: '26px 24px', border: '1px solid var(--line-light)', background: 'var(--ink-2)',
                  display: 'flex', flexDirection: 'column', minHeight: 320,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', marginBottom: 18 }}>
                    <span style={{ color: 'var(--hazard)' }}>{p.stage}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{p.io}</span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--paper)', lineHeight: 0.95, marginBottom: 14 }}>{p.title}</h4>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--text-light-2)', textTransform: 'none', marginBottom: 18 }}>{p.desc}</p>
                  <ul style={{ listStyle: 'none', marginTop: 'auto', display: 'grid', gap: 0 }}>
                    {p.specs.map(([k, v], j) => (
                      <li key={j} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.04em', borderTop: '1px solid var(--line-light)', padding: '7px 0' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                        <span style={{ color: 'var(--paper)', textAlign: 'right' }}>{v}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </HScrollStrip>
          </Reveal>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 32, letterSpacing: '0.04em' }}>
          * ALL SEVERITY SCORES ARE ALGORITHMIC PROXIES INTENDED TO SUPPORT, NOT REPLACE, CLINICAL JUDGMENT.
        </p>
      </div>
    </section>
  )
}
