import { DateTime } from "luxon"
import hash from "@adonisjs/core/services/hash"
import { compose } from "@adonisjs/core/helpers"
import { BaseModel, beforeCreate, column, hasMany } from "@adonisjs/lucid/orm"
import { withAuthFinder } from "@adonisjs/auth/mixins/lucid"
import Reservation from "./reservation.js"
import type { HasMany } from "@adonisjs/lucid/types/relations"
import { ulid } from "ulid"

const AuthFinder = withAuthFinder(() => hash.use("scrypt"), {
  uids: ["email"],
  passwordColumnName: "password",
})

export default class User extends compose(BaseModel, AuthFinder) {
  @beforeCreate()
  static assignId(user: User) {
    user.id = ulid()
  }

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Reservation)
  declare reservations: HasMany<typeof Reservation>
}
