// src/components/PdfViewerScreen.tsx
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

type Props = {
  preloadedFileUrl?: string | null;
  fallbackPath?: string;
  onPage1Rendered?: () => void;
};

// garante worker compatível (pdfjs-dist 2.x)
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js";

export default function PdfViewerScreen({
  preloadedFileUrl,
  fallbackPath = "/home.pdf",
  onPage1Rendered,
}: Props) {
  const fileToUse = preloadedFileUrl ?? fallbackPath;

  return (
    <div className="w-full min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-black/70 p-4 rounded">
        <Document
          file={fileToUse}
          onLoadError={(err) => {
            console.error("Erro carregando documento PDF:", err);
            // garante que loader não fique preso
            if (onPage1Rendered) onPage1Rendered();
          }}
          onLoadSuccess={() => {
            if (onPage1Rendered) onPage1Rendered();
          }}
          loading={<div className="text-white">Carregando PDF...</div>}
        >
          <Page pageNumber={1} loading={<div className="text-white">Renderizando página 1...</div>} />
        </Document>
      </div>
    </div>
  );
}
