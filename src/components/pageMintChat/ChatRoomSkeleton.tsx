import React from "react"

export default function ChatRoomSkeleton() {
  const loader = [1, 2, 3, 4]
  return (
    <div className="mb-5 flex h-12 w-full animate-pulse justify-between rounded-lg bg-background p-2 shadow-md">
      <div className="flex gap-5">
        <div className="h-8 w-8 rounded-full bg-muted" />
        <h1 className="flex items-center text-left text-muted-foreground">
          Username
        </h1>
      </div>
      <span className="flex w-36 items-center justify-end text-xs italic text-muted-foreground">
        1 Jan 00:00
      </span>
    </div>
  )
}
