"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/src/components/components-ui/Button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/components-ui/Tooltip"
import { FileEdit } from "lucide-react"

import ChatSheet from "../components-chat/ChatSheet"
import MintDelete from "./MintDelete"
import MintManager from "./MintManager"

interface AuthorActionsProps {
  listingId: any
}

export default function MintPageAuthorActions({
  listingId,
}: AuthorActionsProps) {
  return (
    <div className="flex w-full justify-end pr-5">
      <div className="flex w-4/12 justify-end space-x-5">
        <ChatSheet />
        <MintManager />
        <Link
          href={`/p/mint/edit/${listingId.listingId}`}
          className="group flex h-10 w-10 items-center justify-center hover:text-amber-500"
        >
          <FileEdit />
        </Link>
        <MintDelete listingId={listingId} />
      </div>
    </div>
  )
}
