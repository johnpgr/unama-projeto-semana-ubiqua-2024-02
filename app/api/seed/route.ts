import { appDataSource } from "~/database"
import { DatabaseSeeder } from "~/database/seed"

export async function POST() {
  try {
    await appDataSource.initialize()
  } catch {}
  try {
    await new DatabaseSeeder().run()
    return new Response("Database seeded successfully.")
  } catch (error) {
    //@ts-expect-error this is fine
    return new Response(`Failed to seed database ${error.code}`, {
      status: 500,
    })
  }
}
