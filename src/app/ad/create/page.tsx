import React from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/components-ui/Tabs"
import CreateHousehold from "@/src/components/pageCreateMint/CreateHousehold"
import CreateSportsOutdoors from "@/src/components/pageCreateMint/CreateSportsOutdoors"
import CreateElectronics from "@/src/components/pageCreateMint/CreateElectronics"
import CreateComputers from "@/src/components/pageCreateMint/CreateComputers"
import CreateGaming from "@/src/components/pageCreateMint/CreateGaming"
import CreateVehicle from "@/src/components/pageCreateMint/CreateVehicles"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getBucket } from "@/src/server/actions"

export default async function MintCreatePage() {
  const queryClient = new QueryClient()

  // BUCKET QUERY
  await queryClient.prefetchQuery({
    queryKey: ["getBucketServer"],
    queryFn: () => getBucket,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-5 py-10">
        <Tabs
          defaultValue="none"
          className="mx-auto flex w-11/12 flex-col md:w-8/12"
        >
          <TabsList className="mx-auto flex h-auto w-auto flex-col gap-2 p-2 shadow md:flex-row">
            <TabsTrigger value="home" className="w-full">
              Home & Garden
            </TabsTrigger>
            <TabsTrigger value="sportsOutdoors" className="w-full">
              Sports & Outdoors
            </TabsTrigger>
            <TabsTrigger value="electronics" className="w-full">
              Electronics
            </TabsTrigger>
            <TabsTrigger value="computers" className="w-full">
              Computers
            </TabsTrigger>
            <TabsTrigger value="gaming" className="w-full">
              Gaming
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="w-full">
              Vehicles
            </TabsTrigger>
          </TabsList>
          <TabsContent value="home">
            <CreateHousehold />
          </TabsContent>
          <TabsContent value="sportsOutdoors">
            <CreateSportsOutdoors/>
          </TabsContent>
          <TabsContent value="electronics">
            <CreateElectronics/>
          </TabsContent>
          <TabsContent value="computers">
            <CreateComputers/>
          </TabsContent>
          <TabsContent value="gaming">
            <CreateGaming/>
          </TabsContent>
          <TabsContent value="vehicles">
            <CreateVehicle/>
          </TabsContent>
        </Tabs>
      </div>
    </HydrationBoundary>
  )
}
