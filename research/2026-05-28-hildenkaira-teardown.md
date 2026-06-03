# Site Teardown: Hildén & Kaira

**URL:** https://www.hildenkaira.fi/
**Built by:** Dylan Brouwer (dylanbrouwer.design) — footer credit
**Platform:** Webflow + heavy custom code (Slater-hosted JS)
**Date analyzed:** 2026-05-28

## Tech Stack (confirmed from source)

| Tech | Evidence | Purpose |
|---|---|---|
| Webflow | `data-wf-*`, `w-mod-js`, generator meta | Page builder/host |
| GSAP 3.15 | script tags | All animation |
| GSAP SplitText | `gsap.registerPlugin(SplitText...)`, `data-text-wrap` | Line-by-line text reveal |
| GSAP ScrollTrigger | script + inline ScrollTrigger.create | Pin/scrub effects |
| GSAP Draggable + InertiaPlugin | script tags, flick-cards, momentum-hover | Tinder-swipe cards, magnetic hover |
| Locomotive Scroll | locomotive-scroll bundle, `data-scroll-speed` | Smooth scroll + parallax (popup refs `window.lenis` too) |
| Swiper 12 | swiper-bundle, `.swiper-group` | Client-deck carousel |
| HLS.js + Bunny Stream | hls.js, `b-cdn.net/*/playlist.m3u8` | Lazy streaming bg video |
| Slater | assets.slater.app/slater/19381/*.js | Custom JS bundle host |
| Osmo adaptive scaling | `--size-font` clamp system | Fluid type across breakpoints |

## Design System

### Type
- **PP Editorial New** (serif) — display headings, the "expensive" look
- **PP Neue Montreal Medium** — body
- Inter — webfont fallback
- Fluid sizing: `--size-font = calc(--size-container / (2200/16))`, container clamped per breakpoint. Everything in `em`/`rem` off that → scales smoothly 320px→3840px.

### Color (theme classes, CSS-var swap per section)
`theme-dark`, `theme-lime` (accent green), `theme-chrome` (metallic), `theme-turquoise`, `theme-white`, `theme-dark-grey`, `theme-media`. Each section sets its own `--_theme---*` vars → one component, many palettes. Error red `#FF4C24`.

### Decoration
3D metallic emoji (heart/fire/wink/mic/pigeon/eyes) as floating + inline accents. Quote/star glyphs as SVG.

## Effects Breakdown (the gold)

| Effect | Implementation | Complexity | Cloneable |
|---|---|---|---|
| Page-load reveal | `visibility:hidden` on staged els via `w-mod-js`, pageload-bg overlay wipes, JS staggers in | Med | Yes |
| Hero logo split-letters | 12 separate letter imgs `is-1..is-12`, staggered reveal | Low | Yes (Tremora already does) |
| Heading line-reveal | SplitText `type:lines, mask:lines` → lines translateY 110%→0, stagger | Med | Yes |
| Services card-stack | pinned `.services-pin-height`, cards offset y+z, scrub timeline, last flies up + rotates | High | Yes |
| Flick cards | Draggable+Inertia Tinder stack, `data-flick-cards-item-status` → opacity/rotate/pointer per position | High | Partial |
| Stat count-up | `data-count` nums animate 0→value on view | Low | Yes |
| Momentum/magnetic hover | `data-momentum-hover` InertiaPlugin, element springs toward cursor | Med | Yes |
| Button hover | text-shadow duplicate (`--text-duplicate-distance`) text rises + shadow fills, icon bg rotate 90°, arrow translate 200% | Low | Yes (pure CSS) |
| Image parallax | Locomotive `data-scroll-speed=0.1/-0.05` | Low | Yes |
| Bunny video bg | IO lazy HLS attach, autoplay in-view/pause out, single-player registry | High | Yes |
| Testimonial autoplay | line-mask transitions + image `clip-path: circle()` reveal, 10s autoplay, ScrollTrigger gate | Med | Yes |

### Button hover (exact, pure CSS — steal verbatim)
```css
.btn-icon-content__text{ --text-duplicate-distance:1.5em; text-shadow:0 var(--text-duplicate-distance) var(--hover-text); }
@media (hover:hover){
  .btn:hover .btn-icon-content__text{ transform: translateY(calc(-1*var(--text-duplicate-distance))); }
  .btn:hover .btn-icon-icon__bg{ transform: rotate(90deg); }
  .btn:hover .btn-icon-icon__arrow{ transform: translateX(200%); }
}
/* all targets share: transition: transform .525s cubic-bezier(0.625,0.05,0,1); */
```

### Card-stack (services) — core logic
```js
ScrollTrigger.create({ trigger: pinHeight, start:'top top', end:'bottom bottom', pin: container })
const dist = (pinHeight.clientHeight - innerHeight)/medias.length
gsap.set(medias,{ y:gap*(n-1), z:-gap*(n-1) })   // gap=80
medias.forEach((m,i)=>{
  tl = timeline({scrollTrigger:{trigger:pinHeight, start:'top top+='+dist*i*0.85, end:'bottom bottom+='+dist*i*0.85, scrub:0.2}})
  // each card steps forward y-=gap z+=gap per other card (power2.inOut)
  // non-last card then flies: yPercent:-100, y:'-100vh', scale:1.2, rotation:random, power4.in
})
```

## Best easing/timing (use everywhere for the "expensive" feel)
- `cubic-bezier(0.625, 0.05, 0, 1)` — the house ease (buttons, swiper)
- line reveals: `power4.inOut`, dur 0.6–0.75, stagger amount 0.25–0.4
- card scrub: `scrub: 0.2` (tiny, not 1)

---

## What Tremora should steal (prioritized)

Tremora = React19+Vite, GSAP+Lenis, inline styles. Already has: chrome hero letters, PerspectiveTilt, sensor cursor, 2 h-scroll pins (Features/Roadmap), marquee, parallax.

**TIER 1 — high value, low risk (don't touch fragile pinned scroll):**
1. **Heading line-reveal** on every section header (Problem/HowItWorks/Device/Team/CTA). Manual line-split + ScrollTrigger or SplitText. Biggest perceived-quality jump.
2. **Stat count-up** — FIG stats (200Hz / 86.4% / <50ms / 4-6Hz). IntersectionObserver → count 0→value. Safe, no ScrollTrigger.
3. **Button hover** text-duplicate + icon-rotate — pure CSS into Button.jsx. Premium, zero risk.
4. **House ease** `cubic-bezier(0.625,0.05,0,1)` — swap into existing transitions for cohesion.

**TIER 2 — medium:**
5. **Magnetic CTA cards** — momentum hover on CTA buttons via existing rAF (cursor already tracked).
6. **Page-load reveal** — overlay wipe + hero stagger on first paint.
7. **Serif display face** — add a PP-Editorial-style serif for one accent heading to break the all-caps mono look.

**TIER 3 — high effort / risk:**
8. **Card-stack section** — adds a 3rd pin; risky given recent scroll-jank fight. Only if replacing an existing section, not adding.
9. **Bunny/HLS video** — Tremora has no video content yet; skip.

## Notes
- Tremora's PerspectiveTilt ≈ their flick-card depth trick; keep.
- Do NOT add more pinned ScrollTriggers near Features/Roadmap (just fixed jank there).
- All Tier-1 items avoid the pin system entirely.
