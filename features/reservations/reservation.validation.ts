import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { Reservation, ReservationStatus } from "./reservation.schema"
import { z } from "zod"

export const reservationInsertSchema = createInsertSchema(Reservation, {
  status: z.nativeEnum(ReservationStatus),
})
export const reservationSelectSchema = createSelectSchema(Reservation, {
  status: z.nativeEnum(ReservationStatus),
})
