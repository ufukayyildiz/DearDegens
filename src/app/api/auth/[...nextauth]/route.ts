import { authOptions } from "@/src/lib/auth/auth-options"
import NextAuth from "next-auth"

console.log("authOptions", authOptions.callbacks?.session)

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
