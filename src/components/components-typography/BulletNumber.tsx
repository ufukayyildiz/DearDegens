import React from "react"
import { cn } from "@/src/lib/utils"

const BulletPointNumber = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="relative flex items-center pl-5">
      <li
        ref={ref}
        className={cn("my-1 pl-5 text-sm text-primary", className)}
        {...props}
      />
    </div>
  )
})
BulletPointNumber.displayName = "FieldDescription"

export { BulletPointNumber }
