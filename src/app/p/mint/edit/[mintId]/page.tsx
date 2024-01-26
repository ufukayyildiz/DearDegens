import React from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/components-ui/Tabs"
import EditHousehold from "@/src/components/pageEditMint/EditHousehold"
import { authOptions } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { listings } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { listingsType } from "@/src/types/db"

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
        className="flex flex-col w-11/12 md:w-8/12 mx-auto"
      >
        <TabsList className="w-auto h-auto mx-auto flex flex-col md:flex-row gap-2 p-2 shadow">
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
