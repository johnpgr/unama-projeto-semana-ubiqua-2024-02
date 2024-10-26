import { seedAccommodations } from "~/features/accommodations/accommodation.seeder"
import { seedAddresses } from "~/features/addresses/address.seeder"
import { seedReservations } from "~/features/reservations/reservation.seeder"
import { seedUsers } from "~/features/users/user.seeder"

;(async () => {
  await seedUsers()
  await seedAddresses()
  await seedAccommodations()
  await seedReservations()
})()
