"use server"
import { Accommodation } from "./accommodation.schema"
import { Address } from "../addresses/address.schema"
import { db } from "~/database"
import { CreateAccommodationSchema } from "./accommodation.validation"
import { action } from "~/lib/actions"

export const createAccommodationAction = action
  .schema(CreateAccommodationSchema)
  .action(async ({ parsedInput }) => {
    const accommodation = parsedInput

    const [newAddress] = await db
      .insert(Address)
      .values({
        city: accommodation.address.city,
        street: accommodation.address.street,
        postalCode: accommodation.address.postalCode,
      })
      .returning()

    if (!newAddress) throw new Error("Falha ao criar endereço")

    await db.insert(Accommodation).values({
      addressId: newAddress.id,
      name: accommodation.name,
      type: accommodation.type,
      capacity: accommodation.capacity,
      price: accommodation.price,
      rating: accommodation.rating,
    })
  })
