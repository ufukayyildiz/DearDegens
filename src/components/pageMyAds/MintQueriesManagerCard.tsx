import React from "react"
import { formatTimeToNow } from "@/src/lib/utils"
import { queryType } from "@/src/types/db"

import MintQueryReply from "../pageMintQueries/MintQueryReply"

interface QueryManagerCardProps {
  query: queryType
  userId: string
}

export default function MintQueriesManagerCard({
  query,
  userId,
}: QueryManagerCardProps) {
  console.log("query", query)
  return (
    <div className="relative z-40 mx-auto mb-3 flex h-auto min-h-[100px] w-11/12 max-w-[500px] flex-col overflow-hidden rounded-lg border border-muted p-2 text-left text-primary shadow-lg transition duration-75 hover:scale-[0.99] hover:border-customAccent sm:text-sm">
      <div className="mb-3 flex items-center space-x-2 text-xs font-bold italic text-customAccent">
        {/* <p>Listing Title:</p> */}
        <p>{query.adTitle}</p>
      </div>
      <div className="md:ml-5">
        <p className="mb-5 rounded-lg bg-muted p-2 italic">
          &quot;{query.query}&quot;
        </p>
      </div>
      <div className="mb-10 ml-5 md:ml-8">
        {query.reply ? (
          <span>{query.reply}</span>
        ) : (
          <span className="italic text-rose-500">Response pending.</span>
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
