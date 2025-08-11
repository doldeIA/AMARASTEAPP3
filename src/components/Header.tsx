import React from "react";

/**
 * Header.tsx
 * - simples, responsivo, sem dependências externas
 * - ícones em SVG inline para evitar instalar libs extras
 * - botões: Home, Downloads, Booker, Ecossistema, Revolução, Produtos, Entrar
 * - redes: WhatsApp e Instagram (edite os links)
 */

interface Props {
  // Se quiser controlar via props no futuro, adiciona aqui.
}

const Header: React.FC<Props> = () => {
  return (
    <header className="w-full bg-black/50 backdrop-blur-sm sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black font-bold shadow">
            A
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-bold leading-none">Amarasté</div>
            <div className="text-xs text-white/60 -mt-0.5">Live Music · 2025</div>
          </div>
        </div>

        {/* Nav (desktop) */}
        <nav className="hidden md:flex items-center gap-3">
          <a href="/" className="text-white/80 hover:text-white px-3 py-2 rounded">Home</a>
          <a href="/#downloads" className="text-white/80 hover:text-white px-3 py-2 rounded">Downloads</a>
          <a href="/#booker" className="text-white/80 hover:text-white px-3 py-2 rounded">Booker</a>
          <a href="/#portal" className="text-white/80 hover:text-white px-3 py-2 rounded">Ecossistema</a>
          <a href="/#revolucao" className="text-white/80 hover:text-white px-3 py-2 rounded">Revolução</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="/produtos"
              className="px-3 py-1 rounded bg-white/10 text-white text-sm hover:bg-white/20"
            >
              Produtos
            </a>
            <button
              onClick={() => alert("Abrir modal de login (a implementar)")}
              className="px-3 py-1 rounded bg-green-600 text-black text-sm font-semibold"
            >
              Entrar
            </button>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/5599999999999"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="p-2 rounded-full bg-green-500 hover:brightness-95"
            >
              {/* WhatsApp SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 0 5.373 0 12a11.9 11.9 0 001.63 6.04L0 24l6.21-1.63A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.2-3.48-8.52z" fill="#25D366"></path>
                <path d="M17.3 14.1c-.3-.2-1.7-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.8.9-1 1.1-.2.2-.4.2-.7.1-1.5-.6-2.5-1.9-3.1-3.4-.1-.2 0-.4.1-.6.1-.2.5-1 0-2-.5-1-1.2-1.4-1.6-1.6-.4-.2-.8-.2-1.2-.1-.3.1-1 .4-1.6 1.1-.6.7-.9 1.5-.9 2.3 0 1.6.9 3.1 2.7 4.9 1.8 1.8 3.9 2.9 5.7 3.2.9.2 1.7.2 2.3.1.7-.1 1.3-.6 1.6-1.3.2-.6.2-1.4-.1-1.9-.2-.5-.6-.9-1.1-1.1z" fill="#fff"></path>
              </svg>
            </a>

            <a
              href="https://instagram.com/seuusuario"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="p-2 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90"
            >
              {/* Instagram SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M17.5 6.5h.01" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </a>
          </div>

          {/* Mobile menu button (simple non-js fallback) */}
          <div className="md:hidden">
            {/* If you want a mobile menu, we can add it next. For now it's minimal. */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
