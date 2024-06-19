import { sql } from "drizzle-orm"
import { db } from "@/src/server/db"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)

    const page: string = url.searchParams.get("page") || ""
    const limit: string = url.searchParams.get("limit") || ""
    const offset = (parseInt(page) - 1) * parseInt(limit)

    const result = await db.execute(
      sql.raw(
        `
          SELECT * FROM listings 
          WHERE "tab" = 'Gaming'
          AND "isExpired" = 'f'
          AND "isSold" = 'f'
          AND "isReviewed" = 't'
          AND "nonCompliant" = 'f'
          ORDER BY "createdAt" DESC
          OFFSET ${offset}
          LIMIT ${parseInt(limit)}; 
        `
      )
    )

    return new Response(JSON.stringify(result), { status: 200 })
  } catch (error) {
    console.error("Server error: Failed to fetch search params:", error)
    return new Response("Failed to fetch data", { status: 500 })
  }
}
