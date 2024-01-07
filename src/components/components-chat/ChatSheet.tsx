import React from "react"
import { MessageCircle } from "lucide-react"

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

export default function ChatSheet(ListingId: any) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="group hover:text-blue-500" variant="icon">
          <MessageCircle />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-full">
          <SheetTitle>Chat Section</SheetTitle>
          <SheetDescription className="h-full">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel className="relative">
                <div className="text-primary">Chat list will go here</div>
              </ResizablePanel>
              <ResizableHandle withHandle className="border-muted" />
              <ResizablePanel className="relative">
                <div className="mt-5 text-primary">Messages will go here</div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
