import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { wishlist, wishlistItem } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"

export async function PUT(request: any) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return new Response("Unauthrised request, please login.", { status: 401 })
    }

    const body = await request.json()
    const { listingId } = body
    console.log("listingId", listingId)

    await db.delete(wishlistItem).where(eq(wishlistItem.adId, listingId))

    return new Response(`Successfully deleted ${listingId} from the wishlist`, {
      status: 200,
    })
  } catch (error) {
    console.error("Server error: Error deleteing listing to wishlist:", error)
    return new Response("Could not delete listing to wishlist.", {
      status: 500,
    })
  }
}
