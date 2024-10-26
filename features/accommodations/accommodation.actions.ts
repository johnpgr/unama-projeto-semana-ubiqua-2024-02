"use server"
import { Accommodation } from "./accommodation.schema"
import { Address } from "../addresses/address.schema"
import { db } from "~/database"
import { CreateAccommodationSchema } from "./accommodation.validation"
import { createServerAction, ZSAError } from "zsa"

export const createAccommodationAction = createServerAction()
  .input(CreateAccommodationSchema)
  .handler(async ({ input: accommodation }) => {
    const [newAddress] = await db
      .insert(Address)
      .values({
        city: accommodation.address.city,
        street: accommodation.address.street,
        postalCode: accommodation.address.postalCode,
      })
      .returning()

    if (!newAddress) {
      throw new ZSAError("INTERNAL_SERVER_ERROR", "Falha ao criar endereço")
    }

    await db.insert(Accommodation).values({
      addressId: newAddress.id,
      name: accommodation.name,
      type: accommodation.type,
      capacity: accommodation.capacity,
      price: accommodation.price,
      rating: accommodation.rating,
    })
  })
