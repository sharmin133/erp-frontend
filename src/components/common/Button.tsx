import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
}

export const Button = ({
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) => {
  const base =
    "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 " +
    "disabled:cursor-not-allowed disabled:opacity-50 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  const variants = {
    primary:
      "bg-emerald-700 text-white hover:bg-emerald-800 active:bg-emerald-900 focus-visible:ring-emerald-700",

    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-400",

    outline:
      "border border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white active:bg-emerald-800 focus-visible:ring-emerald-700",

    danger:
      "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-500",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest} />
  );
};
