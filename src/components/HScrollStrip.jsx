import { useEffect, useRef } from 'react'

/**
 * HScrollStrip — native horizontal scroll-snap rail with mouse drag-to-scroll
 * and prev/next nudge arrows. NO GSAP / NO pin (so it can't reintroduce the
 * janky pinned horizontal-scroll the Features section used to have). Touch uses
 * native overflow scrolling. Renders a hazard progress bar under the rail.
 * Dark-themed (lives on ink sections). Children are the slides; give each
 * `scrollSnapAlign: 'start'` and a fixed flex-basis width.
 */
export default function HScrollStrip({ children, title = '', ariaLabel }) {
  const railRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    let down = false, startX = 0, startScroll = 0, moved = false

    const onDown = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return // touch = native scroll
      down = true; moved = false
      startX = e.pageX; startScroll = rail.scrollLeft
    }
    const onMove = (e) => {
      if (!down) return
      const dx = e.pageX - startX
      if (Math.abs(dx) > 3) moved = true
      rail.scrollLeft = startScroll - dx
    }
    const onUp = () => { down = false }
    const onClickCapture = (e) => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false }
    }
    const onScroll = () => {
      if (!barRef.current) return
      const max = rail.scrollWidth - rail.clientWidth
      const t = max > 0 ? rail.scrollLeft / max : 0
      barRef.current.style.transform = `scaleX(${(0.14 + t * 0.86).toFixed(3)})`
    }
    onScroll()

    rail.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    rail.addEventListener('click', onClickCapture, true)
    rail.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(onScroll)
    ro.observe(rail)

    return () => {
      rail.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      rail.removeEventListener('click', onClickCapture, true)
      rail.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [])

  const nudge = (dir) => {
    const rail = railRef.current
    if (!rail) return
    const w = rail.firstChild?.getBoundingClientRect().width || 320
    rail.scrollBy({ left: dir * (w + 16), behavior: 'smooth' })
  }

  const arrow = {
    width: 40, height: 40, border: '1px solid var(--line-light)', background: 'transparent',
    color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: '1.2rem', lineHeight: 1,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'none',
    transition: 'background 0.2s var(--ease), border-color 0.2s var(--ease)',
  }
  const hover = (e, on) => {
    e.currentTarget.style.background = on ? 'var(--hazard)' : 'transparent'
    e.currentTarget.style.borderColor = on ? 'var(--hazard)' : 'var(--line-light)'
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, gap: 16 }}>
        <span className="mono-label" style={{ color: 'var(--text-muted)' }}>{title}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button aria-label="Scroll left" onClick={() => nudge(-1)} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)} style={arrow}>{'‹'}</button>
          <button aria-label="Scroll right" onClick={() => nudge(1)} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)} style={arrow}>{'›'}</button>
        </div>
      </div>

      <div
        ref={railRef}
        aria-label={ariaLabel}
        data-cursor-text="DRAG"
        style={{
          display: 'flex', gap: 0, overflowX: 'auto', overflowY: 'hidden',
          scrollSnapType: 'x proximity', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
          userSelect: 'none',
        }}
      >
        {children}
      </div>

      <div style={{ height: 2, background: 'var(--line-light)', marginTop: 20, overflow: 'hidden' }}>
        <div ref={barRef} style={{ height: '100%', background: 'var(--hazard)', transformOrigin: 'left center', transform: 'scaleX(0.14)' }} />
      </div>
    </div>
  )
}
