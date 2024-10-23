import { ReservationStatus } from "#models/reservation"
import { BaseSchema } from "@adonisjs/lucid/schema"

export default class extends BaseSchema {
  protected tableName = "reservations"

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string("id").primary().notNullable()

      table.datetime("check_in").notNullable()
      table.datetime("check_out").notNullable()
      table.integer("total_guests").notNullable()
      table.enum("status", Object.keys(ReservationStatus)).notNullable()
      table
        .string("accommodation_id")
        .references("id")
        .inTable("accommodations")
        .onDelete("CASCADE")
      table
        .string("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")

      table.timestamp("created_at")
      table.timestamp("updated_at")
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
