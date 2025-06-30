// vite.config.ts
import { defineConfig } from 'vite'
import path from 'path'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  server: {
    port: 3000,
    watch: {
      ignored: ['**/*.txt'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [tsConfigPaths(), tanstackStart()],
})
