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
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";

  const variants = {
    primary:
      "bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700 focus-visible:ring-sky-500",
    secondary:
      "border border-gray-700 bg-gray-800 text-gray-100 hover:border-gray-600 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring-gray-500",
    outline:
      "border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus-visible:ring-sky-500",
    danger:
      "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-500",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest} />
  );
};
