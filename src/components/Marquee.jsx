const items = [
  'CONTINUOUS MONITORING', '200HZ SAMPLING', 'ON-DEVICE ML', 'UPDRS SCORING',
  "PARKINSON'S CARE", '86.4% ACCURACY', 'ESP32 POWERED', 'FDA PATHWAY',
  'REAL-TIME SCORING', 'CLINICAL GRADE',
]

const keyframes = `@keyframes tmMarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`

export default function Marquee() {
  const doubled = [...items, ...items]
  return (
    <div style={{
      background: 'var(--ink)', color: 'var(--paper)',
      padding: '14px 0', overflow: 'hidden',
      borderTop: '1px solid var(--line-light)', borderBottom: '1px solid var(--line-light)',
    }}>
      <style>{keyframes}</style>
      <div style={{ display: 'flex', width: 'max-content', animation: 'tmMarquee 38s linear infinite' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: 'flex', alignItems: 'center', gap: 28, padding: '0 28px',
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.16em',
            whiteSpace: 'nowrap', color: 'var(--paper)',
          }}>
            {item}
            <span style={{ color: 'var(--hazard)' }}>+</span>
          </span>
        ))}
      </div>
    </div>
  )
}
