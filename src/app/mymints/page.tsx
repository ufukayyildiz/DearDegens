import React from "react"
import { db } from "@/src/db"
import MyMintsFeed from "@/src/components/pageMyMint/MyMintsFeed"
import { listingsGeneral } from "@/src/db/schema"

export default async function MyMints() {
  const listings = await db.select().from(listingsGeneral)
  console.log('Listings:', listings)

  return (
    <div className="w-full">
      <MyMintsFeed generalListing={listings} />
    </div>
  )
}
