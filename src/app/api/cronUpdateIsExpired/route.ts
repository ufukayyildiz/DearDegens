import { db } from "@/src/server/db"
import { sql } from "drizzle-orm"

export async function PATCH() {
  try {
    await db.execute(
      sql.raw(
        `
        UPDATE listings 
        SET "isExpired" = 't'
        WHERE "expirationDate" < NOW() - INTERVAL '1 days'
        AND "expirationDate" > NOW() - INTERVAL '10 days'
      `
      )
    )
    
    return new Response("Successfully updated isNew tags.", { status: 200 })
  } catch (error) {
    console.error("Failed to update isNew tags.", error)
    return new Response("Failed to update isNew tags.", { status: 500 })
  }
}
