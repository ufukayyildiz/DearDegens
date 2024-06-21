import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components-ui/Tooltip"
import { FaHandshake } from "react-icons/fa6"

export default function IsSold() {
  return (
    <div className="z-30 flex h-8 w-8 items-center justify-center rounded-full bg-background text-cyan-500">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <FaHandshake className="h-5 w-5 animate-pulse" />
          </TooltipTrigger>
          <TooltipContent sideOffset={1}>
            <p>SOLD!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
