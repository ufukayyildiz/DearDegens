import bcrypt from "bcrypt"
import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import { users } from "@/src/server/db/schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    const user = await db.select().from(users).where(eq(users.emailVerified, email))

    if (user[0] === undefined) {
      return new Response("Email does not exist.", { status: 409 })
    }

    if (
      user[0] !== undefined &&
      bcrypt.compareSync(password, user[0].password) === false
    ) {
      return new Response("Password incorrect.", { status: 401 })
    }

    if (
      user[0] !== undefined &&
      bcrypt.compareSync(password, user[0].password) === true
    ) {
      const response = { email: email, password: password }
      console.log("Successfully logged in!")
      return new Response(JSON.stringify(response), { status: 200 })
    }
  } catch (error) {
    console.error("Failed to login, error:", error)
    return new Response("Failed to login.", { status: 500 })
  }
}
