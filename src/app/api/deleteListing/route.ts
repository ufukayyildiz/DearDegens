import { db } from "@/src/server/db"
import { listingsGeneral, listingsProperty } from "@/src/server/db/schema"
import { getAuthSession } from "@/src/lib/auth/auth-options"
import { eq } from "drizzle-orm"

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const listingId = await req.json()
    const id = JSON.stringify(listingId)
    console.log('id:', id)

    const responseGeneral = await db.delete(listingsGeneral).where(eq(listingsGeneral.id, id))
    const responseProperty = await db.delete(listingsProperty).where(eq(listingsProperty.id, id))

    console.log('Successfully deleted listing:', responseGeneral, responseProperty)
    return new Response("Successfully deleted notification.", { status: 200 })
  } catch (error) {
    console.error("Deletion listing error:", error)
    return new Response("Could not delete listing.", { status: 500 })
  }
}
