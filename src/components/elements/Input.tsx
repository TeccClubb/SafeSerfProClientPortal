import { cn } from "@/lib/utils"
import React, { FC, forwardRef, ReactNode, useId } from "react"

const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { label?: ReactNode; errorMessage?: string }>(({ label, errorMessage, className, ...props }, ref) => {
    const id = useId()
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <input id={id} ref={ref} className={cn("", className)} {...props} />
            {errorMessage && <p>{errorMessage}</p>}
        </>
    )
})

export default Input