import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import {
  notifications,
  listings,
  queries,
} from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/src/server/upstash"
import { headers } from "next/headers"
import { listingsType } from "@/src/types/db"
import { ulid } from "ulid"

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

    const body = await req.json()
    const { queryId, queryAdId, querySellerId, queryUserId } = body
    const currentDate: Date = new Date()

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      await db.delete(queries).where(eq(queries.id, queryId))

      const listing: listingsType[] = await db
        .select()
        .from(listings)
        .where(eq(listings.id, queryAdId))

      if (session.user.id === querySellerId)
        await db.insert(notifications).values({
          id: `sellQryDel-${ulid()}`,
          userId: queryUserId,
          adId: queryAdId,
          adUrl: listing[0].url,
          createdAt: currentDate,
          title: `Query deleted.`,
          description: "The owner of a listing has deleted your query.",
          body: `The owner of listing "${listing[0].title}" has chosen to delete your query for their ad.`,
          isRead: false,
        })

      return new Response(`Successfully deleted offer of ID: ${queryId}`, {
        status: 200,
      })
    }
  } catch (error) {
    console.error("Server error: Error deleteing listing to wishlist:", error)
    return new Response("Could not delete listing to wishlist.", {
      status: 500,
    })
  }
}
