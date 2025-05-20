// components/FormFileUpload.tsx
import { UseFormRegisterReturn } from "react-hook-form";
import { FormFieldError } from "./types";
import clsx from "clsx"; // Optional: install 'clsx' for cleaner conditional class merging

interface FormFileUploadProps {
  label?: string;
  registration: UseFormRegisterReturn;
  error?: FormFieldError;
  className?: string;         // ✅ dynamic outer div
  inputClassName?: string;    // ✅ dynamic input
  buttonClassName?: string;   // ✅ dynamic button
}

export default function FormFileUpload({
  
  registration,
  error,
  className = "",
  inputClassName = "",
  buttonClassName = "",
}: FormFileUploadProps) {
  function isFieldError(
    error: FormFieldError
  ): error is Exclude<FormFieldError, undefined> & { type: string } {
    return !!error && "type" in error;
  }

  return (
    <div className={className}>
      {/* {label && <label className="block mb-1 font-medium">{label}</label>} */}

      <div className="flex items-center space-x-2">
        <input
          type="file"
          {...registration}
          className={clsx(
            "border border-slate-100 rounded-md px-2 py-1",
            isFieldError(error) ? "border-red-400" : "border-gray-300",
            inputClassName
          )}
        />
        <button
          type="button"
          className={clsx(
            "px-3 py-1 bg-gray-200 rounded hover:bg-gray-300",
            buttonClassName
          )}
        >
          +
        </button>
      </div>

      {isFieldError(error) && typeof error.message === "string" && (
        <p className="text-sm text-red-600 mt-1">{error.message}</p>
      )}
    </div>
  );
}
