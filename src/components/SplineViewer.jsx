import { useEffect } from 'react'

/**
 * SplineViewer — loads Spline's <spline-viewer> web component from a CDN at
 * runtime (no npm dependency, so it works without installing @splinetool).
 * Renders the scene as a custom element. The browser fetches the viewer script
 * + the scene from Spline's CDN on first paint.
 */
const VIEWER_SRC = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js'

export function SplineViewer({ url, style, className }) {
  useEffect(() => {
    if (!document.querySelector('script[data-spline-viewer]')) {
      const s = document.createElement('script')
      s.type = 'module'
      s.src = VIEWER_SRC
      s.setAttribute('data-spline-viewer', '')
      document.head.appendChild(s)
    }
  }, [])

  return <spline-viewer url={url} loading-anim-type="none" style={style} class={className} />
}
