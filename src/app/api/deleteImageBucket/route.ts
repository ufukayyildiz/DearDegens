import { utapi } from "@/src/server/uploadthing"
import { db } from "@/src/server/db"
import { getAuthSession } from "@/src/lib/auth/auth-options"
import { users } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"

export async function PATCH(request: any) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return new Response("Unathorised", { status: 401 })
    }

    const body = await request.json()
    const deleteImage = body.replace("https://utfs.io/f/", "")

    const userId = session?.user.id

    const fetchUser = await db.select().from(users).where(eq(users.id, userId))
    const userBucket = fetchUser[0].imageBucket || ""

    const newBucket: any = []

    if (userBucket.includes(",")) {
      const currentBucket = userBucket.split(",")
      const formattedBucket = currentBucket.map((item) => {
        const matchResult = item.match(/"([^"]*)"/)
        return matchResult ? matchResult[1] : null
      })
      newBucket.push(formattedBucket)
    } else {
      const currentBucket = [userBucket]
      newBucket.push(currentBucket)
    }

    const updatedBucket = newBucket[0].filter((item: any) => item !== body)
    const updatedBucketString = JSON.stringify(updatedBucket)


    try {
      const post = await db
        .update(users)
        .set({ imageBucket: updatedBucketString})
        .where(eq(users.id, userId))
      await utapi.deleteFiles(deleteImage)
      return new Response(JSON.stringify(post), { status: 200 })
    } catch (error) {
      console.error(`Could not delete image ${body}:`, error)
      return new Response(`Could not delete image ${body}.`, { status: 500 })
    }
  } catch (error) {
    console.error("Could not update image bucket:", error)
    return new Response("Could not update image bucket:", { status: 500 })
  }
}
