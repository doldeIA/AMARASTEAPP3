import React, { useRef, useState } from "react";

interface Props {
  onClose: () => void;
  onUpload: (file: File, pageKey: string) => Promise<void> | void;
  onRemove: (pageKey: string) => Promise<void> | void;
}

const AdminPanel: React.FC<Props> = ({ onClose, onUpload, onRemove }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [pageKey, setPageKey] = useState("pdf");

  const handleUploadClick = () => fileRef.current?.click();

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    await onUpload(f, pageKey);
    alert("Arquivo enviado (tente recarregar a página).");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-gray-900 rounded p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">Admin Panel</h4>
          <button onClick={onClose} className="text-sm underline">Fechar</button>
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-1">Page Key</label>
          <input className="w-full p-2 rounded bg-black/20" value={pageKey} onChange={(e) => setPageKey(e.target.value)} />
        </div>

        <div className="flex gap-2">
          <button onClick={handleUploadClick} className="px-3 py-2 bg-green-600 rounded">Escolher arquivo e enviar</button>
          <button onClick={() => { onRemove(pageKey); alert("Removido (tente recarregar)"); }} className="px-3 py-2 bg-red-600 rounded">Remover</button>
        </div>

        <input ref={fileRef} type="file" accept="application/pdf" className="hidden" onChange={handleFileSelected} />
      </div>
    </div>
  );
};

export default AdminPanel;
