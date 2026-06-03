/**
 * Button — Hildén & Kaira-style hover: the label flips up to a duplicate of
 * itself (text-shadow trick), an optional arrow slides out and back, and the
 * fill animates. Pure CSS hover via a one-time injected stylesheet, so it works
 * with inline-style components. House ease: cubic-bezier(0.625,0.05,0,1).
 */
const EASE = 'cubic-bezier(0.625, 0.05, 0, 1)'

if (typeof document !== 'undefined' && !document.getElementById('tm-btn-css')) {
  const s = document.createElement('style')
  s.id = 'tm-btn-css'
  s.textContent = `
  .tm-btn{
    --dup: 1.4em;
    position:relative; display:inline-flex; align-items:center; gap:10px;
    padding:15px 30px; border-radius:var(--radius-pill);
    font-size:0.8rem; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;
    cursor:pointer; overflow:hidden; border:none; line-height:1;
    transition: background .5s ${EASE}, color .5s ${EASE}, border-color .5s ${EASE};
  }
  .tm-btn__label{ position:relative; display:inline-block; overflow:hidden; }
  .tm-btn__label > span{
    display:inline-block;
    text-shadow: 0 var(--dup) currentColor;
    transition: transform .55s ${EASE};
  }
  .tm-btn__arrow{
    width:11px; height:11px; flex:none; overflow:hidden; position:relative;
  }
  .tm-btn__arrow svg{ position:absolute; inset:0; width:100%; height:100%;
    transition: transform .55s ${EASE}; }
  .tm-btn__arrow svg + svg{ transform: translateX(-140%); }

  @media (hover:hover) and (pointer:fine){
    .tm-btn:hover .tm-btn__label > span{ transform: translateY(calc(-1 * var(--dup))); }
    .tm-btn:hover .tm-btn__arrow svg:first-child{ transform: translateX(140%); }
    .tm-btn:hover .tm-btn__arrow svg + svg{ transform: translateX(0); }
    .tm-btn.is-primary:hover{ background: var(--coral); color:#fff; }
    .tm-btn.is-secondary:hover{ background: var(--text-primary); color:#fff; border-color: var(--text-primary); }
    .tm-btn.is-dark:hover{ background: var(--coral); color:#fff; }
  }`
  document.head.appendChild(s)
}

const Arrow = () => (
  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M0 6.76V5.24H9.09L4.92 1.08L6 0L12 6L6 12L4.92 10.92L9.09 6.76H0Z" fill="currentColor" />
  </svg>
)

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  arrow = true,
  style: extraStyle,
  ...props
}) {
  const palette = {
    primary: { background: 'var(--text-primary)', color: '#fff' },
    secondary: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid rgba(26,26,26,0.18)' },
    dark: { background: 'var(--dark)', color: 'var(--cream)' },
  }
  const Comp = href ? 'a' : 'button'

  return (
    <Comp
      href={href}
      onClick={onClick}
      data-cursor-hover
      className={`tm-btn is-${variant}`}
      style={{ ...palette[variant], ...extraStyle }}
      {...props}
    >
      <span className="tm-btn__label"><span>{children}</span></span>
      {arrow && (
        <span className="tm-btn__arrow"><Arrow /><Arrow /></span>
      )}
    </Comp>
  )
}
