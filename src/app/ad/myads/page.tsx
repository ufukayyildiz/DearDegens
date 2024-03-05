import React from "react"
import MintCardComponent from "@/src/components/pageMyMint/MintCardComponent"
import { authOptions } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { listings } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

export default async function MyMints() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return console.log("Unauthorised, please login")
  }

  const adListings = await db
    .select()
    .from(listings)
    .where(eq(listings.authorId, session?.user.id))

  adListings.sort((a: any, b: any) => b.createdAt - a.createdAt)

  return (
    <div className="z-20 mx-auto w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
      <h1 className="mt-10 text-xl font-bold text-primary">My Ads</h1>
      <hr className="my-2 border border-t-muted-foreground" />
      <ul className="mb-44 mt-10 flex h-full w-full flex-col space-y-8 px-5">
        {adListings.map((listing) => {
          return <MintCardComponent key={listing.id} listing={listing} />
        })}
      </ul>
    </div>
  )
}
