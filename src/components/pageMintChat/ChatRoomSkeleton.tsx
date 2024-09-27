import React from "react"

export default function ChatRoomSkeleton() {
  const loader = [1, 2, 3, 4]
  return (
    <div className="flex w-full animate-pulse flex-row items-center rounded-lg border border-muted bg-background p-2 text-primary shadow-md">
      <div className="h-8 w-8 rounded-full bg-muted" />
      <div className="flex w-1/2 gap-5">
        <div className="flex w-full flex-col items-center justify-start pl-5">
          <h1 className="w-full truncate text-left text-muted">userName</h1>
          <p className="w-full truncate text-left text-xs italic text-muted">
            Listing Title
          </p>
        </div>
      </div>
      <span className="flex w-36 justify-end text-xs italic text-muted-foreground">
        1 Jan 00:00
      </span>
    </div>
  )
}
