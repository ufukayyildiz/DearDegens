import Link from "next/link"
import { authOptions } from "@/src/lib/auth/auth-options"
import { eq, sql, and, ne } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { userType } from "../types/db"
import { messages, users } from "..//server/db/schema"
import { db } from "../server/db"
import { NotificationsNav } from "./NotificationsNav"
import { UserAccountNav } from "./UserAccountNav"
import PostAd from "./pageHome/PostAd"
import { chatRoom } from "..//server/db/schema"
import ChatSheetUser from "./pageMintChat/ChatSheetUser"

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
          {/* <PostAd /> */}
          <ChatSheetUser />
          <NotificationsNav userId={session?.user.id} />
          <UserAccountNav
            adminId={admin[0].id}
            user={{
              id: session.user.id || "",
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
