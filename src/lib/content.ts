import fm from 'front-matter'
import { marked } from 'marked'
import imageSizes from '../content/image-sizes.json'

/**
 * Build-time content loading.
 *
 * Every project is a Markdown file in src/content/projects/<category>/<slug>.md
 * with YAML frontmatter for metadata + layout config. `import.meta.glob` with
 * `eager: true` inlines the raw files into the bundle at compile time, so the
 * generated HTML already contains everything — no fetching at runtime.
 */

export type ProjectLayout = 'standard' | 'wide'

export interface Project {
  slug: string
  category: string
  title: string
  /** Second line under the title — the rest of Elisa's own heading. */
  subtitle?: string
  location: string
  year: number
  area?: string
  client?: string
  cover: string
  gallery: string[]
  /** Optional short looping clip shown on the project page. */
  video?: string
  layout: ProjectLayout
  /** Color of the logo/menu overlaid on the hero image. */
  header: 'white' | 'black'
  excerpt: string
  order: number
  /** Credit line for the photography, shown under the gallery. */
  photos?: string
  /** Optional website for the photographer. */
  photosUrl?: string
  /** Whether the project may appear in the home collage. */
  home: boolean
  /** Markdown body rendered to HTML at build time. */
  html: string
}

export interface PressItem {
  title: string
  outlet: string
  date: string
  url?: string
  excerpt?: string
}

/** Frontmatter fields; layout, order, gallery and header fall back to defaults. */
interface ProjectFrontmatter
  extends Omit<
    Project,
    'slug' | 'html' | 'layout' | 'order' | 'gallery' | 'header' | 'home'
  > {
  layout?: ProjectLayout
  order?: number
  gallery?: string[]
  header?: 'white' | 'black'
  home?: boolean
}

const projectFiles = import.meta.glob('../content/projects/*/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '')
}

export const projects: Project[] = Object.entries(projectFiles)
  .map(([path, raw]) => {
    const { attributes, body } = fm<ProjectFrontmatter>(raw)
    return {
      layout: 'standard' as ProjectLayout,
      order: 99,
      gallery: [],
      header: 'white' as const,
      home: true,
      ...attributes,
      slug: slugFromPath(path),
      html: marked.parse(body) as string,
    }
  })
  .sort((a, b) => a.order - b.order)

export function projectsByCategory(category: string): Project[] {
  return projects.filter((p) => p.category === category)
}

/** Projects allowed in the home collage (`home: false` opts one out). */
export const homeProjects: Project[] = projects.filter((p) => p.home)

/* ---------- Image orientation ---------- */

const sizes = imageSizes as Record<string, number[]>

/** Width ÷ height, from the build-time manifest. Falls back to 3:2. */
export function aspectRatio(src: string): number {
  const size = sizes[src]
  return size && size.length === 2 ? size[0] / size[1] : 1.5
}

export function isPortrait(src: string): boolean {
  return aspectRatio(src) < 1
}

/**
 * Group a gallery into rows for display.
 *
 * A landscape photo fills the width on its own; two portrait photos in a
 * row are paired side by side. Shown full width a portrait shot is taller
 * than the viewport, so you never see the whole picture — pairing them
 * puts each one comfortably on screen and reads as a spread.
 */
export function galleryRows(gallery: string[]): string[][] {
  const rows: string[][] = []
  for (let i = 0; i < gallery.length; i++) {
    if (isPortrait(gallery[i]) && i + 1 < gallery.length && isPortrait(gallery[i + 1])) {
      rows.push([gallery[i], gallery[i + 1]])
      i++
    } else {
      rows.push([gallery[i]])
    }
  }
  return rows
}

const pressFiles = import.meta.glob('../content/press/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export const pressItems: PressItem[] = Object.values(pressFiles)
  .map((raw) => {
    const item = fm<PressItem>(raw).attributes
    // YAML parses bare dates as Date objects → normalize to 'YYYY-MM-DD'.
    return { ...item, date: new Date(item.date).toISOString().slice(0, 10) }
  })
  .sort((a, b) => b.date.localeCompare(a.date))
