import React from "react";

interface Props {
  onNavigateHome: () => void;
}

const RevolucaoPage: React.FC<Props> = ({ onNavigateHome }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl mb-3">Microrrevoluções</h2>
      <p className="text-white/80 mb-4">Conteúdo conceitual para ativar o público.</p>
      <button onClick={onNavigateHome} className="px-3 py-2 bg-white/10 rounded">Voltar</button>
    </div>
  );
};

export default RevolucaoPage;
