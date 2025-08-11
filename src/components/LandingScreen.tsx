import React from "react";

interface Props {
  onAccess: () => void;
}

const LandingScreen: React.FC<Props> = ({ onAccess }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
      <h1 className="text-4xl font-bold mb-4">Amarasté Live</h1>
      <p className="text-lg mb-8 max-w-lg text-center">
        Portal dimensional da sua identidade sonora.
      </p>
      <button
        onClick={onAccess}
        className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
      >
        Acessar
      </button>
    </div>
  );
};

export default LandingScreen;
