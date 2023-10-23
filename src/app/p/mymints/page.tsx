import React from "react"
import { db } from "@/src/db"
import MintCardComponent from "@/src/components/pageMyMint/MintCardComponent"
import { listingsGeneral, listingsProperty } from "@/src/db/schema"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth/auth-options"
import { eq } from "drizzle-orm"


export default async function MyMints() {
  
  const session = await getServerSession(authOptions)
  const userId = JSON.stringify(session?.user.id)
  const household = await db.select().from(listingsGeneral).where(eq(listingsGeneral.authorId, userId))
  const property = await db.select().from(listingsProperty).where(eq(listingsProperty.authorId, userId))

  const listings = [...household, ...property]
  listings.sort((a:any, b: any) => b.createdAt - a.createdAt);

  

  return (
    <div className="z-20 mx-auto w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
      <h1 className="mt-10 text-primary text-xl font-bold">
        My Ads
      </h1>
      <hr className="my-2 border border-t-muted-foreground"/>
      <ul className="mb-44 mt-10 flex w-full h-full flex-col space-y-8 px-5">
        {listings.map((listing) => {
          return (
            <MintCardComponent
              key={listing.id}
              listing={listing}
            />
          )
        })}
      </ul>
    </div>
  )
}
