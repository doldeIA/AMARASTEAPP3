import React, { useState } from "react";

interface Props {
  activeScreen: string | null;
  onNavigateDownloads: () => void;
  onNavigateHome: () => void;
  onNavigateToPage: (page: string) => void;
  onOpenSignUpModal: () => void;
}

/**
 * Header component
 * - responsive (desktop nav + mobile hamburger)
 * - uses simple props (no circular types)
 * - accessible (aria labels, keyboard focusable)
 */
const Header: React.FC<Props> = ({
  activeScreen,
  onNavigateDownloads,
  onNavigateHome,
  onNavigateToPage,
  onOpenSignUpModal,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navButton = (label: string, page: string, extra?: () => void) => {
    const isActive = activeScreen === page;
    return (
      <button
        onClick={() => {
          setMobileOpen(false);
          if (extra) extra();
          onNavigateToPage(page);
        }}
        className={`px-3 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 ${
          isActive ? "bg-white/10 text-white font-semibold" : "text-white/80 hover:bg-white/5"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </button>
    );
  };

  return (
    <header className="w-full bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        {/* left: brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setMobileOpen(false);
              onNavigateHome();
            }}
            className="flex items-center gap-3 focus:outline-none"
            aria-label="Ir para a página inicial"
          >
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black font-bold shadow">
              A
            </div>
            <div className="hidden md:block">
              <div className="text-white font-bold leading-none">Amarasté</div>
              <div className="text-xs text-white/60 -mt-0.5">Live Music · 2025</div>
            </div>
          </button>
        </div>

        {/* center: nav (desktop) */}
        <nav className="hidden md:flex items-center gap-2">
          {navButton("Home", "pdf")}
          <button
            onClick={() => {
              setMobileOpen(false);
              onNavigateDownloads();
            }}
            className="px-3 py-2 rounded-md text-sm text-white/80 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Downloads
          </button>
          {navButton("Booker", "booker")}
          {navButton("Ecossistema", "portalMagico")}
          {navButton("Revolução", "revolucao")}
        </nav>

        {/* right: actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => onNavigateToPage("produtosLogin")}
              className="px-3 py-1 rounded bg-white/10 text-white text-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Produtos
            </button>

            <button
              onClick={onOpenSignUpModal}
              className="px-3 py-1 rounded bg-green-600 text-black text-sm font-semibold hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-green-400/40"
            >
              Entrar
            </button>
          </div>

          {/* mobile hamburger */}
          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="md:hidden p-2 rounded-md text-white/90 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/70 border-t border-white/5">
          <div className="px-4 py-3 space-y-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                onNavigateHome();
              }}
              className="w-full text-left px-3 py-2 rounded-md text-white/90 hover:bg-white/5"
            >
              Home
            </button>

            <button
              onClick={() => {
                setMobileOpen(false);
                onNavigateDownloads();
              }}
              className="w-full text-left px-3 py-2 rounded-md text-white/90 hover:bg-white/5"
            >
              Downloads
            </button>

            <button
              onClick={() => {
                setMobileOpen(false);
                onNavigateToPage("booker");
              }}
              className="w-full text-left px-3 py-2 rounded-md text-white/90 hover:bg-white/5"
            >
              Booker
            </button>

            <button
              onClick={() => {
                setMobileOpen(false);
                onNavigateToPage("portalMagico");
              }}
              className="w-full text-left px-3 py-2 rounded-md text-white/90 hover:bg-white/5"
            >
              Ecossistema
            </button>

            <button
              onClick={() => {
                setMobileOpen(false);
                onNavigateToPage("revolucao");
              }}
              className="w-full text-left px-3 py-2 rounded-md text-white/90 hover:bg-white/5"
            >
              Revolução
            </button>

            <div className="pt-2 border-t border-white/5 flex gap-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onNavigateToPage("produtosLogin");
                }}
                className="flex-1 px-3 py-2 rounded-md text-sm bg-white/10 text-white"
              >
                Produtos
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenSignUpModal();
                }}
                className="flex-1 px-3 py-2 rounded-md text-sm bg-green-600 text-black font-semibold"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
