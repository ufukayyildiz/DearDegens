import { getAuthSession } from "@/src/lib/auth/auth-options"
import { validateHousehold } from "@/src/lib/validators/validateHousehold"
import { db } from "@/src/server/db"
import {
  listings,
  notifications,
  users,
  usersRelations,
} from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { nanoid } from "nanoid"
import { z } from "zod"

export async function PATCH(req: Request, context: any) {
  try {
    const listingId = context.params.mintId
    console.log("listingId:", listingId)
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const authorId = session?.user.id

    const generateNotificationId = nanoid()
    const notificationId = generateNotificationId

    const currentDate: Date = new Date()

    const {
      category,
      price,
      title,
      brand,
      model,
      description,
      images,
      location,
      meetup,
    } = validateHousehold.parse(body)
    console.log(
      "data:",
      category,
      price,
      title,
      brand,
      model,
      description,
      images,
      location,
      meetup
    )

    console.log("listingGeneral:", listings)

    const post = await db
      .update(listings)
      .set({
        updatedAt: currentDate,
        category: category,
        price: price,
        title: title,
        brand: brand,
        model: model,
        description: description,
        images: images,
        location: location,
        meetup: meetup,
      })
      .where(eq(listings.id, listingId))

    const notification = await db.insert(notifications).values({
      id: notificationId,
      userId: authorId,
      adId: listingId,
      createdAt: currentDate,
      title: `${title} updated!`,
      description: `Your listing titled:"${title}" has been updated.`,
      body: `The updates to your listing have gone live, go check them out! Goodluck and happy selling!`,
      isRead: false,
    })
    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    console.error("error:", error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response(
      "Could not create a post at this time. Please try later",
      { status: 500 }
    )
  }
}
