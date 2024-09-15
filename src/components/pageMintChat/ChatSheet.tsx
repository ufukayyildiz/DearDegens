"use client"
import React, { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components-ui/Sheet"
import { messagesType, roomType, chatRoomType } from "@/src/types/db"
import { useSession } from "next-auth/react"
import { useGetChatrooms, useGetMessages } from "@/src/server/services"
import ChatRoom from "./ChatRoom"
import ChatRoomSkeleton from "./ChatRoomSkeleton"
import { useQueryClient } from "@tanstack/react-query"
import { cn } from "@/src/lib/utils"

interface ChatSheetProps {
  listingId: any
}

export default function ChatSheet({ listingId }: ChatSheetProps) {
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const { data: session } = useSession()
  const userId = session?.user.id

  const queryClient = useQueryClient()
  const messages = useGetMessages(selectedRoom).data as messagesType[]
  const { data, isFetching } = useGetChatrooms(listingId)

  const chatRoomData: roomType[] = []
  const filteredRoom =
    data &&
    data.map((data: roomType) => {
      if (data.sellerId === userId || data.userId === userId) {
        chatRoomData.push(data)
      }
    })

  // INVALIDATE LISTING CHAT
  const handleInvalidateChat = async () => {
    await queryClient.invalidateQueries({ queryKey: ["chatroom", listingId] })
  }

  // MANAGE ROOM SELECT
  const handleRoomChange = async (data: roomType) => {
    setSelectedRoom(data.id)
    await queryClient.invalidateQueries({ queryKey: ["messages", data.id] })
  }

  // TOOLTIP
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false)
  const tooltip = document.getElementById("chatTrigger")
  tooltip?.addEventListener("mouseover", () => {
    setTooltipVisible(true)
  })
  tooltip?.addEventListener("mouseout", () => {
    setTooltipVisible(false)
  })

  return (
    <Sheet>
      <SheetTrigger
        id="chatTrigger"
        className="group relative flex h-10 min-w-10 items-center justify-center hover:text-blue-500"
        onClick={handleInvalidateChat}
      >
        <p
          className={cn(
            "absolute -top-10 hidden h-8 w-[85px] items-center justify-center rounded-md border border-muted bg-background p-1 text-center text-xs text-primary opacity-0 shadow-md",
            tooltipVisible &&
              "flex opacity-100 transition-opacity duration-200 ease-in"
          )}
        >
          Chat Room
        </p>
        <MessageCircle />
      </SheetTrigger>
      <SheetContent className="bg-transparent backdrop-blur-xl">
        <SheetHeader className="h-full">
          <SheetTitle className="text-customAccent">Chat Rooms</SheetTitle>
          {isFetching === true ? (
            <div className="pt-3">
              <ChatRoomSkeleton />
            </div>
          ) : (
            <div className="h-full pt-3">
              {chatRoomData && chatRoomData.length > 0 ? (
                <div className="flex flex-col space-y-1">
                  {chatRoomData.map((data: roomType, index) => {
                    return (
                      <div onClick={() => handleRoomChange(data)} key={index}>
                        <ChatRoom
                          roomData={data}
                          messages={messages!}
                          key={data.id}
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-left text-primary">
                  <h1 className="mb-2 text-lg font-bold">No Rooms Available</h1>
                  <p>
                    You must have a confirmed offer to use the chat
                    functionality
                  </p>
                </div>
              )}
            </div>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
