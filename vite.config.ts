import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is configurable so the same code serves both:
//   - preview on GitHub Pages:  BASE_PATH=/mondinoelisa/  (set in deploy.yml)
//   - production on mondinoelisa.it:  no BASE_PATH → '/'
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  // Parallel dev servers (branch showcase via git worktrees) share
  // node_modules — each needs its own dep cache or they corrupt each other.
  cacheDir: process.env.VITE_CACHE_DIR || 'node_modules/.vite',
  plugins: [react()],
  // Open dev/preview to LAN + tunnels (ngrok, cloudflared, ...):
  // listen on all interfaces and accept any Host header.
  server: {
    host: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
})
