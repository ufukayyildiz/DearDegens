import { db } from "@/src/server/db"
import { sql } from "drizzle-orm"

export async function updateIsNew() {
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
    console.log("Successfully updated isNew tags.")
  } catch (error) {
    console.error("Failed to update isNew tags.", error)
  }
}
