"use client"

import * as React from "react"
import { cn } from "@/src/lib/utils"
import * as SwitchPrimitives from "@radix-ui/react-switch"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "border-mute peer inline-flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full border-0 from-customColorOne via-customColorTwo to-customColorThr shadow-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-muted data-[state=checked]:bg-gradient-to-br",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none ml-[6px] block h-6 w-6 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
