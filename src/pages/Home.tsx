import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Reveal } from '../components/Reveal'
import { ProjectCard } from '../components/ProjectCard'
import { aspectRatio, homeProjects, type Project } from '../lib/content'

/** How many images the home collage shows. */
const COLLAGE_SIZE = 8

/**
 * Ceiling on the scroll-driven drift, in px.
 *
 * The drift is a transform, so it moves no layout: without a cap an image
 * kept sliding down as the page got taller and ended up over the footer.
 * `.collage` reserves this much space at the bottom to match.
 */
const MAX_DRIFT = 90

/** Fisher–Yates shuffle (returns a new array). */
function shuffle<T>(list: T[]): T[] {
  const out = [...list]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Random placement for one collage item — regenerated on every page load.
 * Positions and vertical offsets are deliberately extreme: images can drift
 * anywhere on the 12-column grid and overlap each other.
 *
 * Each photo keeps its own aspect ratio (nothing is cropped to a random
 * shape), so the column span is drawn from the orientation instead: a
 * portrait shot gets a narrower span, or it would tower over the page.
 *
 * The first two items can only shift downwards, so nothing ever rises
 * above the collage and covers the logo or the menu.
 */
function randomPlacement(index: number, ratio: number): CSSProperties {
  const [min, range] = ratio < 1 ? [3, 3] : [4, 4] // portrait 3–5, landscape 4–7
  const span = min + Math.floor(Math.random() * range)
  const start = 1 + Math.floor(Math.random() * (13 - span)) // anywhere
  const offset =
    index < 2
      ? Math.floor(Math.random() * 9) // first row: 0 … +8rem only
      : -6 + Math.floor(Math.random() * 19) // below: -6rem … +12rem → overlap

  return {
    '--col': `${start} / span ${span}`,
    '--offset': `${offset}rem`,
    '--ratio': `${ratio}`,
    '--float-dur': `${7 + Math.random() * 6}s`, // each image bobs at its own pace
    '--float-delay': `${-Math.random() * 8}s`,
    zIndex: 1 + Math.floor(Math.random() * 5),
  } as CSSProperties
}

/** One image in the collage, and the project it links to. */
interface Tile {
  project: Project
  image: string
}

interface Collage {
  items: Tile[]
  placements: CSSProperties[]
}

/**
 * The pool of tiles: each project's cover first, then its gallery shots,
 * taken round-robin so consecutive tiles come from different projects.
 * Drawing photos rather than projects keeps the collage full even when
 * only a handful of projects are eligible for the home page.
 */
const TILES: Tile[] = (() => {
  const out: Tile[] = []
  const perProject = homeProjects.map((p) => [p.cover, ...p.gallery])
  const deepest = Math.max(0, ...perProject.map((list) => list.length))
  for (let depth = 0; depth < deepest; depth++) {
    homeProjects.forEach((project, i) => {
      const image = perProject[i][depth]
      if (image) out.push({ project, image })
    })
  }
  return out
})()

export default function Home() {
  // Deterministic default for the prerendered HTML (and no-JS visitors):
  // the first tiles, i.e. every project's cover in order.
  const initial = TILES.slice(0, COLLAGE_SIZE)

  // After mount, both the selection/order of projects AND their placements
  // are randomized — every reload shows a different collage.
  const [collage, setCollage] = useState<Collage | null>(null)
  useEffect(() => {
    const items = shuffle(TILES).slice(0, COLLAGE_SIZE)
    setCollage({
      items,
      placements: items.map((tile, i) => randomPlacement(i, aspectRatio(tile.image))),
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
    const clamp = (v: number, limit: number) => Math.min(limit, Math.max(-limit, v))
    const render = () => {
      raf = 0
      for (let i = 0; i < items.length; i++) {
        const x = mx * depths[i].x
        const y = clamp(window.scrollY * speeds[i], MAX_DRIFT) + my * depths[i].y
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
        {items.map((tile, i) => (
          <div
            key={tile.image}
            className="collage__item"
            style={
              placements?.[i] ?? ({ '--ratio': `${aspectRatio(tile.image)}` } as CSSProperties)
            }
          >
            <Reveal delay={(i % 3) * 90}>
              <ProjectCard project={tile.project} image={tile.image} />
            </Reveal>
          </div>
        ))}
      </section>

      <Reveal>
        <Link to="/work" className="link-more">
          Tutti i progetti →
        </Link>
      </Reveal>
    </>
  )
}
