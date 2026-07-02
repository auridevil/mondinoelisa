import { useRef, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Reveal } from '../components/Reveal'
import { visibleCategories } from '../content/categories'
import { projects } from '../lib/content'

/**
 * "Atelier" concept — the works as a big typographic index.
 * Hovering a line makes that project's image float and follow the
 * cursor (hidden on touch devices, where the lines simply link).
 */
export default function Work() {
  const [preview, setPreview] = useState<string | null>(null)
  const previewRef = useRef<HTMLImageElement>(null)

  const onMove = (e: MouseEvent) => {
    const img = previewRef.current
    if (!img) return
    img.style.left = `${e.clientX}px`
    img.style.top = `${e.clientY}px`
  }

  return (
    <>
      <Head>
        <title>Lavori — Elisa Mondino</title>
      </Head>

      <Reveal>
        <h1 className="page__title">Indice</h1>
      </Reveal>

      <nav className="subnav" aria-label="Categorie">
        {visibleCategories.map((c) => (
          <Link key={c.slug} to={`/lavori/${c.slug}`}>
            {c.label}
          </Link>
        ))}
      </nav>

      <ol className="index" onMouseMove={onMove}>
        {projects.map((p, i) => {
          const category = visibleCategories.find((c) => c.slug === p.category)
          return (
            <Reveal key={p.slug} delay={i * 40}>
              <li>
                <Link
                  to={`/lavori/${p.category}/${p.slug}`}
                  className="index__row"
                  style={{ '--img': `url(${p.cover})` } as React.CSSProperties}
                  onMouseEnter={() => setPreview(p.cover)}
                  onMouseLeave={() => setPreview(null)}
                >
                  <span className="index__num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="index__title">{p.title}</span>
                  <span className="index__meta">
                    {category?.label} · {p.location} · {p.year}
                  </span>
                </Link>
              </li>
            </Reveal>
          )
        })}
      </ol>

      {/* Floating preview that follows the cursor. */}
      <img
        ref={previewRef}
        src={preview ?? undefined}
        alt=""
        aria-hidden="true"
        className={`index__preview${preview ? ' index__preview--on' : ''}`}
      />
    </>
  )
}
