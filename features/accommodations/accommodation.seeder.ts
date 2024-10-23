import Accommodation, { AccommodationType } from "./accommodation.entity"
import { faker } from "@faker-js/faker"
import { BaseSeeder } from "~/database/seed"
import Address from "../addresses/address.entity"

export default class AccommodationSeeder extends BaseSeeder {
  async run() {
    const addresses = await Address.find()
    await Promise.all(
      addresses.map((address) => {
        const accommodation = new Accommodation()
        accommodation.name = faker.company.name()
        accommodation.type = faker.helpers.objectValue(AccommodationType)
        accommodation.capacity = faker.number.int({ min: 1, max: 100 })
        accommodation.price = faker.number.int({ min: 50000, max: 5000000 })
        accommodation.rating = faker.number.int({ min: 1, max: 5 })
        accommodation.address = address
        return accommodation.save()
      })
    )
  }
}
