import React from "react"
import Link from "next/link"
import MyMintsComponent from "@/src/components/pageMyMint/MyMintsComponent"
import { db } from "@/src/db"
import { listingsGeneral, listingsProperty } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { Button } from "../components/components-ui/Button"
import { authOptions } from "../lib/auth/auth-options"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)
  console.log("Session:", session)

  const userId = JSON.stringify(session?.user.id)
  const household = await db
    .select()
    .from(listingsGeneral)
    .where(eq(listingsGeneral.authorId, userId))
  const property = await db
    .select()
    .from(listingsProperty)
    .where(eq(listingsProperty.authorId, userId))

  const listings = [...household, ...property]
  listings.sort((a: any, b: any) => b.createdAt - a.createdAt)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="z-20 mx-auto w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
        <h1 className="mt-10 text-primary text-xl font-bold">Home</h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <ul className="mb-44 mt-10 flex w-full h-full flex-col space-y-8 px-5">
          {listings.map((listing) => {
            return <MyMintsComponent key={listing.id} listing={listing} />
          })}
        </ul>
      </div>
    </section>
  )
}
