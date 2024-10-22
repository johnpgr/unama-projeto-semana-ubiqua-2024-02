import { DateTime } from "luxon"
import { BaseModel, column, hasMany, hasOne } from "@adonisjs/lucid/orm"
import Reservation from "./reservation.js"
import type { HasMany, HasOne } from "@adonisjs/lucid/types/relations"
import Address from "./address.js"

export type AccommodationType =
  | "hotel"
  | "hostel"
  | "resort"
  | "ship"
  | "adapted"

export default class Accommodation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare type: AccommodationType

  @column()
  declare capacity: number

  @column()
  declare price: number

  @column()
  declare rating: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Reservation)
  declare reservations: HasMany<typeof Reservation>

  @hasOne(()=> Address)
  declare address: HasOne<typeof Address>
}
