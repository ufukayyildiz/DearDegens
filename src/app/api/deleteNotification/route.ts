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

    const notificationId = await req.json()

    const response = await db.delete(notifications).where(eq(notifications.id, notificationId))

    console.log('Successfully deleted notification:', response)
    return new Response("Successfully deleted notification.", { status: 200 })
  } catch (error) {
    console.error("Deletion notification error:", error)
    return new Response("Could not delete notifications.", { status: 500 })
  }
}
