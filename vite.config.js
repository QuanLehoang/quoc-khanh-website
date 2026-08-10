import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/test/',
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          animation: ['gsap', 'aos'],
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
});
