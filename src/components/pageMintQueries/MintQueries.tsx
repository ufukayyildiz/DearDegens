"use client"
import React from "react"
import { useGetQueries } from "@/src/server/services"
import { listingsType, queryType } from "@/src/types/db"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { ScrollArea } from "../components-ui/ScrollArea"
import MintQueriesCard from "./MintQueriesCard"


export default function MintQueries() {
  const { data: session } = useSession()
  const userId = session?.user.id
  const params = useParams()
  const {listingId}: any = params
  const id = listingId.toString()
  
  const adQueries = useGetQueries(id).data

  let queries: queryType[] = []

  if (adQueries) {
    for (let i = 0; i < adQueries.length; i++) {
      if (adQueries[i].userId === userId || adQueries[i].sellerId === userId) {
        queries.push(adQueries[i])
      }
    }
  }

  console.log("adQueries:", adQueries)

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
