import React from "react";

const AdminPanel: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Painel Administrativo</h1>
      <p>Bem-vindo(a) ao painel do administrador.</p>
      <ul className="mt-6 list-disc pl-5 space-y-2">
        <li>Gerenciar usuários</li>
        <li>Publicar novos conteúdos</li>
        <li>Ver estatísticas</li>
      </ul>
    </div>
  );
};

export default AdminPanel;
