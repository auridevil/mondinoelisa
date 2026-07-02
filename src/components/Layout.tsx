import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { Cursor } from './Cursor'
import { projects } from '../lib/content'

/**
 * Some pages are white, some are black (à la Palomba Serafini).
 * The theme is decided per-route here and applied to the whole
 * viewport — header and footer included — with a soft transition.
 */
const DARK_ROUTES = ['/', '/contatti']

function themeFor(pathname: string): 'light' | 'dark' {
  return DARK_ROUTES.includes(pathname.replace(/\/$/, '') || '/') ? 'dark' : 'light'
}

export default function Layout() {
  const { pathname } = useLocation()
  const theme = themeFor(pathname)

  // On project pages the hero image extends under the logo/menu; each
  // project's frontmatter (`header: white | black`) sets their color.
  // On home the zapper takes the whole screen, so the nav floats there too.
  const clean = pathname.replace(/\/$/, '') || '/'
  const project = projects.find(
    (p) => clean === `/lavori/${p.category}/${p.slug}`,
  )
  const overlay = project ? project.header : clean === '/' ? 'white' : null

  // Always open a page from the top.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const classes = ['site', `theme-${theme}`]
  if (overlay) classes.push('site--overlay', `site--overlay-${overlay}`)

  return (
    <div className={classes.join(' ')}>
      <Cursor />
      <Nav />
      {/* key on pathname re-triggers the fade-in on every navigation */}
      <main className="page" key={pathname}>
        <Outlet />
      </main>
      <Footer />
      {/* Fixed technical HUD, vertical along the left edge. */}
      <div className="hud" aria-hidden="true">
        EM / portfolio — 44.5510°N 7.7229°E — Fossano, IT
      </div>
    </div>
  )
}
