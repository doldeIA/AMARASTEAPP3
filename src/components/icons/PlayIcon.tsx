import React from "react";
type Props = { width?: number | string; height?: number | string; className?: string; onClick?: () => void; title?: string; };
export default function PlayIcon({ width = 22, height = 22, className = "", onClick, title = "Play" }: Props) {
  return (
    <svg onClick={onClick} className={className} width={width} height={height} viewBox="0 0 24 24" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <title>{title}</title>
      <path d="M5 3v18l15-9L5 3z" />
    </svg>
  );
}
