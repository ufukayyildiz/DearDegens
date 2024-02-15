import { getAuthSession } from "@/src/lib/auth/auth-options"
import { db } from "@/src/server/db"
import { users } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"

export async function PATCH(request: any) {
  try {
    const session = await getAuthSession()
    console.log("session", session?.user.id)

    if (!session) {
      return new Response("Unauthrised request, please login.", { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()
    const { listingId } = body
    console.log("listingId", listingId)

    const user = await db.select().from(users).where(eq(users.id, userId))
    const wishlist = user[0].wishlist
    console.log("wishlist:", wishlist)

    const currentWishlist: any = []
    const updatedWishlist: any = []

    if (wishlist) {
      if (wishlist.length > 10) {
        const splitList = wishlist.split(",")
        const currentList = splitList.map((item) => {
          const matchResult = item.match(/"([^"]*)"/)
          return matchResult ? matchResult[1] : null
        })
        currentWishlist.push(...currentList)
      }
    }

    if (currentWishlist.includes(listingId)) {
      const removedItem = currentWishlist.filter(
        (item: any) => item !== listingId
      )
      console.log("removed:", removedItem)
      updatedWishlist.push(removedItem)
    } else {
      updatedWishlist.push(...currentWishlist, listingId)
    }

    console.log("currentWishlist:", currentWishlist)
    console.log("updatedWishlist:", updatedWishlist)

    const post = await db
      .update(users)
      .set({
        wishlist: JSON.stringify(updatedWishlist),
      })
      .where(eq(users.id, userId))

    console.log("post:", post)

    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    console.error("Server error: Error adding listing to wishlist:", error)
    return new Response("Could not add listing to wishlist.", { status: 500 })
  }
}
