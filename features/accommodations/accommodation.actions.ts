"use server"
import { Accommodation } from "./accommodation.schema"
import { Address } from "../addresses/address.schema"
import { db } from "~/database"
import { CreateAccommodationSchema } from "./accommodation.validation"
import { createServerAction, ZSAError } from "zsa"
import { listAccommodations } from "./accommodation.queries"

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
      .catch((error) => {
        throw new ZSAError(
          "INTERNAL_SERVER_ERROR",
          `Falha ao criar endereço. Detalhes: ${(error as Error).message}`,
        )
      })

    await db
      .insert(Accommodation)
      .values({
        addressId: newAddress!.id,
        name: accommodation.name,
        type: accommodation.type,
        capacity: accommodation.capacity,
        price: accommodation.price,
        rating: accommodation.rating,
      })
      .then(listAccommodations.revalidate)
      .catch((error) => {
        throw new ZSAError(
          "INTERNAL_SERVER_ERROR",
          `Falha ao criar acomodação. Detalhes: ${(error as Error).message}`,
        )
      })
  })
