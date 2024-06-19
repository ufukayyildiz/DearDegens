"use client"
import { listingsType } from "@/src/types/db"
import React from "react"
import { X, Check } from "lucide-react"
import { Button } from "../components-ui/Button"
import { handleAccepted } from "@/src/server/actions"
import { handleReject } from "@/src/server/actions"

interface DegenAdminAdCardActionsProps {
  listing: listingsType
}

export default function DegenAdminAdCardActions({
  listing,
}: DegenAdminAdCardActionsProps) {
  return (
    <div className="absolute right-0 top-0 z-40 flex flex-row gap-5">
      <Button
        variant="icon"
        onClick={async () => handleAccepted(listing.id)}
        size="icon"
        className="transition duration-75 hover:scale-[1.2] hover:text-teal-500"
      >
        <Check />
      </Button>
      <Button
        variant="icon"
        onClick={async () =>
          handleReject(listing.id, listing.title!, listing.authorId)
        }
        size="icon"
        className="transition duration-75 hover:scale-[1.2] hover:text-red-500"
      >
        <X />
      </Button>
    </div>
  )
}
