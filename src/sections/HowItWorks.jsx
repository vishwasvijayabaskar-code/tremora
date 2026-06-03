import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import { useCountUp } from '../hooks/useCountUp'

const steps = [
  { n: '01', title: 'Capture', desc: 'A wrist-worn sensor samples tremor movement at 200Hz continuously throughout the day.', tags: ['MPU-6050', '6-AXIS', '200HZ'], metric: '~18hr', metricLabel: 'ACTIVE RECORDING / CHARGE', visual: 'wave' },
  { n: '02', title: 'Score', desc: 'On-device FFT and a trained classifier score tremor severity in real time — no cloud round-trip.', tags: ['FFT', 'RANDOM-FOREST', 'UPDRS'], metric: '<50ms', metricLabel: 'PER 256-SAMPLE WINDOW', visual: 'bars' },
  { n: '03', title: 'Reveal', desc: 'A neurologist dashboard surfaces weeks of patterns, showing how tremor responds to each dose.', tags: ['DASHBOARD', 'TIMELINE', 'REPORTS'], metric: 'WEEKS', metricLabel: 'OF DATA PER VISIT', visual: 'dash' },
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

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 32, letterSpacing: '0.04em' }}>
          * ALL SEVERITY SCORES ARE ALGORITHMIC PROXIES INTENDED TO SUPPORT, NOT REPLACE, CLINICAL JUDGMENT.
        </p>
      </div>
    </section>
  )
}
