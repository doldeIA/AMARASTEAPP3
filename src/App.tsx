import React, { useState } from "react";
import Header from "./components/Header";
import LandingScreen from "./components/LandingScreen";
import PdfViewerScreen from "./components/PdfViewerScreen";

export type Screen = 'landing' | 'pdf' | null;

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('landing');

  const VITE_API_KEY = import.meta.env.VITE_API_KEY;
  const chatEnabled = !!VITE_API_KEY;

  const handleAccess = () => {
    setScreen('pdf');
  };

  return (
    <div className={`min-h-screen ${screen === 'landing' ? 'bg-primary' : 'bg-black'}`}>
      <Header
        onNavigateHome={() => setScreen('pdf')}
        onNavigateLanding={() => setScreen('landing')}
      />

      <main className="w-full min-h-[70vh]">
        {screen === 'landing' && (
          <LandingScreen onAccess={handleAccess} />
        )}

        {screen === 'pdf' && (
          <PdfViewerScreen
            pdfPath="/home.pdf"
            fallbackMessage="Não foi possível carregar o PDF. Confirme que 'home.pdf' está dentro da pasta public/."
          />
        )}
      </main>

      <footer className="text-center py-4 text-white/60">
        Direitos Autorais © 2025 Amarasté Live
        <div className="text-xs mt-1">{chatEnabled ? "Chat: habilitado" : "Chat: desativado (VITE_API_KEY não configurada)"}</div>
      </footer>
    </div>
  );
};

export default App;
