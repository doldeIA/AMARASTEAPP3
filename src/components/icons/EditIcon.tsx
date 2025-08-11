import React from "react";
type Props = { width?: number | string; height?: number | string; className?: string; onClick?: () => void; title?: string; };
export default function EditIcon({ width = 18, height = 18, className = "", onClick, title = "Editar" }: Props) {
  return (
    <svg onClick={onClick} className={className} width={width} height={height} viewBox="0 0 24 24" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <title>{title}</title>
      <path d="M11 4h7a1 1 0 0 1 1 1v7" />
      <path d="M21 3l-1 1-7 7-4 3-3 1 1-3 3-4 7-7 1-1z" />
    </svg>
  );
}
