import { BaseSeeder } from "~/database/seed"
import { InsertUser, User } from "./user.schema"
import { faker } from "@faker-js/faker"
import { db } from "~/database"

export default class UserSeeder extends BaseSeeder {
  async run() {
    await db.insert(User).values(
      Array.from({ length: 10 }).map(
        () =>
          ({
            name: faker.person.fullName(),
            email: faker.internet.email(),
          }) satisfies InsertUser
      )
    )
  }
}
