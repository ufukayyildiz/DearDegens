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
    <div className="relative flex flex-col h-auto max-w-[310px] min-h-[250px] p-2 mb-3 border border-muted hover:border-customAccent text-primary overflow-hidden shadow-lg rounded-lg transition duration-75 hover:scale-[0.99]">
      <div className="flex space-x-2 items-center mb-5">
        <p className="font-semibold italic">Name:</p>
        <p>{query.userName}</p>
      </div>
      <div>
        <hr className="flex w-full h-[2px] mx-auto mb-1 bg-muted" />
        <p className="font-semibold mb-1 italic">Question:</p>
        <p className="">{query.query}</p>
      </div>
      <div className="mb-10">
        <hr className="flex w-full h-[2px] mx-auto mt-5 mb-1 bg-muted" />
        <p className="font-semibold mb-1 italic">Response:</p>
        {query.reply ? (
          <p>{query.reply}</p>
        ) : (
          <p className="italic text-rose-500">pending</p>
        )}
      </div>
      <div className="absolute w-full bottom-0 ">
        <div className="flex h-8 w-full justify-between items-center ">
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
