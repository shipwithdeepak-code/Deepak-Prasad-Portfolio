import React from "react";

export interface DipaAvatarProps {
  className?: string;
}

/**
 * Dīpa's face, static, for use inside the chat drawer.
 * Same character as the launcher (DipaLauncher) so the thing you click and the
 * thing you talk to are recognisably one creature. No animation here — a
 * blinking avatar beside every message would be noise.
 */
export function DipaAvatar({ className = "" }: DipaAvatarProps) {
  return (
    <div
      className={`w-[32px] h-[32px] rounded-full bg-[#042718] flex items-center justify-center shrink-0 overflow-hidden ${className}`}
      aria-label="Dīpa"
      role="img"
    >
      <svg viewBox="14 14 36 36" width="32" height="32" aria-hidden="true">
        <defs>
          <linearGradient id="dipaAvVisor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C8F07A" />
            <stop offset="45%" stopColor="#8FD44A" />
            <stop offset="100%" stopColor="#3C9A48" />
          </linearGradient>
          <radialGradient id="dipaAvGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0" stopColor="#E8FBA8" stopOpacity=".9" />
            <stop offset="100%" stopColor="#8FD44A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="32" cy="32" rx="15" ry="9.5" fill="url(#dipaAvVisor)" />
        <ellipse cx="32" cy="31" rx="13.5" ry="8" fill="url(#dipaAvGlow)" />
        <ellipse cx="32" cy="32" rx="5.4" ry="5.8" fill="#06301B" />
        <circle cx="30.1" cy="30.1" r="1.6" fill="#EAF6EE" />
      </svg>
    </div>
  );
}
