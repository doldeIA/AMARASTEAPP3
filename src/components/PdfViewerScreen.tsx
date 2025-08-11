import React, { useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

type Props = {
  preloadedFileUrl?: string | null;
  fallbackPath?: string;
  page?: number;
  onRendered?: () => void;
};

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@5.4.54/build/pdf.worker.min.js";

export default function PdfViewerScreen({
  preloadedFileUrl,
  fallbackPath = "/home.pdf",
  page = 1,
  onRendered,
}: Props) {
  const file = preloadedFileUrl || fallbackPath;

  useEffect(() => {
    onRendered?.();
  }, [file, onRendered]);

  return (
    <div className="p-4 min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto bg-white text-black p-4 rounded">
        <Document file={file}>
          <Page pageNumber={page} />
        </Document>
      </div>
    </div>
  );
}
