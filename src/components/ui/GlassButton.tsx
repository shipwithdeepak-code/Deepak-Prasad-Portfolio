import React from "react";

export type GlassButtonVariant =
  | "primary"
  | "secondary"
  | "dark"
  | "icon"
  | "ghost";

export type GlassButtonSize = "sm" | "md" | "lg";

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
}

/**
 * GlassButton primitive for EDITORIAL GREEN × SOFT GLASS design system.
 * Standardizes button states, borders, tactile feedback, and accessibility focus.
 */
export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  children,
  className = "",
  as = "button",
  href,
  target,
  rel,
  download,
  disabled,
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-inter font-semibold transition-all duration-200 cursor-pointer select-none no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#188E39]/40 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "text-xs h-9 px-3.5 gap-1.5 rounded-full",
    md: "text-sm h-11 px-5 gap-2 rounded-full",
    lg: "text-base h-13 px-6 gap-2.5 rounded-full",
  };

  const variantStyles = {
    primary:
      "bg-[#042718] text-white hover:bg-[#0B3322] border border-[#042718] shadow-[0_2px_8px_rgba(4,39,24,0.12)]",
    secondary:
      "bg-white/90 backdrop-blur-[12px] text-[#042718] hover:bg-white border border-[#042718]/15 shadow-[0_2px_6px_rgba(4,39,24,0.04)] hover:border-[#042718]/25",
    dark:
      "bg-[#042718] text-white hover:bg-[#073D26] border border-white/10 shadow-[0_4px_16px_rgba(4,39,24,0.2)]",
    ghost:
      "bg-transparent text-[#042718]/70 hover:text-[#042718] hover:bg-[#042718]/5 border border-transparent",
    icon:
      "p-2 rounded-full bg-white/90 backdrop-blur-[10px] text-[#042718]/70 hover:text-[#042718] hover:bg-white border border-[#042718]/10 shadow-xs",
  };

  const finalClass = `${baseStyles} ${
    variant === "icon" ? "w-10 h-10 p-0" : sizeStyles[size]
  } ${variantStyles[variant]} ${className}`;

  if (as === "a" && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download as any}
        className={finalClass}
        onClick={onClick as any}
        {...(props as any)}
      >
        {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
        {children && <span>{children}</span>}
        {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={finalClass}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
};

export default GlassButton;
