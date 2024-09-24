"use client"
import React, { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components-ui/Sheet"
import { messagesType, roomType } from "@/src/types/db"
import { useSession } from "next-auth/react"
import { useGetMessages, useGetUserChatrooms } from "@/src/server/services"
import ChatRoom from "./ChatRoom"
import ChatRoomSkeleton from "./ChatRoomSkeleton"
import { useQueryClient } from "@tanstack/react-query"
import { cn } from "@/src/lib/utils"

export default function ChatSheetUser() {
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const { data: session } = useSession()
  const userId = session?.user.id

  const queryClient = useQueryClient()
  const messages = useGetMessages(selectedRoom).data as messagesType[]
  const data = useGetUserChatrooms().data as roomType[]
  const isFetching = useGetUserChatrooms().isFetching

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
    console.log("invalidate chats")
    await queryClient.invalidateQueries({ queryKey: ["usersrooms", userId] })
  }

  // MANAGE ROOM SELECT
  const handleRoomChange = async (data: roomType) => {
    setSelectedRoom(data.id)
    await queryClient.invalidateQueries({ queryKey: ["messages", data.id] })
  }

  return (
    <Sheet>
      <SheetTrigger
        onClick={handleInvalidateChat}
        className="flex flex-row items-center rounded border-2 border-transparent p-2 hover:border-customAccent"
      >
        <div className="relative flex h-8 w-8 items-center justify-center">
          <MessageCircle className="absolute h-6 w-6" />
        </div>
        <p className="pl-2 text-sm">Chat Rooms</p>
      </SheetTrigger>
      <SheetContent className="bg-transparent backdrop-blur-xl">
        <SheetHeader className="h-full">
          <SheetTitle className="text-customAccent">Chat Rooms</SheetTitle>
          {isFetching ? (
            <div className="pt-3">
              <ChatRoomSkeleton />
            </div>
          ) : (
            <div className="h-full pt-3">
              {chatRoomData && chatRoomData.length > 0 ? (
                <div className="flex w-full flex-col space-y-2">
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
