import React from "react"
import { MessageCircle, ChevronsUpDown } from "lucide-react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import MessageBoard from "./MessageBoard"
import SelectRoom from "./SelectRoom"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components-ui/Sheet"

import { io, Socket } from "socket.io-client"
const socket: Socket = io("https://dear-degens-server.vercel.app")

export default function ChatSheet(ListingId: any) {

  /* 
  TO DO: Fetch Room and Messages schema
  - New Rooms are created when an offer is at final confirmation
  - Create a join between Room and Messages
  - Fetch Room where adId = listingId
  - Fetch Messages where roomId - Room.id
  - Pass room id to <SelectRoom/>
  - Pass messages to <MessagesBoard/>
  - Create A message board for seller (Display all rooms)
  - Create message board for user (display only the users room)
  - Change Room component to a dropdown and not a sheet
  */

  return (
    <Sheet>
      <SheetTrigger className="group flex h-10 w-10 items-center justify-center hover:text-blue-500">
        <MessageCircle />
      </SheetTrigger>
      <SheetContent className="w-[100vw] md:w-[60vw]">
        <SheetHeader className="h-full">
          <SheetTitle>Chat Section</SheetTitle>
          <SheetDescription className="h-full">
            <PanelGroup direction="vertical">
              <Panel className="relative" defaultSize={50}>
                <SelectRoom socket={socket}/>
              </Panel>
              <PanelResizeHandle className="flex h-0 w-full  items-center justify-center border border-customAccent z-50">
                <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full border border-customAccent bg-background">
                  <ChevronsUpDown
                    size={20}
                    className="text-customAccent"
                  />
                </div>
              </PanelResizeHandle>
              <Panel className="relative">
                <MessageBoard socket={socket}/>
              </Panel>
            </PanelGroup>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
