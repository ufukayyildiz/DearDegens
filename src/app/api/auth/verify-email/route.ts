import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import { users } from "@/src/server/db/schema"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/src/server/upstash"
import { headers } from "next/headers"
import bcrypt from "bcrypt"

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "30 s"),
  analytics: true,
})

export async function POST(req: Request) {
  try {
    const ip = headers().get("x-forwarded-for")
    const {
      remaining,
      limit,
      success: limitReached,
    } = await rateLimit.limit(ip!)
    console.log("Rate Limit Stats:", remaining, limit, limitReached)

    const body = await req.json()
    const { password, email } = body
    console.log("body:", body)

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const post = await db
        .update(users)
        .set({
          password: hashedPassword,
        })
        .where(eq(users.email, email))

      return new Response(JSON.stringify(post), { status: 200 })
    }
  } catch (error) {
    console.error("Could not change password at this time. ERROR:", error)
    return new Response(
      "Could not change password at this time. Please try again later",
      { status: 500 }
    )
  }
}
