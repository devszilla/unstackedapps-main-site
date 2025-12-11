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
  // For GitHub Pages with custom domain, use '/' as base path
  // For GitHub Pages without custom domain, use '/repository-name/'
  // Set VITE_BASE_PATH environment variable to override
  base: process.env.VITE_BASE_PATH || '/',
})
