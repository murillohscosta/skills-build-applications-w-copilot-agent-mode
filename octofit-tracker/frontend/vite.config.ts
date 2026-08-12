import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const viteCodespaceName =
    env.VITE_CODESPACE_NAME || process.env.VITE_CODESPACE_NAME || process.env.CODESPACE_NAME || '';

  return {
    plugins: [react()],
    server: {
      port: 5173,
    },
    define: {
      'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(viteCodespaceName),
    },
  };
});
