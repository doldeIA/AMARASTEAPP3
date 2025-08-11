import React from "react";

interface Props {
  // keep placeholder signature, parent may expect navigation handlers
}

const BookerScreen: React.FC<Props> = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl mb-3">Booker</h2>
      <p className="text-white/80">Tela de agendamento e booker — use o botão abaixo para link externo.</p>
      <div className="mt-4">
        <a className="px-4 py-2 bg-gold rounded text-black font-bold" href="https://wa.me/5575933002386" target="_blank" rel="noreferrer">Agendar via WhatsApp</a>
      </div>
    </div>
  );
};

export default BookerScreen;
