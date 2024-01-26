import React from "react"
import { useParams } from "next/navigation"
import { useGetQueries } from "@/src/components/services"
import { queryType } from "@/src/types/db"
import { useSession } from "next-auth/react"

import { ScrollArea } from "../components-ui/ScrollArea"
import MintQueriesCard from "./MintQueriesCard"

export default function MintQueries() {
  const { data: session } = useSession()
  const userId = session?.user.id

  const { mintId }: any = useParams()

  const adQueries = useGetQueries(mintId).data
  adQueries?.sort((a: any, b: any) => b.createdAt - a.createdAt)

  let queries: queryType[] = []

  if (adQueries) {
    for (let i = 0; i < adQueries.length; i++) {
      if (adQueries[i].userId === userId || adQueries[i].sellerId === userId) {
        queries.push(adQueries[i])
      }
    }
  }

  return (
    <ScrollArea className="mt-5 flex h-full flex-col pb-16 pr-5">
      {queries &&
        userId &&
        queries.map((item: any, index) => {
          return <MintQueriesCard key={index} query={item} userId={userId} />
        })}
    </ScrollArea>
  )
}
