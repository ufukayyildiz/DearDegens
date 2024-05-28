import React from "react"
import Image from "next/image"
import MintCardComponent from "@/src/components/componentsCards/MintCardComponent"
import { authOptions } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { listings, wishlistItem, wishlist } from "@/src/server/db/schema"
import { eq, and } from "drizzle-orm"
import { getServerSession } from "next-auth"
import CardsFeed from "@/src/components/componentsCards/CardsFeed"
import Rabbit from "@/src/assets/rabbit.svg"

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
    .where(
      and(
        eq(wishlist.userId, session?.user.id),
        eq(listings.isExpired, false),
        eq(listings.isReviewed, true)
      )
    )

  const adListings = userWishlist.map((item) => {
    return item.listings
  })

  const ads = adListings.filter((item) => {
    if (item !== null) {
      return item
    }
  })

  ads.sort((a: any, b: any) => b.createdAt - a.createdAt)

  return (
    <div className="z-20 mx-auto mb-52 min-h-screen w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
      <h1 className="mt-10 text-xl font-bold text-primary">Wishlist</h1>
      <hr className="my-2 border border-t-muted-foreground" />
      {ads.length !== 0 ? (
        <CardsFeed listings={ads} />
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-full pt-10 text-center italic">
            Your wishlist is empty.
          </div>
          <Image
            src={Rabbit}
            alt="rabbit"
            width={150}
            className="mt-10 text-primary"
          />
        </div>
      )}
    </div>
  )
}
