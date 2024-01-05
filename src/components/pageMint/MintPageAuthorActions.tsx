"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/components-ui/Button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/components-ui/Tooltip"
import { FileEdit } from "lucide-react"
import { offerType } from "@/src/types/db"
import ChatSheet from "../components-chat/ChatSheet"
import MintDelete from "./MintDelete"
import MintManager from "./MintManager"

interface AuthorActionsProps{
  listingId: any
  adOffers: offerType[]
}

export default function MintPageAuthorActions({listingId, adOffers}: AuthorActionsProps) {

  return (
    <div className="w-full flex justify-end pr-5">
      <div className=" w-4/12 flex justify-end">
        <TooltipProvider>
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
              <MintManager adOffers={adOffers} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Offers / Questions</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button className="hover:text-amber-500" variant="icon">
                <Link href={`/p/mint/edit/${listingId.listingId}`}>
                  <FileEdit />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Listing</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <MintDelete listingId={listingId} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Listing</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
