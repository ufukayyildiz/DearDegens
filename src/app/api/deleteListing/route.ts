import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { listings, offers, queries } from "@/src/server/db/schema"
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

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const listingId = await req.json()

      await db.delete(offers).where(eq(offers.adId, listingId))
      await db.delete(queries).where(eq(queries.adId, listingId))
      await db.delete(listings).where(eq(listings.id, listingId))

      console.log("Successfully deleted listing:")
      return new Response("Successfully deleted notification.", { status: 200 })
    }
  } catch (error) {
    console.error("Deletion listing error:", error)
    return new Response("Could not delete listing.", { status: 500 })
  }
}
