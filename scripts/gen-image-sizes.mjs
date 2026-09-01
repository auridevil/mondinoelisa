/**
 * Writes src/content/image-sizes.json — the pixel size of every image in
 * public/projects, keyed by its site path ("/projects/<slug>/01.jpg").
 *
 * The project pages need to know which photos are portrait so they can be
 * shown two-up instead of one enormous column (Elisa: "le foto verticali
 * non si vedono bene — mettiamone due vicine"). Deciding that at build
 * time keeps the prerendered HTML correct with no layout shift on load.
 *
 * Re-run after adding or replacing photos:  npm run image-sizes
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const SRC = join(ROOT, 'public/projects')
const OUT = join(ROOT, 'src/content/image-sizes.json')

/** JPEG: walk the marker segments to the start-of-frame header. */
function jpegSize(buf) {
  let i = 2 // skip SOI
  while (i < buf.length) {
    if (buf[i] !== 0xff) {
      i++
      continue
    }
    const marker = buf[i + 1]
    // SOF0..SOF15, excluding DHT (c4), JPG (c8) and DAC (cc)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) }
    }
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd9)) {
      i += 2
      continue
    }
    i += 2 + buf.readUInt16BE(i + 2)
  }
  return null
}

/** PNG: width/height are the first two fields of the IHDR chunk. */
function pngSize(buf) {
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

const sizes = {}
let skipped = 0
for (const file of walk(SRC).sort()) {
  const ext = file.toLowerCase().split('.').pop()
  if (!['jpg', 'jpeg', 'png'].includes(ext)) continue
  const buf = readFileSync(file)
  const size = ext === 'png' ? pngSize(buf) : jpegSize(buf)
  if (!size) {
    skipped++
    continue
  }
  sizes[`/projects/${relative(SRC, file)}`] = [size.w, size.h]
}

writeFileSync(OUT, JSON.stringify(sizes, null, 0) + '\n')
const portrait = Object.values(sizes).filter(([w, h]) => h > w).length
console.log(
  `image-sizes: ${Object.keys(sizes).length} images (${portrait} portrait)` +
    (skipped ? `, ${skipped} unreadable` : ''),
)
