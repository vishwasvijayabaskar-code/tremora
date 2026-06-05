/**
 * DeviceRender — a themed SVG schematic of the Tremora wrist module (front view)
 * with component callouts and an overall dimension. A real informative diagram
 * (technical line-drawing, not a decorative illustration), themed via CSS
 * variables so it adapts to whichever design system loads it.
 */
function Callout({ x, y, anchor = 'start', dot, line, children }) {
  return (
    <g>
      {line && <line x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} stroke="var(--line-strong)" strokeWidth="1" />}
      {dot && <circle cx={dot[0]} cy={dot[1]} r="2.6" fill="var(--hazard)" />}
      <text x={x} y={y} textAnchor={anchor} fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="0.06em" fill="var(--text-secondary)">{children}</text>
    </g>
  )
}

export default function DeviceRender() {
  return (
    <div style={{
      width: '100%', background: 'var(--paper)', border: '1px solid var(--line-strong)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      boxShadow: '0 32px 64px -34px rgba(20,24,40,0.28)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.98rem', color: 'var(--ink)', letterSpacing: '-0.01em' }}>Tremora v1</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.54rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Wrist module</div>
      </div>

      <div style={{ padding: '6px 14px 2px' }}>
        <svg viewBox="0 0 440 330" width="100%" style={{ display: 'block' }} role="img" aria-label="Schematic of the Tremora wrist module with component callouts">
          <rect x="182" y="20" width="76" height="74" rx="6" fill="var(--paper-2)" stroke="var(--line-strong)" strokeWidth="1.4" />
          <circle cx="220" cy="42" r="4.5" fill="var(--paper)" stroke="var(--line-strong)" strokeWidth="1.2" />
          <circle cx="220" cy="64" r="4.5" fill="var(--paper)" stroke="var(--line-strong)" strokeWidth="1.2" />
          <rect x="182" y="236" width="76" height="76" rx="6" fill="var(--paper-2)" stroke="var(--line-strong)" strokeWidth="1.4" />

          <rect x="150" y="90" width="140" height="150" rx="28" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="162" y="102" width="116" height="126" rx="20" fill="none" stroke="var(--line)" strokeWidth="1" />

          <rect x="176" y="116" width="88" height="98" rx="12" fill="var(--ink)" />
          <polyline points="186,162 196,150 204,168 212,144 220,164 228,152 236,170 246,156 254,162" fill="none" stroke="var(--hazard)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
          <text x="220" y="196" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.12em" fill="var(--text-light-2)">UPDRS 2.4</text>

          <rect x="290" y="150" width="8" height="30" rx="2.5" fill="var(--hazard)" />
          <rect x="205" y="235" width="30" height="5" rx="2.5" fill="var(--ink-3)" />

          <line x1="150" y1="80" x2="290" y2="80" stroke="var(--line-strong)" strokeWidth="1" />
          <line x1="150" y1="76" x2="150" y2="84" stroke="var(--line-strong)" strokeWidth="1" />
          <line x1="290" y1="76" x2="290" y2="84" stroke="var(--line-strong)" strokeWidth="1" />
          <text x="220" y="73" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.08em" fill="var(--text-muted)">30 MM</text>

          <Callout x="318" y="131" dot={[252, 158]} line={[314, 128, 254, 158]}>ESP32-WROOM</Callout>
          <Callout x="318" y="186" dot={[298, 165]} line={[314, 183, 300, 165]}>MED BUTTON</Callout>
          <Callout x="120" y="214" anchor="end" dot={[196, 196]} line={[124, 212, 196, 196]}>MPU-6050 IMU</Callout>
          <Callout x="220" y="290" anchor="middle" line={[220, 240, 220, 276]}>USB-C / CHARGE</Callout>
        </svg>
      </div>

      <div style={{ padding: '9px 18px 13px', borderTop: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
        Schematic preview, approx 50 x 30 x 12 mm
      </div>
    </div>
  )
}
