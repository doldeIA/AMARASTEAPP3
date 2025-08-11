import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./index.css";

/**
 * App.tsx - Versão final para deploy no Vercel
 * - PDF viewer (main + booker)
 * - Landing "ACESSAR" (integracao simulado)
 * - Chat placeholder (desativado por padrão)
 * - Spots claros para inserir fetch/stream do Google GenAI (você mencionou que colocará)
 *
 * OBS:
 *  - PDFs referenciados: /home.pdf  e /abracadabra.pdf
 *  - Se você usar outras rotas/nomes, atualize as constantes abaixo.
 */

const PDF_MAIN = "/home.pdf";
const PDF_BOOKER = "/abracadabra.pdf";

type Screen = "landing" | "pdf" | "booker" | "downloads" | "none";

const getApiKey = (): string => {
  // Vite: variáveis de ambiente começam com VITE_ (recomendado)
  // Mas mantemos fallback para process.env.API_KEY caso você injetou no Vercel como process.env
  // (algumas configs anteriores usavam process.env.API_KEY).
  return (import.meta.env as any).VITE_API_KEY || (process.env as any).API_KEY || "";
};

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [mainPdfUrl, setMainPdfUrl] = useState<string | null>(null);
  const [bookerPdfUrl, setBookerPdfUrl] = useState<string | null>(null);
  const [chatEnabled] = useState<boolean>(false); // chat desativado por padrão
  const [apiKey] = useState<string>(getApiKey());

  useEffect(() => {
    // Apenas log para saber se a chave está definida
    if (!apiKey) {
      console.warn("VITE_API_KEY not set. Chat will be disabled until you configure the env var in Vercel.");
    } else {
      console.info("API key present (masked). Chat can be enabled.");
    }
  }, [apiKey]);

  // Simples preloading do PDF principal (fetch e criar object url)
  const preloadMainPdf = async () => {
    try {
      setIsIntegrating(true);
      const res = await fetch(PDF_MAIN);
      if (!res.ok) throw new Error("O arquivo PDF principal não foi encontrado.");
      const blob = await res.blob();
      setMainPdfUrl(URL.createObjectURL(blob));
      setScreen("pdf");
    } catch (e) {
      console.error("Failed to preload main PDF:", e);
      alert("Não foi possível carregar o PDF principal. Verifique se home.pdf está na pasta public.");
    } finally {
      setIsIntegrating(false);
    }
  };

  const preloadBookerPdf = async () => {
    try {
      setIsIntegrating(true);
      const res = await fetch(PDF_BOOKER);
      if (!res.ok) throw new Error("O arquivo PDF do booker não foi encontrado.");
      const blob = await res.blob();
      setBookerPdfUrl(URL.createObjectURL(blob));
      setScreen("booker");
    } catch (e) {
      console.error("Failed to preload booker PDF:", e);
      alert("Não foi possível carregar o PDF do booker. Verifique se abracadabra.pdf está na pasta public.");
    } finally {
      setIsIntegrating(false);
    }
  };

  // Handler do botão ACESSAR (landing)
  const handleAccess = () => {
    // Simular integração com loader e depois abrir o PDF.
    preloadMainPdf();
  };

  // Lugar claro para você integrar a chamada REST do Google GenAI (fetch/stream)
  // Exemplo: quando quiser enviar input do usuário -> faça fetch para sua rota
  // function sendToGenAI(payload) { ... }  <= você implementa aqui

  return (
    <div className="min-h-screen w-full bg-primary text-white antialiased">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Landing Screen */}
        {screen === "landing" && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold neon-pulse">Amarasté Live</h2>
              <p className="text-white/80 mt-2">Portal dimensional da sua identidade sonora.</p>
            </div>

            <button
              onClick={handleAccess}
              className="px-8 py-3 rounded-lg bg-gold text-black font-bold neon-pulse border border-white/20 shadow-lg"
              aria-label="Acessar conteúdo"
            >
              ACESSAR
            </button>

            <div className="text-sm text-white/60">
              <p>Se preferir, abra diretamente o PDF principal (download disponível).</p>
              <div className="mt-3 flex gap-3 justify-center">
                <button
                  onClick={() => preloadMainPdf()}
                  className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
                >
                  Abrir PDF (principal)
                </button>
                <button
                  onClick={() => preloadBookerPdf()}
                  className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
                >
                  Abrir Booker
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Integrating loader */}
        {isIntegrating && (
          <div className="w-full text-center py-6">
            <div className="inline-flex items-center gap-3 px-4 py-3 bg-black/40 rounded">
              <span className="animate-pulse">🔄</span>
              <span>Integrando... aguarde.</span>
            </div>
          </div>
        )}

        {/* PDF Screen */}
        {screen === "pdf" && (
          <section className="w-full">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <button
                  onClick={() => setScreen("landing")}
                  className="px-3 py-1 rounded bg-white/10 text-white"
                >
                  ← Voltar
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // Forçar re-preload se quiser
                    preloadBookerPdf();
                  }}
                  className="px-3 py-1 rounded bg-white/10 text-white"
                >
                  Abrir Booker
                </button>
                <a
                  href={PDF_MAIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded bg-gold text-black font-semibold"
                >
                  Baixar PDF
                </a>
              </div>
            </div>

            <div className="w-full rounded-lg overflow-hidden shadow-lg">
              <object
                data={mainPdfUrl || PDF_MAIN}
                type="application/pdf"
                className="w-full object-pdf-wrapper"
              >
                <div className="p-6 bg-white text-black">
                  <p>Seu navegador não suporta visualização de PDF.</p>
                  <a href={PDF_MAIN} className="underline text-gold" target="_blank" rel="noreferrer">
                    Clique aqui para baixar o PDF.
                  </a>
                </div>
              </object>
            </div>
          </section>
        )}

        {/* Booker Screen */}
        {screen === "booker" && (
          <section className="w-full">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <button
                  onClick={() => setScreen("pdf")}
                  className="px-3 py-1 rounded bg-white/10 text-white"
                >
                  ← Voltar
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // voltar para o principal
                    preloadMainPdf();
                  }}
                  className="px-3 py-1 rounded bg-white/10 text-white"
                >
                  Abrir Principal
                </button>
                <a
                  href={PDF_BOOKER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded bg-gold text-black font-semibold"
                >
                  Baixar Booker
                </a>
              </div>
            </div>

            <div className="w-full rounded-lg overflow-hidden shadow-lg">
              <object
                data={bookerPdfUrl || PDF_BOOKER}
                type="application/pdf"
                className="w-full object-pdf-wrapper"
              >
                <div className="p-6 bg-white text-black">
                  <p>Seu navegador não suporta visualização de PDF.</p>
                  <a href={PDF_BOOKER} className="underline text-gold" target="_blank" rel="noreferrer">
                    Clique aqui para baixar o PDF do Booker.
                  </a>
                </div>
              </object>
            </div>
          </section>
        )}

        {/* Downloads placeholder */}
        {screen === "downloads" && (
          <section className="w-full">
            <h3 className="text-xl font-semibold mb-2">Downloads</h3>
            <p className="text-white/70">Lista de materiais para download (a implementar).</p>
          </section>
        )}
      </main>

      {/* Chat widget/footer area */}
      <footer className="w-full py-6 bg-black/30">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div className="text-sm text-white/70">Direitos Autorais © {new Date().getFullYear()} Amarasté Live</div>

          <div className="text-sm">
            {chatEnabled ? (
              <span className="text-green-300">Chat ativo</span>
            ) : (
              <span className="text-yellow-300">Chat desativado (configure VITE_API_KEY para ativar)</span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
