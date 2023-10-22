import { db } from "@/src/db"
import { notifications } from "@/src/db/schema"
import { getAuthSession } from "@/src/lib/auth/auth-options"
import { eq } from "drizzle-orm"

export async function GET(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const userId = JSON.stringify(session?.user.id)

    const userNotifications = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
    return new Response(JSON.stringify(userNotifications), { status: 200 })
  } catch (error) {
    console.error("Fetch notifications error:", error)
    return new Response("Could not fetch notifications.", { status: 500 })
  }
}
