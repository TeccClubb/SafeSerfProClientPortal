import { FormFieldError } from "./types"; // adjust path
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
//   label: string;
  error?: FormFieldError;
  registration: UseFormRegisterReturn;
  className?: string;      // for input styling
  labelClassName?: string; // for label styling
}

export const FormInput = ({
//   label,
  error,
  registration,
  className = "",
  labelClassName = "",
  ...rest
}: FormInputProps) => {
  return (
    <div>
      {/* <label
        className={`text-slate-900 text-base   font-bold ${labelClassName}`}
      >
        {label}
      </label> */}
      <input
        {...registration}
        {...rest}
        className={`w-full  ${
          error ? "border-red-400" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring focus:border-blue-300 ${className}`}
      />
      {typeof error?.message === "string" && (
        <p className="text-sm text-red-600 mt-1">{error.message}</p>
      )}
    </div>
  );
};
