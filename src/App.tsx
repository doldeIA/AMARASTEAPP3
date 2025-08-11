import React, { useEffect, useRef, useState } from "react";
import LandingScreen from "./components/LandingScreen";
import PdfViewerScreen from "./components/PdfViewerScreen";
import DownloadsScreen from "./components/DownloadsScreen";
import ChatWidget from "./components/ChatWidget";
import ChatModal, { Message } from "./components/ChatModal";
import Header from "./components/Header";
import IntegratingLoader from "./components/IntegratingLoader";
import BookerScreen from "./components/BookerScreen";
import EcossistemaPage from "./components/EcossistemaPage";
import SoundCloudPlayer from "./components/SoundCloudPlayer";
import SignUpModal from "./components/SignUpModal";
import RevolucaoPage from "./components/RevolucaoPage";
import ProdutosLoginPage from "./components/ProdutosLoginPage";
import AdminPanel from "./components/AdminPanel";
import AdminLoginModal from "./components/AdminLoginModal";
import AdminHomePage from "./components/AdminHomePage";

/**
 * App.tsx
 * - Minimal chat integration: chat is disabled unless VITE_API_KEY is set in Vercel (or local .env)
 * - PDF loading logic uses IndexedDB as cache and falls back to fetching '/home.pdf' and '/abracadabra.pdf'
 * - Keep components structure as in your repo (LandingScreen, PdfViewerScreen, etc.)
 */

/* ---------- Constants ---------- */
const PDF_PATH = "/home.pdf";
const BOOKER_PDF_PATH = "/abracadabra.pdf";

/* IndexedDB config */
const DB_NAME = "AmarasteAppDB";
const DB_VERSION = 1;
const STORE_NAME = "pdfStore";

/* ---------- IndexedDB helpers (async) ---------- */
const openDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (e) => {
      // @ts-ignore
      reject((e.target as IDBOpenDBRequest).error);
    };
    request.onsuccess = (e) => {
      // @ts-ignore
      resolve((e.target as IDBOpenDBRequest).result);
    };
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });

export const savePdfToDb = async (file: File, pageKey: string): Promise<void> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const item = {
      id: pageKey,
      filename: file.name,
      data: file,
      created_at: new Date().toISOString(),
    };
    store.put(item, pageKey);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
};

export const loadPdfFromDb = async (pageKey: string): Promise<Blob | null> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(pageKey);
    req.onsuccess = () => {
      const res = req.result;
      db.close();
      if (res && res.data instanceof Blob) {
        resolve(res.data);
      } else {
        resolve(null);
      }
    };
    req.onerror = () => {
      db.close();
      reject(req.error);
    };
  });
};

export const removePdfFromDb = async (pageKey: string): Promise<void> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(pageKey);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
};

/* ---------- Types ---------- */
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

/* ---------- Helper: initial greeting ---------- */
const getInitialGreetingMessage = (): Message => ({
  sender: "assistant",
  text: "Boa Quinta-feira!\nQue bom ter você aqui. Sobre o que você gostaria de falar hoje?",
});

/* ---------- Main App Component ---------- */
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

  // Admin UI
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [lastScreenBeforeAdmin, setLastScreenBeforeAdmin] = useState<Screen>("landing");

  // Chat availability (minimal integration)
  const API_KEY = import.meta.env.VITE_API_KEY;
  const chatDisabled = !API_KEY || API_KEY.length === 0;

  const stopGenerationRef = useRef(false);

  useEffect(() => {
    if (chatDisabled) {
      setChatError("VITE_API_KEY not set. Chat está desativado até a variável ser configurada.");
      return;
    }
    // If you want to initialize a real chat client later, do it here.
    // For now we keep chat session null / placeholder until user enables API key.
  }, [API_KEY]);

  /* ---------- Keyboard admin toggle (Ctrl+Shift+A) ---------- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "A") {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setIsAdminPanelOpen((p) => !p);
        } else {
          setLastScreenBeforeAdmin(activeScreen);
          setIsAdminLoginModalOpen(true);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isAdminLoggedIn, activeScreen]);

  /* ---------- PDF Preloading (used when user clicks ACESSAR or navigates to booker) ---------- */
  const preloadPdf = async (pageKey: "pdf" | "booker", fallbackPath: string): Promise<string> => {
    try {
      let blob = await loadPdfFromDb(pageKey);
      if (!blob) {
        // fetch from public/
        const resp = await fetch(fallbackPath);
        if (!resp.ok) throw new Error(`O arquivo ${fallbackPath} não foi encontrado.`);
        blob = await resp.blob();
        const file = new File([blob], `${pageKey}.pdf`, { type: "application/pdf" });
        // Save to IndexedDB for offline/perf
        try {
          await savePdfToDb(file, pageKey);
        } catch (e) {
          // non-fatal
          console.warn("Falha ao salvar PDF no indexedDB:", e);
        }
      }
      return URL.createObjectURL(blob);
    } catch (err) {
      throw err;
    }
  };

  const handleAccess = () => {
    setIsIntegrating(true);
    preloadPdf("pdf", PDF_PATH)
      .then((url) => {
        setMainPdfUrl(url);
        setActiveScreen("pdf");
        // handlePage1Rendered will set isIntegrating false when viewer mounts / renders
      })
      .catch((err) => {
        console.error("Integration process failed:", err);
        setIsIntegrating(false);
        alert("Não foi possível carregar o conteúdo. Por favor, tente novamente.");
      });
  };

  const handlePage1Rendered = () => {
    setIsIntegrating(false);
  };

  const handleNavigate = (screen: Screen) => {
    if (screen === "booker") {
      setIsIntegrating(true);
      preloadPdf("booker", BOOKER_PDF_PATH)
        .then((url) => {
          setBookerPdfUrl(url);
          setActiveScreen("booker");
        })
        .catch((err) => {
          console.error("Booker integration failed:", err);
          setIsIntegrating(false);
          alert("Não foi possível carregar o booker. Por favor tente novamente.");
        });
    } else {
      setActiveScreen(screen);
    }
  };

  const handleGoBackFromDownloads = () => {
    setActiveScreen("pdf");
  };

  /* ---------- Admin login ---------- */
  const handleAdminLogin = (user: string, pass: string): boolean => {
    if (user === "1234" && pass === "1234") {
      setIsAdminLoggedIn(true);
      setIsAdminLoginModalOpen(false);
      setActiveScreen("adminHome");
      return true;
    }
    return false;
  };

  /* ---------- Chat send logic (minimal stub) ---------- */
  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;
    if (isChatLoading) return;

    // push user message
    const userMessage: Message = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);

    // If chat disabled, respond with friendly message and return
    if (chatDisabled) {
      setIsChatLoading(true);
      // simulate a small delay for UX
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "assistant", text: "Chat está desativado. Configure VITE_API_KEY em Settings do Vercel para ativar." },
        ]);
        setIsChatLoading(false);
      }, 600);
      return;
    }

    // If here: API key exists. Currently we do not call any API automatically.
    // Option: implement fetch() to your GenAI REST endpoint here.
    setIsChatLoading(true);
    try {
      // Placeholder assistant echo (replace this block with real API calls)
      await new Promise((res) => setTimeout(res, 600));
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "Resposta simulada (chave presente). Substitua esta rotina por chamada REST ao GenAI quando quiser ativar o bot.",
        },
      ]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [...prev, { sender: "assistant", text: "Erro ao tentar enviar mensagem. Tente novamente." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleStopGeneration = () => {
    stopGenerationRef.current = true;
    // If you implement streaming, use this flag to stop.
  };

  const handleUploadPdf = async (file: File, pageKey: string) => {
    try {
      await savePdfToDb(file, pageKey);
      setUploadCount((c) => c + 1);
    } catch (e) {
      console.error("Failed to upload pdf to db:", e);
      alert("Falha ao fazer upload do PDF.");
    }
  };

  const handleRemovePdf = async (pageKey: string) => {
    try {
      await removePdfFromDb(pageKey);
      setUploadCount((c) => c + 1);
    } catch (e) {
      console.error("Failed to remove pdf from db:", e);
      alert("Falha ao remover PDF.");
    }
  };

  /* ---------- UI rendering (preserve structure) ---------- */
  const showMainApp = activeScreen !== "landing";

  const renderContent = () => {
    switch (activeScreen) {
      case "landing":
        return <LandingScreen onAccess={handleAccess} />;
      case "pdf":
        return (
          <div className="w-full">
            <PdfViewerScreen
              key={"pdf" + uploadCount}
              pageKey="pdf"
              fallbackPath={PDF_PATH}
              preloadedFileUrl={mainPdfUrl}
              onPage1Rendered={handlePage1Rendered}
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
              key={"booker" + uploadCount}
              pageKey="booker"
              fallbackPath={BOOKER_PDF_PATH}
              preloadedFileUrl={bookerPdfUrl}
              onPage1Rendered={handlePage1Rendered}
            />
            <div className="w-full max-w-3xl mx-auto pb-12 px-4">
              <button
                onClick={() => window.open("https://wa.me/5575933002386", "_blank", "noopener")}
                style={{ animation: "blinkFast 0.15s infinite ease-in-out", filter: "drop-shadow(0 0 12px rgba(255, 230, 0, 0.8))" }}
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
        return <ProdutosLoginPage onNavigateHome={() => handleNavigate("pdf")} onNavigateToSignUp={() => setIsSignUpModalOpen(true)} />;
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
      {/* Header (only show when not on landing) */}
      {showMainApp && (
        <Header
          activeScreen={activeScreen}
          onNavigateDownloads={() => handleNavigate("downloads")}
          onNavigateHome={() => handleNavigate("pdf")}
          onNavigateToPage={(page) => handleNavigate(page as Screen)}
          onOpenSignUpModal={() => setIsSignUpModalOpen(true)}
        />
      )}

      {/* Main content */}
      {renderContent()}

      {/* Footer */}
      {showMainApp && activeScreen !== "revolucao" && activeScreen !== "produtosLogin" && activeScreen !== "adminHome" && (
        <footer className="w-full text-center py-4">
          <p className="text-xs text-white/50 font-sans" style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.4)" }}>
            Direitos Autorais © 2025 Amarasté Live
          </p>
        </footer>
      )}

      {/* Chat widget / modal */}
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
            // reset to greeting if conversation was short
            if (messages.length <= 1) setMessages([getInitialGreetingMessage()]);
          }}
          onSendMessage={handleSendMessage}
          onStopGeneration={handleStopGeneration}
        />
      )}

      {/* Sign up modal */}
      <SignUpModal isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} onSwitchToLogin={() => setActiveScreen("produtosLogin")} />

      {/* Admin UI */}
      {isAdminPanelOpen && <AdminPanel onClose={() => setIsAdminPanelOpen(false)} onUpload={handleUploadPdf} onRemove={handleRemovePdf} />}
      {isAdminLoginModalOpen && <AdminLoginModal onClose={() => setIsAdminLoginModalOpen(false)} onLogin={handleAdminLogin} />}

      {/* Loading overlay while integrating */}
      {isIntegrating && <IntegratingLoader />}
    </div>
  );
};

export default App;
