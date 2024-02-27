import React from "react"

export default function ChatRoomSkeleton() {
  const loader = [1, 2, 3, 4]
  return (
    <div className="h-15 mb-5 flex w-full animate-pulse p-2">
      <div className="h-10 w-10 rounded-full bg-muted" />
      <div className="flex h-10 w-full flex-col justify-between pl-5">
        <div className="flex h-3 w-full rounded-xl bg-muted" />
        <div className="flex h-3 w-full rounded-xl bg-muted" />
      </div>
    </div>
  )
}
