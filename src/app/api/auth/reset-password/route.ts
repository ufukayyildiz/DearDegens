import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import { users } from "@/src/server/db/schema"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/src/server/upstash"
import { headers } from "next/headers"
import bcrypt from "bcrypt"
import { userType } from "@/src/types/db"

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

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorised", { status: 401 })
    }

    const body = await req.json()
    const { password, previousPassword, email } = body
    console.log("body:", body)

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const user: userType = await db
        .select()
        .from(users)
        .where(eq(users.email, email))

      if (user && bcrypt.compareSync(previousPassword, user[0].password)) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const post = await db
          .update(users)
          .set({
            password: hashedPassword,
          })
          .where(eq(users.email, email))

        return new Response(JSON.stringify(post), { status: 200 })
      } else {
        throw new Error("Invalid credentials")
      }
    }
  } catch (error) {
    console.error("Could not change password at this time. ERROR:", error)
    return new Response(
      "Could not change password at this time. Please try again later",
      { status: 500 }
    )
  }
}
