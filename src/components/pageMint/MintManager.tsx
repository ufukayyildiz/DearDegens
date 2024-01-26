import React from "react"
import { Gavel } from "lucide-react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components-ui/Resizable"
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
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel className="h-full">
                <SheetTitle className="text-customAccent">Offers:</SheetTitle>
                <MintOffers />
              </ResizablePanel>
              <ResizableHandle withHandle className="border-muted" />
              <ResizablePanel className="relative h-full">
                <SheetTitle className="mt-5 text-customAccent">
                  Queries:
                </SheetTitle>
                <MintQueries />
              </ResizablePanel>
            </ResizablePanelGroup>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
