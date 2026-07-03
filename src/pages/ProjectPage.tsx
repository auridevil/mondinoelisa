import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Reveal } from '../components/Reveal'
import { Signature } from '../components/Signature'
import { categories } from '../content/categories'
import type { Project } from '../lib/content'

/**
 * Single project page. The `layout` field from the Markdown frontmatter
 * controls how the gallery is rendered:
 *   standard → single centered column
 *   wide     → full-bleed images
 *   duo      → two-column grid
 */
export default function ProjectPage({ project }: { project: Project }) {
  const category = categories.find((c) => c.slug === project.category)

  return (
    <>
      <Head>
        <title>{project.title} — Elisa Mondino</title>
      </Head>

      <article className={`project project--${project.layout}`}>
        {/* Cover as full-bleed fixed background, title overlaid (PS-style). */}
        <section
          className="project__hero"
          style={{ backgroundImage: `url(${project.cover})` }}
        >
          <div className="project__hero-content">
            <p className="project__breadcrumb">
              <Link to="/lavori">Lavori</Link>
              {' / '}
              <Link to={`/lavori/${project.category}`}>{category?.label}</Link>
            </p>
            <h1 className="project__hero-title">{project.title}</h1>
          </div>
          {/* Signed like a canvas. */}
          <Signature className="sig--hero" />
        </section>

        <Reveal delay={100}>
          <dl className="project__facts">
            <div>
              <dt>Luogo</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Anno</dt>
              <dd>{project.year}</dd>
            </div>
            {project.area && (
              <div>
                <dt>Superficie</dt>
                <dd>{project.area}</dd>
              </div>
            )}
            {project.client && (
              <div>
                <dt>Committente</dt>
                <dd>{project.client}</dd>
              </div>
            )}
          </dl>
        </Reveal>

        <Reveal delay={150}>
          <div
            className="project__body"
            dangerouslySetInnerHTML={{ __html: project.html }}
          />
        </Reveal>

        <div className="project__gallery">
          {project.gallery.map((src, i) => (
            <Reveal key={src} delay={(i % 2) * 80}>
              <img src={src} alt={`${project.title} — immagine ${i + 1}`} loading="lazy" />
            </Reveal>
          ))}
        </div>
      </article>
    </>
  )
}
