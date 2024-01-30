import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import { users } from "@/src/server/db/schema"

export async function PATCH(req: any) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorised", { status: 401 })
    }

    const body = await req.json()
    const userId = session.user.id

    const fetchUser = await db.select().from(users).where(eq(users.id, userId))
    const userBucket = fetchUser[0].imageBucket || ""
    console.log('userBucket:', userBucket)
    const newBucket: any = []
    console.log('newBucket:', newBucket)
    if (userBucket.includes(",")) {
      const currentBucket = userBucket.split(",")
      const formattedBucket = currentBucket.map((item) => {
        const matchResult = item.match(/"([^"]*)"/)
        return matchResult ? matchResult[1] : null
      })
      newBucket.push(formattedBucket, body)
    } else {
      const currentBucket = [userBucket]
      newBucket.push(currentBucket, body)
    }

    const updatedBucket = newBucket.flatMap((arr: string[]) => arr)
    const urlRegex = /^(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*$/

    const filteredBucket = updatedBucket.filter((item: any) =>
      urlRegex.test(item)
    )
    console.log("filteredBucket:", filteredBucket)
    const filteredBucketString = JSON.stringify(filteredBucket)

    const post = await db
      .update(users)
      .set({ imageBucket: filteredBucketString })
      .where(eq(users.id, userId))

    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    console.error("Could not update image bucket:", error)
    return new Response("Could not update image bucket:", { status: 500 })
  }
}
