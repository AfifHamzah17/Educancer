import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false, // registrasi manual setelah window load (lihat main.jsx)
      includeAssets: ['icons/*.png', 'images/**/*.{png,webp,jpg}'],
      manifest: {
        name: 'Educancer — Edukasi Kanker Terintegrasi',
        short_name: 'Educancer',
        description: 'Edukasi kanker terintegrasi RSUD Provinsi NTB · PKRS',
        lang: 'id',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#95CCDE',
        background_color: '#D0E7E6',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,mjs,css,html,woff2,png,webp,svg}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallback: '/index.html',
        runtimeCaching: [
          { // PDF materi: cache saat pertama dibuka, tersedia offline setelahnya
            urlPattern: ({ url }) => url.pathname.startsWith('/materi/') && url.pathname.endsWith('.pdf'),
            handler: 'CacheFirst',
            options: { cacheName: 'educancer-pdf', rangeRequests: true, cacheableResponse: { statuses: [200] } },
          },
          { // thumbnail YouTube
            urlPattern: ({ url }) => url.hostname === 'i.ytimg.com',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'educancer-yt-thumb', expiration: { maxEntries: 30 } },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: { manualChunks: { react: ['react', 'react-dom', 'react-router-dom'], pdf: ['react-pdf'] } },
    },
  },
})
