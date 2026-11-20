import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH lets one codebase deploy anywhere:
// - Vercel / Netlify / custom domain -> served at "/" (default, no env needed)
// - GitHub Pages project site (e.g. username.github.io/repo) -> served at
//   a subpath, set via `VITE_BASE_PATH=/repo-name/ npm run build`
// (see the "build:ghpages" script in package.json)
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react', 'react-icons', '@tabler/icons-react'],
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4173,
  },
})