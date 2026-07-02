import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Soft fade + rise animation when the element enters the viewport.
 *
 * The element is fully visible in the prerendered HTML (good for SEO and
 * no-JS visitors); JavaScript hides it only right before observing it, so
 * on hydration everything animates in gently.
 */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return

    el.classList.add('reveal--pending')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal--visible')
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="reveal" style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}
