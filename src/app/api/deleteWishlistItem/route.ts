import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { wishlist, wishlistItem } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/src/server/upstash"
import { headers } from "next/headers"

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "30 s"),
  analytics: true,
})

export async function PUT(req: Request) {
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

    const listingId = await req.json()

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      await db.delete(wishlistItem).where(eq(wishlistItem.adId, listingId))

      return new Response(
        `Successfully deleted ${listingId} from the wishlist`,
        {
          status: 200,
        }
      )
    }
  } catch (error) {
    console.error("Server error: Error deleteing listing to wishlist:", error)
    return new Response("Could not delete listing to wishlist.", {
      status: 500,
    })
  }
}
