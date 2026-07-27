/**
 * Resolve a public asset path against Vite's base URL.
 *
 * Project images live in `public/projects/...` and are referenced from
 * Markdown frontmatter as `/projects/<slug>/NN.jpg`. Because the site is
 * served both from the root (custom domain) and from a sub-path on the
 * GitHub Pages preview (`/mondinoelisa/`), image paths must be prefixed
 * with `import.meta.env.BASE_URL`. Absolute http(s) URLs pass through
 * untouched (older placeholder content used remote images).
 */
export function asset(path: string): string {
  if (/^https?:\/\//.test(path) || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}/${path.replace(/^\//, '')}`
}
