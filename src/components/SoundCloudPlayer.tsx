// src/components/SoundCloudPlayer.tsx
import React from "react";

type Props = {
  onTalkAboutMusic?: () => void;
};

export default function SoundCloudPlayer({ onTalkAboutMusic }: Props) {
  // Exemplo de embed simples — substitua o src pelo seu link de widget se houver outro
  const scSrc = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/0000000&auto_play=false";

  return (
    <div className="w-full my-4 flex justify-center">
      <iframe
        title="soundcloud-player"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        // ESSENCIAL: permite encrypted-media para evitar Permission Policy errors
        allow="autoplay; encrypted-media"
        allow="encrypted-media"
        src={scSrc}
      />
      {onTalkAboutMusic && (
        <button onClick={onTalkAboutMusic} className="hidden">
          falar
        </button>
      )}
    </div>
  );
}
