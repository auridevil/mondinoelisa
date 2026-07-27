import fm from 'front-matter'
import { marked } from 'marked'

/**
 * Build-time content loading.
 *
 * Every project is a Markdown file in src/content/projects/<category>/<slug>.md
 * with YAML frontmatter for metadata + layout config. `import.meta.glob` with
 * `eager: true` inlines the raw files into the bundle at compile time, so the
 * generated HTML already contains everything — no fetching at runtime.
 */

export type ProjectLayout = 'standard' | 'wide' | 'duo'

export interface Project {
  slug: string
  category: string
  title: string
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
  extends Omit<Project, 'slug' | 'html' | 'layout' | 'order' | 'gallery' | 'header'> {
  layout?: ProjectLayout
  order?: number
  gallery?: string[]
  header?: 'white' | 'black'
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
      ...attributes,
      slug: slugFromPath(path),
      html: marked.parse(body) as string,
    }
  })
  .sort((a, b) => a.order - b.order)

export function projectsByCategory(category: string): Project[] {
  return projects.filter((p) => p.category === category)
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
