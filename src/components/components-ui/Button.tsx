import * as React from "react"
import { cn } from "@/src/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-muted text-primary shadow-lg border border-transparent hover:border-muted-foreground",
        icon: "bg-transparent text-primary border border-transparent",
        destructive:
          "hover:bg-red-500 bg-red-300 hover:text-primary text-zinc-800 border border-transparent shadow-md",
        passivedestructive:
          "hover:bg-red-500 bg-muted text-primary border border-transparent shadow-md",
        outline:
          "border border-transparent hover:border-customAccent bg-muted shadow-lg hover:bg-gradient-to-br from-customColorOne via-customColorTwo to-customColorThr hover:text-customColorFou",
        outlineTwo:
          "border border-transparent bg-muted shadow-lg hover:bg-muted-foreground hover:text-customColorFou",
        outlinebold:
          "font-bold border-2 border-customAccent bg-muted shadow-lg hover:bg-gradient-to-br from-customColorOne via-customColorTwo to-customColorThr hover:text-customColorFou",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-8 w-8",
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
