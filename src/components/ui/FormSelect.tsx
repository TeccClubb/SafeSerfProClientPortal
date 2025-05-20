// components/FormSelect.tsx

import { TextareaHTMLAttributes } from "react";
import { FormFieldError } from "./types";
import { UseFormRegisterReturn } from "react-hook-form";

type Option = {
  label: string;
  value: string | number;
};

interface FormSelectProps {
  label: string;
  id?: string; // ✅ Add this
  options: Option[];
  registration: UseFormRegisterReturn;
  error?: FormFieldError;
  className?: string;
}

export default function FormSelect({
  label,
  id,
  options,
  registration,
  error,
  className = "",
}: FormSelectProps) {
  return (
    <div>
      {/* Don't render the label here if you want to render it outside */}
      <select
        id={id} // ✅ Use the passed id
        {...registration}
        className={`w-full rounded-md px-4 py-2 focus:outline-none focus:ring ${
          error ? "border-red-400 text-red-600" : "border-gray-300"
        } ${className}`}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {typeof error?.message === "string" && (
        <p className="text-sm text-red-600 mt-1">{error.message}</p>
      )}
    </div>
  );
}
