import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel, Keyboard } from 'swiper/modules'
import { useCountUp } from '../hooks/useCountUp'
import Reveal from '../components/Reveal'
import { SliderArrows, injectSliderCSS } from '../components/Slider'

injectSliderCSS()

const features = [
  { id: 'SYS-01', stat: '<50ms', statLabel: 'inference time', title: 'On-Device ML',
    desc: 'Random Forest classifier runs entirely on the ESP32. No cloud, no latency, no data exposure — tremor scored at the wrist.',
    detail: 'Trained on 2,400+ labeled tremor windows. Compressed to fit 520KB SRAM.',
    tags: ['EDGE-AI', 'PRIVACY', 'REALTIME'] },
  { id: 'SYS-02', stat: '4-6Hz', statLabel: 'tremor band', title: 'FFT Signal Analysis',
    desc: 'Fast Fourier Transform isolates the Parkinsonian tremor band from noise — rest tremor vs voluntary movement.',
    detail: 'Sliding 256-sample Hamming window @ 200Hz. PSD across 3-8Hz, 0.78Hz resolution.',
    tags: ['SPECTRAL', 'BAND-ISO', 'DENOISE'] },
  { id: 'SYS-03', stat: '0-4', statLabel: 'severity scale', title: 'UPDRS Proxy Score',
    desc: 'Maps sensor data to the clinical UPDRS tremor subscale — a familiar metric without in-person observation.',
    detail: 'Regression: RMS amplitude + dominant freq + spectral entropy → UPDRS 3.15-3.18.',
    tags: ['CLINICAL', 'CONTINUOUS', 'VALIDATED'] },
  { id: 'SYS-04', stat: '1-PRESS', statLabel: 'dose capture', title: 'Medication Logging',
    desc: 'A physical button logs exact medication timing, building before/after tremor response curves for every dose.',
    detail: 'Timestamps at ±50ms. Dashboard overlays dose events on the severity timeline.',
    tags: ['DOSE', 'RESPONSE', 'ADHERENCE'] },
  { id: 'SYS-05', stat: '24/7', statLabel: 'monitoring', title: 'Continuous Data',
    desc: '200Hz sampling runs all day. SPIFFS logs raw CSV per session. Weeks of data between visits.',
    detail: '2000mAh LiPo → ~18hr active recording, auto-segmented into sleep/wake sessions.',
    tags: ['ALWAYS-ON', 'CSV', 'MULTI-WEEK'] },
  { id: 'SYS-06', stat: 'LIVE', statLabel: 'data sync', title: 'Neurologist Dashboard',
    desc: 'A web dashboard surfaces weeks of tremor patterns with auto-generated severity reports for clinical review.',
    detail: 'BLE → companion app → cloud API → provider dashboard. HIPAA-aligned encryption.',
    tags: ['PORTAL', 'REPORTS', 'HIPAA'] },
]

function Stat({ display }) {
  const { ref, value } = useCountUp(display)
  return <span ref={ref}>{value}</span>
}

export default function Features() {
  const sw = useRef(null)
  const [end, setEnd] = useState({ begin: true, end: false })

  return (
    <section id="features" style={{ background: 'var(--ink)', color: 'var(--text-light)', padding: 'var(--section-pad) 0', overflow: 'hidden' }}>
      <div className="container">
        {/* header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap', marginBottom: 28 }}>
          <div style={{ flex: '1 1 520px' }}>
            <div className="mono-label" style={{ color: 'var(--hazard)', marginBottom: 18 }}>[ 03 / TECHNOLOGY ]</div>
            <Reveal as="h2" variant="lines" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 8vw, 7rem)', color: 'var(--paper)', lineHeight: 0.88, letterSpacing: '-0.03em', margin: 0 }}>
              Six systems. One wrist.
            </Reveal>
          </div>
          <Reveal style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', lineHeight: 1.7, color: 'var(--text-light-2)', maxWidth: 300, letterSpacing: '0.03em' }}>
            EVERY ENGINEERING DECISION OPTIMIZED FOR ONE OUTCOME — CONTINUOUS TREMOR DATA A NEUROLOGIST CAN ACT ON. DRAG / SCROLL / ARROWS.
          </Reveal>
        </div>
        <div style={{ height: 2, background: 'var(--hazard)', marginBottom: 40 }} />
      </div>

      <Swiper
        modules={[FreeMode, Mousewheel, Keyboard]}
        slidesPerView="auto"
        spaceBetween={0}
        freeMode={{ enabled: true, momentum: true }}
        mousewheel={{ forceToAxis: true, sensitivity: 0.5 }}
        keyboard={{ enabled: true }}
        grabCursor
        onSwiper={(s) => { sw.current = s; setEnd({ begin: s.isBeginning, end: s.isEnd }) }}
        onSlideChange={(s) => setEnd({ begin: s.isBeginning, end: s.isEnd })}
        onReachEnd={() => setEnd((e) => ({ ...e, end: true }))}
        style={{ paddingLeft: 'max(20px, calc((100vw - 1280px)/2))', paddingRight: 'max(20px, calc((100vw - 1280px)/2))' }}
      >
        {features.map((f, i) => (
          <SwiperSlide key={i} style={{ width: 'min(380px, 84vw)', borderRight: i === features.length - 1 ? '1px solid var(--line-light)' : 'none' }}>
            <article style={{
              height: '100%', minHeight: 460, padding: '28px 30px',
              borderTop: '1px solid var(--line-light)', borderLeft: '1px solid var(--line-light)',
              borderBottom: '1px solid var(--line-light)',
              background: 'var(--ink-2)', display: 'flex', flexDirection: 'column', gap: 0,
            }}>
              {/* telemetry top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--text-light-2)', paddingBottom: 18 }}>
                <span style={{ color: 'var(--hazard)' }}>{f.id}</span>
                <span>{f.statLabel.toUpperCase()}</span>
              </div>
              <div style={{ height: 1, background: 'var(--line-light)' }} />
              {/* big stat */}
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.6rem', lineHeight: 1, color: 'var(--paper)', padding: '22px 0 26px' }}>
                <Stat display={f.stat} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--paper)', lineHeight: 0.95, marginBottom: 14 }}>{f.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-light-2)', textTransform: 'none', marginBottom: 12 }}>{f.desc}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', lineHeight: 1.55, color: 'var(--text-muted)', letterSpacing: '0.02em', marginBottom: 'auto' }}>{f.detail}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 22 }}>
                {f.tags.map((t, j) => (
                  <span key={j} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--text-light)', border: '1px solid var(--line-light)', padding: '4px 9px' }}>{t}</span>
                ))}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28 }}>
        <SliderArrows theme="light"
          onPrev={() => sw.current?.slidePrev()}
          onNext={() => sw.current?.slideNext()} />
      </div>
    </section>
  )
}
