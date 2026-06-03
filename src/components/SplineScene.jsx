import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

/**
 * SplineScene — lazy-loaded interactive 3D scene (Spline). Adapted from the
 * shadcn/TSX reference to this project's JSX + inline-style stack. Fetches the
 * scene from Spline's CDN at runtime; code-split so it never blocks first paint.
 */
export function SplineScene({ scene, style, className }) {
  return (
    <Suspense fallback={<div style={{ width: '100%', height: '100%' }} aria-hidden="true" />}>
      <Spline scene={scene} style={style} className={className} />
    </Suspense>
  )
}
