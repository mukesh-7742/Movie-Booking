import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on current mode (development / production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // Optional: use env variable directly here
    define: {
      'process.env': env,
    },
    
  };
});
