import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import ssr from 'vite-plugin-ssr/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: './',
  define: {
    'process.env': process.env,
    global: {}, // Make sure gsap is available globally
  },
})
