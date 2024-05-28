import { sql } from "drizzle-orm"
import { db } from "@/src/server/db"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)

    const page: string = url.searchParams.get("page") || ""
    const limit: string = url.searchParams.get("limit") || ""
    const offset = (parseInt(page) - 1) * parseInt(limit)

    const tab = url.searchParams.get("payload[tab]")
    const category = url.searchParams.get("payload[category]")
    const subCategory = url.searchParams.get("payload[subCategory]")
    const location = url.searchParams.get("payload[location]")
    const priceMin = url.searchParams.get("payload[priceMin]")
    const priceMax = url.searchParams.get("payload[priceMax]")
    const mileageMin = url.searchParams.get("payload[mileageMin]")
    const mileageMax = url.searchParams.get("payload[mileageMax]")
    const yearMin = url.searchParams.get("payload[yearMin]")
    const yearMax = url.searchParams.get("payload[yearMax]")
    const transmission = url.searchParams.get("payload[transmission]")
    const sort = url.searchParams.get("payload[sort]")

    // console.log(
    //   "server payload:",
    //   tab,
    //   category,
    //   subCategory,
    //   location,
    //   priceMin,
    //   priceMax,
    //   mileageMin,
    //   mileageMax,
    //   yearMin,
    //   yearMax,
    //   transmission
    // )

    const result = await db.execute(
      sql.raw(
        `
          SELECT * FROM listings 
          WHERE tab = '${tab}'
          AND "isExpired" = 'f'
          AND "isSold" = 'f'
          AND "isReviewed" = 't'
          AND ('${category}' = '' OR "category" = '${category}')
          AND ('${subCategory}' = '' OR "subCategory" = '${subCategory}')
          AND ('${location}' = '' OR "location" = '${location}')
          AND "price" > '${priceMin}'
          AND "price" < '${priceMax}'
          AND (('${mileageMin}' = '' OR "mileage" IS NULL) OR "mileage" >= '${mileageMin}')
          AND (('${mileageMax}' = '' OR "mileage" IS NULL) OR "mileage" <= '${mileageMax}')
          AND (('${yearMin}' = '' OR "year" IS NULL) OR "year" >= '${yearMin}')
          AND (('${yearMax}' = '' OR "year" IS NULL) OR "year" <= '${yearMax}')
          AND (('${transmission}' = '' OR "transmission" IS NULL) OR "transmission" = '${transmission}')
          ORDER BY 
            CASE 
              WHEN '${sort}' = 'oldest' THEN "createdAt"
                ELSE NULL::timestamp
            END ASC,
            CASE 
              WHEN '${sort}' = 'latest' THEN "createdAt"
                ELSE NULL::timestamp
            END DESC,
            CASE 
              WHEN '${sort}' = 'low' THEN "price"
                ELSE NULL::numeric
            END ASC,
            CASE 
              WHEN '${sort}' = 'high' THEN "price"
                ELSE NULL::numeric
            END DESC
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
