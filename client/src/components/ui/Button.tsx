import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "danger" | "outline";
}

export default function Button({
  children,
  loading = false,
  fullWidth = false,
  variant = "primary",
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-60",

        {
          "w-full": fullWidth,

          "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",

          "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100":
            variant === "secondary",

          "border border-slate-300 bg-transparent hover:bg-slate-100": variant === "outline",

          "bg-red-600 text-white hover:bg-red-700": variant === "danger",
        },

        className
      )}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
