import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,   // you can change if you want
    open: true,   // 🚀 auto-open browser on dev start
  },
})