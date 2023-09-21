import React from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/components-ui/Tabs"
import MintItems from "@/src/components/pageMint/MintItems"
import MintGaming from "@/src/components/pageMint/MintGaming"
import MintElectronics from "@/src/components/pageMint/MintElectronics"

export default function MintPage() {
  return (
    <div className="p-10">
      <Tabs defaultValue="none" className="flex flex-col w-11/12 md:w-8/12 mx-auto">
        <TabsList className="w-auto h-auto mx-auto flex flex-col md:flex-row gap-2 p-2 shadow">
          <TabsTrigger value="items" className="w-full">Home & Garden</TabsTrigger>
          <TabsTrigger value="property" className="w-full">Property</TabsTrigger>
          <TabsTrigger value="vehicles" className="w-full">Vehicles</TabsTrigger>
          <TabsTrigger value="electronics" className="w-full">Electronics</TabsTrigger>
          <TabsTrigger value="gaming" className="w-full">Gaming & Computers</TabsTrigger>
        </TabsList>
        <TabsContent value="items">
          <MintItems />
        </TabsContent>
        <TabsContent value="property">
          <h1>Property</h1>
        </TabsContent>
        <TabsContent value="vehicles">
          <h1>Vehicles</h1>
        </TabsContent>
        <TabsContent value="electronics">
         <MintElectronics/>
        </TabsContent>
        <TabsContent value="gaming">
          <MintGaming/>
        </TabsContent>
      </Tabs>
    </div>
  )
}
