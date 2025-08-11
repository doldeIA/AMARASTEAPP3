// src/App.tsx
import React, { useEffect, useRef, useState } from "react";
import LandingScreen from "./components/LandingScreen";
import PdfViewerScreen from "./components/PdfViewerScreen";
import Header from "./components/Header";
import ChatWidget from "./components/ChatWidget";
import ChatModal, { Message } from "./components/ChatModal";
import IntegratingLoader from "./components/IntegratingLoader";
import SoundCloudPlayer from "./components/SoundCloudPlayer";
import DownloadsScreen from "./components/DownloadsScreen";
import SignUpModal from "./components/SignUpModal";
import AdminPanel from "./components/AdminPanel";
import AdminLoginModal from "./components/AdminLoginModal";
import AdminHomePage from "./components/AdminHomePage";
import BookerScreen from "./components/BookerScreen";
import EcossistemaPage from "./components/EcossistemaPage";
import RevolucaoPage from "./components/RevolucaoPage";
import ProdutosLoginPage from "./components/ProdutosLoginPage";

/**
 * App.tsx
 * - Mantém a mesma estrutura de telas do projeto original.
 * - Chat fica automaticamente desativado se VITE_API_KEY não estiver setada (mensagem no console + UI).
 * - Onde indicado, cole seu fetch/stream da REST API do Google GenAI (eu disse que você faria esse trecho).
 */

/* --- Type helpers --- */
export type Screen =
  | "landing"
  | "pdf"
  | "downloads"
  | "booker"
  | "portalMagico"
  | "revolucao"
  | "produtosLogin"
  | "adminHome"
  | null;

const PDF_PATH = "/home.pdf";
const BOOKER_PDF_PATH = "/abracadabra.pdf";

const getInitialGreetingMessage = (): Message => ({
  sender: "assistant",
  text: "Boa quinta-feira! Que bom ter você aqui. Sobre o que você gostaria de falar hoje?",
});

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("landing");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [mainPdfUrl, setMainPdfUrl] = useState<string | null>(null);
  const [bookerPdfUrl, setBookerPdfUrl] = useState<string | null>(null);
  const [uploadCount, setUploadCount] = useState(0);

  // Chat-related state
  const [messages, setMessages] = useState<Message[]>([getInitialGreetingMessage()]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Admin / modals
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [lastScreenBeforeAdmin, setLastScreenBeforeAdmin] = useState<Screen>("landing");

  // feature-flag: disable chat if no API key in build env
  const VITE_API_KEY = import.meta.env.VITE_API_KEY;
  const isChatAvailable = Boolean(VITE_API_KEY);

  useEffect(() => {
    if (!isChatAvailable) {
      console.warn("VITE_API_KEY not set. Chat disabled.");
    }
  }, [isChatAvailable]);

  // Simulate preloading the main PDF from public/
  const handleAccess = async () => {
    setIsIntegrating(true);

    try {
      // Try fetch the public PDF path (public/home.pdf). If it 404s, we show an alert.
      const res = await fetch(PDF_PATH, { method: "GET" });
      if (!res.ok) throw new Error("O arquivo PDF principal não foi encontrado.");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setMainPdfUrl(url);
      setActiveScreen("pdf");
    } catch (err) {
      console.error("Integration process failed:", err);
      alert("Não foi possível carregar o conteúdo. Verifique se /home.pdf existe em public/.");
      setIsIntegrating(false);
    }
  };

  // Navigation handler
  const handleNavigate = (screen: Screen) => {
    if (screen === "booker") {
      setIsIntegrating(true);
      // preload booker PDF
      (async () => {
        try {
          const res = await fetch(BOOKER_PDF_PATH);
          if (!res.ok) throw new Error("Arquivo do booker não encontrado.");
          const blob = await res.blob();
          setBookerPdfUrl(URL.createObjectURL(blob));
          setActiveScreen("booker");
        } catch (err) {
          console.error("Booker integration failed:", err);
          alert("Não foi possível carregar o PDF do booker.");
        } finally {
          setIsIntegrating(false);
        }
      })();
    } else {
      setActiveScreen(screen);
    }
  };

  const handleGoBackFromDownloads = () => setActiveScreen("pdf");

  // Chat send (placeholder). If chat is disabled, this will do nothing.
  const stopGenerationRef = useRef(false);
  const handleStopGeneration = () => {
    stopGenerationRef.current = true;
  };

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim() || isChatLoading) return;
    if (!isChatAvailable) {
      setChatError("Chat desabilitado: VITE_API_KEY não configurada.");
      return;
    }

    // add user message
    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setIsChatLoading(true);
    setChatError(null);

    // --- PLACEHOLDER: cole aqui o seu fetch/stream para a REST API do Google GenAI ---
    // Example skeleton (you will replace with your streaming logic):
    //
    // try {
    //   const res = await fetch("/api/genai", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json", "Authorization": `Bearer ${VITE_API_KEY}` },
    //     body: JSON.stringify({ prompt: userInput })
    //   });
    //   const data = await res.json();
    //   setMessages(prev => [...prev, { sender: "assistant", text: data?.text || "Resposta vazia" }]);
    // } catch (e) {
    //   setChatError("Erro ao falar com o assistente.");
    // }
    //
    // Obs: Se você usar streaming, atualize o estado incrementalmente (eu deixei o placeholder para você colar).
    // ---------------------------------------------------------------------

    // simple fallback (until you add your fetch):
    await new Promise((r) => setTimeout(r, 600));
    setMessages((prev) => [...prev, { sender: "assistant", text: "Resposta de exemplo (substitua pelo stream REST)." }]);

    setIsChatLoading(false);
  };

  const handleUploadPdf = async (_file: File, _pageKey: string) => {
    // Optional admin upload functionality — implement as needed in AdminPanel
    setUploadCount((c) => c + 1);
  };
  const handleRemovePdf = async (_pageKey: string) => {
    setUploadCount((c) => c + 1);
  };

  const handleAdminLogin = (user: string, pass: string) => {
    if (user === "1234" && pass === "1234") {
      setIsAdminLoggedIn(true);
      setIsAdminLoginModalOpen(false);
      setActiveScreen("adminHome");
      return true;
    }
    return false;
  };

  const showMainApp = activeScreen !== "landing";

  const renderContent = () => {
    switch (activeScreen) {
      case "landing":
        return <LandingScreen onAccess={handleAccess} />;
      case "pdf":
        return (
          <div className="w-full">
            <PdfViewerScreen
              key={`pdf-${uploadCount}`}
              pageKey="pdf"
              fallbackPath={PDF_PATH}
              preloadedFileUrl={mainPdfUrl ?? undefined}
              onPage1Rendered={() => setIsIntegrating(false)}
            />
            <SoundCloudPlayer onTalkAboutMusic={() => setIsChatOpen(true)} />
          </div>
        );
      case "downloads":
        return <DownloadsScreen onBack={handleGoBackFromDownloads} />;
      case "booker":
        return (
          <div className="w-full relative min-h-screen">
            <PdfViewerScreen
              key={`booker-${uploadCount}`}
              pageKey="booker"
              fallbackPath={BOOKER_PDF_PATH}
              preloadedFileUrl={bookerPdfUrl ?? undefined}
              onPage1Rendered={() => setIsIntegrating(false)}
            />
            <div className="w-full max-w-3xl mx-auto pb-12 px-4">
              <button
                onClick={() => window.open("https://wa.me/5575933002386", "_blank", "noopener")}
                className="w-full py-4 bg-gold text-white font-bold rounded-lg shadow-lg transition-transform duration-200 active:scale-95 focus:outline-none"
              >
                Agendar
              </button>
            </div>
          </div>
        );
      case "portalMagico":
        return <EcossistemaPage onNavigate={handleNavigate} />;
      case "revolucao":
        return <RevolucaoPage onNavigateHome={() => handleNavigate("pdf")} />;
      case "produtosLogin":
        return (
          <ProdutosLoginPage onNavigateHome={() => handleNavigate("pdf")} onNavigateToSignUp={() => setIsSignUpModalOpen(true)} />
        );
      case "adminHome":
        return <AdminHomePage onBack={() => setActiveScreen(lastScreenBeforeAdmin)} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full min-h-screen ${showMainApp ? "bg-black" : "bg-primary"} transition-colors duration-500 ease-out ${
        activeScreen === "landing" || activeScreen === null ? "overflow-hidden" : "overflow-y-auto"
      }`}
    >
      {showMainApp && (
        <Header
          activeScreen={activeScreen}
          onNavigateDownloads={() => handleNavigate("downloads")}
          onNavigateHome={() => handleNavigate("pdf")}
          onNavigateToPage={(p) => handleNavigate(p as Screen)}
          onOpenSignUpModal={() => setIsSignUpModalOpen(true)}
        />
      )}

      {renderContent()}

      {showMainApp && activeScreen !== "revolucao" && activeScreen !== "produtosLogin" && activeScreen !== "adminHome" && (
        <footer className="w-full text-center py-4">
          <p className="text-xs text-white/50 font-sans">Direitos Autorais © 2025 Amarasté Live</p>
        </footer>
      )}

      {showMainApp && activeScreen !== "downloads" && activeScreen !== "booker" && activeScreen !== "adminHome" && (
        <ChatWidget onOpen={() => setIsChatOpen(true)} />
      )}

      {isChatOpen && (
        <ChatModal
          messages={messages}
          isLoading={isChatLoading}
          error={chatError}
          onClose={() => {
            setIsChatOpen(false);
          }}
          onSendMessage={handleSendMessage}
          onStopGeneration={handleStopGeneration}
        />
      )}

      <SignUpModal isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} onSwitchToLogin={() => setActiveScreen("produtosLogin")} />

      {isAdminPanelOpen && (
        <AdminPanel
          onClose={() => setIsAdminPanelOpen(false)}
          onUpload={handleUploadPdf}
          onRemove={handleRemovePdf}
        />
      )}

      {isAdminLoginModalOpen && <AdminLoginModal onClose={() => setIsAdminLoginModalOpen(false)} onLogin={handleAdminLogin} />}

      {isIntegrating && <IntegratingLoader />}
    </div>
  );
};

export default App;
