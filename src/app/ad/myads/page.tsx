import React from "react"
import Image from "next/image"
import MintCardComponent from "@/src/components/componentsCards/MintCardComponent"
import { authOptions } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { listings } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import CardsFeed from "@/src/components/componentsCards/CardsFeed"
import Fish from "@/src/assets/fish.svg"

export default async function MyMints() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return console.log("Unauthorised, please login")
  }

  const adListings = await db
    .select()
    .from(listings)
    .where(eq(listings.authorId, session?.user.id))

  const ads = adListings.filter((item) => {
    if (item !== null) {
      return item
    }
  })

  ads.sort((a: any, b: any) => b.createdAt - a.createdAt)

  return (
    <div className="z-20 mx-auto mb-44 min-h-screen w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
      <h1 className="mt-10 text-xl font-bold text-primary">My Ads</h1>
      <hr className="my-2 border border-t-muted-foreground" />
      {ads.length !== 0 ? (
        <CardsFeed listings={ads} />
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-full pt-10 text-center italic">
            You have not yet posted an ad.
          </div>
          <Image
            src={Fish}
            alt="fish"
            width={150}
            className="mt-10 text-primary"
          />
        </div>
      )}
    </div>
  )
}
