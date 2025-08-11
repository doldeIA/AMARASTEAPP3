import React from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
  title?: string;
};

export default function SearchIcon({ width = 20, height = 20, className = "", onClick, title = "Pesquisar" }: Props) {
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
      <circle cx="11" cy="11" r="6" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
