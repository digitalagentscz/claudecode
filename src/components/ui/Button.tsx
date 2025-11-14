import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ai" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-6 py-3 text-lg",
    };

    const variantClasses = {
      primary: "btn-primary",
      ai: "btn-ai",
      secondary: "btn-secondary",
      outline: "btn-outline",
      ghost: "btn-ghost",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "btn",
          sizeClasses[size],
          variantClasses[variant],
          isLoading && "opacity-70 cursor-wait",
          className
        )}
        {...props}
      >
        {isLoading && <span className="spinner mr-2" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
