import React from "react"
import { useParams } from "next/navigation"
import { getAdQueries } from "@/src/server/actions"
import { queryType } from "@/src/types/db"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

export default function MintQueries() {
  const { data: session } = useSession()
  const userId = session?.user.id

  const { mintId }: any = useParams()

  const { data, error, isLoading } = useQuery<queryType[]>({
    queryKey: ["adQueries"],
    queryFn: () => mintId && getAdQueries(mintId),
  })

  const adQueries = data
  adQueries?.sort((a: any, b: any) => b.createdAt - a.createdAt)

  let offers: queryType[] = []

  if (adQueries) {
    for (let i = 0; i < adQueries.length; i++) {
      if (adQueries[i].userId === userId || adQueries[i].sellerId === userId) {
        offers.push(adQueries[i])
      }
    }
  }
  return <div>MintQueries</div>
}
