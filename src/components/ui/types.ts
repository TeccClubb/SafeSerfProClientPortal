import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type FormFieldError = FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
