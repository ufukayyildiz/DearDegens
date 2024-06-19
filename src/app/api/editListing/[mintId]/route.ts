import { getAuthSession } from "@/src/lib/auth/auth-options"
import { validateListing } from "@/src/lib/validators/validateListingGeneral"
import { db } from "@/src/server/db"
import { sql } from "drizzle-orm"
import { listings, notifications } from "@/src/server/db/schema"
import { eq } from "drizzle-orm"
import { nanoid } from "nanoid"
import { z } from "zod"
import { Resend } from "resend"
import { ListingCreatedTemplate } from "@/src/components/emailTemplates/ListingCreatedTemplate"

export async function PATCH(req: Request, context: any) {
  try {
    const listingId = context.params.mintId
    const session = await getAuthSession()
    const resend = new Resend(process.env.RESEND_API_KEY)

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const authorId = session?.user.id

    const generateNotificationId = nanoid()
    const notificationId = generateNotificationId

    const currentDate: Date = new Date()

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

    const post = await db
      .update(listings)
      .set({
        updatedAt: currentDate,
        category: category,
        subCategory: subCategory,
        price: price,
        title: title,
        brand: brand,
        model: model,
        description: description,
        mileage: mileage,
        year: year,
        transmission: transmission,
        fuel: fuel,
        items: JSON.stringify(items),
        images: images,
        location: location,
        meetup: meetup,
        displayContact: displayContact,
      })
      .where(eq(listings.id, listingId))

    await db.execute(
      sql.raw(
        `
        UPDATE listings 
        SET tsvector_title = to_tsvector(title)
        WHERE id = '${listingId}';
        `
      )
    )

    await db.execute(
      sql.raw(
        `
      UPDATE listings 
      SET tsvector_brand = to_tsvector(brand)
      WHERE id = '${listingId}';
      `
      )
    )

    await db.execute(
      sql.raw(
        `
      UPDATE listings 
      SET tsvector_model = to_tsvector(model)
      WHERE id = '${listingId}';
      `
      )
    )

    await resend.emails.send({
      from: "DearDegens Support <support@deardegens.com>",
      to: `support@deardegens.com`,
      subject: "DearDegens.com: Listing Recieved For Review (Updated).",
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
      title: `Listing ${title} updates have been submitted!`,
      description: "We just need to run a few checks!",
      body: `The updates to your ad for the ${brand} ${model} have been submitted and are currently being reviewed to ensure it meets our content policies. This process can take up to 2 working days. A notification will be sent to you when your listing goes live.`,
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
