import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-bold tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl active:scale-95 border border-primary/50",
        destructive:
          "bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 hover:shadow-xl active:scale-95 border border-destructive/50",
        outline:
          "border-2 border-primary bg-transparent text-primary shadow-lg hover:bg-primary/10 hover:shadow-xl active:scale-95",
        secondary:
          "bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 hover:shadow-xl active:scale-95 border border-border",
        ghost:
          "hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-border",
        link:
          "text-primary underline-offset-4 hover:underline",
        tactical:
          "bg-gradient-to-br from-black/40 to-black/60 text-primary border-2 border-primary/50 shadow-xl hover:shadow-2xl hover:border-primary active:scale-95 relative overflow-hidden group",
        success:
          "bg-gradient-to-br from-green-600/20 to-green-800/40 text-green-400 border-2 border-green-500/50 shadow-lg hover:shadow-xl hover:border-green-500 active:scale-95",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-none px-3 text-xs",
        lg: "h-12 rounded-none px-8 text-base",
        xl: "h-14 rounded-none px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }