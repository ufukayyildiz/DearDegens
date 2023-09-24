import { db } from "@/src/db"
import { listingsGeneral } from "@/src/db/schema"
import { getAuthSession } from "@/src/lib/auth/auth-options"
import { MintValidator } from "@/src/lib/validators/mint"
import { nanoid } from "nanoid"
import { z } from "zod"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const authorId = JSON.stringify(session?.user.id)
    const generateId = nanoid()
    const id = JSON.stringify(generateId)
    console.log("id:", id)

    const currentDate: Date = new Date()
    const expirationDate: Date = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
    )
    const purgeDate: Date = new Date(
      currentDate.getTime() + 60 * 24 * 60 * 60 * 1000
    )

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
    } = MintValidator.parse(body)
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

    const post = await db.insert(listingsGeneral).values({
      id: id,
      authorId: authorId,
      createdAt: currentDate,
      updatedAt: currentDate,
      expirationDate: expirationDate,
      purgeDate: purgeDate,
      category: category,
      price: price,
      title: title,
      brand: brand,
      model: model,
      description: description,
      images: images,
      location: location,
      meetup: meetup,
      isAvailable: true,
    })

    console.log("post:", post)

    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    console.error("error:", error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response(
      "Could not create a post at this time. Please try later",
      { status: 500 }
    )
  }
}
