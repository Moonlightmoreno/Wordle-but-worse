import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: 'main.html',
        game: 'game.html',
        mathle: 'mathle.html'
      }
    }
  },
  plugins: [
    tailwindcss(),
  ],
  server: {
    open: '/main.html'
  }
})