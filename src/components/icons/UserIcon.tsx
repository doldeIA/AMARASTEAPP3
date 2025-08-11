import React from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
  title?: string;
};

export default function UserIcon({
  width = 20,
  height = 20,
  className = "",
  onClick,
  title = "Usuário",
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
