import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import { users } from "@/src/server/db/schema"
import crypto from "crypto"
import { forgotPasswordTemplate } from "@/src/components/emailTemplates/ForgotPasswordTemplate"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/src/server/upstash"
import { headers } from "next/headers"
import { render } from "@react-email/components"
import { Nodemail } from "@/src/server/mail/mail"

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
        const template = await render(
          forgotPasswordTemplate({
            userEmail: email,
            resetPasswordToken: resetPasswordToken,
          }) as React.ReactElement
        )

        await Nodemail({
          recipient: email,
          sender: process.env.MAIL_USER!,
          subject: `DearDegens.com: Forgot Password.`,
          template: template,
        })
        console.log(`Successfully sent forgot password email - ${email}`)
      } catch (error) {
        console.error(`Failed to send forgot password email - ${email}`)
        return new Response(`Failed to send forgot password email - ${email}`, {
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
