import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // For GitHub Pages, use the repository name as base path
  // Set VITE_BASE_PATH environment variable or it defaults to '/'
  // Example: VITE_BASE_PATH=/unstackedapps-main-site/ npm run build
  base: process.env.VITE_BASE_PATH || '/',
})
