import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ مسیرهای CSS/JS نسبی میشن و روی Render درست لود میشه
  server: {
    port: 5173,
    proxy: {
      // 🔹 فقط برای dev، localhost درست میمونه
      '/api': 'http://localhost:8000',
    },
  },
})
