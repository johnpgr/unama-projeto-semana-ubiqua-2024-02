import Accommodation from "../accommodations/accommodation.entity"
import User from "../users/user.entity"
import Reservation, { ReservationStatus } from "./reservation.entity"
import { faker } from "@faker-js/faker"
import { BaseSeeder } from "~/database/seed"

export default class ReservationSeeder extends BaseSeeder {
  async run() {
    const accommodations = await Accommodation.find()
    const users = await User.find()

    await Promise.all(
      Array.from({ length: 20 }, () => {
        const accommodation = faker.helpers.arrayElement(accommodations)
        const status = faker.helpers.objectValue(ReservationStatus)
        const checkIn = faker.date.future()
        const checkOut = faker.date.between({
          from: checkIn,
          to: new Date(checkIn.getTime() + 14 * 24 * 60 * 60 * 1000),
        })
        const user = faker.helpers.arrayElement(users)
        const totalGuests = faker.number.int({
          min: 1,
          max: accommodation.capacity,
        })

        const reservation = new Reservation()
        reservation.accommodation = accommodation
        reservation.user = user
        reservation.totalGuests = totalGuests
        reservation.checkIn = checkIn
        reservation.checkOut = checkOut
        reservation.status = status
        return reservation.save()
      })
    )
  }
}
