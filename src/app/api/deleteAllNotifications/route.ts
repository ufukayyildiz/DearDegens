import { db } from "@/src/db"
import { notifications } from "@/src/db/schema"
import { getAuthSession } from "@/src/lib/auth/auth-options"
import { eq } from "drizzle-orm"

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const userId = await req.json()

    await db.delete(notifications).where(eq(notifications.userId, userId))

    return new Response("Successfully deleted all notification.", { status: 200 })
  } catch (error) {
    console.error("Deletion notification error:", error)
    return new Response("Could not delete all notifications.", { status: 500 })
  }
}
