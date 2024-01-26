import React from "react"

export default function MintOfferCardSkeleton() {
  return (
    <div className="mb-3 h-20 animate-pulse rounded-lg border border-muted bg-backgroundForeground p-2 text-primary shadow">
      <div className="flex justify-between">
        <div className="flex w-1/2 flex-col justify-between gap-5">
          <div className="flex h-5 w-full animate-pulse rounded-full bg-muted" />
          <div className="flex h-5 w-full animate-pulse rounded-full bg-muted" />
        </div>
        <div className="flex h-5 w-3/12 animate-pulse items-end justify-end rounded-full bg-muted" />
      </div>
    </div>
  )
}
