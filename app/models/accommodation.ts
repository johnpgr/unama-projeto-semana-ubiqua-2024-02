import { DateTime } from "luxon"
import {
  BaseModel,
  beforeCreate,
  column,
  hasMany,
  hasOne,
} from "@adonisjs/lucid/orm"
import Reservation from "./reservation.js"
import type { HasMany, HasOne } from "@adonisjs/lucid/types/relations"
import Address from "./address.js"
import { ulid } from "ulid"

export const AccommodationType = {
  Hotel: "Hotel",
  Hostel: "Hostel",
  Resort: "Resort",
  Ship: "Ship",
  Adapted: "Adapted",
} as const

export type AccommodationType =
  (typeof AccommodationType)[keyof typeof AccommodationType]

export default class Accommodation extends BaseModel {
  @beforeCreate()
  static assignId(accommodation: Accommodation) {
    accommodation.id = ulid()
  }

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare type: AccommodationType

  @column()
  declare capacity: number

  @column()
  declare price: number

  @column()
  declare rating: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Reservation)
  declare reservations: HasMany<typeof Reservation>

  @hasOne(() => Address)
  declare address: HasOne<typeof Address>
}
