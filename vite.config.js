import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
  server: {
    port: 5173,
    open: false
  },
  build: {
    target: 'es2018',
    cssCodeSplit: true,
    sourcemap: false
  }
})
