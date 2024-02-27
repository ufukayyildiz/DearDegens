import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { messages } from "@/src/server/db/schema"
import { nanoid } from "nanoid"
import { z } from "zod"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    console.log("body:", body)
    const { message, roomId, userId, userName } = body

    const messageId = nanoid()
    const currentDate: Date = new Date()

    const post = await db.insert(messages).values({
      id: messageId,
      roomId: roomId,
      userId: userId,
      userName: userName,
      message: message,
      createdAt: currentDate,
    })

    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    console.error("error:", error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response(
      "Could not send message at this time. Please try again later",
      { status: 500 }
    )
  }
}
