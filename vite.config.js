import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "Rollaskillscape.github.io"
  plugins: [react()],
})
