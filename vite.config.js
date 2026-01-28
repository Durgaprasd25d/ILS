import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',   // exposes to LAN
    port: 5173,         // optional, change if you want
  },
  plugins: [react(), tailwindcss()],
})
