import React from "react";
type Props = { width?: number | string; height?: number | string; className?: string; onClick?: () => void; title?: string; };
export default function ChevronUpIcon({ width = 18, height = 18, className = "", onClick, title = "Fechar" }: Props) {
  return (
    <svg onClick={onClick} className={className} width={width} height={height} viewBox="0 0 24 24" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <title>{title}</title>
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}
