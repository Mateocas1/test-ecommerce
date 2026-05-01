import { type HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center px-3 py-1 text-[10px] font-medium uppercase tracking-widest border",
  {
    variants: {
      variant: {
        default: "border-accent/30 text-accent-text bg-accent/5",
        success: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
        warning: "border-amber-500/30 text-amber-400 bg-amber-500/5",
        danger: "border-red-500/30 text-red-400 bg-red-500/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
