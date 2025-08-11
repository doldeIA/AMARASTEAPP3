import React from "react";

interface Props {
  onAccess: () => void;
}

const LandingScreen: React.FC<Props> = ({ onAccess }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-transparent">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-playfair mb-4 neon-white-text-glow">Amarasté Live</h1>
        <p className="text-white/80 mb-6">Portal dimensional da sua identidade sonora.</p>
        <button
          onClick={onAccess}
          aria-label="Acessar"
          className="mx-auto px-8 py-3 rounded-lg bg-gold text-black font-bold shadow-lg neon-pulse"
        >
          ACESSAR
        </button>
        <p className="text-sm text-white/60 mt-4">Integração e pré-carregamento em andamento ao clicar.</p>
      </div>
    </div>
  );
};

export default LandingScreen;
