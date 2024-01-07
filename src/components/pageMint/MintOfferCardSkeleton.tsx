import React from "react"

export default function MintOfferCardSkeleton() {
  return (
    <div className="h-20 p-2 mb-3 bg-backgroundForeground border border-muted text-primary shadow rounded-lg animate-pulse">
      <div className="flex justify-between">
        <div className="flex flex-col w-1/2 gap-5 justify-between">
          <div className="flex w-full h-5 bg-muted rounded-full animate-pulse" />
          <div className="flex w-full h-5 bg-muted rounded-full animate-pulse" />
        </div>
        <div className="flex h-5 w-3/12 items-end justify-end bg-muted rounded-full animate-pulse" />
      </div>
    </div>
  )
}
