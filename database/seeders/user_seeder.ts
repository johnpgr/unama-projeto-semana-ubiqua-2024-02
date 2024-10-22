import User from "#models/user"
import { BaseSeeder } from "@adonisjs/lucid/seeders"
import { faker } from "@faker-js/faker"

export default class extends BaseSeeder {
  async run() {
    const users = Array.from({ length: 10 }).map((_, i) => {
      const user = new User()
      user.fullName = faker.person.fullName()
      user.email = faker.internet.email()
      user.password = faker.internet.password()
      return user
    })

    await User.createMany(users)
  }
}

