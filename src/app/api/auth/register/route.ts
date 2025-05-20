import bcrypt from "bcrypt"
import { db } from "@/src/server/db"
import { eq } from "drizzle-orm"
import crypto from "crypto"
import { users } from "@/src/server/db/schema"
import { VerifyEmailTemplate } from "@/src/components/emailTemplates/VerifyEmailTemplate"
import { ulid } from "ulid"
import { render } from "@react-email/components"
import { Nodemail } from "@/src/server/mail/mail"

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
        const template = await render(
          VerifyEmailTemplate({
            userName: name,
            userEmail: email,
            verifyEmailToken: verifyEmailToken,
          }) as React.ReactElement
        )

        await Nodemail({
          recipient: email,
          sender: process.env.MAIL_USER!,
          subject: `DearDegens.com: Email Verification`,
          template: template,
        })
        console.log(`Successfully sent verification email - ${email}`)
      } catch (error) {
        console.error(`Failed to send verification email - ${email}`)
        return new Response(`Failed to send verification email - ${email}`, {
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
