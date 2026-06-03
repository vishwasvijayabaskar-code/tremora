import { useEffect, useRef, useState, Children } from 'react'

/**
 * Reveal — scroll-triggered entrance using IntersectionObserver (NOT GSAP
 * ScrollTrigger, so it never touches the pinned horizontal-scroll system).
 *
 * variant:
 *  - "fade"  : block fades + rises + de-blurs (house ease)
 *  - "mask"  : overflow-clipped lines rise from below (for headings)
 *  - "lines" : splits text children into words and rises them in a stagger
 *
 * Honors prefers-reduced-motion (shows instantly).
 */
const EASE = 'cubic-bezier(0.625, 0.05, 0, 1)'

export default function Reveal({
  children,
  as: Tag = 'div',
  variant = 'fade',
  delay = 0,
  duration = 0.9,
  y = 28,
  stagger = 0.06,
  once = true,
  amount = 0.2,
  style = {},
  className,
  ...props
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduce) { setShown(true); return }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true)
            if (once) io.disconnect()
          } else if (!once) {
            setShown(false)
          }
        })
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce, once, amount])

  // LINES: split string children into word spans that rise in a stagger
  if (variant === 'lines') {
    const text = typeof children === 'string' ? children : ''
    const words = text.split(' ')
    return (
      <Tag
        ref={ref}
        className={className}
        style={{ ...style }}
        {...props}
      >
        {words.map((w, i) => (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: shown ? 'translateY(0)' : 'translateY(110%)',
                transition: `transform ${duration}s ${EASE}`,
                transitionDelay: `${delay + i * stagger}s`,
                willChange: 'transform',
              }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          </span>
        ))}
      </Tag>
    )
  }

  // MASK: single clipped block that rises
  if (variant === 'mask') {
    return (
      <span ref={ref} style={{ display: 'block', overflow: 'hidden', ...style }} className={className} {...props}>
        <span
          style={{
            display: 'block',
            transform: shown ? 'translateY(0)' : 'translateY(110%)',
            transition: `transform ${duration}s ${EASE}`,
            transitionDelay: `${delay}s`,
            willChange: 'transform',
          }}
        >
          {children}
        </span>
      </span>
    )
  }

  // FADE (default): rise + opacity + slight de-blur
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
        filter: shown ? 'blur(0)' : 'blur(6px)',
        transition: `opacity ${duration}s ${EASE}, transform ${duration}s ${EASE}, filter ${duration}s ${EASE}`,
        transitionDelay: `${delay}s`,
        willChange: 'transform, opacity',
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  )
}
