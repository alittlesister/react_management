import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        // 'react-dom': path.resolve(__dirname, 'src/shims/react-dom-render-shim.ts')
      },
    },
    server: {
      port: 5173,
      host: "0.0.0.0",
      cors: true,
      allowedHosts: true,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
