import { getAuthSession } from "@/src/lib/auth/auth-options"
import { validateListing } from "@/src/lib/validators/validateListingGeneral"
import { db } from "@/src/server/db"
import { listings, notifications } from "@/src/server/db/schema"
import { nanoid } from "nanoid"
import { z } from "zod"
import { sql } from "drizzle-orm"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/src/server/upstash"
import { headers } from "next/headers"
import { Resend } from "resend"
import { ListingCreatedTemplate } from "@/src/components/emailTemplates/ListingCreatedTemplate"

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "30 s"),
  analytics: true,
})

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    const resend = new Resend(process.env.RESEND_API_KEY)
    const ip = headers().get("x-forwarded-for")
    const {
      remaining,
      limit,
      success: limitReached,
    } = await rateLimit.limit(ip!)
    console.log("Rate Limit Stats:", remaining, limit, limitReached)

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const authorId = session?.user.id

    const vehicleListingId = nanoid()
    const listingId = vehicleListingId

    const generateNotificationId = nanoid()
    const notificationId = generateNotificationId

    const currentDate: Date = new Date()
    const expirationDate: Date = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
    )
    const purgeDate: Date = new Date(
      currentDate.getTime() + 60 * 24 * 60 * 60 * 1000
    )

    const {
      tab,
      category,
      subCategory,
      price,
      condition,
      title,
      brand,
      model,
      mileage,
      year,
      transmission,
      fuel,
      description,
      items,
      images,
      location,
      meetup,
      displayContact,
    } = validateListing.parse(body)
    console.log(
      "data:",
      tab,
      category,
      subCategory,
      price,
      condition,
      title,
      brand,
      model,
      description,
      fuel,
      items,
      images,
      location,
      meetup,
      displayContact
    )

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const post = await db.insert(listings).values({
        id: listingId,
        authorId: authorId,
        createdAt: currentDate,
        updatedAt: currentDate,
        expirationDate: expirationDate,
        purgeDate: purgeDate,
        tab: tab,
        category: category,
        subCategory: subCategory,
        price: price,
        condition: condition,
        title: title,
        brand: brand,
        model: model,
        mileage: mileage,
        year: year,
        transmission: transmission,
        fuel: fuel,
        description: description,
        items: JSON.stringify(items),
        images: images,
        location: location,
        meetup: meetup,
        displayContact: displayContact,
      })

      await db.execute(
        sql.raw(
          `
        UPDATE listings 
        SET tsvector_title = to_tsvector(title)
        WHERE id = '${listingId}';
        `
        )
      )

      await resend.emails.send({
        from: "DearDegens Support <support@deardegens.com>",
        to: `support@deardegens.com`,
        subject: "DearDegens.com: Listing Recieved For Review.",
        react: ListingCreatedTemplate({
          userName: authorId,
          userEmail: session.user.email || "",
          adId: listingId,
          adTitle: title,
        }) as React.ReactElement,
      })

      const notification = await db.insert(notifications).values({
        id: notificationId,
        userId: authorId,
        adId: listingId,
        adUrl: `/${title}/${brand}/${model}/${subCategory}/${location}/${listingId}`,
        createdAt: currentDate,
        title: `Listing ${title} has been submitted!`,
        description: "Your almost there!",
        body: `Thank you for choosing DearDegens. Your ad for the ${brand} ${model} has been submitted and is currently being reviewed to ensure it meets our content policies. This process can take up to 2 working days. A notification will be sent to you when your listing goes live.`,
        isRead: false,
      })

      return new Response(JSON.stringify(post), { status: 200 })
    }
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
