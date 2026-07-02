import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { projects } from '../lib/content'
import { categories } from '../content/categories'

/** Endless horizontal ticker; content is duplicated for a seamless loop. */
function Marquee({
  children,
  reverse = false,
  className = '',
}: {
  children: ReactNode
  reverse?: boolean
  className?: string
}) {
  return (
    <div className={`marquee ${className}`}>
      <div
        className={`marquee__track${reverse ? ' marquee__track--reverse' : ''}`}
      >
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </div>
    </div>
  )
}

/**
 * "Radical" concept home:
 * a full-screen kinetic type intro (three marquee lines moving against
 * each other), then the projects as a deck of full-viewport panels that
 * slide over one another while scrolling, titles inverting over the
 * photography via mix-blend-mode.
 */
export default function Home() {
  const deck = projects.slice(0, 5)

  return (
    <>
      <Head>
        <title>Elisa Mondino — Interior Designer</title>
      </Head>

      <section className="kinetic full-bleed" aria-label="Elisa Mondino, interior designer">
        <Marquee className="kinetic__line kinetic__line--name">
          Elisa Mondino — Elisa Mondino —&nbsp;
        </Marquee>
        <Marquee reverse className="kinetic__line kinetic__line--role">
          interior designer · fossano, italia ·&nbsp;
        </Marquee>
        <Marquee className="kinetic__line kinetic__line--cats">
          {categories
            .filter((c) => !c.hidden)
            .map((c) => c.label)
            .join(' / ')}{' '}
          /&nbsp;
        </Marquee>
      </section>

      <section className="deck full-bleed" aria-label="Progetti">
        {deck.map((p, i) => (
          <Link
            key={p.slug}
            to={`/lavori/${p.category}/${p.slug}`}
            className="deck__panel"
          >
            <img src={p.cover} alt={p.title} loading={i === 0 ? 'eager' : 'lazy'} />
            <span className="deck__num">
              {String(i + 1).padStart(2, '0')} / {p.location}
            </span>
            <h2 className="deck__title">{p.title}</h2>
          </Link>
        ))}
      </section>

      <Link to="/lavori" className="marquee-link full-bleed">
        <Marquee>Tutti i progetti — Tutti i progetti —&nbsp;</Marquee>
      </Link>
    </>
  )
}
