import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // React and the router change far less often than the site itself, so they
    // get their own chunk and stay cached across deploys.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
    // Assets below this size are inlined as data URIs instead of extra requests.
    assetsInlineLimit: 4096,
  },
})
