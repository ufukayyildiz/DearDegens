"use client"
import React, { useState, useEffect } from "react"
import { MessageCircle, Loader2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components-ui/Sheet"
import { messagesType, roomType } from "@/src/types/db"
import { useSession } from "next-auth/react"
import {
  useGetMessages,
  useGetUnreadMessages,
  useGetUserChatrooms,
} from "@/src/server/services"
import ChatRoom from "./ChatRoom"
import ChatRoomSkeleton from "./ChatRoomSkeleton"
import { useQueryClient } from "@tanstack/react-query"
import { cn } from "@/src/lib/utils"

export default function ChatSheetUser() {
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const { data: session } = useSession()
  const userId = session?.user.id

  const queryClient = useQueryClient()
  const unreadFetching = useGetUnreadMessages().isFetching
  const unreadMessages = useGetUnreadMessages().data as string[] | []
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
        className="relative flex flex-row items-center rounded-full border border-transparent bg-background shadow-lg dark:bg-transparent dark:shadow-none"
      >
        <div className="relative flex h-8 w-8 items-center justify-center">
          <div className="absolute -right-2 -top-2 z-50 flex h-6 w-6 content-center rounded-full bg-red-500 shadow-md">
            {unreadFetching === true ? (
              <Loader2
                className="absolute top-1 mx-auto w-full animate-spin text-white"
                size={15}
              />
            ) : unreadMessages ? (
              <p className="absolute top-1 mx-auto w-full text-center text-xs text-white">
                {unreadMessages.length}
              </p>
            ) : (
              <p className="absolute top-1 mx-auto w-full text-center text-xs text-white">
                0
              </p>
            )}
          </div>
          <MessageCircle className="absolute h-6 w-6" />
        </div>
        {/* <p className="pl-2 text-sm">Chat Rooms</p> */}
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
                <div className="flex w-full flex-col space-y-3">
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
