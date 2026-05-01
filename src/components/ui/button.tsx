import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 cursor-pointer uppercase tracking-widest",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-bg hover:bg-accent-hover active:scale-[0.97]",
        secondary:
          "bg-surface text-text-secondary border border-border hover:border-border-hover hover:text-text hover:bg-surface-elevated",
        ghost: "text-text-tertiary hover:text-text hover:bg-surface tracking-normal",
        danger:
          "bg-red-900/30 text-red-400 border border-red-900/50 hover:bg-red-900/50",
        outline:
          "border border-border text-text-secondary hover:border-accent hover:text-accent-text tracking-normal",
      },
      size: {
        sm: "h-9 px-4 text-[10px]",
        md: "h-11 px-6 text-[11px]",
        lg: "h-13 px-10 text-xs",
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
