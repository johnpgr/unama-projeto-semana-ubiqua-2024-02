import { DateTime } from "luxon"
import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm"
import Reservation from "./reservation.js"
import type { HasMany } from "@adonisjs/lucid/types/relations"

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
}
