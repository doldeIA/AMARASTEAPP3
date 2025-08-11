import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

const SignUpModal: React.FC<Props> = ({ isOpen, onClose, onSwitchToLogin }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 bg-gray-900 p-6 rounded max-w-md w-full">
        <h3 className="text-xl mb-2">Inscreva-se</h3>
        <p className="text-sm text-white/70 mb-4">Crie sua conta para acessar conteúdo exclusivo.</p>
        <div className="flex gap-2">
          <input className="flex-1 px-3 py-2 rounded bg-black/20" placeholder="Email" />
          <input className="flex-1 px-3 py-2 rounded bg-black/20" placeholder="Senha" type="password" />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button onClick={onClose} className="px-3 py-2 rounded bg-gray-700">Fechar</button>
          <div>
            <button onClick={onSwitchToLogin} className="px-3 py-2 rounded bg-green-600">Já tenho conta</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
