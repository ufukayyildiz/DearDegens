import React from "react"
import { formatTimeToNow } from "@/src/lib/utils"
import { queryType } from "@/src/types/db"

import MintQueryReply from "./MintQueryReply"

interface QueryCardProps {
  query: queryType
  userId: string
}

export default function MintQueriesCard({ query, userId }: QueryCardProps) {
  return (
    <div className="relative z-50 mx-auto mb-3 flex h-auto min-h-[100px] w-11/12 flex-col overflow-hidden rounded-lg border border-muted p-2 text-left text-xs text-primary shadow-lg transition duration-75 hover:scale-[0.99] hover:border-customAccent sm:text-sm">
      {/* <div className="mb-3 flex items-center space-x-2">
        <p className="font-semibold italic text-secondary">Name:</p>
        <p>{query.userName}</p>
      </div> */}
      <div>
        {/* <div className="mx-auto mb-1 flex h-[2px] w-full bg-muted" /> */}
        <p className="mb-1 font-semibold italic text-secondary">Question:</p>
        <p className="">{query.query}</p>
      </div>
      <div className="mb-10">
        <div className="mx-auto mb-1 mt-3 flex h-[2px] w-full bg-muted" />
        <p className="mb-1 font-semibold italic text-secondary">Response:</p>
        {query.reply ? (
          <span>{query.reply}</span>
        ) : (
          <span className="italic text-rose-500">Pending.</span>
        )}
      </div>
      <div className="absolute bottom-0 w-full ">
        <div className="flex h-8 w-full items-center justify-between ">
          <p className="text-xs italic text-muted-foreground">
            Sent {formatTimeToNow(query.createdAt!)}
          </p>
          <div>
            {query.sellerId === userId && <MintQueryReply queryId={query.id} />}
          </div>
        </div>
      </div>
    </div>
  )
}
