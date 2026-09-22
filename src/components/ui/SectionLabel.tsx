import React from "react";

export type SectionLabelColor = "green" | "amber" | "default";

export interface SectionLabelProps {
  number?: string;
  label: string;
  color?: SectionLabelColor;
  className?: string;
}

/**
 * Editorial SectionLabel with monospace track spacing and subtle tinting.
 */
export const SectionLabel: React.FC<SectionLabelProps> = ({
  number,
  label,
  color = "green",
  className = "",
}) => {
  const colorStyles = {
    green: "text-[#188E39]",
    amber: "text-[#A8711A]",
    default: "text-[#042718]/60",
  };

  return (
    <div className={`flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-[0.2em] font-semibold ${colorStyles[color]} ${className}`}>
      {number && <span>{number} ·</span>}
      <span>{label}</span>
    </div>
  );
};

export default SectionLabel;
