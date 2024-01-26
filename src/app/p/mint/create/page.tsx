import React from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/components-ui/Tabs"
import MintHousehold from "@/src/components/pageCreateMint/MintHousehold"

export default function MintCreatePage() {
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
          <MintHousehold />
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
