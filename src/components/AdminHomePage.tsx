import React from "react";

interface Props {
  onBack: () => void;
}

const AdminHomePage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Admin Home</h2>
        <button onClick={onBack} className="text-sm underline">Voltar</button>
      </div>

      <div className="grid gap-4">
        <div className="p-4 bg-white/5 rounded">Painel de operações rápidas.</div>
        <div className="p-4 bg-white/5 rounded">Visualizar PDFs em cache, logs e uploads.</div>
      </div>
    </div>
  );
};

export default AdminHomePage;
