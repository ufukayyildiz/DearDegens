import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { notifications, offers, listings } from "@/src/server/db/schema"
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

    const offerId = `offList-${ulid()}`

    const notificationId = `offListNot-${ulid()}`

    const currentDate: Date = new Date()
    const expirationDate: Date = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
    )
    const purgeDate: Date = new Date(
      currentDate.getTime() + 60 * 24 * 60 * 60 * 1000
    )

    const { sellerId, adId, adTitle, itemId, offerPrice, askPrice, itemName } =
      body

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const post = await db.insert(offers).values({
        id: offerId,
        userId: userId,
        userName: userName,
        sellerId: sellerId,
        adId: adId,
        adTitle: adTitle,
        itemId: itemId,
        itemName: itemName,
        createdAt: currentDate,
        expirationDate: expirationDate,
        purgeDate: purgeDate,
        offerPrice: offerPrice,
        askPrice: askPrice,
      })

      /* @ts-ignore */
      const listing: listingsType = await db
        .select({
          id: listings.id,
          title: listings.title,
          brand: listings.brand,
          model: listings.model,
          subCategory: listings.subCategory,
          location: listings.location,
        })
        .from(listings)
        .where(eq(listings.id, adId))

      const title = listing.title?.replace(/ /g, "-")
      const brand = listing.brand?.replace(/ /g, "-")
      const model = listing.model?.replace(/ /g, "-")
      const subCategory = listing.subCategory?.replace(/ /g, "-")
      const location = listing.location?.replace(/ /g, "-")

      await db.insert(notifications).values({
        id: notificationId,
        userId: sellerId,
        adId: adId,
        adUrl: `/${title}/${brand}/${model}/${subCategory}/${location}/${listing.id}`,
        createdAt: currentDate,
        title: `Offer recieved!`,
        description: `Your item ${itemName} has recieved an offer!`,
        body: `An offer of R ${offerPrice} has been placed on your listing. Head over to your listings page to either accept or make a counter offer.`,
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
      "Could not send an offer at this time. Please try again later",
      { status: 500 }
    )
  }
}
