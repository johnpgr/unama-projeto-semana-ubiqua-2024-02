import { User } from "./user.schema"
import { faker } from "@faker-js/faker"
import { db } from "~/database"

export async function seedUsers() {
  await db.insert(User).values(
    Array.from({ length: 10 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    })),
  )
}
