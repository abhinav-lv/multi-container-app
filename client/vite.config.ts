import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const target = `http://${env.VITE_EXPRESS_API_HOST}:${env.VITE_EXPRESS_API_PORT}`;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
