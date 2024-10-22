import { DateTime } from "luxon"
import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm"
import type { BelongsTo } from "@adonisjs/lucid/types/relations"
import Accommodation from "./accommodation.js"

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

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
  declare accommodationId: number

  @belongsTo(() => Accommodation)
  declare accommodation: BelongsTo<typeof Accommodation>
}
