"use client"
import React from "react"
import { Gavel, ChevronsUpDown } from "lucide-react"

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components-ui/Sheet"
import MintOffers from "../pageMintOffers/MintOffers"

export default function MintManageOffers() {
  return (
    <Sheet>
      <SheetTrigger className="group flex h-10 w-10 items-center justify-center hover:text-teal-500">
        <Gavel />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-full">
          <SheetDescription className="h-full">
            <SheetTitle className="text-customAccent">Offers:</SheetTitle>
            <MintOffers />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
