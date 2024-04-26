import React from "react"
import MintCardComponent from "@/src/components/componentsCards/MintCardComponent"
import { authOptions } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { listings, wishlistItem, wishlist } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import CardsFeed from "@/src/components/componentsCards/CardsFeed"

export default async function MyMints() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return console.log("Unauthorised, please login")
  }

  const userWishlist = await db
    .select()
    .from(wishlist)
    .leftJoin(wishlistItem, eq(wishlist.id, wishlistItem.wishlistId))
    .leftJoin(listings, eq(wishlistItem.adId, listings.id))
    .where(eq(wishlist.userId, session?.user.id))

  const adListings = userWishlist.map((item) => {
    return item.listings
  })

  adListings.sort((a: any, b: any) => b.createdAt - a.createdAt)

  console.log('adListing:', adListings.length)

  return (
    <div className="z-20 mx-auto w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
      <h1 className="mt-10 text-xl font-bold text-primary">Wishlist</h1>
      <hr className="my-2 border border-t-muted-foreground" />
      {adListings[0] !== null && (
        <CardsFeed listings={adListings} />
      )}
    </div>
  )
}
