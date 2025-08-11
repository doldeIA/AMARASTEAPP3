import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config minimal e compatível com Vercel
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
  },
  base: "./"
});
