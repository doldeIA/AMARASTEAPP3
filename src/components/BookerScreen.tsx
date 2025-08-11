import React from "react";

interface Props {
  onSchedule: () => void;
}

const BookerScreen: React.FC<Props> = ({ onSchedule }) => {
  return (
    <div className="min-h-screen bg-primary text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Agendamento</h1>
      <p className="mb-6">Escolha a data e hora para seu evento.</p>
      <button
        onClick={onSchedule}
        className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
      >
        Agendar
      </button>
    </div>
  );
};

export default BookerScreen;
