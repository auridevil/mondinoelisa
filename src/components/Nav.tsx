import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from './Logo'
import { INSTAGRAM_URL } from '../lib/site'

export function Nav() {
  const ref = useRef<HTMLElement>(null)

  // When scrolling starts, the logo and menu glide down a little
  // (max ~70px) before letting the page slide away underneath.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const glide = Math.min(window.scrollY * 0.25, 70)
        el.style.transform = `translateY(${glide}px)`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <header className="nav" ref={ref}>
      <Logo />
      <nav className="nav__links" aria-label="Navigazione principale">
        <NavLink to="/work">Work</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/press">Press</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          Instagram
        </a>
      </nav>
    </header>
  )
}
