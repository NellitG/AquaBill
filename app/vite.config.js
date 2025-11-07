import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    chunkSizeWarningLimit: 600, // optional – suppress warning
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          utils: ['./src/utils/index.js'],
          vendor: [
            'axios',
            'chart.js',
            'dayjs',
            // add any other heavy libs here
          ]
        }
      }
    }
  }
})
