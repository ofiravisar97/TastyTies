import { defineConfig } from "drizzle-kit";

if (!process.env.DB_URL) {
  throw new Error("No Database url found.");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schemas.js",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
});
