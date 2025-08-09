import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),react()],
  preview: {
    allowedHosts: ['video-portfolio-w0m0.onrender.com'],
    host: '0.0.0.0',
    port: 5173
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://video-portfolio-backend.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  },
})
