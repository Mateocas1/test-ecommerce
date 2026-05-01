import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "../../lib/utils"

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-none border border-border bg-surface px-4 py-2 text-sm text-text placeholder:text-text-tertiary transition-all duration-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
