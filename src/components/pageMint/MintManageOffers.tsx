"use client"
import React from "react"
import { Gavel } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components-ui/Sheet"
import MintOffers from "../pageMintOffers/MintOffers"
import { listingsType } from "@/src/types/db"

interface MintManageOffersProps {
  listing: listingsType
}

export default function MintManageOffers({ listing }: MintManageOffersProps) {
  return (
    <Sheet>
      <SheetTrigger className="group flex h-10 w-10 items-center justify-center hover:text-teal-500">
        <Gavel />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-full">
          <SheetTitle className="text-customAccent">Offers:</SheetTitle>
          <MintOffers listing={listing} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
