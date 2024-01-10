import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { offers, notifications } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { nanoid } from "nanoid"

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const notificationId = nanoid()
    const currentDate: Date = new Date()

    const body = await req.json()
    const { offerId,
      counterPrice,
      userId,
      sellerId,
      adId,
      adTitle, } = body

    console.log("body:", body)

    const counterOffer = await db
      .update(offers)
      .set({ isCountered: true, isDeclined: false, counterPrice: counterPrice })
      .where(eq(offers.id, offerId))

      const notification = await db.insert(notifications).values({
        id: notificationId,
        userId: userId,
        adId: adId,
        createdAt: currentDate,
        title: `Counter offer recieved!`,
        description: `Counter offer for listing ${adTitle} recieved!`,
        body: `A counter offer of R ${counterPrice} has been sent for listing ${adTitle}. Head over to the listing page to either accept or decline the offer.`,
        isRead: false,
      })

    return new Response(JSON.stringify(counterOffer), { status: 200 })
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
