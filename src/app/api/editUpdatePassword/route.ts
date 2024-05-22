import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import { users } from "@/src/server/db/schema"
import crypto from "crypto"
import { Resend } from "resend"
import { updatePasswordTemplate } from "@/src/components/emailTemplates/UpdatePasswordTemplate"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/src/server/upstash"
import { headers } from "next/headers"

const resend = new Resend(process.env.RESEND_API_KEY)

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

    const userName = session?.user.name || ""
    const userEmail = session?.user.email || ""
    const body = await req.json()
    const { email } = body
    console.log("email:", email)

    const resetPasswordToken = crypto.randomBytes(32).toString("base64url")
    const currentDate = new Date()
    const expiryDate = new Date(currentDate.setDate(currentDate.getDate() + 1)) // 24 Hours

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const post = await db
        .update(users)
        .set({
          resetPasswordToken: resetPasswordToken,
          resetPasswordTokenExpiry: expiryDate,
        })
        .where(eq(users.email, email))

      try {
        const { data } = await resend.emails.send({
          from: "DearDegens Support <support@deardegens.com>",
          to: `${email}`,
          subject: "DearDegens.com: Update Password",
          react: updatePasswordTemplate({
            userName: userName,
            userEmail: userEmail,
            resetPasswordToken: resetPasswordToken,
          }) as React.ReactElement,
        })
        console.log("Successfully sent update password email:", data)
      } catch (error) {
        console.error("Error sending update password email:", error)
        return new Response("Error sending update password email:", {
          status: 500,
        })
      }

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
