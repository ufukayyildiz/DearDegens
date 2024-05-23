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
import { messagesType, roomType } from "@/src/types/db"
import { useSession } from "next-auth/react"
import { useGetChatrooms, useGetMessages } from "@/src/server/services"
import ChatRoom from "./ChatRoom"
import ChatRoomSkeleton from "./ChatRoomSkeleton"
import { useQueryClient } from "@tanstack/react-query"

interface ChatSheetProps {
  listingId: any
}

export default function ChatSheet({ listingId }: ChatSheetProps) {
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const { data: session } = useSession()
  const userId = session?.user.id

  const queryClient = useQueryClient()
  const messages = useGetMessages(selectedRoom).data
  const { data, isFetching } = useGetChatrooms(listingId)

  const chatRoomData: roomType[] = []
  const filteredRoom =
    data &&
    data.map((data: roomType) => {
      if (data.seller.id === userId || data.buyer.id === userId) {
        chatRoomData.push(data)
      }
    })

  // INVALIDATE LISTING CHAT
  const handleInvalidateChat = async () => {
    await queryClient.invalidateQueries({ queryKey: ["chatroom"] })
  }

  // MANAGE ROOM SELECT
  const handleRoomChange = async (data: roomType) => {
    setSelectedRoom(data.chatRoom.id)
    await queryClient.invalidateQueries({ queryKey: ["messages"] })
  }

  return (
    <Sheet>
      <SheetTrigger
        className="group flex h-10 min-w-10 items-center justify-center hover:text-blue-500"
        onClick={handleInvalidateChat}
      >
        <MessageCircle />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-full">
          <SheetTitle className="text-customAccent">Chat Rooms</SheetTitle>
          {isFetching === true ? (
            <div>
              <ChatRoomSkeleton />
            </div>
          ) : (
            <div className="h-full">
              {chatRoomData && chatRoomData.length > 0 ? (
                <div className="flex flex-col space-y-1">
                  {chatRoomData.map((data, index) => {
                    return (
                      <div onClick={() => handleRoomChange(data)} key={index}>
                        <ChatRoom
                          roomData={data}
                          messages={messages!}
                          key={data.chatRoom.id}
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
