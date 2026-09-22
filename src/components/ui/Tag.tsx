import React from "react";

export type TagVariant = "default" | "accent" | "amber" | "live" | "outline";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Tag / Pill component for meta labels, stacks, and categories.
 */
export const Tag: React.FC<TagProps> = ({
  variant = "default",
  children,
  icon,
  className = "",
  ...props
}) => {
  const variantStyles = {
    default:
      "bg-[#042718]/5 text-[#042718]/75 border border-[#042718]/8 hover:bg-[#042718]/8",
    accent:
      "bg-[#188E39]/10 text-[#188E39] border border-[#188E39]/20 font-semibold",
    amber:
      "bg-[#A8711A]/10 text-[#A8711A] border border-[#A8711A]/20 font-semibold",
    live:
      "bg-[#6FBE8C]/15 text-[#2F7A4F] border border-[#2F7A4F]/30 font-semibold",
    outline:
      "bg-white/80 backdrop-blur-sm text-[#042718]/70 border border-[#042718]/12 hover:border-[#042718]/25",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-inter font-medium leading-none transition-colors ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Tag;
