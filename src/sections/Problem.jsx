import { useRef, useEffect } from 'react'
import { useCountUp } from '../hooks/useCountUp'
import Reveal from '../components/Reveal'

function CountStat({ display, style }) {
  const { ref, value } = useCountUp(display)
  return <span ref={ref} style={style}>{value}</span>
}

const stats = [
  { number: '4', unit: '×', label: 'YEARLY VISITS', sub: 'Neurologist appointments per year' },
  { number: '15', unit: 'MIN', label: 'PER VISIT', sub: 'Typical observation window' },
  { number: '1', unit: 'HR', label: 'PER YEAR', sub: 'Total clinical observation time' },
  { number: '90', unit: 'DAY', label: 'GAPS', sub: 'Between medication adjustments' },
]

function AnimatedWave({ color, height = 64, type }) {
  const canvasRef = useRef()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth * 2
    canvas.height = height * 2
    ctx.scale(2, 2)
    let frame = 0, animId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, height)
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 1.5
      const w = canvas.offsetWidth
      for (let x = 0; x < w; x++) {
        const p = x / w; let y
        if (type === 'snapshot') {
          const vis = p > 0.45 && p < 0.55
          if (vis) y = height / 2 + Math.sin(p * 40 + frame * 0.05) * 15
          else { y = height / 2; ctx.globalAlpha = 0.2 }
        } else {
          y = height / 2 + Math.sin(p * 8 + frame * 0.03) * 12 + Math.sin(p * 15 + frame * 0.05) * 8 + Math.sin(p * 30 + frame * 0.02) * 4
          ctx.globalAlpha = 0.9
        }
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke(); ctx.globalAlpha = 1; frame++
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animId)
  }, [color, height, type])
  return <canvas ref={canvasRef} style={{ width: '100%', height, display: 'block' }} />
}

export default function Problem() {
  return (
    <section id="problem" style={{ background: 'transparent', padding: 'var(--section-pad) 0' }}>
      <div className="container">
        <div className="mono-label" style={{ color: 'var(--hazard)', marginBottom: 18 }}>[ 01 / THE PROBLEM ]</div>
        <Reveal as="h2" variant="lines" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 6.5vw, 6rem)', color: 'var(--ink)', lineHeight: 0.9, letterSpacing: '-0.03em', maxWidth: 1100, marginBottom: 24 }}>
          Neurologists make 3-month decisions from 15-minute snapshots.
        </Reveal>
        <Reveal style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: 560, textTransform: 'none', marginBottom: 56 }}>
          A typical Parkinson's patient sees their neurologist four times a year. Each visit captures roughly 15 minutes of motor behavior. Medication decisions that affect the next 90 days are made from that sliver.
        </Reveal>

        {/* telemetry stat grid — hairline dividers via gap:1px on ink bg */}
        <div className="grid-responsive-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--ink)', border: '1px solid var(--ink)', marginBottom: 1 }}>
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.06} style={{ background: 'var(--paper)', padding: '28px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <CountStat display={s.number} style={{ fontFamily: 'var(--font-display)', fontSize: '3.4rem', color: 'var(--ink)', lineHeight: 0.9 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--hazard)' }}>{s.unit}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'var(--ink)', marginTop: 12 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.4, textTransform: 'none' }}>{s.sub}</div>
            </Reveal>
          ))}
        </div>

        {/* compare panels */}
        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--ink)', border: '1px solid var(--ink)', marginTop: 40 }}>
          <div style={{ background: 'var(--paper)', padding: 32 }}>
            <div className="mono-label" style={{ marginBottom: 20 }}>CURRENT / CLINIC SNAPSHOT</div>
            <AnimatedWave color="var(--text-muted)" type="snapshot" />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 14, letterSpacing: '0.02em' }}>BRIEF WINDOW. MOST TREMOR DATA INVISIBLE.</p>
          </div>
          <div style={{ background: 'var(--ink)', padding: 32 }}>
            <div className="mono-label" style={{ marginBottom: 20, color: 'var(--hazard)' }}>TREMORA / CONTINUOUS</div>
            <AnimatedWave color="var(--hazard)" type="continuous" />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-light-2)', marginTop: 14, letterSpacing: '0.02em' }}>FULL SIGNAL. EVERY FLUCTUATION CAPTURED.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
