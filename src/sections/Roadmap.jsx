import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Scrollbar, Mousewheel, Keyboard } from 'swiper/modules'
import 'swiper/css/scrollbar'
import Reveal from '../components/Reveal'
import { SliderArrows, injectSliderCSS } from '../components/Slider'

injectSliderCSS()

const cards = [
  { title: 'Neurologist Dashboard', desc: 'Weeks of tremor data, medication-response analytics, and auto-generated clinical summaries in one interface.', detail: 'Severity heatmaps, dose-response overlays, exportable PDF visit reports.', quarter: 'Q3 2026', status: 'IN DEVELOPMENT' },
  { title: 'Clinical Validation', desc: 'Pilot study with neurology partners to validate UPDRS-proxy accuracy against in-clinic assessment.', detail: 'Target n=30, Bland-Altman agreement vs. clinical UPDRS scoring.', quarter: 'Q4 2026', status: 'PLANNED' },
  { title: 'Partner Platform', desc: 'API and integration layer for neurology practices, enabling Medicare RPM billing (CPT 99453/99454).', detail: 'Reimbursable remote monitoring — up to ~$120/patient/month recurring.', quarter: 'Q1 2027', status: 'IN DEVELOPMENT' },
  { title: 'Med Response Analytics', desc: 'Before-vs-after scoring for every dose, revealing which medications are actually working.', detail: 'Auto-detects wearing-off periods and dyskinesia windows from tremor curves.', quarter: 'Q2 2027', status: 'IN DEVELOPMENT' },
  { title: 'Pilot Program', desc: "Early access for neurology practices and Parkinson's patients. Limited spots available.", detail: 'First 50 devices shipping to design partners. Join the waitlist below.', quarter: 'OPEN NOW', status: 'COMING SOON' },
]

export default function Roadmap() {
  const sw = useRef(null)
  return (
    <section id="roadmap" style={{ background: 'var(--paper-2)', padding: 'var(--section-pad) 0', overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="mono-label" style={{ color: 'var(--hazard)', marginBottom: 18 }}>[ 06 / ROADMAP ]</div>
            <Reveal as="h2" variant="lines" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 8vw, 7rem)', color: 'var(--ink)', lineHeight: 0.88, letterSpacing: '-0.03em', margin: 0 }}>
              The road from here.
            </Reveal>
          </div>
          <div className="hide-mobile">
            <SliderArrows theme="dark" onPrev={() => sw.current?.slidePrev()} onNext={() => sw.current?.slideNext()} />
          </div>
        </div>
        <div style={{ height: 2, background: 'var(--ink)', marginTop: 28 }} />
      </div>

      <Swiper
        modules={[FreeMode, Scrollbar, Mousewheel, Keyboard]}
        slidesPerView="auto" spaceBetween={0} grabCursor
        freeMode={{ enabled: true, momentum: true }}
        mousewheel={{ forceToAxis: true, sensitivity: 0.5 }}
        keyboard={{ enabled: true }}
        scrollbar={{ draggable: true, el: '.tm-rm-scrollbar' }}
        onSwiper={(s) => { sw.current = s }}
        style={{ paddingLeft: 'max(20px, calc((100vw - 1280px)/2))', paddingRight: 'max(20px, calc((100vw - 1280px)/2))' }}
      >
        {cards.map((c, i) => {
          const live = c.status === 'COMING SOON'
          return (
            <SwiperSlide key={i} style={{ width: 'min(420px, 86vw)' }}>
              <article style={{
                height: '100%', minHeight: 340, padding: '30px 32px',
                background: live ? 'var(--ink)' : 'var(--paper)',
                color: live ? 'var(--paper)' : 'var(--ink)',
                borderTop: '1px solid var(--line-strong)', borderBottom: '1px solid var(--line-strong)',
                borderLeft: '1px solid var(--line-strong)',
                borderRight: i === cards.length - 1 ? '1px solid var(--line-strong)' : 'none',
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', marginBottom: 18 }}>
                  <span style={{ color: 'var(--hazard)' }}>{String(i + 1).padStart(2, '0')} / 05</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: live ? 'var(--text-light-2)' : 'var(--text-muted)' }}>
                    <span style={{ width: 6, height: 6, background: 'var(--hazard)', display: 'inline-block' }} />{c.status}
                  </span>
                </div>
                <div style={{ height: 1, background: live ? 'var(--line-light)' : 'var(--line)', marginBottom: 20 }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', lineHeight: 0.96, marginBottom: 16, color: live ? 'var(--paper)' : 'var(--ink)' }}>{c.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', lineHeight: 1.6, textTransform: 'none', color: live ? 'var(--text-light-2)' : 'var(--text-secondary)', marginBottom: 16 }}>{c.desc}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', lineHeight: 1.55, letterSpacing: '0.02em', color: live ? 'var(--text-light-2)' : 'var(--text-muted)', marginBottom: 'auto' }}>{c.detail}</p>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginTop: 24, color: live ? 'var(--hazard-2)' : 'var(--ink)' }}>{c.quarter}</div>
              </article>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <div className="container" style={{ marginTop: 24 }}>
        <div className="tm-rm-scrollbar" style={{ position: 'relative', height: 2, background: 'var(--line)' }} />
      </div>
      <style>{`
        .tm-rm-scrollbar .swiper-scrollbar-drag{ background: var(--hazard); height: 2px; border-radius: 0; }
      `}</style>
    </section>
  )
}
