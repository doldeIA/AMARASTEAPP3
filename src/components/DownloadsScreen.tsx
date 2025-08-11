import React from "react";

const DownloadsScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Downloads</h1>
      <p className="mb-6 text-center">Baixe nossos materiais e conteúdos exclusivos.</p>
      <ul className="space-y-3">
        <li>
          <a href="/home.pdf" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
            📄 Home.pdf
          </a>
        </li>
        <li>
          <a href="/abracadabra.pdf" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
            📄 Abracadabra.pdf
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DownloadsScreen;
