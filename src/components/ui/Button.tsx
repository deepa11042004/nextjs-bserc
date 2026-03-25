"use client";

import * as React from "react";
import clsx from "clsx";

type ButtonVariants = "default" | "outline" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  size?: "sm" | "md" | "lg";
  asChild?: boolean; // to support wrapping Link or other elements
}

const variantClasses = {
  default:
    "bg-cyan-600 text-white hover:bg-cyan-700 active:bg-cyan-800 focus:ring-2 focus:ring-cyan-400",
  outline:
    "border border-cyan-600 text-cyan-600 hover:bg-cyan-700 hover:text-white focus:ring-2 focus:ring-cyan-400",
  ghost:
    "bg-transparent text-cyan-500 hover:bg-cyan-900 focus:ring-2 focus:ring-cyan-400",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { children: React.ReactNode }
>((props, ref) => {
  const {
    variant = "default",
    size = "md",
    className,
    asChild = false,
    children,
    ...rest
  } = props;

  // If using asChild, render children directly, else render button
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      className: clsx(
        variantClasses[variant],
        sizeClasses[size],
        "rounded-md font-semibold transition focus:outline-none focus:ring",
        className,
        (children.props as { className?: string }).className
      ),
      ...rest,
    });
  }

  return (
    <button
      ref={ref}
      className={clsx(
        variantClasses[variant],
        sizeClasses[size],
        "rounded-md font-semibold transition focus:outline-none focus:ring",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };