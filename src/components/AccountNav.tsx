import Link from "next/link"
import { authOptions } from "@/src/lib/auth/auth-options"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { Button } from "./components-ui/Button"
import { db } from "../db/index"
import { notifications, users } from "../db/schema"
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

  
  const notification = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, session?.user.id))

  const userNotifications = [...notification]
  userNotifications.sort((a: any, b: any) => b.createdAt - a.createdAt)


  return (
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="flex items-center space-x-5">
            {/* SIGN IN */}
            {session?.user && user ? (
              <div className="flex items-center space-x-8">
                <NotificationsNav userNotifications={userNotifications} userId={session?.user.id} />
                <UserAccountNav
                  user={{
                    name: session.user.name || "",
                    email: session.user.email || "",
                    image: session.user.image || "",
                  }}
                />
              </div>
            ) : (
              <Button>
                <Link href="/signin">
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
  )
}
