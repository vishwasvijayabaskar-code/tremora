import { useRef } from 'react'

export default function Button({ children, variant = 'primary', href, onClick, style: extraStyle }) {
  const btnRef = useRef()

  const base = {
    position: 'relative',
    padding: '14px 32px',
    borderRadius: 'var(--radius-pill)',
    fontSize: '0.85rem',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    border: 'none',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
  }

  const styles = {
    primary: {
      ...base,
      background: 'var(--text-primary)',
      color: 'white',
    },
    secondary: {
      ...base,
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid rgba(26,26,26,0.15)',
    },
    dark: {
      ...base,
      background: 'var(--dark)',
      color: 'var(--cream)',
    },
  }

  const Comp = href ? 'a' : 'button'

  const handleEnter = () => {
    if (!btnRef.current) return
    btnRef.current.style.transform = 'scale(1.04)'
    if (variant === 'primary') {
      btnRef.current.style.background = 'var(--coral)'
      btnRef.current.style.boxShadow = '0 8px 32px rgba(251,79,98,0.25)'
    } else if (variant === 'secondary') {
      btnRef.current.style.borderColor = 'var(--text-primary)'
      btnRef.current.style.background = 'var(--text-primary)'
      btnRef.current.style.color = 'white'
      btnRef.current.style.boxShadow = '0 8px 24px rgba(26,26,26,0.15)'
    }
  }

  const handleLeave = () => {
    if (!btnRef.current) return
    btnRef.current.style.transform = 'scale(1)'
    btnRef.current.style.boxShadow = 'none'
    if (variant === 'primary') {
      btnRef.current.style.background = 'var(--text-primary)'
    } else if (variant === 'secondary') {
      btnRef.current.style.borderColor = 'rgba(26,26,26,0.15)'
      btnRef.current.style.background = 'transparent'
      btnRef.current.style.color = 'var(--text-primary)'
    }
  }

  return (
    <Comp
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      data-cursor-magnetic
      style={{ ...styles[variant], ...extraStyle }}
    >
      {children}
    </Comp>
  )
}
