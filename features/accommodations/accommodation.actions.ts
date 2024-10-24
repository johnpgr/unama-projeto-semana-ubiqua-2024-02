"use server"
import { Accommodation } from "./accommodation.schema"
import { Address } from "../addresses/address.schema"
import { db } from "~/database"
import { createAccommodationActionSchema } from "./accommodation.validation"
import { safeAction } from "~/lib/actions"

export const createAccommodationAction = safeAction
  .schema(createAccommodationActionSchema)
  .action(async ({ parsedInput }) => {
    const { accommodation, address } = parsedInput

    const [newAddress] = await db
      .insert(Address)
      .values({
        city: address.city,
        street: address.street,
        postalCode: address.postalCode,
      })
      .returning()

    await db.insert(Accommodation).values({
      addressId: newAddress.id,
      name: accommodation.name,
      type: accommodation.type,
      capacity: accommodation.capacity,
      price: accommodation.price,
      rating: 0.0,
    })
  })
