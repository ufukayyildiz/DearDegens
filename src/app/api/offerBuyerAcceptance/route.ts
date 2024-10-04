import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { offers, notifications } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { ulid } from "ulid"
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

    const body = await req.json()
    const { offerId, adId, sellerId, userId, adTitle, url } = body
    const notificationId = `offBuyAccNot-${ulid()}`
    const currentDate: Date = new Date()

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const updateIsAccepted = await db
        .update(offers)
        .set({ isCountered: false, isAccepted: true })
        .where(eq(offers.id, offerId))

      await db.insert(notifications).values({
        id: notificationId,
        userId: sellerId,
        adId: adId,
        adUrl: url,
        createdAt: currentDate,
        title: `Offer Status: Accepted`,
        description: `A buyer has accepted your counter offer for listing ${adTitle}.`,
        body: `A buyer has accepted your counter offer for listing ${adTitle}. Awaiting their final confirmation to seal the deal.`,
        isRead: false,
      })

      return new Response(JSON.stringify(updateIsAccepted), { status: 200 })
    }
  } catch (error) {
    console.error("Update acceptance status error:", error)
    return new Response("Could not update acceptance status.", {
      status: 500,
    })
  }
}
