/**
 * Slider — shared Swiper nav arrows + one-time CSS, industrial-brutalist.
 * Square buttons, mono glyph, hazard-red hover, hairline borders.
 * Arrows drive the Swiper via an instance passed by the parent (reliable
 * click path — no fragile prevEl/nextEl ref binding).
 */
export function injectSliderCSS() {
  if (typeof document === 'undefined' || document.getElementById('tm-slider-css')) return
  const s = document.createElement('style')
  s.id = 'tm-slider-css'
  s.textContent = `
  .swiper{ width:100%; }
  .swiper-slide{ height:auto; }
  .tm-arrows{ display:flex; gap:0; border:1px solid var(--line-strong); }
  .tm-arrow{
    width:56px; height:56px; display:flex; align-items:center; justify-content:center;
    cursor:pointer; background:transparent; color:var(--ink);
    font-family:var(--font-mono); font-size:1.1rem; line-height:1;
    transition: background .25s var(--ease), color .25s var(--ease), opacity .2s ease;
  }
  .tm-arrow.is-prev{ border-right:1px solid var(--line-strong); }
  .tm-arrow.is-light{ color:var(--paper); }
  .tm-arrow.is-light.is-prev{ border-right-color:var(--line-light); }
  .tm-arrows.is-light{ border-color:var(--line-light); }
  @media (hover:hover){
    .tm-arrow:hover{ background:var(--hazard); color:var(--paper); }
  }
  .tm-arrow:active{ background:var(--hazard-2); color:var(--paper); }
  .tm-arrow[disabled]{ opacity:0.25; pointer-events:none; }
  `
  document.head.appendChild(s)
}

export function SliderArrows({ onPrev, onNext, theme = 'dark', prevRef, nextRef }) {
  const t = theme === 'light' ? 'is-light' : ''
  return (
    <div className={`tm-arrows ${t}`}>
      <button ref={prevRef} onClick={onPrev} aria-label="Previous" data-cursor-hover className={`tm-arrow is-prev ${t}`}>&larr;</button>
      <button ref={nextRef} onClick={onNext} aria-label="Next" data-cursor-hover className={`tm-arrow is-next ${t}`}>&rarr;</button>
    </div>
  )
}
