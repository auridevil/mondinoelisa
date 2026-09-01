import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Reveal } from '../components/Reveal'
import { Signature } from '../components/Signature'
import { categories } from '../content/categories'
import { aspectRatio, galleryRows, isPortrait, type Project } from '../lib/content'
import { asset } from '../lib/asset'

/**
 * Single project page. The `layout` field from the Markdown frontmatter
 * controls how wide the gallery runs:
 *   standard → single centered column
 *   wide     → full-bleed
 *
 * Within that, rows come from `galleryRows()`: landscape photos take the
 * full width, portrait photos are paired two-up. Paired images get a
 * flex-grow equal to their aspect ratio, which makes the pair share the
 * row in proportion and finish at exactly the same height.
 */
export default function ProjectPage({ project }: { project: Project }) {
  const category = categories.find((c) => c.slug === project.category)
  const rows = galleryRows(project.gallery)

  return (
    <>
      <Head>
        <title>{project.title} — Elisa Mondino</title>
      </Head>

      <article className={`project project--${project.layout}`}>
        {/* Cover as full-bleed fixed background, title overlaid (PS-style). */}
        <section
          className="project__hero"
          style={{ backgroundImage: `url(${asset(project.cover)})` }}
        >
          <div className="project__hero-content">
            <p className="project__breadcrumb">
              <Link to="/work">Work</Link>
              {' / '}
              <Link to={`/work/${project.category}`}>{category?.label}</Link>
            </p>
            <h1 className="project__hero-title">{project.title}</h1>
            {project.subtitle && (
              <p className="project__hero-sub">{project.subtitle}</p>
            )}
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

        {project.video && (
          <Reveal delay={120}>
            <div className="project__video">
              <video
                src={asset(project.video)}
                autoPlay
                muted
                loop
                playsInline
                aria-label={`${project.title} — video`}
              />
            </div>
          </Reveal>
        )}

        <div className="project__gallery" id="gallery">
          {rows.map((row, i) => (
            <Reveal key={row[0]} delay={(i % 2) * 80}>
              <div
                className={
                  `project__row project__row--${row.length}` +
                  // An odd number of portraits leaves one unpaired; cap it to
                  // the viewport so the whole photo is still visible.
                  (row.length === 1 && isPortrait(row[0]) ? ' project__row--tall' : '')
                }
                // Combined aspect ratio of the row, so the CSS can cap its
                // height at the viewport and still fill the width when it fits.
                style={
                  row.length > 1
                    ? ({
                        '--row-ar': `${row.reduce((sum, src) => sum + aspectRatio(src), 0)}`,
                      } as CSSProperties)
                    : undefined
                }
              >
                {row.map((src, j) => (
                  <img
                    key={src}
                    src={asset(src)}
                    alt={`${project.title} — immagine ${i + j + 1}`}
                    loading="lazy"
                    style={row.length > 1 ? { flexGrow: aspectRatio(src) } : undefined}
                  />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        {project.photos && (
          <p className="project__credit">
            Fotografie:{' '}
            {project.photosUrl ? (
              <a href={project.photosUrl} target="_blank" rel="noreferrer">
                {project.photos}
              </a>
            ) : (
              project.photos
            )}
          </p>
        )}
      </article>
    </>
  )
}
