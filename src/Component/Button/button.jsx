import * as React from "react";
import { cn } from "../../lib/utils"; // helper to combine classes, or replace with your own logic

const Button = React.forwardRef(
  ({ className = "", variant = "default", onClick, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2";

    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-500",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
      ghost: "text-blue-600 hover:bg-blue-100",
    };

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`${baseStyles} ${
          variants[variant] || variants.default
        } ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
