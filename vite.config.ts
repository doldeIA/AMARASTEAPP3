// vite.config.ts
import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite config minimal e robusta.
 * - usa defineConfig
 * - registra plugin react
 * - carrega envs (GEMINI_API_KEY ou VITE_API_KEY)
 * - adiciona alias @ -> src
 */

export default defineConfig(({ mode }) => {
  // carrega variáveis do .env.* para processar durante build
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      // expõe (somente para build) as chaves que seu app espera.
      // OBS: variáveis públicas do Vite devem começar com VITE_,
      // mas aqui mantemos compatibilidade com seu código se usar process.env.API_KEY
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY ?? env.VITE_API_KEY ?? ""),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY ?? env.VITE_API_KEY ?? "")
    },
    resolve: {
      alias: {
        // mantém padrão confortável: @ -> src
        "@": path.resolve(__dirname, "src"),
      },
    },
    // opções de build padrão (pode ajustar se necessário)
    build: {
      outDir: "dist",
    },
  };
});
