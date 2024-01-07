import React from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/components-ui/Tabs"
import MintHousehold from "@/src/components/pageCreateMint/MintHousehold"
import MintProperty from "@/src/components/pageCreateMint/MintProperty"

export default function MintCreatePage() {
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
          <MintHousehold />
        </TabsContent>
        <TabsContent value="property">
          <MintProperty />
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
