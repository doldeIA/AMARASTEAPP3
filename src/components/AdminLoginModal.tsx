import React, { useState } from "react";

interface Props {
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

const AdminLoginModal: React.FC<Props> = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">Login Administrativo</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancelar
          </button>
          <button
            onClick={() => onLogin(email, password)}
            className="px-4 py-2 bg-gold text-black rounded"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
