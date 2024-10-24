import { faker } from "@faker-js/faker"
import { db } from "~/database"
import { BaseSeeder } from "~/database/seed"
import { Address } from "./address.schema"

export default class AddressSeeder extends BaseSeeder {
  async run() {
    await db.insert(Address).values(
      Array.from({ length: 20 }).map(() => ({
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
      }))
    )
  }
}
