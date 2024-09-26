import React from "react"
import { UserAvatar } from "../components-ui/UserAvatar"
import { formatDateFromTimestamp } from "@/src/lib/utils"
import { roomType } from "@/src/types/db"

interface ChatRoomTriggerProps {
  roomData: roomType
  userName: string
  userImage: string
}

export default function ChatRoomTrigger({
  roomData,
  userName,
  userImage,
}: ChatRoomTriggerProps) {
  console.log("room", roomData)
  return (
    <div className="group flex w-full flex-row items-center space-x-5 rounded-lg border border-muted bg-background p-2 text-primary shadow-md transition duration-75 hover:scale-[0.99]">
      <UserAvatar
        user={{
          name: userName,
          image: userImage,
        }}
        className="h-8 w-8"
      />
      <div className="flex w-full flex-col items-center justify-start">
        <h1 className="w-full truncate text-left">{userName}</h1>
        <p className="w-full truncate text-left text-xs italic text-customAccent">
          {roomData.adTitle}
        </p>
      </div>
      <span className="flex w-36 justify-end text-xs italic text-muted-foreground">
        {formatDateFromTimestamp(roomData.createdAt!)}
      </span>
    </div>
  )
}
