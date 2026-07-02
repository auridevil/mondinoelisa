import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served at the root of the custom domain mondinoelisa.it → base '/'
export default defineConfig({
  base: '/',
  plugins: [react()],
})
