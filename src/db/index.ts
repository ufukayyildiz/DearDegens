import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';

const connection = connect({
  url: process.env.DATABASE_URL,
});

export const db = drizzle(connection);

// import * as schema from './schema';
// import { drizzle } from "drizzle-orm/mysql2";
// import mysql from "mysql2/promise";

// console.log('database:', process.env.DATABASE_URL)

// if (!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL is missing');
// }

// const connection = await mysql.createConnection({
//   uri: process.env.DATABASE_URL,
// });

// export const db = drizzle(connection, { schema, mode: 'planetscale' });