import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { offers, notifications, listings } from "@/src/server/db/schema"
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
    const { offerId, offerAdId, offerSellerId, offerUserId } = body
    console.log("body:", body)
    const currentDate: Date = new Date()

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      await db.delete(offers).where(eq(offers.id, offerId))

      const listing: listingsType[] = await db
        .select()
        .from(listings)
        .where(eq(listings.id, offerAdId))

      if (session.user.id === offerUserId)
        await db.insert(notifications).values({
          id: `buyOffDel-${ulid()}`,
          userId: offerSellerId,
          adId: offerAdId,
          adUrl: `/${listing[0].title}/${listing[0].brand}/${listing[0].model}/${listing[0].subCategory}/${listing[0].location}/${listing[0].id}`,
          createdAt: currentDate,
          title: `Offer withdrawn.`,
          description: "A user has withdrawn their offer.",
          body: `A user has chosen to withdraw their offer for listing "${listing[0].title}". Both users and sellers are able to delete offers after a period of 15 days from creation date.`,
          isRead: false,
        })

      if (session.user.id === offerSellerId)
        await db.insert(notifications).values({
          id: `sellOffDel-${ulid()}`,
          userId: offerUserId,
          adId: offerAdId,
          adUrl: `/${listing[0].title}/${listing[0].brand}/${listing[0].model}/${listing[0].subCategory}/${listing[0].location}/${listing[0].id}`,
          createdAt: currentDate,
          title: `Offer deleted.`,
          description: "The owner of a listing has deleted your offer.",
          body: `The owner of listing "${listing[0].title}" has chosen to delete your offer for their ad. Both users and sellers are able to delete offers after a period of 15 days from creation date.`,
          isRead: false,
        })

      return new Response(`Successfully deleted offer of ID: ${offerId}`, {
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
