import React from "react";

interface Props {
  onNavigateHome: () => void;
  onNavigateToSignUp: () => void;
}

const ProdutosLoginPage: React.FC<Props> = ({ onNavigateHome, onNavigateToSignUp }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl mb-3">Login / Produtos</h2>
      <div className="mb-4">
        <input placeholder="Email" className="w-full p-2 rounded bg-black/20 mb-2" />
        <input placeholder="Senha" type="password" className="w-full p-2 rounded bg-black/20" />
      </div>
      <div className="flex gap-2">
        <button onClick={onNavigateHome} className="px-3 py-2 bg-green-600 rounded">Entrar</button>
        <button onClick={onNavigateToSignUp} className="px-3 py-2 bg-white/10 rounded">Criar conta</button>
      </div>
    </div>
  );
};

export default ProdutosLoginPage;
