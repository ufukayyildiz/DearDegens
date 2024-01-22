import React from "react"
import { formatTimeToNow } from "@/src/lib/utils"
import { queryType } from "@/src/types/db"
import MintQueryReply from "./MintQueryReply"

interface QueryCardProps {
  query: queryType
}

export default function MintQueriesCard({ query }: QueryCardProps) {
  return (
    <div className="flex flex-col h-[200px] p-2 mb-3 justify-between border border-muted text-primary shadow rounded-lg transition duration-500 hover:scale-[0.99]">
      <div>
        <p className="font-bold mb-2">{query.userName}</p>
        <p className="">{query.query}</p>
      </div>
      <div>
        <p>Response:</p>
        {query.reply ? (
          <p>{query.reply}</p>
        ) : (
          <p className="italic">pending</p>
        )}
      </div>
      <div className="flex justify-between">
        <p className="text-xs italic">{formatTimeToNow(query.createdAt!)}</p>
        <MintQueryReply/>
      </div>
    </div>
  )
}
