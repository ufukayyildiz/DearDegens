import { db } from "@/src/server/db"
import { offers } from "@/src/server/db/schema"
import { getAuthSession } from "@/src/lib/auth/auth-options"
import { eq } from "drizzle-orm"

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const offerId = await req.json()

    const updateIsAccepted = await db
      .update(offers)
      .set({ isCountered: false, isAccepted: true })
      .where(eq(offers.id, offerId))

    return new Response(JSON.stringify(updateIsAccepted), { status: 200 })
  } catch (error) {
    console.error("Update acceptance status error:", error)
    return new Response("Could not update acceptance status.", {
      status: 500,
    })
  }
}
