import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { wishlist, wishlistItem } from "@/src/server/db/schema"
import { wishlistType } from "@/src/types/db"
import { ulid } from "ulid"
import { eq } from "drizzle-orm"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/src/server/upstash"
import { headers } from "next/headers"

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "30 s"),
  analytics: true,
})

export async function POST(request: Request) {
  try {
    const session = await getAuthSession()
    const ip = headers().get("x-forwarded-for")
    const {
      remaining,
      limit,
      success: limitReached,
    } = await rateLimit.limit(ip!)
    console.log("Rate Limit Stats:", remaining, limit, limitReached)

    if (!session) {
      return new Response("Unauthrised request, please login.", { status: 401 })
    }

    const userId = session.user.id
    const listingId = await request.json()

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const userWishlist: wishlistType = await db
        .select()
        .from(wishlist)
        .where(eq(wishlist.userId, userId))

      // If there is no wishlist, first create one, then create the wishlist item.
      if (userWishlist.length === 0) {
        try {
          const wishlistId = `wshlist-${ulid()}`
          await db.insert(wishlist).values({
            id: wishlistId,
            userId: userId,
          })
          await db.insert(wishlistItem).values({
            id: `wshlistItm-${ulid()}`,
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
        const post = await db.insert(wishlistItem).values({
          id: `wshlistItm-${ulid()}`,
          wishlistId: userWishlist[0].id,
          adId: listingId,
        })
        return new Response(JSON.stringify(post), { status: 200 })
      }
    }
  } catch (error) {
    console.error("Server error: Error adding listing to wishlist:", error)
    return new Response("Could not add listing to wishlist.", { status: 500 })
  }
}
