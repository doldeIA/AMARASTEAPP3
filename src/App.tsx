import React from "react";
import PdfViewerScreen from "./components/PdfViewerScreen";

export default function App() {
  // Caminho do PDF na pasta public
  const pdfUrl = "/documento.pdf"; // coloque seu PDF na pasta public com esse nome

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Visualizador de PDF</h1>
      <PdfViewerScreen fileUrl={pdfUrl} />
    </div>
  );
}
