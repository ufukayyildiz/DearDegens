import { db } from "@/src/db/index";
import { getAuthSession } from "@/src/lib/auth/auth-options";
import { MintValidator } from "@/src/lib/validators/mint";
import { z } from 'zod'
import { listingsGeneral } from "@/src/db/schema";
import cuid2 from "@paralleldrive/cuid2";

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("Post Body", body)

    const { category, price, title, brand, model, description, images, location, meetup } = MintValidator.parse(body)

    const session = await getAuthSession()
    const authorId = JSON.stringify(session?.user.id)
    console.log(authorId)

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const cDate: Date = new Date();
    const eDate: Date = new Date(cDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    const pDate: Date = new Date(cDate.getTime() + 60 * 24 * 60 * 60 * 1000);

    const formattedCurrentDate = cDate.toUTCString();
    const formattedExpirationDate = eDate.toUTCString();
    const formattedPurgeDate = pDate.toUTCString();
    console.log("current:", formattedCurrentDate, "expiration:", formattedExpirationDate, "purge:", formattedPurgeDate);


    const post = await db.insert(listingsGeneral).values({
      authorId: authorId,
      createdAt: formattedCurrentDate,
      expirationDate: formattedExpirationDate,
      purgeDate: formattedPurgeDate,
      category: category, 
      price: price, 
      title: title, 
      brand: brand, 
      model: model, 
      description: description, 
      images: 'imageURL', 
      location: location, 
      meetup: meetup,
      isAvailable: true,
    })

    console.log('post:', post)
  
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response('Could not create a post at this time. Please try later', { status: 500 })
  }
}