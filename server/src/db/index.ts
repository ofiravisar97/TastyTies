import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DB_URL as string);