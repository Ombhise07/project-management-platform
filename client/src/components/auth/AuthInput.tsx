import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  registration?: UseFormRegisterReturn;
}

export default function AuthInput({
  label,
  icon: Icon,
  error,
  registration,
  className = "",
  ...props
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>

      <div className="relative">
        <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          {...registration}
          {...props}
          className={`w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""
          } ${className}`}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
