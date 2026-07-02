import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Reveal } from '../components/Reveal'
import { ProjectCard } from '../components/ProjectCard'
import { visibleCategories } from '../content/categories'
import { projectsByCategory } from '../lib/content'

/** Overview of all work, grouped by category. */
export default function Work() {
  return (
    <>
      <Head>
        <title>Lavori — Elisa Mondino</title>
      </Head>

      <Reveal>
        <h1 className="page__title">Lavori</h1>
      </Reveal>

      <nav className="subnav" aria-label="Categorie">
        {visibleCategories.map((c) => (
          <Link key={c.slug} to={`/lavori/${c.slug}`}>
            {c.label}
          </Link>
        ))}
      </nav>

      {visibleCategories.map((c) => {
        const items = projectsByCategory(c.slug)
        if (items.length === 0) return null
        return (
          <section key={c.slug} className="section">
            <Reveal>
              <h2 className="section__label">
                <Link to={`/lavori/${c.slug}`}>{c.label}</Link>
              </h2>
            </Reveal>
            <div className="grid">
              {items.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
