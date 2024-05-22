import React from "react"
import HomeCarousel from "../components/pageHome/HomeCarousel"
import { db } from "../server/db"
import { listings } from "../server/db/schema"
import { listingsType } from "../types/db"
import { desc } from "drizzle-orm"
import { queryLimit } from "../server/queryLimit"
import CategoryTags from "../components/pageHome/CategoryTags"

export default async function HomePage() {
  const initListings = (await db
    .select()
    .from(listings)
    .orderBy(desc(listings.createdAt))
    .limit(queryLimit)) as listingsType[]

  return (
    <section className="min-h-screen items-center gap-6 pb-8 pt-6">
      <div className="z-20 mx-auto h-auto w-10/12 min-w-[280px] md:w-8/12">
        <h1 className="mt-10 text-xl font-bold text-primary">Categories</h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <CategoryTags />
        <h1 className="mt-10 text-xl font-bold text-primary">Recently Added</h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <HomeCarousel initListing={initListings} />
      </div>
    </section>
  )
}
