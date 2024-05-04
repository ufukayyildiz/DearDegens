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
    <div className="relative mb-3 flex h-auto min-h-[250px] w-full flex-col overflow-hidden rounded-lg border border-muted p-2 text-primary shadow-lg transition duration-75 hover:scale-[0.99] hover:border-customAccent">
      <div className="mb-5 flex items-center space-x-2">
        <p className="font-semibold italic">Name:</p>
        <p>{query.userName}</p>
      </div>
      <div>
        <div className="mx-auto mb-1 flex h-[2px] w-full bg-muted" />
        <p className="mb-1 font-semibold italic">Question:</p>
        <p className="">{query.query}</p>
      </div>
      <div className="mb-10">
        <div className="mx-auto mb-1 mt-5 flex h-[2px] w-full bg-muted" />
        <p className="mb-1 font-semibold italic">Response:</p>
        {query.reply ? (
          <span>{query.reply}</span>
        ) : (
          <span className="italic text-rose-500">pending</span>
        )}
      </div>
      <div className="absolute bottom-0 w-full ">
        <div className="flex h-8 w-full items-center justify-between ">
          <p className="text-xs italic">
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
