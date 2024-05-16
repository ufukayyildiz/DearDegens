import { db } from "@/src/server/db"
import { sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export const revalidate = 0

export async function GET() {
  try {
    const result = await db.execute(
      sql.raw(
        `
        UPDATE listings 
        SET "isNew" = 'f'
        WHERE "createdAt" < NOW() - INTERVAL '5 days'
        AND "createdAt" > NOW() - INTERVAL '10 days'
      `
      )
    )

    return NextResponse.json({
      result: result,
    })
  } catch (error) {
    console.error("Failed to update isNew tags.", error)
    return new Response("Failed to update isNew tags.", { status: 500 })
  }
}
