import React from "react"
import { db } from "@/src/server/db"
import { listings } from "@/src/server/db/schema"
import { Ads } from "../components/components-global/Ads"
import { eq } from "drizzle-orm"
import { categoryHousehold } from "@/src/lib/categories/Household"

import HomeCarousel from "../components/pageHome/HomeCarousel"

export default async function HomePage() {

  const adListings = await db.select().from(listings)

  return (
    <section className=" items-center gap-6 pb-8 pt-6">
      <div className="z-20 mx-auto h-auto w-10/12 min-w-[280px] md:w-8/12">
        <h1 className="mt-10 text-xl font-bold text-primary">
          Home & Garden Ads
        </h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <HomeCarousel listings={adListings} />
      </div>
      {/* <Ads/> */}
    </section>
  )
}
