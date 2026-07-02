import { useEffect, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Marquee } from '../components/Marquee'
import { projects } from '../lib/content'

/**
 * Text scramble: when `text` changes, the new title decodes itself
 * character by character out of noise glyphs.
 */
function useScramble(text: string): string {
  const [out, setOut] = useState(text)

  useEffect(() => {
    const GLYPHS = '█▓▒░/\\—·ABCDEFGHILMNOPRSTUVZ0123456789'
    let revealed = 0
    const id = setInterval(() => {
      revealed++
      setOut(
        text
          .split('')
          .map((c, i) =>
            c === ' ' || i < revealed
              ? c
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(''),
      )
      if (revealed >= text.length) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [text])

  return out
}

/**
 * "Hyper" concept — the home page is an interface, not a page:
 * a full-screen channel zapper. Moving the mouse across the screen
 * scrubs through the projects (each horizontal zone = one project),
 * the title decodes itself glitch-style at every switch, and when
 * left alone it auto-zaps. Click enters the current project.
 */
export default function Home() {
  const [active, setActive] = useState(0)
  const current = projects[active]
  const title = useScramble(current.title)

  // Auto-zap when idle.
  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % projects.length),
      4000,
    )
    return () => clearInterval(id)
  }, [])

  // Horizontal mouse position scrubs through the projects.
  const onMove = (e: MouseEvent) => {
    const zone = Math.floor((e.clientX / window.innerWidth) * projects.length)
    setActive(Math.min(zone, projects.length - 1))
  }

  return (
    <>
      <Head>
        <title>Elisa Mondino — Interior Designer</title>
      </Head>

      <section className="zapper full-bleed" onMouseMove={onMove}>
        {/* All covers stacked; only the active one is visible → instant zap. */}
        {projects.map((p, i) => (
          <img
            key={p.slug}
            src={p.cover}
            alt=""
            aria-hidden={i !== active}
            className={`zapper__img${i === active ? ' zapper__img--on' : ''}`}
          />
        ))}

        <Link
          to={`/lavori/${current.category}/${current.slug}`}
          className="zapper__link"
          aria-label={`Apri il progetto ${current.title}`}
        >
          <h1 className="zapper__title">{title}</h1>
          <p className="zapper__meta">
            {current.location} — {current.year}
          </p>
        </Link>

        {/* Tilted inverse strip slicing the screen. */}
        <Marquee className="zapper__strip" reverse>
          Elisa Mondino — interior design — portfolio — Fossano, Italia
          —&nbsp;
        </Marquee>

        {/* Channel numbers. */}
        <nav className="zapper__channels" aria-label="Progetti">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={i === active ? 'is-on' : undefined}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </nav>
      </section>

      <Link to="/lavori" className="marquee-link full-bleed">
        <Marquee>Tutti i progetti — Tutti i progetti —&nbsp;</Marquee>
      </Link>
    </>
  )
}
