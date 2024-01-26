import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { listings } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const listingId = await req.json()
    const id = JSON.stringify(listingId)
    console.log("id:", id)

    const response = await db.delete(listings).where(eq(listings.id, id))

    console.log("Successfully deleted listing:", response)
    return new Response("Successfully deleted notification.", { status: 200 })
  } catch (error) {
    console.error("Deletion listing error:", error)
    return new Response("Could not delete listing.", { status: 500 })
  }
}
