import React from "react"
import { Gavel } from "lucide-react"

import { Button } from "../components-ui/Button"
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
      <SheetTrigger>
        <Button className="group hover:text-teal-500" variant="icon">
          <Gavel />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-full">
          <SheetDescription className="h-full">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel className="relative h-full">
                <SheetTitle>Offers:</SheetTitle>
                <MintOffers />
              </ResizablePanel>
              <ResizableHandle withHandle className="border-muted" />
              <ResizablePanel className="relative">
                <SheetTitle className="mt-5">Queries:</SheetTitle>
                <MintQueries />
              </ResizablePanel>
            </ResizablePanelGroup>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
