import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, Keyboard } from 'swiper/modules'
import { useCountUp } from '../hooks/useCountUp'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import { SliderArrows, injectSliderCSS } from '../components/Slider'

injectSliderCSS()

const cards = [
  { n: 'UNIT', label: 'Tremora v1', desc: 'Wrist-worn module, ~50×30×12mm. Six subsystems, one purpose: clinical-grade tremor data, continuously.', intro: true },
  { n: 'C-01', label: 'ESP32-WROOM-32', desc: 'Dual-core MCU with Wi-Fi + BLE. Runs the classifier and streams to the companion app.' },
  { n: 'C-02', label: 'MPU-6050 IMU', desc: '6-axis motion sensing at 200Hz. The raw accel + gyro every tremor reading is built from.' },
  { n: 'C-03', label: 'Random Forest', desc: '86.4% accuracy, on-device. Scores tremor severity in <50ms per window — no cloud round-trip.' },
  { n: 'C-04', label: 'TP4056 + LiPo', desc: '2000mAh, USB-C rechargeable. ~18 hours of active recording per charge.' },
  { n: 'C-05', label: 'SPIFFS Storage', desc: 'Per-session CSV logging on flash. Weeks of raw data retained for export and review.' },
  { n: 'C-06', label: 'Med Button', desc: 'One-press dose-event logging. Builds the before/after response curve for every medication.' },
]
const prices = [{ v: '$199', l: 'TARGET PRICE' }, { v: '~$60', l: 'BOM @ 1K' }, { v: '~70%', l: 'GROSS MARGIN' }]

function Price({ v }) { const { ref, value } = useCountUp(v); return <span ref={ref}>{value}</span> }

export default function Device() {
  const sw = useRef(null)
  return (
    <section id="device" style={{ background: 'transparent', padding: 'var(--section-pad) 0', overflow: 'hidden' }}>
      <div className="container">
        <div className="mono-label" style={{ color: 'var(--hazard)', marginBottom: 18 }}>[ 04 / HARDWARE ]</div>
        <Reveal as="h2" variant="lines" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 8vw, 7rem)', color: 'var(--ink)', lineHeight: 0.88, letterSpacing: '-0.03em', marginBottom: 36 }}>
          What's inside the band.
        </Reveal>
        <div style={{ height: 2, background: 'var(--ink)', marginBottom: 48 }} />

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
          {/* LEFT: render placeholder + spec list + price row */}
          <div>
            <Reveal><Placeholder label="DEVICE RENDER" sub="EXPLODED VIEW / SOON" ratio="4/3" theme="paper" /></Reveal>
            <Reveal style={{ marginTop: 28, fontFamily: 'var(--font-sans)', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-secondary)', textTransform: 'none' }}>
              Purpose-built hardware for continuous monitoring. Swipe the deck — every component chosen for clinical-grade data quality.
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', marginTop: 28, border: '1px solid var(--line-strong)' }}>
              {prices.map((p, i) => (
                <Reveal key={i} delay={i * 0.07} style={{ padding: '20px 16px', borderRight: i < 2 ? '1px solid var(--line-strong)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--ink)', lineHeight: 1 }}><Price v={p.v} /></div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--text-muted)', marginTop: 8 }}>{p.l}</div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* RIGHT: brutalist EffectCards deck */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <Swiper
              modules={[EffectCards, Keyboard]} effect="cards" grabCursor keyboard={{ enabled: true }}
              cardsEffect={{ perSlideOffset: 8, perSlideRotate: 2, slideShadows: false }}
              onSwiper={(s) => { sw.current = s }}
              style={{ width: 'min(340px, 82vw)', height: 430 }}
            >
              {cards.map((c, i) => (
                <SwiperSlide key={i} data-cursor-text="DRAG" style={{ border: '1px solid var(--line-strong)' }}>
                  <div style={{
                    width: '100%', height: '100%', padding: '28px 26px',
                    background: c.intro ? 'var(--ink)' : 'var(--paper)',
                    color: c.intro ? 'var(--paper)' : 'var(--ink)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.64rem', letterSpacing: '0.12em' }}>
                      <span style={{ color: 'var(--hazard)' }}>{c.n}</span>
                      <span style={{ color: c.intro ? 'var(--text-light-2)' : 'var(--text-muted)' }}>{c.intro ? 'OVERVIEW' : `${c.n} / C-06`}</span>
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: c.intro ? '2.1rem' : '1.7rem', lineHeight: 0.95, marginBottom: 14, color: c.intro ? 'var(--paper)' : 'var(--ink)' }}>{c.label}</h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', lineHeight: 1.6, textTransform: 'none', color: c.intro ? 'var(--text-light-2)' : 'var(--text-secondary)' }}>{c.desc}</p>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', color: c.intro ? 'var(--text-light-2)' : 'var(--text-muted)' }}>
                      {c.intro ? '>>> SWIPE TO EXPLORE' : 'TREMORA / TELEMETRY UNIT'}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <SliderArrows theme="dark" onPrev={() => sw.current?.slidePrev()} onNext={() => sw.current?.slideNext()} />
          </div>
        </div>
      </div>
    </section>
  )
}
