import React from "react";

interface HeaderProps {
  onNavigateHome?: () => void;
  onNavigateLanding?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateHome, onNavigateLanding }) => {
  return (
    <header className="w-full bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gold text-black font-bold">A</div>
          <div>
            <div className="font-bold">Amarasté Live</div>
            <div className="text-xs text-white/60">Portal · Música · Bookings</div>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 items-center">
          <button onClick={onNavigateHome} className="text-sm hover:underline">Conteúdo</button>
          <button className="text-sm hover:underline">Booker</button>
          <button className="text-sm hover:underline">Downloads</button>
          <button className="text-sm hover:underline">Ecossistema</button>
          <button className="px-4 py-2 bg-gold text-black rounded-md font-semibold">Login / Signup</button>
        </nav>

        <div className="md:hidden">
          <button onClick={onNavigateLanding} aria-label="menu">☰</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
