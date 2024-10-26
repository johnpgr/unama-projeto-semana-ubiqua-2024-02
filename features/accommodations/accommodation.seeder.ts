import { faker } from "@faker-js/faker"
import { db } from "~/database"
import { Accommodation, AccommodationType } from "./accommodation.schema"
import { Address } from "../addresses/address.schema"

export async function seedAccommodations() {
  const addresses = await db.select({ id: Address.id }).from(Address)

  await db.insert(Accommodation).values(
    addresses.map(({ id }) => ({
      name:
        faker.company.name() +
        " " +
        faker.helpers.arrayElement(["Hotel", "Resort", "Hostel", "Lodge"]),
      type: faker.helpers.arrayElement(Object.values(AccommodationType)),
      capacity: faker.number.int({ min: 10, max: 500 }),
      price: parseFloat(faker.commerce.price({ min: 50, max: 1000 })),
      rating: faker.number.float({ min: 1, max: 5 }),
      addressId: id,
    })),
  )
}
