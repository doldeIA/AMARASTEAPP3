import React from "react";
type Props = { width?: number | string; height?: number | string; className?: string; onClick?: () => void; title?: string; };
export default function BellIcon({ width = 20, height = 20, className = "", onClick, title = "Notificações" }: Props) {
  return (
    <svg onClick={onClick} className={className} width={width} height={height} viewBox="0 0 24 24" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <title>{title}</title>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
