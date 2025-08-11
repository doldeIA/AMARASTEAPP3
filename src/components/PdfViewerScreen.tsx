import React, { useEffect, useState } from "react";

interface Props {
  pageKey: string;
  fallbackPath: string;
  preloadedFileUrl?: string;
  onPage1Rendered?: () => void;
}

const PdfViewerScreen: React.FC<Props> = ({
  fallbackPath,
  preloadedFileUrl,
  onPage1Rendered,
}) => {
  const [pdfUrl, setPdfUrl] = useState<string>(preloadedFileUrl || fallbackPath);

  useEffect(() => {
    if (onPage1Rendered) {
      const t = setTimeout(() => onPage1Rendered(), 500);
      return () => clearTimeout(t);
    }
  }, [onPage1Rendered]);

  return (
    <div className="w-full flex justify-center py-6">
      <object
        data={pdfUrl}
        type="application/pdf"
        className="object-pdf-wrapper"
      >
        <p>Seu navegador não suporta visualização de PDF. <a href={pdfUrl}>Baixe aqui</a>.</p>
      </object>
    </div>
  );
};

export default PdfViewerScreen;
