import React, { useState } from "react";

export interface Message {
  sender: "user" | "assistant";
  text: string;
}

interface Props {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onSendMessage: (input: string) => void;
  onStopGeneration: () => void;
}

const ChatModal: React.FC<Props> = ({
  messages,
  isLoading,
  error,
  onClose,
  onSendMessage,
  onStopGeneration,
}) => {
  const [input, setInput] = useState("");

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md flex flex-col h-[80vh]">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg">Chat</h2>
          <button onClick={onClose}>✖</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-[80%] ${
                m.sender === "user"
                  ? "bg-gold text-black self-end ml-auto"
                  : "bg-gray-200 text-black self-start"
              }`}
            >
              {m.text}
            </div>
          ))}
          {isLoading && <p className="text-sm text-gray-500">Gerando resposta...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="p-3 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSendMessage(input);
                setInput("");
              }
            }}
            className="flex-1 border rounded px-2 py-1"
            placeholder="Digite sua mensagem..."
          />
          <button
            onClick={() => {
              onSendMessage(input);
              setInput("");
            }}
            className="bg-gold px-4 py-1 rounded text-black font-semibold"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
