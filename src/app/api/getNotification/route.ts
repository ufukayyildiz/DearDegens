import { db } from "@/src/db"
import { notifications } from "@/src/db/schema"
import { getAuthSession } from "@/src/lib/auth/auth-options"
import { eq, and } from "drizzle-orm"

export async function GET(req: Request) {
  try {

    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const unReadNotifications = await db
      .select()
      .from(notifications)
      .where(
          and(
            eq(notifications.userId, session.user.id),
            eq(notifications.isRead, false)
          )
      )
    console.log("isNotRead Array:", unReadNotifications)
    return new Response(JSON.stringify(unReadNotifications), { status: 200 })
  } catch (error) {
    console.error("Fetch notifications error:", error)
    return new Response("Could not fetch notifications.", { status: 500 })
  }
}


