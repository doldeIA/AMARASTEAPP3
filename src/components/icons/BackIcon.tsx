import React from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
  title?: string;
};

export default function BackIcon({
  width = 20,
  height = 20,
  className = "",
  onClick,
  title = "Voltar",
}: Props) {
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
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
