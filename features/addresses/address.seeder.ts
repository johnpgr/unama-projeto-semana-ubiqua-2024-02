import Address from "./address.entity"
import { faker } from "@faker-js/faker"
import { BaseSeeder } from "~/database/seed"

export default class AddressSeeder extends BaseSeeder {
  async run() {
    await Promise.all(
      Array.from({ length: 50 }).map(() => {
        const address = new Address()
        address.city = faker.location.city()
        address.street = faker.location.street()
        address.postalCode = faker.location.zipCode()

        return address.save()
      })
    )
  }
}
