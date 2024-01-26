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

import ChatSheet from "../components-chat/ChatSheet"
import MintQuery from "../pageMintQueries/MintQuery"
import MintManager from "./MintManager"

export default function MintPageUsersActions(listingId: any) {
  return (
    <div className="flex w-full justify-end pr-5">
      <div className=" flex w-4/12 justify-end space-x-5">
        <div className="group flex h-10 w-10 items-center justify-center hover:text-rose-500">
          <Heart />
        </div>
        <ChatSheet />
        <MintManager />
        <MintQuery />
        <div className="group flex h-10 w-10 items-center justify-center hover:text-amber-500">
          <AlertTriangle />
        </div>
      </div>
    </div>
  )
}
