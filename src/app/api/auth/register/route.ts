import bcrypt from "bcrypt"
import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import { users } from "@/src/server/db/schema"
import { createId } from "@paralleldrive/cuid2"

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    const currentDate: Date = new Date()

    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
    console.log('userExsist', userExists)
    if (userExists.length === 0) {
      const post = await db.insert(users).values({
        id: createId(),
        email: email,
        emailVerified: currentDate,
        password: hashedPassword,
        name: name,
        createdAt: currentDate,
        updatedAt: currentDate,
        coolingDown: false,
      })
      console.log("Successfully created new user")
      return new Response(JSON.stringify(post), { status: 200 })
    } else {
      return new Response("User already exists!", { status: 500 })
    }
  } catch (error) {
    console.error("Failed to create to user, error:", error)
    return new Response("Failed to create to user.", { status: 500 })
  }
}
