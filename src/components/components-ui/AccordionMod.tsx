"use client"

import * as React from "react"
import { cn } from "@/src/lib/utils"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown, Menu } from "lucide-react"

const AccordionMod = AccordionPrimitive.Root

const AccordionItemMod = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
))
AccordionItemMod.displayName = "AccordionItem"

const AccordionTriggerMod = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <Menu className="h-6 w-6 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTriggerMod.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContentMod = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-right data-[state=open]:animate-accordion-left",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContentMod.displayName = AccordionPrimitive.Content.displayName

export {
  AccordionMod,
  AccordionItemMod,
  AccordionTriggerMod,
  AccordionContentMod,
}
