import { DateTime } from "luxon"
import { BaseModel, beforeCreate, belongsTo, column } from "@adonisjs/lucid/orm"
import type { BelongsTo } from "@adonisjs/lucid/types/relations"
import Accommodation from "./accommodation.js"
import { ulid } from "ulid"

export default class Address extends BaseModel {
  @beforeCreate()
  static assignId(address: Address) {
    address.id = ulid()
  }

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare street: string

  @column()
  declare city: string

  @column()
  declare postalCode: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare accommodationId: string

  @belongsTo(() => Accommodation)
  declare accommodation: BelongsTo<typeof Accommodation>
}
