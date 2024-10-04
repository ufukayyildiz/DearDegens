import * as React from "react"
import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { userReports } from "@/src/server/db/schema"
import { ulid } from "ulid"
import { z } from "zod"
import { userReportTemplate } from "@/src/components/emailTemplates/userReportTemplate"
import { Resend } from "resend"
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
    const sessionUserId = session?.user.id
    const userName = session.user.name || ""
    const userEmail = session.user.email || ""
    const reportId = `repUser-${ulid()}`
    const currentDate: Date = new Date()

    const { authorId, adId, userId, description, infraction } = body

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const post = await db.insert(userReports).values({
        id: reportId,
        userId: userId,
        authorId: authorId,
        adId: adId,
        createdAt: currentDate,
        description: description,
        infraction: infraction,
      })

      try {
        const { data } = await resend.emails.send({
          from: "DearDegens Reports <support@deardegens.com>",
          to: "support@deardegens.com",
          subject: "User Report",
          react: userReportTemplate({
            userName: userName,
            userEmail: userEmail,
            reportId: reportId,
            adId: adId,
            userId: userId,
            description: description,
            infraction: infraction,
          }) as React.ReactElement,
        })
        console.log("Successfully sent report email:", data)
      } catch (error) {
        console.error("Error sending report email:", error)
        return new Response("Error sending report email:", { status: 500 })
      }

      return new Response(JSON.stringify(post), { status: 200 })
    }
  } catch (error) {
    console.error("error:", error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response(
      "Could not send report at this time. Please try again later",
      { status: 500 }
    )
  }
}
