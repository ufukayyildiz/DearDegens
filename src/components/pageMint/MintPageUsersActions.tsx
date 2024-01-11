"use client"

import React from "react"
import { Button } from "@/src/components/components-ui/Button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/components-ui/Tooltip"
import { AlertTriangle, Heart, HelpCircle } from "lucide-react"
import MintQuery from "../pageMintQueries/MintQuery"
import ChatSheet from "../components-chat/ChatSheet"
import MintManager from "./MintManager"

export default function MintPageUsersActions(listingId: any) {
  return (
    <div className="w-full flex justify-end pr-5">
      <div className=" w-4/12 flex justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button className="hover:text-rose-500" variant="icon">
                <Heart />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <ChatSheet />
            </TooltipTrigger>
            <TooltipContent>
              <p>Message Box</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <MintManager />
            </TooltipTrigger>
            <TooltipContent>
              <p>Offers / Questions</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <MintQuery/>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ask the seller</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button className="hover:text-amber-500" variant="icon">
                <AlertTriangle />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Report Listing</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
