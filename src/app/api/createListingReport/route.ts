import * as React from "react"
import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { listingReports } from "@/src/server/db/schema"
import { ulid } from "ulid"
import { z } from "zod"
import { listingReportTemplate } from "@/src/components/emailTemplates/listingReportTemplate"
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
    const userName = session.user.name || ""
    const userEmail = session.user.email || ""
    const reportId = `rep-${ulid()}`
    const currentDate: Date = new Date()

    const { sellerId, adId, description, infraction } = body

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const post = await db.insert(listingReports).values({
        id: reportId,
        userId: userId,
        sellerId: sellerId,
        adId: adId,
        createdAt: currentDate,
        description: description,
        infraction: infraction,
      })

      try {
        const template = await render(
          listingReportTemplate({
            userName: userName,
            userEmail: userEmail,
            reportId: reportId,
            adId: adId,
            description: description,
            infraction: infraction,
          }) as React.ReactElement
        )

        await Nodemail({
          recipient: process.env.MAIL_USER!,
          sender: process.env.MAIL_USER!,
          subject: `Listing Report`,
          template: template,
        })
        console.log(
          `Successfully sent user report email to admin, report ID - ${reportId}`
        )
      } catch (error) {
        console.error(
          `Failed to send user report email to admin, report ID - ${reportId}`
        )
        return new Response(
          `Failed to send user report email to admin, report ID - ${reportId}`,
          { status: 500 }
        )
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
