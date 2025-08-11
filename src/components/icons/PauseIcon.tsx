import React from "react";
type Props = { width?: number | string; height?: number | string; className?: string; onClick?: () => void; title?: string; };
export default function PauseIcon({ width = 22, height = 22, className = "", onClick, title = "Pausar" }: Props) {
  return (
    <svg onClick={onClick} className={className} width={width} height={height} viewBox="0 0 24 24" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <title>{title}</title>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}
