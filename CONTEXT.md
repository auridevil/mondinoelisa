# Elisa Mondino — Portfolio Website · Project Context

> Living document. Keep this updated as the project evolves.
> Last updated: 2026-09-01

## Overview
Portfolio website for **Elisa Mondino**, interior designer.
- **Domain:** mondinoelisa.it (registered)
- **Language:** Italian (`lang="it"`)
- **Hosting:** GitHub Pages (static, compile-time generated HTML)

## Design direction
- **Inspiration:** [palombaserafini.com/en/ps-a](https://www.palombaserafini.com/en/ps-a) (primary) + [normcph.com](https://normcph.com/)
- **Palette:** strict black & white. Like Palomba Serafini, some pages are white-on-black and some black-on-white. Theme is set per-page (`theme: 'light' | 'dark'`) and transitions softly.
- **Typography:** Satoshi — self-hosted variable woff2, `public/fonts/satoshi/` (see `src/styles/fonts.css`).
- **Logo:** Elisa's real E/M ligature monogram, traced from her brand board as vector strokes in `src/components/Monogram.tsx` (an E whose shortened middle arm hands off to the M; the M's peak is a flat cut, not a mitred point). Used in the nav lockup (`Logo.tsx`), as the hero/footer signature (`Signature.tsx`) and as the favicon (`public/favicon.svg`). Drawn on `currentColor`, so it inverts for free on dark pages.
- **Motion:** soft/subtle — fade + rise reveal on scroll, gentle hover states. Implemented with CSS transitions + a small IntersectionObserver hook (`useReveal`), no heavy animation library.

## Site structure / navigation
- **Work**
  - Residential (`residential`)
  - ~~Commercial~~ — currently empty, **hidden** for now (toggle in `src/content/categories.ts`)
  - Workspace (`workspace`)
  - Hospitality (`hospitality`)
  - In progress (`in-progress`)
- **Press**
- **Contact**
- **Instagram** (external link, in nav + footer)

### Footer (every page)
> via G. Falletti, 17 · 12045 Fossano, CN, Italia · +39 333 4756876 · mondino.elisa@gmail.com · P.IVA 04061210045

⚠️ The brief said CAP "1045" — corrected to **12045** (Fossano's actual CAP). All contact data lives in `src/lib/site.ts`.

## Tech stack
- **Build:** [Vite](https://vitejs.dev) + [`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg) → every route is prerendered to static HTML at build time.
- **UI:** React 18 + TypeScript, React Router (via vite-react-ssg).
- **Content:** one Markdown file per project under `src/content/projects/<category>/`, with YAML frontmatter (metadata + layout config) and a Markdown body. Parsed at build time via `import.meta.glob(..., { eager: true, query: '?raw' })` + `front-matter` + `marked`.
- **Styling:** plain CSS with custom properties (design tokens) in `src/styles/`. No CSS framework.
- **Deploy:** GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages. `public/CNAME` holds the custom domain; `base` is `/`. `public/404.html` is a static fallback page.
- **Routing note:** every category and project MD becomes a concrete route in `src/routes.tsx`, so every page is prerendered — GitHub Pages serves `/work/x` from `work/x.html` natively (no SPA hacks needed).

### Content model (project frontmatter)
```yaml
title: Villa sulle Langhe
category: residential          # residential | workspace | hospitality | in-progress
location: Langhe, CN
year: 2023
area: 320 m²
client: Privato               # optional
cover: https://.../cover.jpg  # placeholder (picsum) for now
gallery:                      # ordered image list
  - https://.../1.jpg
  - https://.../2.jpg
layout: standard              # standard | wide | duo  (controls project page layout)
header: white                 # white | black — color of logo/menu overlaid on the hero
excerpt: One-line summary shown in listings.
order: 1                      # sort order within a category (lower first)
```

## Project layout (files)
```
public/CNAME                     custom domain for Pages
src/
  main.tsx                       vite-react-ssg entry (exports createRoot)
  routes.tsx                     route tree, built from content
  lib/content.ts                 build-time markdown loader + types
  components/                    Layout, Nav, Footer, Logo, Reveal, ProjectCard, ...
  pages/                         Home, Work, Category, Project, Press, Contact, NotFound
  content/
    categories.ts                category definitions + visibility (hides "commercial")
    projects/<category>/*.md     one project per file
    press/*.md                   press items
  styles/                        tokens.css, base.css, layout.css, pages.css
```

## Commands
- `npm run dev` — local dev server
- `npm run build` — generate static site into `dist/`
- `npm run preview` — preview the built static site

## TODO / to replace later (placeholder data)
- [ ] Real project photography (currently picsum placeholders keyed by slug).
- [ ] Real project copy/metadata (invented for the draft).
- [ ] Real press articles + links.
- [x] Instagram: https://www.instagram.com/elisamondino_interiordesign/ (confirmed by user).
- [x] Logo: **E—M** in Satoshi Black — initials as the typographic *em* (unit of measure), dash stretches on hover (`Logo.tsx` + `logo.css`).
- [x] Signature/watermark "**EM INTERIOR DESIGN**" (Elisa signs canvases with it): `Signature.tsx` — stamped bottom-right on project heroes (difference blend) and in the footer. Standalone assets for canvas/photo use in `brand/` (SVG + transparent PNG, white & black, PNGs rendered with real Satoshi glyphs).
- [ ] About/bio copy for Elisa if a dedicated page is wanted.
- [ ] Decide whether to license & self-host Satoshi vs. Fontshare CDN.
- [x] Set up the GitHub Pages repo + Actions deploy → https://github.com/auridevil/mondinoelisa (public), Pages build_type=workflow.
- [ ] **Go-live checklist** (site currently previews at https://auridevil.github.io/mondinoelisa/ — custom domain intentionally NOT active yet):
  1. Point mondinoelisa.it DNS to GitHub Pages: A records 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153 (today it points to Squarespace 198.49.23.x).
  2. Delete the `BASE_PATH: /mondinoelisa/` env line in `.github/workflows/deploy.yml`.
  3. Re-add the custom domain: `gh api -X PUT repos/auridevil/mondinoelisa/pages -f cname=mondinoelisa.it`.
  4. Enable "Enforce HTTPS" in repo Pages settings once the certificate is issued.

## Decisions log
- 2026-07-02: Chose `vite-react-ssg` over Next.js/Astro to keep it lightweight React with true compile-time HTML and minimal config.
- 2026-07-02: CSS + IntersectionObserver for animations instead of framer-motion, to stay lightweight and avoid hydration flashes.
- 2026-07-02: "Commercial" category defined but hidden via flag (empty for now).
- 2026-07-02: Categories use Italian slugs: `residenziale`, `commerciale`, `workspace`, `hospitality`, `in-corso`.
- 2026-09-01: **Top-level routes and nav labels are English** (Elisa: "le scritte in alto le mettiamo tutte in inglese"): `/work`, `/about`, `/press`, `/contact` — and `/work/<categoria>/<progetto>`. Category slugs and all body copy stay Italian. The About page was called "Studio" until she asked for "About".
- 2026-07-02: Dark pages = **/contact only**; home and everything else light (edit `DARK_ROUTES` in `src/components/Layout.tsx`). User feedback: main view must be white.
- 2026-07-02: Pictures are in **full color** (user feedback; grayscale removed). The B&W constraint applies to the UI itself, not the photography.
- 2026-07-02: Project listings use a **staggered/displaced grid** à la Palomba Serafini: 12-col grid, 4-item repeating pattern of alternating widths, offsets and aspect ratios (`.grid` in `src/styles/pages.css`). Collapses to one column on mobile.
- 2026-07-02: Press is a **PS-style index list**: full-width rows with thin rules, uppercase columns (year / outlet / title / ↗), row shifts right on hover.
- 2026-07-03: Home rework (user feedback): **no big hero title**, **no "Progetti in evidenza" label** — the page is a pure image collage (up to 2 projects per category). Positions/sizes/ratios are **randomized on every reload** (client-side, `randomPlacement()` in `Home.tsx`; prerendered HTML uses a deterministic CSS fallback). Captions on home are much smaller than elsewhere.
- 2026-07-03: Collage made **stranger** (user feedback): items can overlap (negative offsets + random z-index), spans 3–7 cols anywhere on the grid, extra aspect ratios, **per-image parallax drift on scroll** (random speed, disabled with `prefers-reduced-motion`), captions appear only on hover.
- 2026-07-03: Constraint (user feedback): collage images must **never rise over the logo/menu** — the first two items only get downward offsets and downward-only parallax; negative offsets are allowed only from the third item on.
- 2026-07-03: Placeholders switched from picsum to **curated Unsplash interior photos** (user feedback: easier to validate) — matched by type: residential interiors, offices for workspace, hotel rooms/restaurants for hospitality, construction shots for in-corso. All URLs verified 200.
- 2026-07-03: **PS-style load fade**: the whole site fades in softly (1.6s) on first paint (`site-fade` in `layout.css`).
- 2026-07-03: Navigation always **scrolls to top** (effect in `Layout.tsx`) — opening a work detail starts at the hero.
- 2026-07-03: On project pages the **hero extends under the logo/menu**: the nav floats transparently over the image; the frontmatter field `header: white | black` per project decides the nav color (default white, with an extra top-darkening gradient; e.g. the bright office projects use `header: black`).
- 2026-07-03: Home collage also randomizes **which projects appear and in what order** on every reload (Fisher–Yates over all projects, takes `COLLAGE_SIZE = 8`). Prerendered HTML keeps the deterministic 2-per-category selection as fallback.
- 2026-07-03: **Header glide**: on scroll the logo/menu glide down with the page for ~70px max (scrollY × 0.25, rAF + 0.7s transform transition in `Nav.tsx`/`layout.css`), then the content slides away underneath. Disabled with `prefers-reduced-motion`.
- 2026-07-03: More motion (user: "still very static"): collage images **lean toward the cursor** (random per-image depth), all scroll/mouse transforms **lag through a 0.9s transition** (gliding feel), each image has a **slow idle float** (random 7–13s cycle), and scroll reveals travel further with a slight scale. All gated by `prefers-reduced-motion`.
- 2026-07-03: Repo pushed to GitHub (`auridevil/mondinoelisa`), Pages deploy via Actions workflow.
- 2026-07-03: Project pages open with a **full-bleed hero**: the cover image is a `background-attachment: fixed` background the content scrolls over, title overlaid in white (like PS's talenti-cruise page). Falls back to scroll attachment on ≤900px (iOS quirk).
- 2026-07-27: **Real content ingested** from a Google Drive export (`drive-download-…`, kept OUT of git — 320 MB of source photos/renders/videos/docs; lives in the concept-hyper worktree). Replaces all Unsplash/invented placeholders.
- 2026-07-27: **Images self-hosted & optimized** into `public/projects/<slug>/NN.jpg` (sips, long edge 2000 px, JPEG q80 → 95 MB). Frontmatter `cover`/`gallery` now use local paths; resolved through `asset()` (`src/lib/asset.ts`) which prefixes `import.meta.env.BASE_URL` so images work both at the root domain and under the `/mondinoelisa/` Pages-preview base. Covers/galleries hand-curated from ffmpeg contact sheets.
- 2026-07-27: **Satoshi self-hosted** (`public/fonts/satoshi/`, variable woff2 300–900 + italic, FFL license), `src/styles/fonts.css`; Fontshare CDN `<link>` removed from `index.html`. Resolves the "license & self-host Satoshi" TODO and gives a real Black (900) weight (Fontshare only served ≤700, so the logo's 900 was faux-bold).
- 2026-07-27: **Real projects (first 7 of 16):** residenziale — Casa Deva (Roreto di Cherasco 2022), Attico sotto le travi (Savigliano 2024), Appartamento a Fossano (2024), Casa botanica (TODO), Appartamento essenziale (TODO); workspace — Ufficio del Turismo Alba (2024, TODO), ACA · Sale riunioni (TODO). Copy for the first three is the client's real `.docx` text; the rest is drafted and flagged `# TODO` in frontmatter for Elisa to confirm. `hospitality` + `in-corso` categories hidden until they have real content.
- 2026-07-27: **The `PROJECTS/` renders (9)** await a per-project category decision (built→residenziale/workspace vs not-yet-built→in-corso). Photographer for the shot homes: **Federica Borgato** (www.federicaborgato.com). Press source: a real 6-page *Wine & Luxury* feature (pp.880–885) — to be used for the Press index + an optional About/bio.
- 2026-09-01: **Gallery rows come from image orientation, not frontmatter.** `npm run image-sizes`
  (`scripts/gen-image-sizes.mjs`) writes `src/content/image-sizes.json` — every photo's pixel size —
  and `build` runs it first. `galleryRows()` in `src/lib/content.ts` then pairs consecutive portrait
  photos two-up, while landscape photos keep the full width; a lone portrait is capped to the
  viewport height and centred. Elisa's note: "le foto orizzontali si vedono bene ma quelle verticali
  no — mettiamone due vicine di foto verticali così si vedono". **Re-run `npm run image-sizes` after
  adding or replacing photos.** (141 of the current 227 photos are portrait, so this is most of them.)
- 2026-09-01: **The home collage draws photos, not projects.** `home: false` in a project's
  frontmatter keeps it out of the collage — set on both workspace projects, because Elisa kept
  landing on the home page and seeing workspace ("ogni volta che la apro c'è sempre work space,
  non devono esserci"). They are still reachable under Work. The collage now takes cover + gallery
  shots round-robin so a short project list still fills the page, and each tile keeps its real
  aspect ratio instead of being cropped to a random one.
- 2026-09-01: `src/content/_drafts/` is outside the content glob — markdown parked there has no
  route and no listing. `casa-va.md` (H_VA) lives there until the client sends proper photos.
