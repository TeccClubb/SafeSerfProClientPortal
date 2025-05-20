// components/FormLabel.tsx
import React from "react";

interface FormLabelProps {
  htmlFor?: string;       // optional, to associate label with input id
  className?: string;     // dynamic CSS classes
  children: React.ReactNode;
}

export default function FormLabel({ htmlFor, className = "", children }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-slate-700 text-base font-bold ${className}`}
    >
      {children}
    </label>
  );
}
