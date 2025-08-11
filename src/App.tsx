// src/App.tsx
import React, { useEffect, useRef, useState } from "react";

/**
 * App.tsx - versão completa e minimal para deploy Vercel
 * - Chat fica desabilitado quando a variável VITE_API_KEY não estiver setada.
 * - sendToGenAI(...) é o ponto que você mencionou: cole seu FETCH/STREAM aí.
 * - O resto preserva a navegação básica: landing -> pdf viewer, loader, footer.
 */

/* ---------- Config / Helpers ---------- */

// Vite exposes env vars as import.meta.env.VITE_...
// Also mantemos fallback para process.env (em testes locais)
const API_KEY =
  (import.meta && (import.meta as any).env && (import.meta as any).env.VITE_API_KEY) ||
  (typeof process !== "undefined" && (process.env as any).VITE_API_KEY) ||
  (typeof process !== "undefined" && (process.env as any).API_KEY) ||
  "";

type Message = {
  sender: "user" | "assistant";
  text: string;
};

const useIsMounted = () => {
  const ref = useRef(false);
  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);
  return ref;
};

/* ---------- Minimal GenAI integration point (you paste your fetch/stream here) ---------- */

/**
 * sendToGenAI
 * - Recebe userText e retorna Promise<string> com resposta do assistente (texto simples).
 * - Se API_KEY não existir, retorna mensagem padrão e resolve rápido.
 *
 * SUBSTITUIR: abaixo tem um bloco comentado com EXEMPLO de fetch para Google Generative API.
 * Você disse que vai escrever o trecho fetch/stream — cole-o aqui, mantendo a mesma assinatura:
 *    async function sendToGenAI(userText: string): Promise<string> { ... }
 */
async function sendToGenAI(userText: string): Promise<string> {
  // Se não houver chave, mantenha chat desabilitado e retorne mensagem curta:
  if (!API_KEY) {
    return Promise.resolve(
      "Chat desabilitado — variável de ambiente VITE_API_KEY não foi encontrada."
    );
  }

  // --- Exemplo (comentado) de como fazer um POST simples para a API REST do Google GenAI ---
  // OBS: verifique e adapte para o endpoint e body que você utiliza (modelo, parâmetros, stream etc).
  //
  // const endpoint = "https://generativelanguage.googleapis.com/v1/models/YOUR_MODEL:generate";
  // const body = {
  //   // Exemplo genérico: adapte conforme a spec do endpoint que você usar
  //   "prompt": userText,
  //   "temperature": 0.7,
  //   "maxOutputTokens": 512
  // };
  // const res = await fetch(endpoint, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     // Se você usa API Key via query param use ?key=XXX no endpoint
  //     "Authorization": `Bearer ${API_KEY}`, // ou use ?key=...
  //   },
  //   body: JSON.stringify(body),
  // });
  // const j = await res.json();
  // // Extrair texto conforme a resposta real da API
  // return j?.candidates?.[0]?.content || j?.output?.[0]?.content || JSON.stringify(j);

  // --- Implementação fallback simples (retorno mock) enquanto você cola seu fetch ---
  await new Promise((r) => setTimeout(r, 350)); // simula latência
  return `Resposta simulada do assistente para: "${userText}"`;
}

/* ---------- App Component (com UI mínima e chat inativo se API_KEY ausente) ---------- */

const PDF_PATH = "/home.pdf"; // substitua se precisar

const App: React.FC = () => {
  const [screen, setScreen] = useState<"landing" | "pdf" | "integrating">("landing");
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "assistant", text: "Olá! Pronto para ajudar com o AmarasteApp." },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const isMountedRef = useIsMounted();

  const chatEnabled = !!API_KEY;

  useEffect(() => {
    if (screen === "integrating") {
      // Simula processo de integração (ex.: pré-carregar PDFs)
      setTimeout(() => {
        if (isMountedRef.current) {
          setScreen("pdf");
          setIsIntegrating(false);
        }
      }, 800);
    }
  }, [screen, isMountedRef]);

  const handleAccess = () => {
    setIsIntegrating(true);
    setScreen("integrating");
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    if (!chatEnabled) {
      // feedback local: não envia
      setMessages((m) => [...m, { sender: "user", text }, { sender: "assistant", text: "Chat está desabilitado (sem chave de API)." }]);
      setInput("");
      return;
    }

    // add user message
    setMessages((m) => [...m, { sender: "user", text }]);
    setInput("");
    setIsSending(true);

    try {
      const reply = await sendToGenAI(text);
      setMessages((m) => [...m, { sender: "assistant", text: reply }]);
    } catch (err: any) {
      console.error("Erro ao chamar GenAI:", err);
      setMessages((m) => [...m, { sender: "assistant", text: "Erro: não foi possível obter resposta do assistente." }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={`min-h-screen ${screen === "landing" ? "bg-primary" : "bg-black"} text-white`}>
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Amarasté App</h1>
        <div className="text-sm">
          {chatEnabled ? (
            <span className="px-2 py-1 rounded bg-green-700">Chat: ativo</span>
          ) : (
            <span className="px-2 py-1 rounded bg-gray-600">Chat: desabilitado</span>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="w-full max-w-5xl mx-auto px-6 py-10">
        {screen === "landing" && (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl text-center">
              <h2 className="text-4xl font-serif mb-6">Integração OK ✅</h2>
              <p className="mb-6 text-lg">Clique em ACESSAR para entrar no conteúdo.</p>
              <button
                onClick={handleAccess}
                aria-label="Acessar"
                className="px-8 py-3 rounded-md bg-white text-black font-bold shadow-lg"
              >
                ACESSAR
              </button>
            </div>
          </div>
        )}

        {screen === "integrating" && (
          <div className="flex flex-col items-center py-24">
            <h3 className="text-3xl mb-6">Integrando...</h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-200" />
              <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-400" />
            </div>
          </div>
        )}

        {screen === "pdf" && (
          <div className="w-full">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl">Visualizador de PDF</h2>
              <div>
                <button onClick={() => setScreen("landing")} className="text-sm underline mr-2">Voltar</button>
              </div>
            </div>

            {/* Visualizador simples - usamos <object> para PDFs estáticos em /public */}
            <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden">
              <object data={PDF_PATH} type="application/pdf" width="100%" height="720">
                <div className="p-6">
                  <p>Seu navegador não oferece suporte a visualização de PDF embutida.</p>
                  <a href={PDF_PATH} target="_blank" rel="noreferrer" className="underline">Abrir PDF</a>
                </div>
              </object>
            </div>

            {/* Area de Chat (simples) */}
            <div className="mt-8">
              <h3 className="text-xl mb-3">Chat (assistente)</h3>

              <div className="bg-gray-900 p-4 rounded-md max-w-2xl">
                <div className="max-h-48 overflow-y-auto mb-3">
                  {messages.map((m, idx) => (
                    <div key={idx} className={`mb-2 ${m.sender === "assistant" ? "text-left" : "text-right"}`}>
                      <div className={`inline-block px-3 py-2 rounded ${m.sender === "assistant" ? "bg-gray-800" : "bg-blue-600"}`}>
                        <small className="block opacity-80">{m.sender}</small>
                        <div>{m.text}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded bg-black/30 outline-none"
                    placeholder={chatEnabled ? "Digite sua mensagem..." : "Chat desabilitado — configure VITE_API_KEY"}
                    disabled={!chatEnabled}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isSending) handleSend();
                    }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!chatEnabled || isSending}
                    className={`px-4 py-2 rounded ${!chatEnabled || isSending ? "bg-gray-600 cursor-not-allowed" : "bg-green-600"}`}
                  >
                    {isSending ? "Enviando..." : "Enviar"}
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-white/70">
        Direitos Autorais © 2025 Amarasté Live
      </footer>
    </div>
  );
};

export default App;
