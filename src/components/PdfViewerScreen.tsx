import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// Configuração necessária para carregar o PDF no React-PDF
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerScreenProps {
  fileUrl: string; // URL do PDF ou caminho local em /public
}

export default function PdfViewerScreen({ fileUrl }: PdfViewerScreenProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Visualizador de PDF</h1>

      <div className="bg-white shadow-lg p-4 rounded-lg max-w-full overflow-auto">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p>Carregando PDF...</p>}
          error={<p>Erro ao carregar PDF.</p>}
        >
          <Page pageNumber={pageNumber} width={800} />
        </Document>
      </div>

      {numPages > 1 && (
        <div className="mt-4 flex gap-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
          >
            Anterior
          </button>
          <span>
            Página {pageNumber} de {numPages}
          </span>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
            disabled={pageNumber >= numPages}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
