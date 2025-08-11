import React from "react";
type Props = { width?: number | string; height?: number | string; className?: string; onClick?: () => void; title?: string; };
export default function HomeIcon({ width = 22, height = 22, className = "", onClick, title = "Início" }: Props) {
  return (
    <svg onClick={onClick} className={className} width={width} height={height} viewBox="0 0 24 24" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <title>{title}</title>
      <path d="M3 9L12 2l9 7" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}
