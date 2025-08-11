import React from "react";
type Props = { width?: number | string; height?: number | string; className?: string; onClick?: () => void; title?: string; };
export default function ShareIcon({ width = 20, height = 20, className = "", onClick, title = "Compartilhar" }: Props) {
  return (
    <svg onClick={onClick} className={className} width={width} height={height} viewBox="0 0 24 24" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <title>{title}</title>
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}
