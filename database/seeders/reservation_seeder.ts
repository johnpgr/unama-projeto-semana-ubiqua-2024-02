import Accommodation from "#models/accommodation"
import Reservation, { ReservationStatus } from "#models/reservation"
import User from "#models/user"
import { BaseSeeder } from "@adonisjs/lucid/seeders"
import { faker } from "@faker-js/faker"
import { DateTime } from "luxon"

export default class extends BaseSeeder {
  async run() {
    const accommodations = await Accommodation.all()
    const users = await User.all()

    const reservations = Array.from({ length: 20 }, () => {
      const accommodation = faker.helpers.arrayElement(accommodations)
      const status = faker.helpers.objectValue(ReservationStatus)
      const checkIn = faker.date.future()
      const checkOut = faker.date.between({
        from: checkIn,
        to: new Date(checkIn.getTime() + 14 * 24 * 60 * 60 * 1000),
      })
      const userId = faker.helpers.arrayElement(users).id
      const totalGuests = faker.number.int({
        min: 1,
        max: accommodation.capacity,
      })

      const reservation = new Reservation()
      reservation.accommodationId = accommodation.id
      reservation.userId = userId
      reservation.totalGuests = totalGuests
      reservation.checkIn = DateTime.fromJSDate(checkIn)
      reservation.checkOut = DateTime.fromJSDate(checkOut)
      reservation.status = status
      return reservation
    })

    await Reservation.createMany(reservations)
  }
}
