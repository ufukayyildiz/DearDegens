import React from "react"
import { formatTimeToNow } from "@/src/lib/utils"
import { queryType } from "@/src/types/db"

import MintQueryReply from "./MintQueryReply"

interface QueryCardProps {
  query: queryType
}

export default function MintQueriesCard({ query }: QueryCardProps) {
  return (
    <div className="flex flex-col h-[250px] p-2 mb-3 border border-muted hover:border-customAccent text-primary shadow rounded-lg transition duration-500 hover:scale-[0.99]">
      <div>
        <p className="text-lg font-bold mb-2">{query.userName}</p>
      </div>
      <div>
        <hr className="flex w-full h-[2px] mx-auto mb-2 bg-muted" />
        <p className="font-semibold mb-2 italic">Question:</p>
        <p className="">{query.query}</p>
      </div>
      <div>
        <hr className="flex w-full h-[2px] mx-auto mt-5 mb-2 bg-muted" />
        <p className="font-semibold mb-2 italic">Response:</p>
        {query.reply ? <p>{query.reply}</p> : <p className="italic">pending</p>}
      <hr className="flex w-full h-[2px] mx-auto mt-5 mb-2 bg-muted" />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs italic">Sent {formatTimeToNow(query.createdAt!)}</p>
        <MintQueryReply queryId={query.id}/>
      </div>
    </div>
  )
}
