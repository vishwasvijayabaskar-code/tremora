const items = [
  'Continuous Monitoring',
  '200Hz Sampling',
  'On-Device ML',
  'UPDRS Scoring',
  'Parkinson\'s Care',
  '86.4% Accuracy',
  'ESP32 Powered',
  'FDA Pathway',
  'Real-Time Scoring',
  'Clinical Grade',
]

const keyframes = `
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes marqueeReverse {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
`

function MarqueeRow({ reverse = false, speed = 25 }) {
  const doubled = [...items, ...items]
  return (
    <div style={{
      display: 'flex',
      animation: `${reverse ? 'marqueeReverse' : 'marquee'} ${speed}s linear infinite`,
      width: 'max-content',
    }}>
      {doubled.map((item, i) => (
        <span key={i} style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--cream)',
          whiteSpace: 'nowrap',
          padding: '0 28px',
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          opacity: 0.7,
        }}>
          {item}
          <span style={{ color: 'var(--coral)', fontSize: '0.4rem' }}>◆</span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div style={{
      background: 'var(--text-primary)',
      padding: '16px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <style>{keyframes}</style>
      <MarqueeRow speed={30} />
    </div>
  )
}
