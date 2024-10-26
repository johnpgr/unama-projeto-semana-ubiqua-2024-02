import { createInsertSchema } from "drizzle-zod"
import { Accommodation, AccommodationType } from "./accommodation.schema"
import { z } from "zod"
import { AddressInsertSchema } from "../addresses/address.validation"

export type CreateAccommodationSchema = z.infer<
  typeof CreateAccommodationSchema
>
export const CreateAccommodationSchema = createInsertSchema(Accommodation, {
  type: z.nativeEnum(AccommodationType),
})
  .omit({ addressId: true })
  .extend({
    address: AddressInsertSchema,
  })
