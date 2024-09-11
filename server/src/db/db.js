import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

const client = postgres(process.env.DB_URL);

const db = drizzle(client);

async () => {
  await migrate(db, { migrationsFolder: "./migrations" });
};

async () => {
  await client.end();
};

export default db;
