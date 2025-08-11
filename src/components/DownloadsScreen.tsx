import React from "react";

interface Props {
  onBack: () => void;
}

const DownloadsScreen: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Downloads</h2>
        <button onClick={onBack} className="text-sm underline">Voltar</button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="p-4 bg-white/5 rounded">
          <h3 className="font-semibold">Press Kit</h3>
          <p className="text-sm text-white/70">Baixe seu press kit em PDF.</p>
          <a className="mt-2 inline-block text-sm underline" href="/home.pdf" download>Download PDF</a>
        </div>
        <div className="p-4 bg-white/5 rounded">
          <h3 className="font-semibold">Abracadabra — Booker</h3>
          <p className="text-sm text-white/70">Material para bookers e oportunidades.</p>
          <a className="mt-2 inline-block text-sm underline" href="/abracadabra.pdf" download>Download Booker</a>
        </div>
      </div>
    </div>
  );
};

export default DownloadsScreen;
