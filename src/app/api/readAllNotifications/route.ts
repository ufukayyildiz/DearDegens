import { db } from "@/src/server/db"
import { notifications } from "@/src/server/db/schema"
import { getAuthSession } from "@/src/lib/auth/auth-options"
import { eq } from "drizzle-orm"

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const userId = await req.json()

    const updateIsRead = await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.userId, userId))

    const isReadArray = await db
      .select()
      .from(notifications)
      .where(eq(notifications.isRead, false))

    return new Response(JSON.stringify(isReadArray.length), { status: 200 })
  } catch (error) {
    console.error("Update notification error:", error)
    return new Response("Could not update notification status.", {
      status: 500,
    })
  }
}
