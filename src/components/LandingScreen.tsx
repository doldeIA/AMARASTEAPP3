import React from "react";

interface Props {
  onAccess: () => void;
}

const LandingScreen: React.FC<Props> = ({ onAccess }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-white">Amarasté Live</h1>
      <p className="text-white/80 mt-2 max-w-xl">Portal, música e bookings. Clique abaixo para acessar o conteúdo.</p>

      <div className="mt-8 w-full max-w-sm">
        <button
          onClick={onAccess}
          className="w-full py-3 rounded-lg bg-primary/80 text-white font-bold neon-pulse border border-white/10"
        >
          ACESSAR
        </button>
      </div>
    </div>
  );
};

export default LandingScreen;
