import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { notifications, queries, listings } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { ulid } from "ulid"
import { z } from "zod"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/src/server/upstash"
import { headers } from "next/headers"

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "30 s"),
  analytics: true,
})

export async function POST(req: Request) {
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
    const userId = session?.user.id
    const userName = session.user.name

    const queryId = `que-${ulid()}`

    const notificationId = `queNot-${ulid()}`

    const currentDate: Date = new Date()
    const expirationDate: Date = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
    )
    const purgeDate: Date = new Date(
      currentDate.getTime() + 60 * 24 * 60 * 60 * 1000
    )

    const {
      sellerId,
      adId,
      adTitle,
      query,
      adBrand,
      adModel,
      adSubCategory,
      adLocation,
    } = body

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const post = await db.insert(queries).values({
        id: queryId,
        userId: userId,
        userName: userName,
        sellerId: sellerId,
        adId: adId,
        adTitle: adTitle,
        createdAt: currentDate,
        expirationDate: expirationDate,
        purgeDate: purgeDate,
        query: query,
        reply: "",
      })

      const notification = await db.insert(notifications).values({
        id: notificationId,
        userId: sellerId,
        adId: adId,
        adUrl: `/${adTitle}/${adBrand}/${adModel}/${adSubCategory}/${adLocation}/${adId}`,
        createdAt: currentDate,
        title: `Query recieved!`,
        description: `Your listing ${adTitle} has recieved a query`,
        body: `A potential buyer has sent you a query regarding your listing, head over to your listings page to send them a reply. You can also make the query public after replying to assist other users who may have the same question.`,
        isRead: false,
      })

      return new Response(JSON.stringify(post), { status: 200 })
    }
  } catch (error) {
    console.error("error:", error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response(
      "Could not send an query at this time. Please try again later",
      { status: 500 }
    )
  }
}
