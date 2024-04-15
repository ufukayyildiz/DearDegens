import { db } from "@/src/server/db"
import { sql } from "drizzle-orm"

export async function PATCH() {
  try {
    await db.execute(
      sql.raw(
        `
        UPDATE listings 
        SET "isNew" = 'f'
        WHERE "createdAt" < NOW() - INTERVAL '5 days'
        AND "createdAt" > NOW() - INTERVAL '10 days'
      `
      )
    )
    
    return new Response("Successfully updated isNew tags.", { status: 200 })
  } catch (error) {
    console.error("Failed to update isNew tags.", error)
    return new Response("Failed to update isNew tags.", { status: 500 })
  }
}
