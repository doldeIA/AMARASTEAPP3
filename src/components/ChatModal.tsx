import React, { useState } from "react";

export type Message = { sender: "user" | "assistant"; text: string };

interface Props {
  messages: Message[];
  isLoading?: boolean;
  error?: string | null;
  onClose: () => void;
  onSendMessage: (text: string) => Promise<void> | void;
  onStopGeneration?: () => void;
}

const ChatModal: React.FC<Props> = ({ messages, onClose, onSendMessage, isLoading, error }) => {
  const [text, setText] = useState("");

  const send = async () => {
    const t = text.trim();
    if (!t) return;
    setText("");
    await onSendMessage(t);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-end md:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full md:max-w-xl bg-gray-900 rounded-lg shadow-lg p-4 z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Assistente Amarasté</h3>
          <div className="flex gap-2 items-center">
            {error && <span className="text-sm text-red-400">{error}</span>}
            <button onClick={onClose} className="text-sm underline">Fechar</button>
          </div>
        </div>

        <div className="max-h-60 overflow-y-auto mb-3 space-y-2">
          {messages.map((m, i) => (
            <div key={i} className={`text-sm ${m.sender === "assistant" ? "text-left" : "text-right"}`}>
              <div className={`inline-block px-3 py-2 rounded ${m.sender === "assistant" ? "bg-gray-800" : "bg-blue-600"}`}>
                <small className="block opacity-80">{m.sender}</small>
                <div>{m.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-black/30 outline-none"
            placeholder="Digite sua mensagem"
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button onClick={send} disabled={!text.trim()} className="px-4 py-2 rounded bg-green-600">
            Enviar
          </button>
        </div>

        {isLoading && <div className="text-xs text-white/60 mt-2">Gerando resposta…</div>}
      </div>
    </div>
  );
};

export default ChatModal;
