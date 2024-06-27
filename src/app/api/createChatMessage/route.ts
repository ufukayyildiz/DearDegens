import { NextApiResponse } from "next"
import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { messages } from "@/src/server/db/schema"
import { z } from "zod"
import { Ratelimit } from "@upstash/ratelimit" 
import { redis } from "@/src/server/upstash"
import { headers } from "next/headers"
import { ulid } from 'ulid'

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "30 s"),
  analytics: true,
})

export async function POST(req: Request, res: NextApiResponse) {
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
      const body = await req.json()
      const { message, roomId, userId, userName } = body

      const messageId = `msg-${ulid()}`
      const currentDate: Date = new Date()

      const post = await db.insert(messages).values({
        id: messageId,
        roomId: roomId,
        userId: userId,
        userName: userName,
        message: message,
        createdAt: currentDate,
      })

      return new Response(JSON.stringify(post), { status: 200 })
    }
  } catch (error) {
    console.error("error:", error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response(
      "Could not send message at this time. Please try again later",
      { status: 500 }
    )
  }
}
