import React from "react"
import { formatTimeToNow } from "@/src/lib/utils"
import { queryType } from "@/src/types/db"
import MintQueryDelete from "./MintQueryDelete"
import MintQueryReply from "./MintQueryReply"
import UserReport from "../userReport/UserReport"

interface QueryCardProps {
  query: queryType
  userId: string
}

export default function MintQueriesCard({ query, userId }: QueryCardProps) {
  return (
    <div className="relative z-40 mx-auto mb-3 flex h-auto min-h-[100px] w-11/12 max-w-[500px] flex-col overflow-hidden rounded-lg border border-muted bg-background p-2 text-left text-primary shadow-lg transition duration-75 hover:scale-[0.99] sm:text-sm">
      {/* <div className="mb-3 flex items-center space-x-2">
        <p className="font-semibold italic text-secondary">Name:</p>
        <p>{query.userName}</p>
      </div> */}
      <div>
        <p className="mb-2 rounded-lg bg-muted p-2 italic">
          &quot;{query.query}&quot;
        </p>
      </div>
      <div className="mb-10">
        {query.reply ? (
          <span>{query.reply}</span>
        ) : (
          <span className="italic text-rose-500">Response pending.</span>
        )}
      </div>
      <div className="absolute bottom-2 w-full pr-5">
        <div className="flex h-8 w-full items-center">
          <p className="w-32 text-xs italic text-muted-foreground">
            Sent {formatTimeToNow(query.createdAt!)}
          </p>
          {query.sellerId === userId && (
            <div className="flex w-full flex-row items-center justify-end space-x-3">
              <UserReport
                id={query.id}
                adId={query.adId}
                authorId={query.sellerId}
                userId={query.userId}
              />
              <MintQueryDelete query={query} />
              <MintQueryReply queryId={query.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
