import React from "react"
import { GoAlertFill } from "react-icons/go"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components-ui/Tooltip"

export default function IsExpired() {
  return (
    <div className="z-30 flex h-8 w-8 items-center justify-center rounded-full bg-background text-red-500">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <GoAlertFill className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent sideOffset={1}>
            <p>Listing Expired</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
