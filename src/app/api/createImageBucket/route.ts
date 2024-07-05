import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import { users } from "@/src/server/db/schema"
import { products } from "@/src/lib/categories/Products"

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
    const newBucket: any = []
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

    // USER HAS FREE SUB:
    if (
      fetchUser[0].subscription === products[0].id &&
      filteredBucket.length >= products[0].images
    ) {
      return new Response("User has reached image limit.", { status: 409 })
    }

    // USER HAS ONCE OFF SUB:
    if (
      fetchUser[0].subscription === products[1].id &&
      filteredBucket.length >= fetchUser[0].maxImages!
    ) {
      return new Response("User has reached image limit.", { status: 409 })
    }

    // USER HAS PRO SUB:
    if (
      fetchUser[0].subscription === products[2].id &&
      filteredBucket.length >= products[2].images
    ) {
      return new Response("User has reached image limit.", { status: 409 })
    }

    // USER HAS BIZ SUB:
    if (
      fetchUser[0].subscription === products[3].id &&
      filteredBucket.length >= products[3].images
    ) {
      return new Response("User has reached image limit.", { status: 409 })
    }

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
