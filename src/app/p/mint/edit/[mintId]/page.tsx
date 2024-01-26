import React from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/components-ui/Tabs"
import EditHousehold from "@/src/components/pageEditMint/EditHousehold"
import { db } from "@/src/server/db"
import { listings } from "@/src/server/db/schema"
import { listingsType } from "@/src/types/db"
import { eq } from "drizzle-orm"

interface MintPageProps {
  params: {
    mintId: string
  }
}

export default async function MintEditPage({ params }: MintPageProps) {
  const param = params
  const decodedParam = decodeURIComponent(param.mintId)

  const listing: listingsType[] = await db
    .select()
    .from(listings)
    .where(eq(listings.id, decodedParam))

  return (
    <div className="p-10">
      <Tabs
        defaultValue="none"
        className="mx-auto flex w-11/12 flex-col md:w-8/12"
      >
        <TabsList className="mx-auto flex h-auto w-auto flex-col gap-2 p-2 shadow md:flex-row">
          <TabsTrigger value="items" className="w-full">
            Home & Garden
          </TabsTrigger>
          <TabsTrigger value="property" className="w-full">
            Property
          </TabsTrigger>
          <TabsTrigger value="vehicles" className="w-full">
            Vehicles
          </TabsTrigger>
          <TabsTrigger value="electronics" className="w-full">
            Electronics
          </TabsTrigger>
          <TabsTrigger value="gaming" className="w-full">
            Gaming & Computers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="items">
          <EditHousehold listing={listing} />
        </TabsContent>
        <TabsContent value="property">
          <h1>Property</h1>
        </TabsContent>
        <TabsContent value="vehicles">
          <h1>Vehicles</h1>
        </TabsContent>
        <TabsContent value="electronics">
          <h1>Electronics</h1>
        </TabsContent>
        <TabsContent value="gaming">
          <h1>Gaming</h1>
        </TabsContent>
      </Tabs>
    </div>
  )
}
