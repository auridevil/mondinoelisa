import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Reveal } from '../components/Reveal'
import { ProjectCard } from '../components/ProjectCard'
import { visibleCategories } from '../content/categories'
import { projects, projectsByCategory, type Project } from '../lib/content'

/** How many images the home collage shows. */
const COLLAGE_SIZE = 8

/** Fisher–Yates shuffle (returns a new array). */
function shuffle<T>(list: T[]): T[] {
  const out = [...list]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const RATIOS = ['3 / 2', '4 / 3', '3 / 4', '2 / 3', '1 / 1', '16 / 9']

/**
 * Random placement for one collage item — regenerated on every page load.
 * Spans, positions and vertical offsets are deliberately extreme: images
 * can drift anywhere on the 12-column grid and overlap each other.
 *
 * The first two items can only shift downwards, so nothing ever rises
 * above the collage and covers the logo or the menu.
 */
function randomPlacement(index: number): CSSProperties {
  const span = 3 + Math.floor(Math.random() * 5) // 3–7 columns wide
  const start = 1 + Math.floor(Math.random() * (13 - span)) // anywhere
  const offset =
    index < 2
      ? Math.floor(Math.random() * 9) // first row: 0 … +8rem only
      : -6 + Math.floor(Math.random() * 19) // below: -6rem … +12rem → overlap
  const ratio = RATIOS[Math.floor(Math.random() * RATIOS.length)]

  return {
    '--col': `${start} / span ${span}`,
    '--offset': `${offset}rem`,
    '--ratio': ratio,
    '--float-dur': `${7 + Math.random() * 6}s`, // each image bobs at its own pace
    '--float-delay': `${-Math.random() * 8}s`,
    zIndex: 1 + Math.floor(Math.random() * 5),
  } as CSSProperties
}

interface Collage {
  items: Project[]
  placements: CSSProperties[]
}

export default function Home() {
  // Deterministic default for the prerendered HTML (and no-JS visitors):
  // up to two projects per category, in category order.
  const initial = visibleCategories.flatMap((c) =>
    projectsByCategory(c.slug).slice(0, 2),
  )

  // After mount, both the selection/order of projects AND their placements
  // are randomized — every reload shows a different collage.
  const [collage, setCollage] = useState<Collage | null>(null)
  useEffect(() => {
    const items = shuffle(projects).slice(0, COLLAGE_SIZE)
    setCollage({
      items,
      placements: items.map((_, i) => randomPlacement(i)),
    })
  }, [])

  const items = collage?.items ?? initial
  const placements = collage?.placements ?? null

  // Living collage: every image drifts at its own speed with the scroll
  // AND leans towards the cursor, each with a random depth. The long CSS
  // transition on .collage__item turns both into a soft, lagging glide.
  const collageRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = Array.from(
      collageRef.current?.querySelectorAll<HTMLElement>('.collage__item') ?? [],
    )
    // First-row items only drift downwards, so they never reach the header.
    const speeds = items.map((_, i) =>
      i < 2 ? Math.random() * 0.08 : (Math.random() - 0.5) * 0.18,
    )
    const depths = items.map((_, i) => ({
      x: (Math.random() - 0.5) * 44,
      y: i < 2 ? 0 : (Math.random() - 0.5) * 32,
    }))

    let mx = 0
    let my = 0
    let raf = 0
    const render = () => {
      raf = 0
      for (let i = 0; i < items.length; i++) {
        const x = mx * depths[i].x
        const y = window.scrollY * speeds[i] + my * depths[i].y
        items[i].style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render)
    }
    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5
      my = e.clientY / window.innerHeight - 0.5
      schedule()
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf)
    }
  }, [placements])

  return (
    <>
      <Head>
        <title>Elisa Mondino — Interior Designer</title>
      </Head>

      <section className="collage" aria-label="Progetti" ref={collageRef}>
        {items.map((p, i) => (
          <div key={p.slug} className="collage__item" style={placements?.[i]}>
            <Reveal delay={(i % 3) * 90}>
              <ProjectCard project={p} />
            </Reveal>
          </div>
        ))}
      </section>

      <Reveal>
        <Link to="/lavori" className="link-more">
          Tutti i progetti →
        </Link>
      </Reveal>
    </>
  )
}
