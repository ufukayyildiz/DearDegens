import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { chatRoom, offers, notifications } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { ulid } from "ulid"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/src/server/upstash"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

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
    const currentDate: Date = new Date()
    const notificationId = `offBuyConNot-${ulid()}`
    const chatroomId = `chtroom-${ulid()}`

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const updateIsConfirmed = await db
        .update(offers)
        .set({ isCountered: false, isConfirmed: true })
        .where(eq(offers.id, offerId))

      await db.insert(chatRoom).values({
        id: chatroomId,
        adId: adId,
        userId: userId,
        sellerId: sellerId,
        createdAt: currentDate,
      })

      await db.insert(notifications).values({
        id: notificationId,
        userId: sellerId,
        adId: adId,
        adUrl: url,
        createdAt: currentDate,
        title: `Offer Status: Final Confirmation`,
        description: `The buyer for ${adTitle} has made final confirmation.`,
        body: `The buyer for ${adTitle} has made final confirmation. You are now free to communicate with them in the chat section.`,
        isRead: false,
      })

      revalidatePath(
        "/(listing)/[title]/[brand]/[model]/[subcategory]/[location]/[listingId]"
      )

      return new Response(JSON.stringify(updateIsConfirmed), { status: 200 })
    }
  } catch (error) {
    console.error("Update confirmation status error:", error)
    return new Response("Could not update confirmation status.", {
      status: 500,
    })
  }
}
