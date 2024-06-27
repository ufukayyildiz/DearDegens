import bcrypt from "bcrypt"
import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import crypto from "crypto"
import { Resend } from "resend"
import { users } from "@/src/server/db/schema"
import { VerifyEmailTemplate } from "@/src/components/emailTemplates/VerifyEmailTemplate"
import { ulid } from "ulid"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    const verifyEmailToken = crypto.randomBytes(32).toString("base64url")
    const currentDate: Date = new Date()

    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.email, email))

    if (userExists[0] === undefined) {
      const post = await db.insert(users).values({
        id: `usr-${ulid()}`,
        email: email,
        emailVerified: verifyEmailToken,
        password: hashedPassword,
        name: name,
        createdAt: currentDate,
        updatedAt: currentDate,
        coolingDown: false,
      })

      try {
        const { data } = await resend.emails.send({
          from: "DearDegens Support <support@deardegens.com>",
          to: `${email}`,
          subject: "DearDegens.com: Email Verification",
          react: VerifyEmailTemplate({
            userName: name,
            userEmail: email,
            verifyEmailToken: verifyEmailToken,
          }) as React.ReactElement,
        })
        console.log("Successfully sent verification email:", data)
      } catch (error) {
        console.error("Error sending verification email:", error)
        return new Response("Error sending verififcation email:", {
          status: 500,
        })
      }

      console.log("Successfully created new user")
      return new Response(JSON.stringify(post), { status: 200 })
    } else {
      return new Response("User already exists!", { status: 409 })
    }
  } catch (error) {
    console.error("Failed to create to user, error:", error)
    return new Response("Failed to create to user.", { status: 500 })
  }
}
