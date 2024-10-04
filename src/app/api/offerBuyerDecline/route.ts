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
    const notificationId = `offBuyDecNot-${ulid()}`
    const currentDate: Date = new Date()

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const updateIsDeclined = await db
        .update(offers)
        .set({ isCountered: false, isDeclined: true })
        .where(eq(offers.id, offerId))

      await db.insert(notifications).values({
        id: notificationId,
        userId: sellerId,
        adId: adId,
        adUrl: url,
        createdAt: currentDate,
        title: `Offer Status Update: Declined`,
        description: `The buyer has declined your counter offer for listing ${adTitle}.`,
        body: `The buyer has declined your counter offer for listing ${adTitle}. No further deals can be made.`,
        isRead: false,
      })

      return new Response(JSON.stringify(updateIsDeclined), { status: 200 })
    }
  } catch (error) {
    console.error("Update declined status error:", error)
    return new Response("Could not update declined status.", {
      status: 500,
    })
  }
}
