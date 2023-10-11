import { db } from "@/src/db"
import { notifications } from "@/src/db/schema"
import { getAuthSession } from "@/src/lib/auth/auth-options"
import { eq } from "drizzle-orm"

export async function GET(req: Request) {
  try {
    const isReadNotifications = await db
      .select()
      .from(notifications)
      .where(eq(notifications.isRead, false))
    console.log("isNotRead Array:", isReadNotifications)
    return new Response(JSON.stringify(isReadNotifications), { status: 200 })
  } catch (error) {
    console.error("Fetch notifications error:", error)
    return new Response("Could not fetch notifications.", { status: 500 })
  }
}

export async function PUT(req: Request) {

  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const notificationId = await req.json()
    console.log("apiNotificationId", notificationId)

    const id = JSON.stringify(notificationId)

    const updateIsRead = await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id))
    console.log('updateIsRead:', updateIsRead)

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
