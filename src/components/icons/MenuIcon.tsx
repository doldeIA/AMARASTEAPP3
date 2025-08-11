// src/components/icons/MenuIcon.tsx
export default function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

import React from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
};

export default function MenuIcon({ width = 24, height = 24, className = "", onClick }: Props) {
  return (
    <svg
      onClick={onClick}
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor" />
      <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
      <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}
