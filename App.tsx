// src/App.tsx
import React, { useState, useEffect, useRef } from "react";
import { GoogleGenAI, Chat } from "@google/genai";
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

const PDF_PATH = "/home.pdf";
const BOOKER_PDF_PATH = "/abracadabra.pdf";

const DB_NAME = "AmarasteAppDB";
const DB_VERSION = 1;
const STORE_NAME = "pdfStore";

const openDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (e) => reject((e.target as any).error);
    request.onsuccess = (e) => resolve((e.target as any).result);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
    };
  });

export const savePdfToDb = async (file: File, pageKey: string) => {
  const db = await openDb();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put({ data: file, filename: file.name, created_at: new Date().toISOString() }, pageKey);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
};

export const loadPdfFromDb = async (pageKey: string): Promise<Blob | null> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(pageKey);
    tx.oncomplete = () => {
      db.close();
      const r = (req as any).result;
      if (r && r.data instanceof Blob) resolve(r.data);
      else resolve(null);
    };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
};

export const removePdfFromDb = async (pageKey: string) => {
  const db = await openDb();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.delete(pageKey);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
};

// --- Chat system instruction simplified for brevity (keep your original if needed)
const systemInstruction = `Você é Amarasté...`;

export type Screen = "landing" | "pdf" | "downloads" | "booker" | "portalMagico" | "revolucao" | "produtosLogin" | "adminHome" | null;

const getInitialGreetingMessage = (): Message => ({ sender: "assistant", text: "Olá — como posso ajudar?" });

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("landing");
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [mainPdfUrl, setMainPdfUrl] = useState<string | null>(null);
  const [bookerPdfUrl, setBookerPdfUrl] = useState<string | null>(null);
  const [uploadCount, setUploadCount] = useState(0);

  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([getInitialGreetingMessage()]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const integrationTimeoutRef = useRef<number | null>(null);
  const stopGenerationRef = useRef(false);

  // Initialize chat but DON'T block UI if API key missing
  useEffect(() => {
    const init = async () => {
      try {
        const API_KEY = (import.meta.env as any).VITE_API_KEY;
        if (!API_KEY) {
          console.warn("VITE_API_KEY not set. Chat disabled.");
          setChatError("VITE_API_KEY not set.");
          return;
        }
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const chatSession = ai.chats.create({ model: "gemini-2.5-flash", config: { systemInstruction } });
        setChat(chatSession);
      } catch (e) {
        console.error("Chat init error:", e);
        setChatError("Erro ao iniciar chat");
      }
    };
    init();
  }, []);

  // handleAccess: tenta IndexedDB -> public/home.pdf; cria timeout para não travar
  const handleAccess = () => {
    setIsIntegrating(true);

    // limpa timeout anterior
    if (integrationTimeoutRef.current) {
      window.clearTimeout(integrationTimeoutRef.current);
      integrationTimeoutRef.current = null;
    }

    const loadMainPdf = async (): Promise<string> => {
      try {
        let pdfBlob = await loadPdfFromDb("pdf");
        if (!pdfBlob) {
          const res = await fetch(PDF_PATH);
          if (!res.ok) {
            throw new Error(`HTTP ${res.status} buscando ${PDF_PATH}`);
          }
          pdfBlob = await res.blob();
          const f = new File([pdfBlob], "pdf.pdf", { type: "application/pdf" });
          try { await savePdfToDb(f, "pdf"); } catch (e) { console.warn("savePdfToDb failed", e); }
        }
        if (!pdfBlob) throw new Error("Nenhum PDF encontrado.");
        return URL.createObjectURL(pdfBlob);
      } catch (e: any) {
        console.error("loadMainPdf error:", e);
        throw e;
      }
    };

    // set timeout de fallback para liberar loader caso algo dê errado (8s)
    integrationTimeoutRef.current = window.setTimeout(() => {
      integrationTimeoutRef.current = null;
      setIsIntegrating(false);
      alert("Tempo de integração excedido. Verifique se /home.pdf existe em public/ e tente novamente.");
    }, 8000);

    loadMainPdf()
      .then((url) => {
        setMainPdfUrl(url);
        setActiveScreen("pdf");
        // espera o PdfViewerScreen chamar onPage1Rendered antes de tirar loader
      })
      .catch((err) => {
        console.error("handleAccess failed:", err);
        if (integrationTimeoutRef.current) {
          window.clearTimeout(integrationTimeoutRef.current);
          integrationTimeoutRef.current = null;
        }
        setIsIntegrating(false);
        alert("Erro ao carregar PDF: " + (err?.message || "verifique public/home.pdf"));
      });
  };

  // chamado pelo PdfViewerScreen quando a página 1 foi renderizada OU em caso de erro de render
  const handlePage1Rendered = () => {
    if (integrationTimeoutRef.current) {
      window.clearTimeout(integrationTimeoutRef.current);
      integrationTimeoutRef.current = null;
    }
    setIsIntegrating(false);
  };

  // rest of app functions (minimal) - upload, remove, navigation simplified
  const handleUploadPdf = async (file: File, pageKey: string) => {
    await savePdfToDb(file, pageKey);
    setUploadCount((s) => s + 1);
  };
  const handleRemovePdf = async (pageKey: string) => {
    await removePdfFromDb(pageKey);
    setUploadCount((s) => s + 1);
  };

  // Chat send - simplified; keep your implementation if needed
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isChatLoading || !chat) return;
    stopGenerationRef.current = false;
    setIsChatLoading(true);
    setMessages((m) => [...m, { sender: "user", text }]);
    try {
      const stream = await chat.sendMessageStream({ message: text });
      let assistantResponse = "";
      setMessages((m) => [...m, { sender: "assistant", text: "" }]);
      for await (const chunk of stream) {
        if (stopGenerationRef.current) break;
        assistantResponse += chunk.text || "";
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1].text = assistantResponse;
          return copy;
        });
      }
    } catch (e) {
      console.error("send message error", e);
      setMessages((m) => [...m, { sender: "assistant", text: "Erro: assistente indisponível." }]);
    } finally {
      setIsChatLoading(false);
      stopGenerationRef.current = false;
    }
  };

  const showMainApp = activeScreen !== "landing";

  return (
    <div className={`w-full min-h-screen ${showMainApp ? "bg-black" : "bg-primary"} transition-colors duration-500 ease-out`}>
      {showMainApp && <Header activeScreen={activeScreen} onNavigateHome={() => setActiveScreen("pdf")} onNavigateDownloads={() => setActiveScreen("downloads")} onNavigateToPage={(p) => setActiveScreen(p as Screen)} onOpenSignUpModal={() => {}} />}

      {activeScreen === "landing" && <LandingScreen onAccess={handleAccess} />}

      {activeScreen === "pdf" && (
        <div className="w-full">
          <PdfViewerScreen preloadedFileUrl={mainPdfUrl} fallbackPath={PDF_PATH} onPage1Rendered={handlePage1Rendered} />
          <SoundCloudPlayer onTalkAboutMusic={() => {}} />
        </div>
      )}

      {activeScreen === "downloads" && <DownloadsScreen onBack={() => setActiveScreen("pdf")} />}

      {isIntegrating && <IntegratingLoader />}

      {isChatOpen && (
        <ChatModal messages={messages} isLoading={isChatLoading} error={chatError} onClose={() => setIsChatOpen(false)} onSendMessage={handleSendMessage} onStopGeneration={() => (stopGenerationRef.current = true)} />
      )}

      <footer className="w-full text-center py-4 text-white/60">Direitos © 2025 Amarasté Live</footer>
    </div>
  );
};

export default App;
