// src/components/IntegratingLoader.tsx
import React from "react";

export default function IntegratingLoader(): JSX.Element {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-black/70 text-white p-6 rounded-md shadow-lg pointer-events-auto">
        <div className="text-lg font-semibold mb-2">Integração OK ✅</div>
        <div className="text-sm">Carregando conteúdo. Se demorar, verifique /public/home.pdf</div>
      </div>
    </div>
  );
}
