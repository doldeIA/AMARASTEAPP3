import React from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
  title?: string;
};

export default function CloseIcon({ width = 20, height = 20, className = "", onClick, title = "Fechar" }: Props) {
  return (
    <svg
      onClick={onClick}
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>{title}</title>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
