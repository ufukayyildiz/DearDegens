import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { chatRoom, offers } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { nanoid } from "nanoid"

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const currentDate: Date = new Date()
    const chatroomId = nanoid()
    const { offerId, adId, sellerId, userId } = body

    const updateIsConfirmed = await db
      .update(offers)
      .set({ isCountered: false, isConfirmed: true })
      .where(eq(offers.id, offerId))

    const createChatRoom = await db.insert(chatRoom).values({
      id: chatroomId,
      adId: adId,
      userId: userId,
      sellerId: sellerId,
      createdAt: currentDate,
    })

    return new Response(JSON.stringify(updateIsConfirmed), { status: 200 })
  } catch (error) {
    console.error("Update confirmation status error:", error)
    return new Response("Could not update confirmation status.", {
      status: 500,
    })
  }
}
