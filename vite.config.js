import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // 允许通过 Cloudflare Tunnel 的临时域名访问（例如 *.trycloudflare.com）
    allowedHosts: ['.trycloudflare.com'],
  },
})

