import React from "react"
import { Gavel, MessageCircle} from "lucide-react"
import { Button } from "../components-ui/Button"
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
        <Button className="group hover:text-teal-500" variant="icon">
          <MessageCircle/>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Chat Section</SheetTitle>
          <SheetDescription>
            Chats will be displayed here..
            Add two resizable areas, top will have chat list, bottom will have current chat.
            listingId will fetch current chat on click.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
