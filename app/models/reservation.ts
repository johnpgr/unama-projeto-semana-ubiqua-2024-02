import { DateTime } from "luxon"
import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm"
import Accommodation from "./accommodation.js"
import type { BelongsTo } from "@adonisjs/lucid/types/relations"
import User from "./user.js"

export type ReservationStatus = "pending" | "approved" | "rejected"

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime()
  declare checkIn: DateTime

  @column.dateTime()
  declare checkOut: DateTime

  @column()
  declare totalPrice: number

  @column()
  declare totalGuests: number

  @column()
  declare status: ReservationStatus

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Accommodation)
  declare accommodation: BelongsTo<typeof Accommodation>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
