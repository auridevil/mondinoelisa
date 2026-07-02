import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is configurable so the same code serves both:
//   - preview on GitHub Pages:  BASE_PATH=/mondinoelisa/  (set in deploy.yml)
//   - production on mondinoelisa.it:  no BASE_PATH → '/'
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
