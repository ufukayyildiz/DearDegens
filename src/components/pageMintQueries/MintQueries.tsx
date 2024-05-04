"use client"
import React from "react"
import { useGetQueries, useGetUserQueries } from "@/src/server/services"
import { listingsType, queryType } from "@/src/types/db"
import { useSession } from "next-auth/react"

import { ScrollArea } from "../components-ui/ScrollArea"
import MintQueriesCard from "./MintQueriesCard"

interface MintQueriesProps {
  listing: listingsType
}

export default function MintQueries({ listing }: MintQueriesProps) {
  const { data: session } = useSession()
  const userId = session?.user.id

  let queries: queryType[] = []

  if (listing.authorId === userId) {
    const adQueries = useGetQueries(listing.id).data
    adQueries?.map((item) => queries.push(item))
  } else {
    const userQueries = useGetUserQueries(listing.id, userId).data
    userQueries?.map((item) => queries.push(item))
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
