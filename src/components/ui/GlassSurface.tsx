import React from "react";

export type GlassSurfaceVariant = "standard" | "solid" | "subtle";

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: GlassSurfaceVariant;
  className?: string;
  as?: React.ElementType;
}

/**
 * GlassSurface primitive for EDITORIAL GREEN × SOFT GLASS design system.
 * Follows the principle: "Glass is an interaction material, not a decoration."
 */
export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  variant = "standard",
  className = "",
  as: Component = "div",
  ...props
}) => {
  const variantStyles = {
    standard:
      "bg-white/90 backdrop-blur-[14px] border border-[#042718]/10 shadow-[0_4px_16px_rgba(4,39,24,0.04)]",
    solid:
      "bg-white/95 backdrop-blur-[20px] border border-[#042718]/10 shadow-[0_8px_24px_rgba(4,39,24,0.06)]",
    subtle:
      "bg-white/75 backdrop-blur-[10px] border border-[#042718]/6 shadow-[0_2px_8px_rgba(4,39,24,0.03)]",
  };

  return (
    <Component
      className={`rounded-2xl ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default GlassSurface;
