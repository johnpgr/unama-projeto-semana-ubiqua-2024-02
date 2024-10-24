import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { Accommodation, AccommodationType } from "./accommodation.schema"
import { z } from "zod"
import { addressInsertSchema } from "../addresses/address.validation"

export const accommodationInsertSchema = createInsertSchema(Accommodation, {
  type: z.nativeEnum(AccommodationType),
})
export const accommodationSelectSchema = createSelectSchema(Accommodation, {
  type: z.nativeEnum(AccommodationType),
})

export const createAccommodationActionSchema = z.object({
  accommodation: accommodationInsertSchema,
  address: addressInsertSchema,
})
