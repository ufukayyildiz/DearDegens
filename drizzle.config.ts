// drizzle.config.ts

import type { Config } from 'drizzle-kit';
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}

console.log('database:', process.env.DATABASE_URL)

export default {
  schema: './src/db/schema.ts',
  out: './db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;