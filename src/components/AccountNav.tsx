import Link from "next/link"
import { authOptions } from "@/src/lib/auth/auth-options"
import { eq, sql } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { userType } from "../types/db"
import { users } from "..//server/db/schema"
import { db } from "../server/db"
import { Button } from "./components-ui/Button"
import { Cog } from "lucide-react"
import { NotificationsNav } from "./NotificationsNav"
import { UserAccountNav } from "./UserAccountNav"

export async function AccountNav() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return console.log("Unauthorised, please login")
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))

  const admin: userType[] = (
    await db.execute(sql.raw(`SELECT * FROM users WHERE "admin" = 't'`))
  ).rows

  return (
    <div className="absolute right-0 top-[26px] flex flex-1 items-center justify-end space-x-4">
        {/* SIGN IN */}
        {session?.user && user && (
          <div className="flex items-center space-x-6">
            {admin[0].id === session?.user.id && (
              <Link
                href="/command-centre"
                className="flex h-9 min-w-9 items-center justify-center rounded-full shadow-lg"
              >
                <Cog className="flex hover:animate-spin hover:text-customAccent" />
              </Link>
            )}
            <NotificationsNav userId={session?.user.id} />
            <UserAccountNav
              user={{
                name: session.user.name || "",
                email: session.user.email || "",
                image: session.user.image || "",
              }}
            />
          </div>
        )}
    </div>
  )
}
