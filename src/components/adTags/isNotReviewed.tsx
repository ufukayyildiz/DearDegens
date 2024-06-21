import React from "react"
import { AiOutlineLoading } from "react-icons/ai"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components-ui/Tooltip"

export default function IsNotReviewed() {
  return (
    <div className="z-30 flex h-8 w-8 items-center justify-center rounded-full bg-background text-customAccent">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AiOutlineLoading className="h-5 w-5 animate-spin" />
          </TooltipTrigger>
          <TooltipContent sideOffset={1}>
            <p>Under review</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
