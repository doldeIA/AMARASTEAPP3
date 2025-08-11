import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import App from "./App";
import "./index.css";
// Substitua a função handleAccess existente por esta
const handleAccess = () => {
  setIsIntegrating(true);

  const loadMainPdf = async (): Promise<string> => {
    try {
      // checa IndexedDB primeiro
      let pdfBlob = await loadPdfFromDb('pdf');

      // se não tem no indexedDB, fetch direto da public
      if (!pdfBlob) {
        const response = await fetch('/home.pdf', { method: 'GET' });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ao buscar /home.pdf`);
        }
        pdfBlob = await response.blob();
        const file = new File([pdfBlob], `pdf.pdf`, { type: "application/pdf" });
        try {
          await savePdfToDb(file, 'pdf');
        } catch (err) {
          console.warn("Não foi possível salvar PDF no IndexedDB:", err);
        }
      }

      if (pdfBlob) {
        return URL.createObjectURL(pdfBlob);
      } else {
        throw new Error("Nenhum PDF encontrado após fetch e IndexedDB.");
      }
    } catch (e: any) {
      console.error("loadMainPdf error:", e);
      throw e;
    }
  };

  loadMainPdf()
    .then((loadedPdfUrl) => {
      setMainPdfUrl(loadedPdfUrl);
      setActiveScreen('pdf');
      // PdfViewerScreen chamará handlePage1Rendered quando renderizar
    })
    .catch((error) => {
      console.error("Integration process failed:", error);
      alert("Erro ao carregar conteúdo: " + (error?.message || "verifique arquivos em public/"));
      setIsIntegrating(false);
    });
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
