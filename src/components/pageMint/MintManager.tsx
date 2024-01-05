import React from "react"
import MintOffers from "./MintOffers"
import MintQuestions from "./MintQuestions"
import { offerType } from "@/src/types/db"
import { Gavel} from "lucide-react"
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

type ManagerType = {
  adOffers: offerType[];
};

export default function MintManager({ adOffers }: ManagerType) {


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
                <MintOffers adOffers={adOffers}/>
              </ResizablePanel>
              <ResizableHandle withHandle className="border-muted"/>
              <ResizablePanel className="relative">
                <SheetTitle>Queries:</SheetTitle>
                <MintQuestions/>
              </ResizablePanel>
            </ResizablePanelGroup>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
