import React from "react";

interface Props {
  onTalkAboutMusic: () => void;
}

const SoundCloudPlayer: React.FC<Props> = ({ onTalkAboutMusic }) => {
  return (
    <div className="w-full max-w-2xl mx-auto py-6">
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/123456789&color=%23ff5500&inverse=false&auto_play=false&show_user=true"
      ></iframe>
      <button
        onClick={onTalkAboutMusic}
        className="mt-4 px-4 py-2 bg-gold text-black font-semibold rounded hover:scale-105 transition-transform"
      >
        Falar sobre música
      </button>
    </div>
  );
};

export default SoundCloudPlayer;
