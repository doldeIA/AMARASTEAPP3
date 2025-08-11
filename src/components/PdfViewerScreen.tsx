import React, { useEffect } from "react";

interface Props {
  pageKey: string;
  fallbackPath?: string;
  preloadedFileUrl?: string | null;
  onPage1Rendered?: () => void;
}

const PdfViewerScreen: React.FC<Props> = ({ pageKey, fallbackPath = "/home.pdf", preloadedFileUrl, onPage1Rendered }) => {
  useEffect(() => {
    // Simula renderização da primeira página e notifica o pai para esconder loader
    const t = setTimeout(() => {
      onPage1Rendered && onPage1Rendered();
    }, 600);
    return () => clearTimeout(t);
  }, [onPage1Rendered]);

  const src = preloadedFileUrl || fallbackPath;

  return (
    <div className="w-full min-h-[60vh] bg-black/70 rounded-md p-4">
      <div className="text-white mb-3 flex items-center justify-between">
        <strong>PDF — {pageKey}</strong>
        <span className="text-sm text-white/70">Preview</span>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <object data={src} type="application/pdf" width="100%" height="720">
          <div className="p-6">
            <p>Seu navegador não suporta visualização PDF embutida.</p>
            <a href={src} target="_blank" rel="noreferrer" className="underline">Abrir PDF</a>
          </div>
        </object>
      </div>
    </div>
  );
};

export default PdfViewerScreen;
