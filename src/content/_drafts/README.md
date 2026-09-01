# Drafts — off the site

Markdown here is outside `src/content/projects/`, so `import.meta.glob` in
`src/lib/content.ts` does not pick it up: no route, no page, no listing.

- **casa-va.md** — H_VA. Parked 2026-09-01: Elisa removed the WhatsApp-quality
  photos from the Drive folder and is waiting on proper shots from the client
  ("mi mancano delle foto... devono mandarmi le foto"). Move it back into
  `src/content/projects/residenziale/` once the photos land, and re-run the
  image pipeline + `npm run image-sizes`.
