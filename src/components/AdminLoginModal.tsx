import React, { useState } from "react";

interface Props {
  onClose: () => void;
  onLogin: (user: string, pass: string) => boolean;
}

const AdminLoginModal: React.FC<Props> = ({ onClose, onLogin }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const submit = () => {
    const ok = onLogin(user, pass);
    if (!ok) {
      setErr("Credenciais inválidas");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 bg-gray-900 p-4 rounded w-full max-w-sm">
        <h4 className="font-semibold mb-2">Admin Login</h4>
        {err && <div className="text-red-400 mb-2">{err}</div>}
        <input placeholder="Usuário" className="w-full p-2 rounded bg-black/20 mb-2" value={user} onChange={(e) => setUser(e.target.value)} />
        <input placeholder="Senha" type="password" className="w-full p-2 rounded bg-black/20 mb-2" value={pass} onChange={(e) => setPass(e.target.value)} />
        <div className="flex justify-between">
          <button onClick={onClose} className="px-3 py-2 bg-gray-700 rounded">Cancelar</button>
          <button onClick={submit} className="px-3 py-2 bg-green-600 rounded">Entrar</button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
