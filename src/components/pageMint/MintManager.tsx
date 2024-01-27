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
import MintQueries from "../pageMintQueries/MintQueries"

export default function MintManager() {
  return (
    <Sheet>
      <SheetTrigger className="group flex h-10 w-10 items-center justify-center hover:text-teal-500">
        <Gavel />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-full">
          <SheetDescription className="h-full">
            <PanelGroup direction="vertical">
              <Panel className="h-full">
                <SheetTitle className="text-customAccent">Offers:</SheetTitle>
                <MintOffers />
              </Panel>
              <PanelResizeHandle className="flex h-0 w-full  items-center justify-center border border-customAccent">
                <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full border border-customAccent bg-background">
                  <ChevronsUpDown size={20} className="text-customAccent" />
                </div>
              </PanelResizeHandle>
              <Panel className="relative h-full">
                <SheetTitle className="mt-5 text-customAccent">
                  Queries:
                </SheetTitle>
                <MintQueries />
              </Panel>
            </PanelGroup>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
