import React from "react";

interface Props {
  onNavigate: (screen: string) => void;
}

const EcossistemaPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl mb-3">Ecossistema Amarasté</h2>
      <p className="mb-4 text-white/80">Navegue para páginas internas do ecossistema.</p>
      <div className="flex gap-3">
        <button onClick={() => onNavigate("pdf")} className="px-3 py-2 bg-white/10 rounded">Home</button>
        <button onClick={() => onNavigate("revolucao")} className="px-3 py-2 bg-white/10 rounded">Revolução</button>
      </div>
    </div>
  );
};

export default EcossistemaPage;
