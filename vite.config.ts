import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pages 部署在子路径下，需要设置 base
  // 只在生产环境（GitHub Pages）使用子路径，开发环境使用根路径
  base: process.env.NODE_ENV === 'production' ? '/sweekli-website/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
