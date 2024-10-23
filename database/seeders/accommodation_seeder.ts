import Accommodation, { AccommodationType } from "#models/accommodation"
import { BaseSeeder } from "@adonisjs/lucid/seeders"
import { faker } from "@faker-js/faker"

export default class extends BaseSeeder {
  async run() {
    const accommodations = Array.from({ length: 10 }).map(() => {
      const accommodation = new Accommodation()
      accommodation.name = faker.company.name()
      accommodation.type = faker.helpers.objectValue(AccommodationType)
      accommodation.capacity = faker.number.int({ min: 1, max: 100 })
      accommodation.price = faker.number.int({ min: 50000, max: 5000000 })
      accommodation.rating = faker.number.int({ min: 1, max: 5 })
      return accommodation
    })

    await Accommodation.createMany(accommodations)
  }
}
