import React from "react"
import Image from "next/image"
import { authOptions } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { listings } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import CardsFeed from "@/src/components/componentsCards/CardsFeed"
import OffersManager from "@/src/components/pageMyAds/OffersManager"
import QueriesManager from "@/src/components/pageMyAds/QueriesManager"
import Fish from "@/src/assets/fish.svg"
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "@/src/components/components-ui/Tabs"

export default async function MyMints() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return console.log("Unauthorised, please login")
  }

  const adListings = await db
    .select()
    .from(listings)
    .where(eq(listings.authorId, session?.user.id))

  const ads = adListings.filter((item) => {
    if (item !== null) {
      return item
    }
  })

  ads.sort((a: any, b: any) => b.createdAt - a.createdAt)

  return (
    <div className="z-20 mx-auto mb-52 min-h-screen w-[95vw] min-w-[280px] overflow-hidden md:w-10/12">
      <Tabs defaultValue="ads" className="h-full w-full">
        <TabsList className="mt-10 w-full md:space-x-5">
          <TabsTrigger
            value="ads"
            className="w-full border-none font-bold text-primary md:text-xl"
          >
            My Ads
          </TabsTrigger>
          <TabsTrigger
            value="offers"
            className="w-full border-none font-bold text-primary md:text-xl"
          >
            Offers Manager
          </TabsTrigger>
          <TabsTrigger
            value="queries"
            className="w-full border-none font-bold text-primary md:text-xl"
          >
            Queries Manager
          </TabsTrigger>
        </TabsList>
        <hr className="mb-2 border border-t-muted-foreground" />
        <TabsContent value="ads">
          {ads.length !== 0 ? (
            <CardsFeed listings={ads} />
          ) : (
            <div className="flex w-full flex-col items-center justify-center">
              <div className="w-full pt-10 text-center italic">
                You have not yet posted an ad.
              </div>
              <Image
                src={Fish}
                alt="fish"
                width={150}
                className="mt-10 text-primary"
              />
            </div>
          )}
        </TabsContent>
        <TabsContent value="offers">
          <OffersManager />
        </TabsContent>
        <TabsContent value="queries">
          <QueriesManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
