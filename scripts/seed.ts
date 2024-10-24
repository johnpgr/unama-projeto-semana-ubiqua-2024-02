import { DatabaseSeeder } from "../database/seed"

;(async () => {
  await new DatabaseSeeder()
    .run()
    .then(() => console.log("Database seeded!"))
    .catch(console.error)
})()
