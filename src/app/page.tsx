
import React from "react"
import HomeCarousel from "../components/pageHome/HomeCarousel"

export default async function HomePage() {
  return (
    <section className="min-h-screen items-center gap-6 pb-8 pt-6">
      <div className="z-20 mx-auto h-auto w-10/12 min-w-[280px] md:w-8/12">
        <h1 className="mt-10 text-xl font-bold text-primary">Recently Added</h1>
        <hr className="my-2 border border-t-muted-foreground" />

        {/* @ts-expect-error Server Component  */}
        <HomeCarousel />
      </div>
    </section>
  )
}
