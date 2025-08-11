import React from "react";

interface Props {
  onOpen: () => void;
}

const ChatWidget: React.FC<Props> = ({ onOpen }) => {
  return (
    <button
      onClick={onOpen}
      aria-label="Abrir chat"
      title="Abrir chat"
      className="fixed right-6 bottom-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 shadow-lg flex items-center justify-center text-black font-bold"
    >
      💬
    </button>
  );
};

export default ChatWidget;
