import { DataSource, DataSourceOptions } from "typeorm"
import User from "../features/users/user.entity"
import Accommodation from "../features/accommodations/accommodation.entity"
import Reservation from "../features/reservations/reservation.entity"
import Address from "../features/addresses/address.entity"

export const options: DataSourceOptions = {
  type: "better-sqlite3",
  database: "./database/db.sqlite",
  entities: [User, Accommodation, Reservation, Address],
  synchronize: true,
}

export const appDataSource = new DataSource(options)
export const queryBuilder = appDataSource.createQueryBuilder()
