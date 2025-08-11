import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
  fileUrl?: string;
}

export default function PdfViewerScreen({ fileUrl }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="flex flex-col items-center p-4">
      {fileUrl ? (
        <>
          <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              disabled={pageNumber <= 1}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Página Anterior
            </button>
            <p>
              Página {pageNumber} de {numPages}
            </p>
            <button
              onClick={() =>
                setPageNumber((prev) => Math.min(prev + 1, numPages))
              }
              disabled={pageNumber >= numPages}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Próxima Página
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Nenhum PDF carregado.</p>
      )}
    </div>
  );
}
