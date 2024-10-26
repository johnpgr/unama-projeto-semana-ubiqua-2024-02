import { faker } from "@faker-js/faker"
import { db } from "~/database"
import { Address } from "./address.schema"

export async function seedAddresses() {
  await db.insert(Address).values(
    Array.from({ length: 20 }).map(() => ({
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      postalCode: faker.location.zipCode(),
    })),
  )
}
