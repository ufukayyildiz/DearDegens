import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import { listings } from "@/src/server/db/schema"

export async function PATCH(req: Request) {
  try {
    const listingId = await req.json()
    console.log("listingId", listingId)

    const currentDate: Date = new Date()
    const expirationDate: Date = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
    )
    const purgeDate: Date = new Date(
      currentDate.getTime() + 60 * 24 * 60 * 60 * 1000
    )

    await db
      .update(listings)
      .set({
        isExpired: false,
        expirationDate: expirationDate,
        purgeDate: purgeDate,
      })
      .where(eq(listings.id, listingId))

    return new Response("Successfully updated isExpired status.", {
      status: 200,
    })
  } catch (error) {
    console.error("Failed to update isExpired status:", error)
    return new Response("Failed to update isExpired status.", { status: 500 })
  }
}
