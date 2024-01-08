import React from "react"
import { useParams } from "next/navigation"
import { getAdOffers } from "@/src/server/actions"
import { useQuery } from "@tanstack/react-query"
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
import MintOffers from "./MintOffers"
import MintQuestions from "./MintQueries"

export default function MintManager() {
  const { mintId }: any = useParams()
  const { data } = useQuery({
    queryKey: ["adOffer"],
    queryFn: () => getAdOffers(mintId),
  })

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
                <SheetTitle>Queries:</SheetTitle>
                <MintQuestions />
              </ResizablePanel>
            </ResizablePanelGroup>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
