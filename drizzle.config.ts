import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config()

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing")
}

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config
