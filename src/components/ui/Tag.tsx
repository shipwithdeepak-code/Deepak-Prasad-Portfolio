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
      "bg-black/[0.04] text-[#121517]/75 border border-black/[0.08] hover:bg-black/[0.06]",
    accent:
      "bg-[#C89B3C]/10 text-[#A8711A] border border-[#C89B3C]/25 font-semibold",
    amber:
      "bg-[#C89B3C]/12 text-[#9A6715] border border-[#C89B3C]/25 font-semibold",
    live:
      "bg-[#188E39]/10 text-[#188E39] border border-[#188E39]/20 font-semibold",
    outline:
      "bg-white/80 backdrop-blur-sm text-[#121517]/70 border border-black/[0.10] hover:border-black/20",
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
