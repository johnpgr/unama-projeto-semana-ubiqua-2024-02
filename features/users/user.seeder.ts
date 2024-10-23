import { BaseSeeder } from "~/database/seed"
import User from "./user.entity"
import { faker } from "@faker-js/faker"

export default class UserSeeder extends BaseSeeder {
  async run() {
    await Promise.all(
      Array.from({ length: 10 }).map((_, i) => {
        const user = new User()
        user.fullName = faker.person.fullName()
        user.email = faker.internet.email()
        return user.save()
      })
    )
  }
}
