import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Isso garante que códigos legados usando process.env não quebrem,
    // mas o ideal é usar import.meta.env no Vercel.
    'process.env': {}
  }
});