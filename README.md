# mondinoelisa.it

Portfolio di **Elisa Mondino**, interior designer.

📄 Project context, decisions and TODOs: see [CONTEXT.md](./CONTEXT.md).

## Quick start

```bash
npm install
npm run dev      # dev server
npm run build    # static site → dist/
npm run preview  # preview the build
```

## Adding a project

Create a Markdown file in `src/content/projects/<categoria>/<slug>.md` with
frontmatter (title, location, year, cover, gallery, layout, …) and a short
Italian description as body. It becomes a page automatically at
`/lavori/<categoria>/<slug>` on the next build.
