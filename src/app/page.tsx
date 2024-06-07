import React from "react"
import Link from "next/link"
import RecentCarousel from "../components/pageHome/RecentCarousel"
import HomeCarousel from "../components/pageHome/HomeCarousel"
import VehiclesCarousel from "../components/pageHome/VehiclesCarousel"
import GamingCarousel from "../components/pageHome/GamingCarousel"
import ElectronicsCarousel from "../components/pageHome/ElectronicsCarousel"
import SportsCarousel from "../components/pageHome/SportsCarousel"
import CategoryTags from "../components/pageHome/CategoryTags"
import Banner from "../components/pageHome/Banner"

export default async function HomePage() {
  return (
    <section className="mb-52 h-auto min-h-screen items-center gap-6 pb-8 pt-6">
      <div className="z-20 mx-auto h-auto w-10/12 min-w-[280px] md:w-8/12">
        <CategoryTags />
        <Banner/>
        <h1 className="mt-10 text-xl font-bold text-primary">Recently Added</h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <RecentCarousel />
        <div className="mt-10 flex flex-row justify-between">
          <h1 className="text-xl font-bold text-primary">Vehicles</h1>
          <Link
            href="/find-vehicles"
            className="my-auto h-5 italic text-muted-foreground underline"
          >
            See more
          </Link>
        </div>
        <hr className="my-2 border border-t-muted-foreground" />
        <VehiclesCarousel />
        <div className="mt-10 flex flex-row justify-between">
          <h1 className="text-xl font-bold text-primary">Home & Garden</h1>
          <Link
            href="/find-home-and-garden"
            className="my-auto h-5 italic text-muted-foreground underline"
          >
            See more
          </Link>
        </div>
        <hr className="my-2 border border-t-muted-foreground" />
        <HomeCarousel />
        <div className="mt-10 flex flex-row justify-between">
          <h1 className="text-xl font-bold text-primary">Gaming</h1>
          <Link
            href="/find-gaming"
            className="my-auto h-5 italic text-muted-foreground underline"
          >
            See more
          </Link>
        </div>
        <hr className="my-2 border border-t-muted-foreground" />
        <GamingCarousel />
        <div className="mt-10 flex flex-row justify-between">
          <h1 className="text-xl font-bold text-primary">Electronics</h1>
          <Link
            href="/find-electronics"
            className="my-auto h-5 italic text-muted-foreground underline"
          >
            See more
          </Link>
        </div>
        <hr className="my-2 border border-t-muted-foreground" />
        <ElectronicsCarousel />
        <div className="mt-10 flex flex-row justify-between">
          <h1 className="text-xl font-bold text-primary">Sports & Outdoors</h1>
          <Link
            href="/find-sports-and-outdoors"
            className="my-auto h-5 italic text-muted-foreground underline"
          >
            See more
          </Link>
        </div>
        <hr className="my-2 border border-t-muted-foreground" />
        <SportsCarousel />
      </div>
    </section>
  )
}
