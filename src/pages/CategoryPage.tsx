import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Reveal } from '../components/Reveal'
import { ProjectCard } from '../components/ProjectCard'
import { visibleCategories, type Category } from '../content/categories'
import { projectsByCategory } from '../lib/content'

export default function CategoryPage({ category }: { category: Category }) {
  const items = projectsByCategory(category.slug)

  return (
    <>
      <Head>
        <title>{category.label} — Elisa Mondino</title>
      </Head>

      <Reveal>
        <h1 className="page__title">{category.label}</h1>
      </Reveal>

      <nav className="subnav" aria-label="Categorie">
        {visibleCategories.map((c) => (
          <Link
            key={c.slug}
            to={`/lavori/${c.slug}`}
            aria-current={c.slug === category.slug ? 'page' : undefined}
          >
            {c.label}
          </Link>
        ))}
      </nav>

      <div className="grid">
        {items.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </>
  )
}
