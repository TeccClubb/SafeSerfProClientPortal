import { TextareaHTMLAttributes } from "react";
import { FormFieldError } from "./types";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  
  registration: UseFormRegisterReturn;
  error?: FormFieldError;
  className?: string; // <-- Add this for dynamic CSS
}

export default function FormTextarea({
  
  error,
  registration,
  className = "",
  ...rest
}: FormTextareaProps) {
  return (
    <div>
      {/* <label className="block mb-1 font-medium">{label}</label> */}
      <textarea
        {...registration}
        {...rest}
        className={`w-full rounded-md px-4 py-2 focus:outline-none focus:ring ${
          error ? "border-red-400" : "border-gray-300"
        } ${className}`}
      />
      {error?.message && (
        <p className="text-sm text-red-600 mt-1">{error.message as string}</p>
      )}
    </div>
  );
}
