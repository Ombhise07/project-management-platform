import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "green" | "amber" | "red";
}

export default function Badge({ children, variant = "blue" }: BadgeProps) {
  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-semibold",

        {
          "bg-blue-100 text-blue-700": variant === "blue",

          "bg-green-100 text-green-700": variant === "green",

          "bg-amber-100 text-amber-700": variant === "amber",

          "bg-red-100 text-red-700": variant === "red",
        }
      )}
    >
      {children}
    </span>
  );
}
