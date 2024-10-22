import Accommodation from "#models/accommodation"
import Address from "#models/address"
import { BaseSeeder } from "@adonisjs/lucid/seeders"
import { faker } from "@faker-js/faker"

export default class extends BaseSeeder {
  async run() {
    const accommodations = await Accommodation.all()

    const addresses = accommodations.map((accommodation) => {
      const address = new Address()
      address.street = faker.location.streetAddress()
      address.city = faker.location.city()
      address.postalCode = faker.location.zipCode()
      address.accommodationId = accommodation.id
      return address
    })

    await Address.createMany(addresses)
  }
}
