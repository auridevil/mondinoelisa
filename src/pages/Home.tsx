import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Reveal } from '../components/Reveal'
import { categories } from '../content/categories'
import { projects } from '../lib/content'

/**
 * "Atelier" concept — a calm editorial home:
 * an opening statement in serif, then the projects as numbered
 * magazine rows, image and words alternating sides.
 */
export default function Home() {
  const rows = projects.slice(0, 6)

  return (
    <>
      <Head>
        <title>Elisa Mondino — Interior Designer</title>
      </Head>

      <section className="statement">
        <Reveal>
          <p className="statement__label">
            Elisa Mondino — Interior Designer, Fossano
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="statement__text">
            Interni essenziali,
            <br />
            <em>disegnati con misura.</em>
          </h1>
        </Reveal>
      </section>

      <section className="editorial" aria-label="Progetti selezionati">
        {rows.map((p, i) => {
          const category = categories.find((c) => c.slug === p.category)
          return (
            <Reveal key={p.slug}>
              <Link
                to={`/lavori/${p.category}/${p.slug}`}
                className="edit-row"
              >
                <span className="edit-row__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="edit-row__media">
                  <img src={p.cover} alt={p.title} loading="lazy" />
                </div>
                <div className="edit-row__text">
                  <p className="edit-row__kicker">
                    {category?.label} — {p.location}, {p.year}
                  </p>
                  <h2 className="edit-row__title">{p.title}</h2>
                  <p className="edit-row__excerpt">{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </section>

      <Reveal>
        <Link to="/lavori" className="link-more">
          Indice completo dei progetti →
        </Link>
      </Reveal>
    </>
  )
}
