
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  const getEnvVar = (key: string) => {
    return JSON.stringify(env[key] || process.env[key] || "");
  };

  return {
    plugins: [react()],
    define: {
      // API_KEY is now handled securely by Netlify Functions (Backend)
      // We only inject the Google Sheets URL for the contact form
      'process.env.GOOGLE_SHEETS_URL': getEnvVar('GOOGLE_SHEETS_URL')
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    },
    base: '/'
  };
});
