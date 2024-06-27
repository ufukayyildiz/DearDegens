import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { chatRoom, offers } from "@/src/server/db/schema"
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
    const currentDate: Date = new Date()
    const chatroomId = `chtroom-${ulid()}`
    const { offerId, adId, sellerId, userId } = body

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const updateIsConfirmed = await db
        .update(offers)
        .set({ isCountered: false, isConfirmed: true })
        .where(eq(offers.id, offerId))

      const createChatRoom = await db.insert(chatRoom).values({
        id: chatroomId,
        adId: adId,
        userId: userId,
        sellerId: sellerId,
        createdAt: currentDate,
      })

      return new Response(JSON.stringify(updateIsConfirmed), { status: 200 })
    }
  } catch (error) {
    console.error("Update confirmation status error:", error)
    return new Response("Could not update confirmation status.", {
      status: 500,
    })
  }
}
