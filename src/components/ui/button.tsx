import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-bg hover:bg-accent-hover active:scale-[0.98] active:-translate-y-[1px]",
        secondary:
          "bg-surface text-text-secondary border border-border hover:border-border-hover hover:text-text hover:bg-surface-elevated active:scale-[0.98]",
        ghost: "text-text-tertiary hover:text-text hover:bg-surface active:scale-[0.98]",
        danger:
          "bg-red-950/40 text-red-400 border border-red-900/40 hover:bg-red-900/60 active:scale-[0.98]",
        outline:
          "border border-border text-text-secondary hover:border-accent/40 hover:text-accent-text active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
