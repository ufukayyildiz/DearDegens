import React from "react"
import { db } from "@/src/server/db"
import { listings } from "@/src/server/db/schema"

import SwipperComponent from "../components/pageHome/HomeCarousel"

export default async function IndexPage() {
  const adListings = await db.select().from(listings)

  adListings.sort((a: any, b: any) => b.createdAt - a.createdAt)

  // const listingProperty = [...property]
  // listingProperty.sort((a: any, b: any) => b.createdAt - a.createdAt)

  return (
    <section className=" items-center gap-6 pb-8 pt-6">
      <div className="z-20 mx-auto w-10/12 h-auto min-w-[280px] md:w-8/12">
        <h1 className="mt-10 text-primary text-xl font-bold">
          Home & Garden Ads
        </h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <SwipperComponent listings={adListings} />
      </div>
      <div className="z-20 mx-auto w-10/12 h-auto min-w-[280px] md:w-8/12">
        <h1 className="mt-10 text-primary text-xl font-bold">Property Ads</h1>
        <hr className="my-2 border border-t-muted-foreground" />
        {/* <SwipperComponent listings={listingProperty}/> */}
      </div>
    </section>
  )
}
