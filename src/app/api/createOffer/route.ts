import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { notifications, offers } from "@/src/server/db/schema"
import { nanoid } from "nanoid"
import { z } from "zod"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const userId = session?.user.id
    const userName = session.user.name

    const offerId = nanoid()

    const notificationId = nanoid()

    const currentDate: Date = new Date()
    const expirationDate: Date = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
    )
    const purgeDate: Date = new Date(
      currentDate.getTime() + 60 * 24 * 60 * 60 * 1000
    )

    const { sellerId, adId, offerPrice, askPrice, title } = body

    console.log("body:", body)

    const post = await db.insert(offers).values({
      id: offerId,
      userId: userId,
      userName: userName,
      sellerId: sellerId,
      adId: adId,
      adTitle: title,
      createdAt: currentDate,
      expirationDate: expirationDate,
      purgeDate: purgeDate,
      offerPrice: offerPrice,
      askPrice: askPrice,
    })

    const notification = await db.insert(notifications).values({
      id: notificationId,
      userId: sellerId,
      adId: adId,
      createdAt: currentDate,
      title: `Offer recieved!`,
      description: `Your listing ${title} has recieved an offer!`,
      body: `An offer of R ${offerPrice} has been placed on your listing. Head over to your listings page to either accept or make a counter offer.`,
      isRead: false,
    })

    return new Response(JSON.stringify(post), { status: 200 })
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
