import React from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/components-ui/Tabs"
import Mint from "@/src/components/pageMint/Mint"

export default function MintPage() {
  return (
    <div>
      <div>Create Listing</div>
      <Tabs defaultValue="none" className="flex flex-col w-11/12 md:w-8/12 mx-auto">
        <TabsList className="w-auto mx-auto">
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="property">Property</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="electronics">Electronics</TabsTrigger>
        </TabsList>
        <TabsContent value="items">
          <Mint />
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
      </Tabs>
    </div>
  )
}
