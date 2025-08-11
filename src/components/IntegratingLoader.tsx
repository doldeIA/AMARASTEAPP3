import React from "react";

const IntegratingLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-white font-semibold">Integrando...</p>
    </div>
  );
};

export default IntegratingLoader;
