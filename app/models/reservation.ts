import { DateTime } from "luxon"
import { BaseModel, beforeCreate, belongsTo, column } from "@adonisjs/lucid/orm"
import Accommodation from "./accommodation.js"
import type { BelongsTo } from "@adonisjs/lucid/types/relations"
import User from "./user.js"
import { ulid } from "ulid"

export const ReservationStatus = {
  Pending: "Pending",
  Approved: "Approved",
  Rejected: "Rejected",
} as const
export type ReservationStatus =
  (typeof ReservationStatus)[keyof typeof ReservationStatus]

export default class Reservation extends BaseModel {
  @beforeCreate()
  static assignId(reservation: Reservation) {
    reservation.id = ulid()
  }

  @column({ isPrimary: true })
  declare id: string

  @column.dateTime()
  declare checkIn: DateTime

  @column.dateTime()
  declare checkOut: DateTime

  @column()
  declare totalGuests: number

  @column()
  declare status: ReservationStatus

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare accommodationId: string

  @belongsTo(() => Accommodation)
  declare accommodation: BelongsTo<typeof Accommodation>

  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
