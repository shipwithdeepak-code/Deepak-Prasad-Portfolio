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
  const baseStyles = "glass-btn-base";

  const sizeStyles = {
    sm: "text-xs h-9 px-3.5 gap-1.5",
    md: "text-sm h-11 px-5 gap-2",
    lg: "text-base h-13 px-6 gap-2.5",
  };

  const variantStyles = {
    primary: "glass-btn-primary",
    secondary: "glass-btn-secondary",
    dark: "glass-btn-dark",
    ghost: "glass-btn-ghost",
    icon: "glass-btn-icon !p-0 !w-10 !h-10",
  };

  const finalClass = `${baseStyles} ${
    variant === "icon" ? "" : sizeStyles[size]
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
