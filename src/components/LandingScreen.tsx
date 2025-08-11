import React from "react";

interface Props {
  onAccess?: () => void;
}

const LandingScreen: React.FC<Props> = ({ onAccess }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#8b2e00] text-white">
      <div className="text-center px-6">
        <h1 className="text-4xl font-extrabold mb-6">AMARASTÉ LIVE</h1>

        <button
          onClick={() => onAccess?.()}
          className="w-full max-w-xs mx-auto px-6 py-3 rounded-lg font-bold border border-white bg-black"
          aria-label="Acessar conteúdo"
        >
          ACESSAR
        </button>

        <p className="mt-6 text-sm text-white/70">Bem-vindo — clique em Acessar</p>
      </div>
    </div>
  );
};

export default LandingScreen;

