import React from "react";

interface Props {
  onOpen: () => void;
}

const ChatWidget: React.FC<Props> = ({ onOpen }) => {
  return (
    <button
      onClick={onOpen}
      className="fixed bottom-4 right-4 bg-gold text-black rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      title="Abrir chat"
    >
      💬
    </button>
  );
};

export default ChatWidget;
