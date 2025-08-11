import React from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
};

export default function LogoIcon({ width = 36, height = 36, className = "", title = "Amarasté" }: Props) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* circular badge */}
      <circle cx="32" cy="32" r="30" fill="#A13500" />
      {/* stylized "A" letter */}
      <path
        d="M20 44 L28 20 L36 20 L44 44 L38 44 L34 32 L30 32 L26 44 Z"
        fill="#fff"
        transform="translate(0,0)"
      />
      {/* small accent */}
      <rect x="29" y="12" width="6" height="4" rx="1" fill="#FFD78C" opacity="0.9" />
    </svg>
  );
}
