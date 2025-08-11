import React from "react";

interface Props {
  pdfPath: string; // path relative to /public
  fallbackMessage?: string;
}

const PdfViewerScreen: React.FC<Props> = ({ pdfPath, fallbackMessage }) => {
  return (
    <div className="w-full min-h-screen bg-gray-800 flex">
      <aside className="w-48 bg-gray-900 text-white p-4 hidden lg:block">
        <div className="text-sm">1</div>
        <div className="mt-4 text-xs text-white/60">Sumário</div>
      </aside>

      <div className="flex-1 p-4">
        <div className="bg-white rounded shadow-lg overflow-hidden">
          <iframe
            title="PDF Viewer"
            src={pdfPath}
            className="w-full h-[80vh]"
            style={{ border: 'none' }}
          />
        </div>

        {!pdfPath && (
          <div className="mt-4 text-red-400">
            {fallbackMessage || "PDF não disponível."}
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfViewerScreen;
