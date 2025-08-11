// src/components/LandingScreen.tsx
import React from "react";

interface Props {
  onAccess: () => void;
}

const LandingScreen: React.FC<Props> = ({ onAccess }) => {
  const checkPdf = async () => {
    try {
      const res = await fetch("/home.pdf", { method: "HEAD" });
      if (res.ok) {
        alert("PDF encontrado: /home.pdf (OK)");
      } else {
        alert(`PDF não encontrado. HTTP ${res.status}. Faça upload em public/home.pdf`);
      }
    } catch (err: any) {
      console.error("Erro ao checar /home.pdf:", err);
      alert("Erro ao checar /home.pdf. Veja console.");
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 bg-primary">
      <div className="max-w-md w-full">
        <button onClick={onAccess} className="w-full py-3 rounded-lg bg-black text-white font-bold">ACESSAR</button>
        <button onClick={checkPdf} className="w-full mt-3 py-2 rounded bg-white text-black">Verificar PDF</button>
        <p className="text-sm text-white/70 mt-4 text-center">Amarasté Live Music</p>
      </div>
    </div>
  );
};

export default LandingScreen;
