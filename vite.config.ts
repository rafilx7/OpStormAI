import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Removemos o define: { 'process.env': {} } pois ele sobrescrevia
  // o objeto process globalmente, impedindo a verificação correta
  // de variáveis de ambiente no nosso helper getApiKey.
});