import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCountUp } from '../hooks/useCountUp'
import Reveal from '../components/Reveal'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { id: 'SYS-01', stat: '<50ms', statLabel: 'INFERENCE TIME', title: 'On-Device ML',
    desc: 'Random Forest classifier runs entirely on the ESP32. No cloud, no latency, no data exposure — tremor scored at the wrist.',
    detail: 'Trained on 2,400+ labeled tremor windows. Compressed to fit 520KB SRAM.', tags: ['EDGE-AI', 'PRIVACY', 'REALTIME'] },
  { id: 'SYS-02', stat: '4-6Hz', statLabel: 'TREMOR BAND', title: 'FFT Signal Analysis',
    desc: 'Fast Fourier Transform isolates the Parkinsonian tremor band from noise — rest tremor vs voluntary movement.',
    detail: 'Sliding 256-sample Hamming window @ 200Hz. PSD across 3-8Hz, 0.78Hz resolution.', tags: ['SPECTRAL', 'BAND-ISO', 'DENOISE'] },
  { id: 'SYS-03', stat: '0-4', statLabel: 'SEVERITY SCALE', title: 'UPDRS Proxy Score',
    desc: 'Maps sensor data to the clinical UPDRS tremor subscale — a familiar metric without in-person observation.',
    detail: 'Regression: RMS amplitude + dominant freq + spectral entropy → UPDRS 3.15-3.18.', tags: ['CLINICAL', 'CONTINUOUS', 'VALIDATED'] },
  { id: 'SYS-04', stat: '1-PRESS', statLabel: 'DOSE CAPTURE', title: 'Medication Logging',
    desc: 'A physical button logs exact medication timing, building before/after tremor response curves for every dose.',
    detail: 'Timestamps at ±50ms. Dashboard overlays dose events on the severity timeline.', tags: ['DOSE', 'RESPONSE', 'ADHERENCE'] },
  { id: 'SYS-05', stat: '24/7', statLabel: 'MONITORING', title: 'Continuous Data',
    desc: '200Hz sampling runs all day. SPIFFS logs raw CSV per session. Weeks of data between visits.',
    detail: '2000mAh LiPo → ~18hr active recording, auto-segmented into sleep/wake sessions.', tags: ['ALWAYS-ON', 'CSV', 'MULTI-WEEK'] },
  { id: 'SYS-06', stat: 'LIVE', statLabel: 'DATA SYNC', title: 'Neurologist Dashboard',
    desc: 'A web dashboard surfaces weeks of tremor patterns with auto-generated severity reports for clinical review.',
    detail: 'BLE → companion app → cloud API → provider dashboard. HIPAA-aligned encryption.', tags: ['PORTAL', 'REPORTS', 'HIPAA'] },
]

function Stat({ display }) { const { ref, value } = useCountUp(display); return <span ref={ref}>{value}</span> }

export default function Features() {
  const sectionRef = useRef()
  const pinHeightRef = useRef()
  const containerRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinHeight = pinHeightRef.current
      const container = containerRef.current
      const medias = gsap.utils.toArray('.tm-flash')
      const n = medias.length
      const gap = 64

      ScrollTrigger.create({ trigger: pinHeight, start: 'top top', end: 'bottom bottom', pin: container, anticipatePin: 1, invalidateOnRefresh: true })

      const distPerMedia = () => (pinHeight.clientHeight - window.innerHeight) / n
      const triggerFactor = 0.85

      gsap.set(medias, { y: () => gap * (n - 1), z: () => -gap * (n - 1) })

      medias.forEach((media, index) => {
        const isLast = index === 0
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinHeight,
            start: () => 'top top+=' + distPerMedia() * index * triggerFactor,
            end: () => 'bottom bottom+=' + distPerMedia() * index * triggerFactor,
            scrub: 0.3, invalidateOnRefresh: true,
          },
        })
        for (let i = 0; i < n - 1; i++) {
          tl.to(media, { y: '-=' + gap, z: '+=' + gap, ease: 'power2.inOut' })
        }
        if (!isLast) {
          tl.to(media, { yPercent: -120, y: '-110vh', scale: 1.1, rotation: (Math.random() - 0.5) * 16, ease: 'power3.in' })
        }
      })
    }, sectionRef)

    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    const t = setTimeout(refresh, 400)
    return () => { clearTimeout(t); ctx.revert() }
  }, [])

  return (
    <section id="features" ref={sectionRef} style={{ background: 'var(--ink)', color: 'var(--text-light)' }}>
      {/* header (scrolls in) */}
      <div className="container" style={{ paddingTop: 'var(--section-pad)' }}>
        <div className="mono-label" style={{ color: 'var(--hazard)', marginBottom: 18 }}>[ 03 / TECHNOLOGY ]</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
          <Reveal as="h2" variant="lines" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 7vw, 6rem)', color: 'var(--paper)', lineHeight: 0.9, letterSpacing: '-0.03em', margin: 0 }}>
            Six systems. One wrist.
          </Reveal>
          <Reveal style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', lineHeight: 1.7, color: 'var(--text-light-2)', maxWidth: 280, letterSpacing: '0.03em' }}>
            SCROLL TO ADVANCE THE STACK. SIX SUBSYSTEMS, ONE OUTCOME — TREMOR DATA A NEUROLOGIST CAN ACT ON.
          </Reveal>
        </div>
        <div style={{ height: 2, background: 'var(--hazard)', marginTop: 28 }} />
      </div>

      {/* pinned flashcard stack */}
      <div ref={pinHeightRef} style={{ height: `${(features.length + 1) * 75}vh`, position: 'relative' }}>
        <div ref={containerRef} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: 'min(760px, 88vw)', height: 'min(560px, 74vh)', transformStyle: 'preserve-3d', perspective: 1400 }}>
            {features.map((f, i) => (
              <article key={i} className="tm-flash" style={{
                position: 'absolute', inset: 0, zIndex: features.length - i,
                background: 'var(--ink-2)', border: '1px solid var(--line-light)',
                padding: 'clamp(28px, 4vw, 48px)', display: 'flex', flexDirection: 'column',
                willChange: 'transform',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.66rem', letterSpacing: '0.14em', color: 'var(--text-light-2)' }}>
                  <span style={{ color: 'var(--hazard)' }}>{f.id}</span>
                  <span>{f.statLabel}</span>
                </div>
                <div style={{ height: 1, background: 'var(--line-light)', margin: '18px 0' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: 'var(--paper)', lineHeight: 0.9 }}><Stat display={f.stat} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--paper)', lineHeight: 0.95, margin: '16px 0 14px' }}>{f.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-light-2)', textTransform: 'none', marginBottom: 12 }}>{f.desc}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', lineHeight: 1.55, color: 'var(--text-muted)', letterSpacing: '0.02em', marginBottom: 'auto' }}>{f.detail}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 22 }}>
                  {f.tags.map((t, j) => <span key={j} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--paper)', border: '1px solid var(--line-light)', padding: '5px 10px' }}>{t}</span>)}
                </div>
                <div style={{ position: 'absolute', bottom: 16, right: 20, fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>{String(i + 1).padStart(2, '0')} / 06</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
