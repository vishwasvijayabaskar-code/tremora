/**
 * DashboardMock — a real, lightweight SVG preview of the neurologist dashboard:
 * a 14-day tremor-severity timeline (UPDRS proxy, 0-4) with logged
 * medication-dose markers. Data is synthetic and labeled as a preview. Themed
 * entirely via CSS variables so it adapts to whichever design system loads it.
 * This is an actual data-driven chart, not a div fake-screenshot.
 */
const SEV = [3.1, 3.4, 2.9, 3.2, 3.0, 2.6, 2.1, 1.8, 2.0, 1.6, 1.9, 1.5, 1.7, 1.4]
const DOSE_DAYS = [1, 5, 8, 11]
const N = SEV.length
const VB_W = 560, VB_H = 300
const padL = 30, padR = 16, padT = 16, padB = 22
const cw = VB_W - padL - padR
const chh = VB_H - padT - padB
const MAXS = 4
const px = (i) => padL + (i / (N - 1)) * cw
const py = (s) => padT + (1 - s / MAXS) * chh

export default function DashboardMock({ caption = 'Synthetic preview, 14-day window' }) {
  const linePts = SEV.map((s, i) => `${px(i).toFixed(1)},${py(s).toFixed(1)}`).join(' ')
  const areaPts = `${px(0).toFixed(1)},${(padT + chh).toFixed(1)} ${linePts} ${px(N - 1).toFixed(1)},${(padT + chh).toFixed(1)}`
  return (
    <div style={{
      width: '100%', background: 'var(--paper)', border: '1px solid var(--line-strong)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      boxShadow: '0 32px 64px -34px rgba(20,24,40,0.30)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.98rem', color: 'var(--ink)', letterSpacing: '-0.01em' }}>Tremor severity</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 3 }}>UPDRS proxy / per day</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: '0.54rem', letterSpacing: '0.08em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--hazard)', display: 'inline-block' }} />
          Dose logged
        </div>
      </div>

      <div style={{ padding: '14px 14px 4px' }}>
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} width="100%" style={{ display: 'block' }} role="img" aria-label="14-day tremor severity timeline with medication dose markers">
          {[0, 1, 2, 3, 4].map((s) => (
            <g key={s}>
              <line x1={padL} y1={py(s)} x2={VB_W - padR} y2={py(s)} stroke="var(--line)" strokeWidth="1" />
              <text x={padL - 7} y={py(s) + 3} textAnchor="end" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-muted)">{s}</text>
            </g>
          ))}
          {DOSE_DAYS.map((d) => (
            <g key={d}>
              <line x1={px(d)} y1={padT} x2={px(d)} y2={padT + chh} stroke="var(--hazard)" strokeWidth="1" strokeDasharray="3 4" opacity="0.45" />
              <circle cx={px(d)} cy={py(SEV[d])} r="3.4" fill="var(--hazard)" />
            </g>
          ))}
          <polygon points={areaPts} fill="var(--hazard)" opacity="0.10" />
          <polyline points={linePts} fill="none" stroke="var(--hazard)" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={px(N - 1)} cy={py(SEV[N - 1])} r="3.4" fill="var(--paper)" stroke="var(--hazard)" strokeWidth="2" />
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 18px 13px', borderTop: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
        <span>{caption}</span>
        <span>Days 1 to 14</span>
      </div>
    </div>
  )
}
