import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import { listings } from "@/src/server/db/schema"
import { listingItemType } from "@/src/types/db"

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const {listingId, itemId} = body

    const listing = await db.select().from(listings).where(eq(listings.id, listingId))

    const items = JSON.parse(listing[0].items!)
    
    let updatedItem: listingItemType = {
      id: "",
      name: "",
      price: 0,
      isSold: true
    }

    items.map((item: listingItemType) => {
      if (item.id === itemId) {
        updatedItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          isSold: true
        }
      }
    })

    console.log('updatedItem:', updatedItem)

    const updatedItemsList = [updatedItem]

    items.map((item: listingItemType) => {
      if (item.id !== itemId)
        updatedItemsList.push(item)
    })

    console.log('updatedItemsList', updatedItemsList)


    await db
      .update(listings)
      .set({
        items: JSON.stringify(updatedItemsList),
      })
      .where(eq(listings.id, listingId))

    return new Response("Successfully updated isSold status.", {
      status: 200,
    })
  } catch (error) {
    console.error("Failed to update isSold status:", error)
    return new Response("Failed to update isSold status.", { status: 500 })
  }
}
