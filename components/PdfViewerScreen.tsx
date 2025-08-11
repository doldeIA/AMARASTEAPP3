// components/PdfViewerScreen.tsx
import React, { useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

type Props = {
  fileUrl: string;
  page?: number;
};

// Ensure this version matches pdfjs-dist in package.json
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@5.4.54/build/pdf.worker.min.js";

export default function PdfViewerScreen({ fileUrl, page = 1 }: Props) {
  useEffect(() => {
    // worker is set above; this protects SSR builds
  }, []);

  return (
    <div className="pdf-viewer">
      <Document file={fileUrl}>
        <Page pageNumber={page} />
      </Document>
    </div>
  );
}
