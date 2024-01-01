"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/components-ui/Button"
import { FileEdit } from "lucide-react"
import ChatSheet from "../components-chat/ChatSheet"
import MintDelete from "./MintDelete"
import MintOffers from "./MintOffers"

export default function MintPageAuthorActions(listingId: any, adOffers: any) {
  return (
    <div className="w-full flex justify-end pr-5">
      <div className=" w-4/12 flex justify-end">
        <ChatSheet/>
        <MintOffers adOffers={adOffers}/>
        <Button className="hover:text-teal-500" variant="icon">
          <Link href={`/p/mint/edit/${listingId.listingId}`}>
            <FileEdit />
          </Link>
        </Button>
        <MintDelete listingId={listingId} />
      </div>
    </div>
  )
}
