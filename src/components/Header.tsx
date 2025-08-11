// src/components/Header.tsx
import React from "react";

type Screen =
  | "landing"
  | "pdf"
  | "downloads"
  | "booker"
  | "portalMagico"
  | "revolucao"
  | "produtosLogin"
  | "adminHome"
  | null;

interface HeaderProps {
  activeScreen: Screen;
  onNavigateDownloads: () => void;
  onNavigateHome: () => void;
  onNavigateToPage: (page: Screen) => void;
  onOpenSignUpModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeScreen, onNavigateDownloads, onNavigateHome, onNavigateToPage, onOpenSignUpModal }) => {
  return (
    <header className="w-full sticky top-0 z-30 bg-black/60 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-md bg-gold flex items-center justify-center text-black font-bold"
            title="Amarasté"
            style={{ boxShadow: "0 0 8px rgba(212,175,55,0.6)" }}
          >
            A
          </div>
          <div>
            <button
              onClick={onNavigateHome}
              className="text-white font-bold text-lg tracking-wide hover:text-gold transition-colors"
            >
              Amarasté Live
            </button>
            <div className="text-xs text-white/60">Portal · Música · Bookings</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigateToPage("pdf")}
            className={`px-3 py-2 rounded-md text-sm ${activeScreen === "pdf" ? "bg-white/6 text-white" : "text-white/80 hover:bg-white/3"}`}
          >
            Conteúdo
          </button>

          <button
            onClick={() => onNavigateToPage("booker")}
            className={`px-3 py-2 rounded-md text-sm ${activeScreen === "booker" ? "bg-white/6 text-white" : "text-white/80 hover:bg-white/3"}`}
          >
            Booker
          </button>

          <button
            onClick={onNavigateDownloads}
            className={`px-3 py-2 rounded-md text-sm ${activeScreen === "downloads" ? "bg-white/6 text-white" : "text-white/80 hover:bg-white/3"}`}
          >
            Downloads
          </button>

          <button
            onClick={() => onNavigateToPage("portalMagico")}
            className="px-3 py-2 rounded-md text-sm text-white/80 hover:bg-white/3"
          >
            Ecossistema
          </button>

          <button
            onClick={onOpenSignUpModal}
            className="ml-2 px-4 py-2 rounded-lg bg-gold text-black font-semibold shadow-md hover:scale-98 active:translate-y-0.5 transition-transform"
          >
            Login / Signup
          </button>
        </nav>

        {/* Mobile quick actions */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => onNavigateToPage("pdf")}
            className="px-3 py-2 rounded-md text-white/90 hover:bg-white/3"
            aria-label="Ir para conteúdo"
          >
            Conteúdo
          </button>

          <button
            onClick={onOpenSignUpModal}
            className="px-3 py-2 rounded-md bg-gold text-black font-bold"
            aria-label="Entrar"
          >
            Entrar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
