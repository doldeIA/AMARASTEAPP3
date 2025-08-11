// src/App.tsx
import React, { useState } from "react";
import LandingScreen from "./components/LandingScreen";
import PdfViewerScreen from "./components/PdfViewerScreen";
import Header from "./components/Header";
import IntegratingLoader from "./components/IntegratingLoader";

type Screen = "landing" | "pdf" | "downloads" | null;
const PDF_PATH = "/home.pdf";

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("landing");
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [mainPdfUrl, setMainPdfUrl] = useState<string | null>(null);

  const handleAccess = async () => {
    setIsIntegrating(true);
    try {
      const resp = await fetch(PDF_PATH);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      setMainPdfUrl(url);
      setActiveScreen("pdf");
    } catch (err) {
      console.error("Erro ao carregar PDF:", err);
      alert("Erro ao carregar conteúdo. Verifique public/home.pdf (veja console).");
    } finally {
      setIsIntegrating(false);
    }
  };

  return (
    <div className={`w-full min-h-screen ${activeScreen === "landing" ? "bg-primary" : "bg-black"}`}>
      {activeScreen !== "landing" && (
        <Header
          activeScreen={activeScreen}
          onNavigateHome={() => setActiveScreen("pdf")}
          onNavigateDownloads={() => setActiveScreen("downloads")}
          onNavigateToPage={(p) => setActiveScreen(p as Screen)}
          onOpenSignUpModal={() => {}}
        />
      )}

      {activeScreen === "landing" && <LandingScreen onAccess={handleAccess} />}

      {activeScreen === "pdf" && (
        <PdfViewerScreen
          preloadedFileUrl={mainPdfUrl}
          fallbackPath={PDF_PATH}
          onPage1Rendered={() => setIsIntegrating(false)}
        />
      )}

      {isIntegrating && <IntegratingLoader />}

      <footer className="w-full text-center py-4 text-white/60">Direitos © 2025 Amarasté Live</footer>
    </div>
  );
};

export default App;
