import React from "react";

export interface DipaAvatarProps {
  className?: string;
}

export function DipaAvatar({ className = "" }: DipaAvatarProps) {
  return (
    <div
      className={`w-[32px] h-[32px] rounded-full bg-[#042718] text-[#FAFAF8] flex items-center justify-center shrink-0 ${className}`}
      aria-label="Dīpa"
      role="img"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M12 2.5s-5.2 5.6-5.2 10.1a5.2 5.2 0 0 0 10.4 0C17.2 8.1 12 2.5 12 2.5Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
