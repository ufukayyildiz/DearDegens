import { db } from "@/src/db/index";
import { getAuthSession } from "@/src/lib/auth/auth-options";
import { MintValidator } from "@/src/lib/validators/mint";
import { z } from 'zod'
import { listingsGeneral } from "@/src/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("Post Body", body)

    const { category, price, title, brand, model, description, images, location, meetup } = MintValidator.parse(body)

    const session = await getAuthSession()
    console.log(session)

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    // const post = await db.insert(listingsGeneral).values(
         
    // )
    // console.log('post:', post)
  

    // return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    
    return new Response('Could not create a post at this time. Please try later', { status: 500 })
  }
}