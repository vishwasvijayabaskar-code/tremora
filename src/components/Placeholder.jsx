/**
 * Placeholder — brutalist media slot. Hairline frame, corner crosshairs,
 * mono caption. Drop real <img> in later by replacing with the same frame.
 */
export default function Placeholder({ label = 'IMAGE', sub, ratio = '16/10', theme = 'paper' }) {
  const dark = theme === 'dark'
  const fg = dark ? 'var(--text-light)' : 'var(--ink)'
  const line = dark ? 'var(--line-light)' : 'var(--line-strong)'
  const corner = { position: 'absolute', width: 10, height: 10, color: 'var(--hazard)', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1 }
  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: ratio,
      border: `1px solid ${line}`,
      background: dark ? 'var(--ink-2)' : 'var(--paper-2)',
      backgroundImage: `repeating-linear-gradient(45deg, ${dark ? 'rgba(244,244,240,0.03)' : 'rgba(10,10,10,0.03)'} 0 1px, transparent 1px 9px)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
    }}>
      <span style={{ ...corner, top: 5, left: 5 }}>+</span>
      <span style={{ ...corner, top: 5, right: 5 }}>+</span>
      <span style={{ ...corner, bottom: 5, left: 5 }}>+</span>
      <span style={{ ...corner, bottom: 5, right: 5 }}>+</span>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.18em', color: fg, textTransform: 'uppercase' }}>
        [ {label} ]
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: dark ? 'var(--text-light-2)' : 'var(--text-muted)' }}>
        {sub || 'PLACEHOLDER / DROP ASSET'}
      </div>
    </div>
  )
}
