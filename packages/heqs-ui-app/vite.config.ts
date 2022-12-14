import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/x-license-pro': path.resolve(__dirname, './src/utils/lic')
    }
  },
  build: {
    outDir: './dist'
  }
})
