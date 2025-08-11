import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [chatEnabled] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-primary text-white">
      {/* Cabeçalho */}
      <header className="bg-primary shadow-md p-4 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gold neon-pulse">
          AmarasteApp
        </h1>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 p-4 flex flex-col items-center gap-6">
        
        {/* Exibição do PDF */}
        <section className="w-full max-w-4xl">
          <object
            className="object-pdf-wrapper"
            data="/meu-primeiro.pdf"
            type="application/pdf"
          >
            <p className="text-center text-sm text-gray-200">
              Seu navegador não suporta visualização de PDF.
              <a
                href="/meu-primeiro.pdf"
                className="underline text-gold ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Clique aqui para baixar.
              </a>
            </p>
          </object>
        </section>

        {/* Placeholder do Chat */}
        <section className="w-full max-w-4xl bg-gray-900 p-4 rounded-lg shadow-lg">
          {chatEnabled ? (
            <div>
              {/* Aqui entra o componente de chat real no futuro */}
              <p className="text-green-400">Chat ativo...</p>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              💬 O chat está temporariamente desativado.
            </div>
          )}
        </section>

      </main>

      {/* Rodapé */}
      <footer className="bg-primary p-4 text-center text-sm text-gray-300 border-t border-gold">
        &copy; {new Date().getFullYear()} AmarasteApp — Todos os direitos reservados.
      </footer>
    </div>
  );
}
