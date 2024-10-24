import { defineConfig } from "drizzle-kit"
import { env } from "./env.mjs"

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./database/migrations",
  dialect: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
})
