import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { notifications, queries } from "@/src/server/db/schema"
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

    const queryId = nanoid()

    const notificationId = nanoid()

    const currentDate: Date = new Date()
    const expirationDate: Date = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
    )
    const purgeDate: Date = new Date(
      currentDate.getTime() + 60 * 24 * 60 * 60 * 1000
    )

    const { sellerId, adId, adTitle, query } = body

    console.log("body:", body)

    const post = await db.insert(queries).values({
      id: queryId,
      userId: userId,
      userName: userName,
      sellerId: sellerId,
      adId: adId,
      adTitle: adTitle,
      createdAt: currentDate,
      expirationDate: expirationDate,
      purgeDate: purgeDate,
      query: query,
      reply: "",
    })

    const notification = await db.insert(notifications).values({
      id: notificationId,
      userId: sellerId,
      adId: adId,
      createdAt: currentDate,
      title: `Query recieved!`,
      description: `Your listing ${adTitle} has recieved a query`,
      body: `A potential buyer has sent you a query regarding your listing, head over to your listings page to send them a reply. You can also make the query public after replying to assist other users who may have the same question.`,
      isRead: false,
    })

    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    console.error("error:", error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response(
      "Could not send an query at this time. Please try again later",
      { status: 500 }
    )
  }
}
