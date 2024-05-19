import React from "react"
import { db } from "@/src/server/db"
import { listings, users } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import CardsFeed from "@/src/components/componentsCards/CardsFeed"

interface SellerPageProps {
  params: {
    userName: string
    userId: string
  }
}

export default async function SellerPage({ params }: SellerPageProps) {
  const param = params
  const userName = decodeURIComponent(param.userName).replace("-", " ")
  const userId = decodeURIComponent(param.userId)

  const adListings = await db
    .select()
    .from(listings)
    .where(eq(listings.authorId, userId))

  adListings.sort((a: any, b: any) => b.createdAt - a.createdAt)

  return (
    <div className="z-20 mx-auto mb-52 min-h-screen w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
      <h1 className="mt-10 text-xl font-bold text-primary">
        Ads listed by:
        <span className="pl-2 font-bold text-customAccent">{`${userName}`}</span>
      </h1>
      <hr className="my-2 border border-t-muted-foreground" />
      <CardsFeed listings={adListings} />
    </div>
  )
}
