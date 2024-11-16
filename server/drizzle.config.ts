import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const DB_URL = process.env.DB_URL as string;

export default defineConfig({
  schema: "src/db/schema",
  out: "src/db/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL,
  },
});
