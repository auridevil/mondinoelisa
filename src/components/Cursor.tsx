import { useEffect, useRef } from 'react'

/**
 * Custom cursor: a white dot in `mix-blend-mode: difference`, so it
 * inverts whatever it passes over. Grows over links. The native cursor
 * is hidden in CSS on hover-capable devices; touch devices see nothing.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
      const interactive = (e.target as Element).closest?.('a, button')
      el.classList.toggle('cursor--big', Boolean(interactive))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return <div ref={ref} className="cursor" aria-hidden="true" />
}
