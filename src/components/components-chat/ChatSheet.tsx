import React from "react"
import { MessageCircle, ChevronsUpDown } from "lucide-react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components-ui/Sheet"

export default function ChatSheet(ListingId: any) {
  return (
    <Sheet>
      <SheetTrigger className="group flex h-10 w-10 items-center justify-center hover:text-blue-500">
        <MessageCircle />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-full">
          <SheetTitle>Chat Section</SheetTitle>
          <SheetDescription className="h-full">
            <PanelGroup direction="vertical">
              <Panel className="relative" defaultSize={50}>
                <div className="text-primary">Chat list will go here</div>
              </Panel>
              <PanelResizeHandle className="flex h-0 w-full  items-center justify-center border border-customAccent">
                <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full border border-customAccent bg-background">
                  <ChevronsUpDown
                    size={20}
                    className="text-customAccent"
                  />
                </div>
              </PanelResizeHandle>
              <Panel className="relative">
                <div className="mt-5 text-primary">Messages will go here</div>
              </Panel>
            </PanelGroup>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
