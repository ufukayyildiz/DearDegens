import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { wishlist, wishlistItem } from "@/src/server/db/schema"
import { wishlistType } from "@/src/types/db"
import { eq } from "drizzle-orm"
import { nanoid } from "nanoid"

export async function POST(request: any) {
  try {
    const session = await getAuthSession()
    console.log("session", session?.user.id)

    if (!session) {
      return new Response("Unauthrised request, please login.", { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()
    const { listingId } = body
    console.log("listingId", listingId)

    const userWishlist: wishlistType = await db
      .select()
      .from(wishlist)
      .where(eq(wishlist.userId, userId))
    console.log("userWishlist:", userWishlist[0].id)

    // If there is no wishlist, first create one, then create the wishlist item.
    if (userWishlist.length === 0) {
      try {
        const wishlistId = nanoid()
        await db.insert(wishlist).values({
          id: wishlistId,
          userId: userId,
        })
        await db.insert(wishlistItem).values({
          id: nanoid(),
          wishlistId: wishlistId,
          adId: listingId,
        })
      } catch (error) {
        console.error(
          `Error generating new wishlist & adding listing: ${listingId}`,
          error
        )
        return new Response("Could not add listing to wishlist.", {
          status: 500,
        })
      }
    } else {
      // TO-DO: ADD THIRD STATEMENT THAT CHECKS IF THE LISTING IS ALREADY IN THE WISHLIST.
      // If there is a wishlist, get the wishlist id and create the wishlist item.
      console.log("wishlistId", userWishlist.id)
      const post = await db.insert(wishlistItem).values({
        id: nanoid(),
        wishlistId: userWishlist[0].id,
        adId: listingId,
      })
      console.log("Wishlist item:", post)
      return new Response(JSON.stringify(post), { status: 200 })
    }
  } catch (error) {
    console.error("Server error: Error adding listing to wishlist:", error)
    return new Response("Could not add listing to wishlist.", { status: 500 })
  }
}
