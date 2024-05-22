import React from "react"
import RecentCarousel from "../components/pageHome/RecentCarousel"
import HomeCarousel from "../components/pageHome/HomeCarousel"
import VehiclesCarousel from "../components/pageHome/VehiclesCarousel"
import GamingCarousel from "../components/pageHome/GamingCarousel"
import ElectronicsCarousel from "../components/pageHome/ElectronicsCarousel"
import SportsCarousel from "../components/pageHome/SportsCarousel"
import { db } from "../server/db"
import { listings } from "../server/db/schema"
import { listingsType } from "../types/db"
import { desc } from "drizzle-orm"
import { queryLimit } from "../server/queryLimit"
import CategoryTags from "../components/pageHome/CategoryTags"

export default async function HomePage() {
  return (
    <section className="mb-52 h-auto min-h-screen items-center gap-6 pb-8 pt-6">
      <div className="z-20 mx-auto h-auto w-10/12 min-w-[280px] md:w-8/12">
        <h1 className="mt-10 text-xl font-bold text-primary">Categories</h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <CategoryTags />
        <h1 className="mt-10 text-xl font-bold text-primary">Recently Added</h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <RecentCarousel />
        <h1 className="mt-10 text-xl font-bold text-primary">Vehicles</h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <VehiclesCarousel />
        <h1 className="mt-10 text-xl font-bold text-primary">Home & Garden</h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <HomeCarousel />
        <h1 className="mt-10 text-xl font-bold text-primary">Gaming</h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <GamingCarousel />
        <h1 className="mt-10 text-xl font-bold text-primary">Electronics</h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <ElectronicsCarousel />
        <h1 className="mt-10 text-xl font-bold text-primary">
          Sports & Outdoors
        </h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <SportsCarousel />
      </div>
    </section>
  )
}
