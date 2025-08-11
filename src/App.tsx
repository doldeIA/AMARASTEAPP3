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
 * Final integrated App.tsx
 * - Works with the 15 stub components provided.
 * - Chat is disabled automatically if import.meta.env.VITE_API_KEY is not set.
 * - Where indicated there's a clear placeholder for your Google GenAI fetch/stream.
 */

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
  text: "Boa Quinta-feira! Que bom ter você aqui. Sobre o que você gostaria de falar hoje?",
});

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("landing");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [mainPdfUrl, setMainPdfUrl] = useState<string | null>(null);
  const [bookerPdfUrl, setBookerPdfUrl] = useState<string | null>(null);
  const [uploadCount, setUploadCount] = useState(0);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([getInitialGreetingMessage()]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Modals / admin
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [lastScreenBeforeAdmin, setLastScreenBeforeAdmin] = useState<Screen>("landing");

  // Feature-flag: chat availability from env
  const VITE_API_KEY = import.meta.env.VITE_API_KEY;
  const isChatAvailable = Boolean(VITE_API_KEY);

  useEffect(() => {
    if (!isChatAvailable) {
      console.warn("VITE_API_KEY not set. Chat disabled.");
    }
  }, [isChatAvailable]);

  // Handle clicking 'ACESSAR' on landing
  const handleAccess = async () => {
    setIsIntegrating(true);
    try {
      const res = await fetch(PDF_PATH, { method: "GET" });
      if (!res.ok) throw new Error("O arquivo PDF principal não foi encontrado.");
      const blob = await res.blob();
      setMainPdfUrl(URL.createObjectURL(blob));
      setActiveScreen("pdf");
    } catch (err) {
      console.error("Integration process failed:", err);
      alert("Não foi possível carregar o conteúdo principal (verifique public/home.pdf).");
      setIsIntegrating(false);
    }
  };

  const handleNavigate = (screen: Screen) => {
    if (screen === "booker") {
      setIsIntegrating(true);
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

  // Chat helpers
  const stopGenerationRef = useRef(false);
  const handleStopGeneration = () => (stopGenerationRef.current = true);

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim() || isChatLoading) return;
    if (!isChatAvailable) {
      setChatError("Chat desabilitado: VITE_API_KEY não configurada.");
      return;
    }

    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setIsChatLoading(true);
    setChatError(null);

    // ========== PLACEHOLDER: Cole aqui seu fetch/stream para a REST API do Google GenAI ==========
    // Example skeleton (replace with your streaming logic):
    //
    // try {
    //   const resp = await fetch("YOUR_GENAI_ENDPOINT", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${VITE_API_KEY}`,
    //     },
    //     body: JSON.stringify({ prompt: userInput })
    //   });
    //   const json = await resp.json();
    //   setMessages(prev => [...prev, { sender: "assistant", text: json.text || "Sem resposta" }]);
    // } catch (err) {
    //   setChatError("Erro ao conectar ao assistente.");
    // }
    //
    // ============================================================================================

    // Simple fallback until you paste your fetch:
    await new Promise((r) => setTimeout(r, 600));
    setMessages((prev) => [...prev, { sender: "assistant", text: "Resposta de exemplo — substitua pelo stream da API." }]);
    setIsChatLoading(false);
  };

  const handleUploadPdf = async (_file: File, _pageKey: string) => {
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
        return <DownloadsScreen />;
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
        return <EcossistemaPage />;
      case "revolucao":
        return <RevolucaoPage />;
      case "produtosLogin":
        return <ProdutosLoginPage />;
      case "adminHome":
        return <AdminHomePage />;
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
          <p className="text-xs text-white/50">Direitos Autorais © 2025 Amarasté Live</p>
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
          onClose={() => setIsChatOpen(false)}
          onSendMessage={handleSendMessage}
          onStopGeneration={handleStopGeneration}
        />
      )}

      <SignUpModal
        onClose={() => setIsSignUpModalOpen(false)}
        onSubmit={(email) => {
          // minimal behavior: close modal — customize later
          console.log("Sign up submit (stub):", email);
          setIsSignUpModalOpen(false);
        }}
      />

      {isAdminPanelOpen && <AdminPanel />}

      {isAdminLoginModalOpen && <AdminLoginModal onClose={() => setIsAdminLoginModalOpen(false)} onLogin={handleAdminLogin} />}

      {isIntegrating && <IntegratingLoader />}
    </div>
  );
};

export default App;
