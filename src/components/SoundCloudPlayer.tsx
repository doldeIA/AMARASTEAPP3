import React from "react";

interface Props {
  onTalkAboutMusic?: () => void;
}

const SoundCloudPlayer: React.FC<Props> = ({ onTalkAboutMusic }) => {
  return (
    <div className="mt-6 p-4 bg-white/5 rounded">
      <div className="flex items-center justify-between">
        <div>
          <strong>SoundCloud Player</strong>
          <p className="text-sm text-white/70">Player embed simplificado (fallback).</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onTalkAboutMusic && onTalkAboutMusic()} className="px-3 py-1 rounded bg-green-600">Falar sobre música</button>
        </div>
      </div>
    </div>
  );
};

export default SoundCloudPlayer;
