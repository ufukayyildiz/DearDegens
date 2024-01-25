import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { notifications, queries } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { nanoid } from "nanoid"
import { z } from "zod"

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    console.log("body:", body)

    const currentDate: Date = new Date()
    const { id, reply, isPublic } = body

    const post = await db
      .update(queries)
      .set({
        reply: reply,
        isPublic: isPublic,
      })
      .where(eq(queries.id, id))

    // const notification = await db.insert(notifications).values({
    //   id: notificationId,
    //   userId: sellerId,
    //   adId: adId,
    //   createdAt: currentDate,
    //   title: `Query recieved!`,
    //   description: `Your listing ${adTitle} has recieved a query`,
    //   body: `A potential buyer has sent you a query regarding your listing, head over to your listings page to send them a reply. You can also make the query public after replying to assist other users who may have the same question.`,
    //   isRead: false,
    // })

    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    console.error("error:", error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response(
      "Could not send an reply at this time. Please try again later",
      { status: 500 }
    )
  }
}
