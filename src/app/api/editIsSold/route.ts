import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import { listings } from "@/src/server/db/schema"

export async function PATCH(req: Request) {
  try {
    const listingId = await req.json()
    console.log("listingId", listingId)

    await db
      .update(listings)
      .set({
        isSold: true,
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
