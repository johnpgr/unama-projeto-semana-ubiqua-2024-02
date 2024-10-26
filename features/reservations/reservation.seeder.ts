import { Accommodation } from "../accommodations/accommodation.schema"
import { db } from "~/database"
import { Reservation, ReservationStatus } from "./reservation.schema"
import { User } from "../users/user.schema"
import { faker } from "@faker-js/faker"

export async function seedReservations() {
  const accommodations = await db
    .select({ id: Accommodation.id })
    .from(Accommodation)
  const users = await db.select({ id: User.id }).from(User)
  const reservations = Array.from({ length: 30 }).map(() => {
    const checkIn = faker.date.future()
    const checkOut = new Date(checkIn)
    checkOut.setDate(checkOut.getDate() + faker.number.int({ min: 1, max: 14 }))

    return {
      checkIn: checkIn,
      checkOut: checkOut,
      totalGuests: faker.number.int({ min: 1, max: 6 }),
      status: faker.helpers.objectValue(ReservationStatus),
      accommodationId: faker.helpers.arrayElement(accommodations).id,
      userId: faker.helpers.arrayElement(users).id,
    }
  })

  await db.insert(Reservation).values(reservations)
}
